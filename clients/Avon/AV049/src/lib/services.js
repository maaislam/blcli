import { fullStory, pollerLite } from '../../../../../lib/utils';
import shared from './shared';
import { makeupData, healthData, glamData } from './data';

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

export const strEndsWith = (input, match) => {
  return input.slice(-1 * match.length) === match;
};

export const getPLPType = () => {
  const slug = window.location.pathname;
  // if (slug.indexOf('make-up/face') !== -1) return 'face';
  if (makeupData.indexOf(slug) !== -1) return 'face';
  if (glamData.indexOf(slug) !== -1) return 'nails';
  if (healthData.indexOf(slug) !== -1) return 'skincare';
  // if (slug.indexOf('skincare') !== -1) return 'skincare';
  // if (slug.indexOf('make-up/nails') !== -1) return 'nails';
  return false;
};

export const runOnPage = () => {
  const slug = window.location.pathname.replace(/\/$/, ""); // no trailing slash.
  const triggerPages = ['/make-up/face', '/skincare', '/make-up/nails'];
  let trigger = false;

  triggerPages.forEach((triggerPage) => {
    if (slug.indexOf(triggerPage) > -1) trigger = true;
  });
  return trigger;
}


/**
 * Gets layout name from root scope (mobile/tablet/desktop)
 * @returns {string}
 */
export const getLayoutName = () => window.AppModule.RootScope.Layout.Name;
