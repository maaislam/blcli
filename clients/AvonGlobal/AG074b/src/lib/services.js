import { events } from './../../../../../lib/utils';
import shared from './shared';

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + ' - ' + ID);

  if (LIVECODE == 'true') {
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
};

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
 * Get the page type
 * @returns {Promise}
 */
export const getPageType = () =>
  new Promise((resolve, reject) => {
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    pollerLite(['.Controller_Category'], () => {
      resolve('PLP');
    });

    pollerLite(['.Controller_Group'], () => {
      resolve('PLP');
    });
  });

export const isMobile = () => {
  return !!document.querySelector('.Layout_Phone');
};
