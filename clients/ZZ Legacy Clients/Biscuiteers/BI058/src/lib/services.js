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
  document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Is logged in?
 */
export const isLoggedIn = () => {
  return !!tco.get('customer').isLoggedIn;
};

/**
 * Get pressie points
 *
 * n.b. site uses 'refer a friend' naming, this is the
 * pressie points model 
 *
 * Returns object with properties balance, code, expiry date
 *
 * @return {Object} 
 */
export const getPressiePoints = () => {
  return tco.get('customer')?.data?.refer_a_friend?.balance || 0;
};
