/* eslint-disable no-prototype-builtins */
(function () {
  const poller = (conditions, callback, maxTries = 100) => {
    let tries = 0;
    let interval = setInterval(() => {
      tries++;
      let allConditionsMet = conditions.every((condition) => {
        if (typeof condition === 'function') {
          return condition();
        } else {
          return !!document.querySelector(condition);
        }
      });
      if (allConditionsMet) {
        clearInterval(interval);
        callback();
      } else if (tries >= maxTries) {
        clearInterval(interval);
        console.error('Polling exceeded maximum number of tries');
      }
    }, 100);
  };

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

  const getParentCategory = () => {
    const breadcrumbs = document.querySelectorAll('[data-qaid="breadcrumb-qa"] li');
    const pageTypeConfig = {
      c: 'plp',
      p: 'pdp',
    };
    const domainEnd = location.href.indexOf('.com') + 5;
    const pageType = pageTypeConfig[location.href.charAt(domainEnd)];
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
  const observeDOM = (targetSelectorString, callbackFunction, configObject) => {
    const target = document.querySelector(`${targetSelectorString}`);
    let oldHref = location.href;
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        let urlChanged = false;
        if (oldHref !== location.href) {
          oldHref = location.href;
          urlChanged = true;
        }

        callbackFunction(urlChanged);
      });
    });

    // configuration of the observer:

    const config = configObject || {
      childList: true,
      characterData: true,
      characterDataOldValue: true,
      attributes: false,
      subtree: false,
    };

    observer.observe(target, config);
  };

  const mutationCallback = (urlChange) => {
    if (urlChange) {
      getParentCategory();
    }
  };

  poller(['body', '[data-qaid="breadcrumb-qa"]'], () => {
    getParentCategory();
    //run again on pagechange
    observeDOM('body', mutationCallback);
  });
})();
