import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, pageType } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
  if (pageType) document.body.classList.add(`${ID}--${pageType}`);
};

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

/**
 * Get the current layout name
 * @returns {string}
 */
export const getLayoutName = () => window.AppModule.RootScope.Layout.Name;

/**
 * Get the page number if on a PLP
 * @returns {number}
 */
export const getPageNumber = () => {
  const { $ } = shared;
  return $('.ProductListTools').scope().ProductListState.PageCurrent;
};
