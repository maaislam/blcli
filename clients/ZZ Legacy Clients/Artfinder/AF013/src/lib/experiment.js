/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import getBasketCount from './getBasketCount';
import shared from './shared';
import handleSliders from './handleSliders';
import { setup, fireEvent } from './services';
const { ID, VARIATION } = shared;

export default () => {
  setup();
  // Write experiment code here
  if (getBasketCount() > 0) {
    fireEvent('Conditions met');
  } else {
    if (VARIATION == '1' && getBasketCount() <= 0) {
      document.body.classList.add(`${ID}-basket-empty`);
    }
  }
  if (VARIATION == '1') {
    handleSliders();
  }
};
