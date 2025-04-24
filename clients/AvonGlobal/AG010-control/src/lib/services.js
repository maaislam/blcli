/**
 * Check if the current url matches the supplied url
 * @param {string|RegExp} url
 * @returns {boolean}
 */
export const isUrlMatch = (url) => {
  const thisUrl = `${window.location.origin}${window.location.pathname}`;
  return url instanceof RegExp ? url.test(window.location.href) : url === thisUrl;
};

/**
 * Get the page type
 * @returns {string}
 */
export const getPageType = () => {
  // Array elements can be either a string or a regex
  const pages = {
    checkoutLogin: [
      /.+avon.+\/checkoutmobile\/login\/?(\?.*)?(&.*)?(#.*)?$/i,
    ],

    checkout: [
      /.+avon.+\/checkoutmobile\/?(\?.*)?(&.*)?(#.*)?$/i,
    ],
  };

  let thisPageType;
  Object.keys(pages).some((pageType) => {
    const urls = pages[pageType];
    const isPageType = urls.some(isUrlMatch);
    if (isPageType) thisPageType = pageType;
    return isPageType;
  });

  return thisPageType;
};
