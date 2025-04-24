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
    console.log('🚀 ~ getPageData ~ dataObj:', dataObj);
    return dataObj ? dataObj.models.enrichedData : {};
  }
  return {};
};

export const getParentCategory = () => {
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

export const getCompareList = () => {
  const runtimeData = window.__NEXT_DATA__.runtimeConfig;

  const { tenantId, tykToken } = runtimeData;
  const compareUrl = `/prod/ffx-browse-bff/v1/${tenantId}/product/compare-list`;
  return fetch(compareUrl, {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      authorization: tykToken,
    },
  }).then((res) => res.json());
};
