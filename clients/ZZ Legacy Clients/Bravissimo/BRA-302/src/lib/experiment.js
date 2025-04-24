/**
 * BRA-302 - Free shipping threshold
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { checkBagVisible, updateLoader } from './helpers';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...
  checkBagVisible();

  // --- Observe Basket Total
  addObserver(document.querySelector('span.c-icon.c-icon--toolbar--bag--large.c-icon--label-after data.c-counter__value'), () => {
    // alert('SOMETHING HAS CHANGED-------');
    if (document.querySelector(`.${ID}-freeDelivery__wrapper .${ID}-freeDelivery__msg span.amount`)) {
      // alert('update loader');
      updateLoader();
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });

};
