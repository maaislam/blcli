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
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Get PLP category name
 * @returns {string}
 */
export const getCategory = () => {
  let category = '';
  const url = window.location.href;

  switch (true) {
    case /\/make-up\/face/.test(url):
      category = 'face';
      break;

    case /\/make-up\/face\/foundation/.test(url):
      category = 'foundation';
      break;

    default:
      break;
  }

  return category;
};
