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

export const getPageData = () => {

  let dataObject;
  for (let i = 0; i < window.dataLayer.length; i += 1) {
    const data = window.dataLayer[i];
    if (typeof data === 'object' && data.cart) {
      dataObject = data;
      break;
    }
  }
  return dataObject;

}