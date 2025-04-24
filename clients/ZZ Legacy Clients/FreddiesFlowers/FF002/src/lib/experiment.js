/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import shared from './shared';
import { setup, fireEvent } from './services';
import getElements from './getElements';
import handleBoxes from './handleBoxes';
import handleOfferBox from './handleOfferBox';
import handleEvents from './handleEvents';
const { ID, VARIATION } = shared;

const run = () => {
  if (document.documentElement.classList.contains('FF002') && document && !document.querySelector(`.${ID}-dropdown`)) {
    // Write experiment code here
    const elements = getElements();
    // Handle boxes
    if (elements.boxes !== null) {
      handleBoxes(elements.boxes);
    }
    // Handle offer box
    if (elements.offerBox !== null) {
      handleOfferBox(elements.offerBox);
    }
    // Handle events
    if (elements.boxes !== null && elements.offerBox !== null) {
      handleEvents();
    }
  }
  
  requestAnimationFrame(run);
};

export default () => {
  setup();
  
  // Check is dashboard page
  if (window.location.href.indexOf('account/dashboard') > -1) {
    fireEvent('Conditions met');
  }

  if (VARIATION == 'control') {
    return;
  }
  
  // Sets a loop to check if the elements exist due to page changing via AJAX.
  requestAnimationFrame(run);
  
};