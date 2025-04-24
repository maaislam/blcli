import { fullStory, pollerLite } from '../../../../../lib/utils';
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
  if (slug.indexOf('product/5072/') !== -1) return 'skinSoSoft';
  if (slug.indexOf('product/5498/') !== -1) return 'foundation';
  if (slug.indexOf('product/14047/') !== -1) return 'gelShine';

  return false;
};
