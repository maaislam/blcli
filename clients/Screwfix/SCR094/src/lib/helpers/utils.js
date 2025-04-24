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
export const isMobile = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
  // const pageTypeConfig = {
  //   c: 'plp',
  //   p: 'pdp',
  // };
  // const domainEnd = location.href.indexOf('.com') + 5;
  const pageType = window.location.href.includes('/p/') ? 'pdp' : 'plp';
  //console.log(pageType);
  const parentCategories = [];
  breadcrumbs.forEach((item) => {
    const href = item.querySelector('a')?.href;
    //console.log(href);
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

  console.log('blDataLayer', blDataLayer);
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

export const fetchSkus = (link) => {
  return fetch(link, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
      Accept: 'text/html',
    },
    credentials: 'include', // Include cookies for authenticated access
  })
    .then((response) => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then((htmlText) => {
      // Parse the HTML content
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');

      const prodUrls = Array.from(
        doc.querySelectorAll('[data-qaid="product-grid"] [data-qaid="product-card"] [data-qaid="product_description"]')
      )
        .map((prodUrl) => {
          return prodUrl.href;
        })
        .filter(Boolean);

      return prodUrls; // Return the array of SKUs
    });
};

const getSKUFromURL = (url) => {
  const parts = url.split('/'); // Split the URL by '/'
  return parts[parts.length - 1]; // Return the last part
};

const parsedfromResponse = (info, url) => {
  const productTitle = info.querySelector('[data-qaid="pdp-product-name"]');
  const priceContainer = info.querySelector('[data-qaid="product-price"]');
  const reviewContainer = info.querySelector('[data-qaid="rating-stars_number-reviews"]');
  const lastBreadcrumbItem = info.querySelector('[data-qaid="breadcrumb-qa"] > li:last-child a');
  const lastBreadcrumbLink = lastBreadcrumbItem.href;

  if (productTitle && priceContainer && reviewContainer) {
    return {
      sku: getSKUFromURL(url),
      url,
      title: productTitle.outerHTML,
      price: priceContainer.outerHTML,
      review: reviewContainer.outerHTML,
      lastBreadcrumbLink,
    };
  }
};

export const getProductsData = (urls) => {
  const promises = urls.map((url) => fetch(url));
  return Promise.all(promises)
    .then((results) => Promise.all(results.map((response) => response.text())))
    .then((data) => {
      const parser = new DOMParser();
      const info = [];
      data.forEach((el, index) => {
        if (el) {
          const parsed = parser.parseFromString(el, 'text/html');
          const url = urls[index];
          info.push(parsedfromResponse(parsed, url));
        }
      });
      return info;
    });
};

export const isGoogleShopper = () => {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer;

  // Check for Google Ads Shopping parameter
  if (params.get('gclsrc') === 'aw.ds') {
    return true; // Likely from Google Shopping (via Google Ads)
  }

  // Check if the referrer URL contains "google.com/shopping"
  if (referrer.includes('google.com/shopping')) {
    return true; // Direct referral from Google Shopping
  }

  // If none of the above match, not from Google Shopping
  return false;
};
