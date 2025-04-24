/*eslint-disable no-prototype-builtins */
const findObject = (obj, key, value) => {
  if (!obj) return undefined;

  if (obj[key] === value) return obj;

  for (const k in obj) {
    if (obj.hasOwnProperty(k) && typeof obj[k] === 'object') {
      const found = findObject(obj[k], key, value);
      if (found) return found;
    }
  }

  return undefined;
};

const getPageData = (pageType) => {
  if (pageType === 'pdp') {
    const pathname = window.location.pathname;
    const sku = pathname.slice(pathname.lastIndexOf('/') + 1);
    //console.log('🚀 ~ getPageData ~ sku:', sku);

    return findObject(window.__NEXT_DATA__, 'skuId', sku.toUpperCase());
  } else if (pageType === 'plp') {
    const dataObj = findObject(window.__NEXT_DATA__, 'ctype', 'ProductListing');
    //console.log('🚀 ~ getPageData ~ dataObj:', dataObj);
    return dataObj ? dataObj.models.enrichedData : {};
  }
  return {};
};

export const getReactStoreData = () => {
  const breadcrumbs = document.querySelectorAll('[data-qaid="breadcrumb-qa"] li');
  const pageType = window.location.href.includes('/p/') ? 'pdp' : 'plp';
  const parentCategories = [];
  breadcrumbs.forEach((item) => {
    const href = item.querySelector('a')?.href;
    if (href && href !== location.origin && href !== location.origin + '/' && item.querySelector('a').title) {
      parentCategories.push(item.querySelector('a').title);
    }
  });
  const pageData = getPageData(pageType);

  const blDataLayer = {
    parentCategories,
    pageType,
    pageData,
  };
  window.blDataLayer = blDataLayer;
};

export const onUrlChange = (callback, onError = null) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback function must be provided');
  }
  const mutationConfig = {
    childList: true,
    subtree: true,
  };
  //Create a new MutationObserver instance to observe changes to the document body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      //Store the current URL in a separate variable to make the code more concise
      const currentUrl = window.location.href;
      //Check if the URL has changed since the last observation
      if (observer.previousUrl !== currentUrl) {
        const oldHref = observer.previousUrl;
        //Update the previous URL and execute the callback function
        observer.previousUrl = currentUrl;
        //console.log('URL changed!');
        observer.disconnect();
        try {
          setTimeout(() => {
            callback(oldHref, mutation);
          }, 1000);
        } catch (error) {
          console.log(`Error in callback function: ${error}`);
        }
        observer.observe(document.documentElement, mutationConfig);
      }
    });
  });

  //Initialize the previous URL to the current URL

  try {
    observer.previousUrl = window.location.href;
    //Start observing changes to the document documentElement to detect URL changes
    observer.observe(document.documentElement, mutationConfig);
  } catch (error) {
    if (onError && typeof onError === 'function') {
      onError(error);
    } else {
      console.log(`Error starting onUrlChange observer: ${error}`);
    }
  }
};

export const obsIntersection = (target, threshold, callback) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // if (entry.intersectionRatio > 0 && entry.isIntersecting && entry.boundingClientRect.y > 0) {

        // }
        callback(entry);
      });
    },
    { threshold: threshold }
  );
  if (!target) {
    return;
  }

  observer?.observe(target);
};

export const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
  const target = document.querySelector(`${targetSelectorString}`);
  let oldHref = location.href;
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(function (mutation) {
      let urlChanged = false;
      if (oldHref !== location.href) {
        oldHref = location.href;
        urlChanged = true;
      }

      callbackFunction(mutation, urlChanged);
    });
  });

  const config = configObject || {
    childList: true,
    characterData: true,
    characterDataOldValue: true,
    attributes: false,
    subtree: false,
  };

  observer.observe(target, config);
};

export const mmToInchFraction = (mmValue) => {
  // Lookup table for converting mm to fractional inches
  const mmToFractionInch = {
    13: '1/2"', // 13mm -> 1/2"
    16: '5/8"', // 16mm -> 5/8"
    19: '3/4"', // 19mm -> 3/4"
    25: '1"', // 25mm -> 1"
    32: '1 1/4"', // 32mm -> 1 1/4"
    38: '1 1/2"', // 38mm -> 1 1/2"
    51: '2"', // 51mm -> 2"
    57: '2 1/4"', // 57mm -> 2 1/4"
    64: '2 1/2"', // 64mm -> 2 1/2"
    76: '3"', // 76mm -> 3"
    83: '3 1/4"', // 83mm -> 3 1/4"
    89: '3 1/2"', // 89mm -> 3 1/2"
    102: '4"', // 102mm -> 4"
    108: '4 1/4"', // 108mm -> 4 1/4"
    114: '4 1/2"', // 114mm -> 4 1/2"
    127: '5"', // 127mm -> 5"
  };
  let closestInch = null;
  let minDifference = Infinity;

  // Finding the closest match from the lookup table
  for (const [mm, inch] of Object.entries(mmToFractionInch)) {
    const difference = Math.abs(mmValue - parseFloat(mm));
    if (difference < minDifference) {
      minDifference = difference;
      closestInch = inch;
    }
  }
  if (closestInch) {
    return closestInch;
  }
};

export const mmToGa = (mmValue) => {
  // Lookup table for converting mm to gauge
  const mmToGauge = {
    7.3: 1, // 7.3mm -> 1 gauge
    6.5: 2, // 6.5mm -> 2 gauge
    5.8: 3, // 5.8mm -> 3 gauge
    5.2: 4, // 5.2mm -> 4 gauge
    4.6: 5, // 4.6mm -> 5 gauge
    4.1: 6, // 4.1mm -> 6 gauge
    3.7: 7, // 3.7mm -> 7 gauge
    3.3: 8, // 3.3mm -> 8 gauge
    2.9: 9, // 2.9mm -> 9 gauge
    2.6: 10, // 2.6mm -> 10 gauge
  };
  // Find the closest gauge based on the mm value provided
  let closestGauge = null;
  let minDifference = Infinity;

  for (const [mm, gauge] of Object.entries(mmToGauge)) {
    const difference = Math.abs(mmValue - parseFloat(mm));
    if (difference < minDifference) {
      minDifference = difference;
      closestGauge = gauge;
    }
  }

  if (closestGauge) {
    return closestGauge;
  }
};

export const inchesToMM = (inches) => {
  const fractionParts = inches.split('/');
  if (fractionParts.length === 2) {
    const numerator = parseFloat(fractionParts[0]);
    const denominator = parseFloat(fractionParts[1].replace('"', ''));
    return (numerator / denominator) * 25.4;
  } else {
    return parseFloat(inches.replace('"', '')) * 25.4;
  }
};

export const gaugeToMM = (gauge) => {
  const gaugeToMMTable = {
    1: 7.3,
    2: 6.5,
    3: 5.8,
    4: 5.2,
    5: 4.6,
    6: 4.1,
    7: 3.7,
    8: 3.3,
    9: 2.9,
    10: 2.6,
  };

  if (gaugeToMMTable.hasOwnProperty(gauge)) {
    return gaugeToMMTable[gauge];
  } else {
    return 'Gauge out of range';
  }
};
