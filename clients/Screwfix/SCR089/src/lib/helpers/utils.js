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


const getCookieValue = (cookieName) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

export const manageBasket = (operation, skuId, quantity) => {
  // Destructure necessary properties from the runtimeConfig object
  const { domain, apiRoot, tykToken } = window.__NEXT_DATA__.runtimeConfig;

  // Get the branch code from the selectedBranch cookie
  const branchCode = getCookieValue('selectedBranch') || 'BT4';

  // Construct the basket URLs
  const getBasketUrl = `${domain}${apiRoot}/v1/SFXUK/basket`; // For getting the basket
  const patchBasketUrl = `${domain}${apiRoot}/v2/SFXUK/basket`; // For patching the basket

  // Setup the headers with the destructured tykToken
  const headers = {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": tykToken,
    "content-type": "application/json",
    "page-url": window.location.href,
    "prefer": "return=MainView;Presentation",

  };

  const patchBasket = (operation, newQuantity) => {
    const body = {
      operation: operation,  // Pass the operation type ("Add" or "Update")
      skuId: skuId,
      branchCode: branchCode,
      quantity: newQuantity
    };

    // Only include finalMileOption for "Add" operation
    if (operation === "Add") {
      body.finalMileOption = "Delivery";
    }

    return fetch(patchBasketUrl, {
      method: "PATCH",
      headers,
      body: JSON.stringify([body])
    }).then(response => response.json());
  }

  if (operation === "Remove" || operation === "Update") {
    return fetch(getBasketUrl, { method: "GET", headers })
      .then(response => response.json())
      .then(basketData => {
        const productQuantities = basketData.mainview.productQuantities;
        const existingItem = productQuantities.find(item => item.skuId === skuId);

        if (existingItem) {
          let difference;
          if (operation === "Remove") {
            difference = existingItem.quantity - quantity;  // Calculate difference for removal
          } else {
            difference = quantity; // Use the passed quantity for a standard update
          }
          return patchBasket("Update", difference);
        } else {
          return Promise.reject(`Item with SKU ID ${skuId} not found in the basket.`);
        }
      });
  } else if (operation === "Add") {
    return patchBasket("Add", quantity);
  } else {
    return Promise.reject("Invalid operation. Operation must be either 'Add' or 'Remove'.");
  }
}
