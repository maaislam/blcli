import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import translations from './translations';
import { addToCart } from '../../../../../lib/utils/avon';

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
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
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
    fragrancePlp: [
      /https:\/\/www.avon.cz\/303\/vune/i,
    ],

    skincarePlp: [
      /https:\/\/www.avon.cz\/304\/plet/i,
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
 * Get the page number if on a PLP
 * @returns {number}
 */
export const getPageNumber = () => {
  const { $ } = shared;
  return $('.ProductListTools').scope().ProductListState.PageCurrent;
};

/**
 * Get the current site language
 * @returns {string}
 */
export const getLanguage = () => shared.rootScope.ShopContext.Language;

/**
 * Translate a string to another language
 * Dataset located at /lib/translations.js
 * @returns {string}
 */
export const translate = (text) => {
  const translation = translations[text] ? translations[text][getLanguage()] : false;
  return translation || text;
};

/**
 * Add to cart
 * @param {Object} product
 * @param {Number} qty
 */
export const addProductToCart = (product, qty) => {
  if (product.SingleVariantSku) addToCart(product.SingleVariantSku, qty);
};
