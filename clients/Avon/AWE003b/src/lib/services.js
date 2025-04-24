import { fullStory, pollerLite } from '../../../../../lib/utils';
import { getLanguage } from '../../../../../lib/utils/avon';
import shared from './shared';
import translations from '../translations';

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
