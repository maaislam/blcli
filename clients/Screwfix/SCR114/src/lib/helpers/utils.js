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

    return findObject(window.__NEXT_DATA__, 'skuId', sku.toUpperCase());
  } else if (pageType === 'plp') {
    const dataObj = findObject(window.__NEXT_DATA__, 'ctype', 'ProductListing');
    
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
