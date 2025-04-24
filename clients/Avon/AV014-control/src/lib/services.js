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
  const pages = {
    plp: [
      /https:\/\/www.avon.uk.com\/[\w-/]+\/make-up\/lips/i,
      /https:\/\/www.avon.uk.com\/[\w-/]+\/make-up\/lips\/lipsticks/i,
    ],

    search: [
      /https:\/\/www.avon.uk.com\/search\/results\/\?q=[\w%]*lip/i,
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
