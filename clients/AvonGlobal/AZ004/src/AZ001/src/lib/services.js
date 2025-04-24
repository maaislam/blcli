import { fullStory, pollerLite } from '../../../../../../../lib/utils';
import shared from './shared';
import { getLanguage } from '../../../../../../../lib/utils/avon';
import translations from './translations';

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
  document.body.classList.add(`${ID}--${pageType}`);
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
/*
export const getPageType = () => {
  // Array elements can be either a string or a regex
  const pages = {
    PLP: [
      /.*avon\.sk\/\d+\/[\w-]+\/?(\?.*)?(&.*)?(#.*)?$/i,
      /.*avon\.uk\.com\/\d+\/[\w-]+\/?(\?.*)?(&.*)?(#.*)?$/i,
    ],

    offersPLP: [
      /.*avon\.sk\/specialne-ponuky\/?(\?.*)?(&.*)?(#.*)?$/i,
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
*/

/**
 * Get the page type
 * @returns {Promise}
 */
export const getPageType = () => new Promise((resolve, reject) => {
  pollerLite(['.Controller_Category'], () => {
    resolve('PLP');
  });

  pollerLite(['.Controller_Group'], () => {
    resolve('PLP');
  });

  pollerLite(['.Controller_SpecialOffers'], () => {
    resolve('offersPLP');
  });
});

/**
 * Translate a string to another language
 * Dataset located at /lib/translations.js
 * @returns {string}
 */
export const translate = (text) => {
  const translation = translations[text] ? translations[text][getLanguage()] : false;
  return translation || text;
};
