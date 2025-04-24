import { pollerLite } from '../../../../../../lib/utils';

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

export const getCart = () => {
  const { clientApiRoot, apiVersion, tenantId, tykToken } = window.__NEXT_DATA__.props.clientConfig;

  return fetch(`${clientApiRoot}/${apiVersion}/${tenantId}/baskets`, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      authorization: tykToken,
      'content-type': 'application/json',
      prefer: 'return=MainView',
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    });
};

export const isLoggedIn = () => {
  const loggedIn = window.utag?.data?.basicLoggedIn?.toLowerCase() !== 'no';
  return loggedIn;
};

export const removeAllItemsFromCart = async () => {
  const { clientApiRoot, apiVersion, tenantId, tykToken } = window.__NEXT_DATA__.props.clientConfig;

  // Step 1: Get cart
  const cart = await fetch(`${clientApiRoot}/${apiVersion}/${tenantId}/baskets`, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      authorization: tykToken,
      'content-type': 'application/json',
    },
  }).then((res) => res.json());

  const basketId = cart.id;

  // Step 2: Loop through each item + its fulfilment targets
  const items = cart.lineItems.flatMap((item) =>
    item.fulfilmentTargets.map((ft) => ({
      sku: item.product.sku,
      fulfilmentTargetId: ft.id,
    }))
  );

  // Step 3: Remove each item
  for (const { sku, fulfilmentTargetId } of items) {
    const res = await fetch(`/prod/ffx-browse-bff/v1/${tenantId}/baskets/${basketId}/items/${sku}`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      headers: {
        accept: '*/*',
        'content-type': 'application/json',
        authorization: tykToken,
      },
      body: JSON.stringify([{ fulfilmentTargetId, quantity: 0 }]),
    });

    if (res.ok) {
      console.log(`✅ Removed ${sku}`);
    } else {
      const error = await res.text();
      console.log(`❌ Failed to remove ${sku}:`, error);
    }
  }

  window.location.reload();
};
