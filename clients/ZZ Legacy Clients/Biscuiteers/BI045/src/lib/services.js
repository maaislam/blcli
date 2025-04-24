import { fullStory, events } from '../../../../../lib/utils';
import shared from './shared';

/**
 * setup
 * @desc Performs standard experiment setup (FullStory tagging, GA event and body class)
 */
function setup() {
  fullStory(shared.ID, `Variation ${shared.VARIATION}`);
  events.send(shared.ID, 'Activated', `Variation ${shared.VARIATION}`);
  document.body.classList.add(shared.ID);
  document.body.classList.add(`${shared.ID}-${shared.VARIATION}`);
}

export { setup }; // eslint-disable-line

/**
 * Helper is logged in?
 */
export const isLoggedIn = () => {
  const isLoggedIn = window.tco && (typeof window.tco.get == 'function') && window.tco.get('customer') && window.tco.get('customer').isLoggedIn;

  return !!isLoggedIn;
};

/**
 * Is VIB customer?
 */
export const isVibCustomer = () => {
  const isVib = tco && (typeof tco.get == 'function') && tco.get('customer') && 
    tco.get('customer').data && tco.get('customer').data.vib && tco.get('customer').data.vib.is_vib;

  return !!isVib;
}

/**
 * Get user data
 */
export const getUserData = () => {
  const isVib = tco && (typeof tco.get == 'function') && tco.get('customer') && 
    tco.get('customer').data && tco.get('customer').data;

  return tco.get('customer').data;
}
