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
  const addBanner = () => {
    const banner = document.createElement('div');
    banner.classList.add(`${ID}-support-banner`);
    banner.innerHTML = `
    <div class="${ID}-left"></div>
    <div class="${ID}-container">
      <div class="${ID}-image"></div>
      <p>Merchoid stands with <span>ukraine</span></p>
      <a target=_blank" href="https://www.unrefugees.org.uk/take-action/how-to-help-ukraine/">How to help</a>
    </div>`;

    document.querySelector('.review-fans').insertAdjacentElement('afterend', banner);


    banner.querySelector('a').addEventListener('click', () => {
      fireEvent('Clicked ukraine banner');
    })
  }

  addBanner();
  
};
