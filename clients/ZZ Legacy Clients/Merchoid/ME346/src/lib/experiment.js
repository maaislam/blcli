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
  
  let jumperText;
  if(window.location.href.indexOf('/uk/') > -1) {
    jumperText = 'Jumper';
  } else {
    jumperText = 'Sweater';
  }

  const addBanner = () => {
    const lastchanceBanner = document.createElement('div');
    lastchanceBanner.classList.add(`${ID}-banner`);
    lastchanceBanner.innerHTML = `
    <div class="${ID}-banner__inner">
      <h3>Last Chance!</h3>
      <p>
        Secure yourself a Christmas ${jumperText} now at our 2022 prices! 100% Money Back Guarantee on all ${jumperText}s!
      </p>
    </div>`

    document.querySelectorAll('.guide-list-wrapper .product.product-item')[4].insertAdjacentElement('afterend', lastchanceBanner);
  }

  addBanner();
  
};
