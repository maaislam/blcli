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


export const getPageName = () => {
  const slug = window.location.pathname;
  if (slug.indexOf('product/99824/') !== -1) return 'skincare';
  if (slug.indexOf('product/40643/') !== -1) return 'mascara';
  if (slug.indexOf('product/18637/') !== -1) return 'rossetto';
  if (slug.indexOf('product/88158/') !== -1) return 'nailpolish';
  if (slug.indexOf('product/3907/') !== -1) return 'trueColourLipstick';
  if (slug.indexOf('product/13491') !== -1) return 'mascara';
  return false;
};
