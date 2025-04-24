/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  const btn = document.querySelector('.buy-btn')
  if(btn && btn.innerText.trim().match(/choose lenses & buy/i)) {
    fireEvent('Conditions Met');

    btn.addEventListener('click', e => fireEvent('Click CTA'));
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if(btn && btn.innerText.trim().match(/choose lenses & buy/i)) {
    btn.innerText = 'Add Prescription & Buy';
  }
  
};
