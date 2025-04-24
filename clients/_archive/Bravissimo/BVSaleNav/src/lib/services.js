import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

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

export { setup }; // eslint-disable-line
 