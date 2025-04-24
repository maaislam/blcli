import { events } from './../../../../../lib/utils';
import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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
  
  // set up events
  events.setDefaultCategory('Experimentation');
  events.setDefaultAction(CLIENT + " - "+ID);

  if(LIVECODE == "true") {
    events.sendEvents = false;
  } else {
    events.sendEvents = true;
  }

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.documentElement.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

export const fireEvent = (label) => {
  events.sendAuto(VARIATION, label);
}
