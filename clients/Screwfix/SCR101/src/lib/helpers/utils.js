/*eslint-disable no-prototype-builtins */

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
          callback(oldHref, mutation);
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
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};

export const manageBasket = (operation, skuId, quantity, deliveryType) => {
  // Destructure necessary properties from the runtimeConfig object
  const { domain, clientApiRoot, tykToken } = window.__NEXT_DATA__.props.clientConfig;

  // Get the branch code from the selectedBranch cookie
  const branchCode = getCookieValue('selectedBranch') || 'BT4';

  // Construct the basket URLs
  const getBasketUrl = `${domain}${clientApiRoot}/v1/SFXUK/basket`; // For getting the basket
  const patchBasketUrl = `${domain}${clientApiRoot}/v2/SFXUK/basket`; // For patching the basket

  // Setup the headers with the destructured tykToken
  const headers = {
    accept: '*/*',
    'accept-language': 'en-US,en;q=0.9',
    authorization: tykToken,
    'content-type': 'application/json',
    'page-url': window.location.href,
    prefer: 'return=MainView;Presentation',
  };

  const patchBasket = (operation, newQuantity) => {
    const body = {
      operation: operation, // Pass the operation type ("Add" or "Update")
      skuId: skuId,
      branchCode: branchCode,
      quantity: newQuantity,
    };

    // Only include finalMileOption for "Add" operation
    if (operation === 'Add') {
      body.finalMileOption = deliveryType;
    }

    return fetch(patchBasketUrl, {
      method: 'PATCH',
      headers,
      body: JSON.stringify([body]),
    }).then((response) => response.json());
  };

  if (operation === 'Remove') {
    return fetch(getBasketUrl, { method: 'GET', headers })
      .then((response) => response.json())
      .then((basketData) => {
        //console.log('🚀 ~ .then ~ basketData:', basketData);
        const productQuantities = basketData.mainview.productQuantities;
        const existingItem = productQuantities.find((item) => item.skuId === skuId);

        if (existingItem) {
          //console.log('🚀 ~ .then ~ existingItem:', existingItem);
          let difference;
          if (operation === 'Remove') {
            difference = existingItem.quantity - quantity; // Calculate difference for removal
          } else {
            difference = quantity; // Use the passed quantity for a standard update
          }
          return patchBasket('Update', difference);
        } else {
          return Promise.reject(`Item with SKU ID ${skuId} not found in the basket.`);
        }
      });
  } else if (operation === 'Add') {
    return patchBasket('Add', quantity);
  } else {
    return Promise.reject("Invalid operation. Operation must be either 'Add' or 'Remove'.");
  }
};
