import { events } from './../../../../../lib/utils';
import shared from './shared';
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

/**
 * Standard experiment setup
 */
export const setup = () => {
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

  events.sendAuto(VARIATION, label);

}

export const sendClickEvents = () => {

  if (VARIATION == '1') {
    document.querySelector(`#main-navigation .${ID}-offers-top-level`).addEventListener('click', (e) => {
      events.send(ID, `Variation ${VARIATION}`, 'Clicked - Offers link', { sendOnce: true });
    });
  } else if (VARIATION == '2') {
    document.querySelector(`.${ID}-offerBanner__wrapper`).addEventListener('click', (e) => {
      events.send(ID, `Variation ${VARIATION}`, 'Clicked - Banner Offers link', { sendOnce: true });

      setTimeout(() => {
        window.location.href = `https://www.hotelchocolat.com/uk/shop/collections/prices/special-offers/`;
      }, 200);
    });
  }

}

