import { events } from './../../../../../lib/utils';
import shared from './shared';

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  // adds document body classlist 
  document.documentElement.classList.add(ID);
  document.documentElement.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

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
