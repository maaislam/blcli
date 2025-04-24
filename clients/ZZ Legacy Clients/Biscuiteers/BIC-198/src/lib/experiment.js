/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from './winstack';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  const addToBagBtn = document.querySelector('local-add-to-basket action.button');

  if(addToBagBtn) {
    addEventListener(addToBagBtn, 'click', () => {
      fireEvent('Clicked Add to Bag');
    });
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  if(addToBagBtn) {
    const textSpan = addToBagBtn.querySelector('ng-transclude span');
    if(textSpan) {
      textSpan.innerHTML = 'add to basket';
    }
  }
};
