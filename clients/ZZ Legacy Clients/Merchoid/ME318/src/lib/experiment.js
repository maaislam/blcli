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

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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
  const addMessage = () => {
    const VATtext = `
    <div class="${ID}-priceMSG">
      <span></span><p><b>All VAT and Taxes / Duties are paid</b> - so you won’t pay anything more than the price of the product</p>
    </div>`;
    document.querySelector('.box-tocart').insertAdjacentHTML('beforebegin', VATtext);
  }

  addMessage();
  
};
