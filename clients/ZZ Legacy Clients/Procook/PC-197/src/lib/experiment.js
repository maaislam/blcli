/**
 * PC-197 - 18+ basket confirmation easing
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

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
  pollerLite(['.wrapOver18Confirmation'], () => {
    fireEvent('Conditions Met - show age confirmation bottom');
  });

  const ageRestrictionBlock = `<div class="${ID}-basket-age-restricton basket-age-restricton hidden">
    <div class="wrapOver18Confirmation">
      <div class="contentOver18Confirmation">
        <img class="iconOver18Confirmation" src="/images/icons/icon18.png" alt="18">
        <label id="lblOver18Confirmation" class="${ID}-lblOver18Confirmation" for="chkOver18Confirmation">Age restricted products were found within your order. <strong>Please confirm you are over 18 years of age.</strong> <p style="font-size: 12px;line-height: 18px;margin-top: 5px;">Please be aware that we will make checks to verify your age.</p></label>
        <input id="chkOver18Confirmation" class="${ID}-chkOver18Confirmation" name="ageRestriction" type="checkbox" required="">
      </div>
    </div>
  </div>`;

  document.querySelector('.page-basket.over18NotConfirmed .basket-buttons-top').insertAdjacentHTML('beforeend', ageRestrictionBlock);
  
  const ageRestrictionChecks = document.querySelectorAll('#chkOver18Confirmation');

  ageRestrictionChecks[0].addEventListener('click', (e) => {
      if (ageRestrictionChecks[0].checked) {
        ageRestrictionChecks[1].checked = true;
      } else {
        ageRestrictionChecks[1].checked = false;
      }  
      fireEvent(`Clicked - select age confirmation top`);
  });
  ageRestrictionChecks[1].addEventListener('click', (e) => {
    if (ageRestrictionChecks[1].checked) {
      ageRestrictionChecks[0].checked = true;
    } else {
      ageRestrictionChecks[0].checked = false;
    }
    fireEvent(`Clicked - select age confirmation bottom`);
  });

  // --- Add Inactive Overlay Buttons
  document.querySelector(`.basket-buttons-top a.button-primary`).insertAdjacentHTML('afterend', `<div class="${ID}-top-checkout"></div>`);
  document.querySelector(`.basket-buttons-bottom`).insertAdjacentHTML('afterend', `<div class="${ID}-bottom-checkout"></div>`);

  // --- If user clicks on "PROCEED TO CHECKOUT" without having checked the age restriction checkbox
  // ---- then highlight restriction box
  //
  const highlightRestrictionBox = () => {
    const allBoxes = document.querySelectorAll('.wrapOver18Confirmation');
    [].forEach.call(allBoxes, (box) => {
      if (document.querySelector('.page-basket.over18NotConfirmed')) {
        box.classList.add('required');
        setTimeout(() => {
          box.classList.remove('required');
        }, 3000);
      }
    });
  }
  // --- Inactive - Top Checkout CTA
  document.querySelector(`.basket-buttons-top .${ID}-top-checkout`).addEventListener('click', (e) => {
    if (document.querySelector('.page-basket.over18NotConfirmed')) {
      document.querySelector(`.${ID}-basket-age-restricton`).classList.remove('hidden');
      highlightRestrictionBox();

      fireEvent(`Clicked - dead click proceed to checkout top`);

      fireEvent(`Conditions Met - show age confirmation top`);
    }
  });

  // --- Inactive -  Main Checkout CTA
  document.querySelector(`.${ID}-bottom-checkout`).addEventListener('click', (e) => {
    if (document.querySelector('.page-basket.over18NotConfirmed')) {
      highlightRestrictionBox();

      fireEvent(`Clicked - dead click proceed to checkout bottom`);
    }
  });

  // --- Active CTAs
  document.querySelector('.basket-buttons-top a.button-primary').addEventListener('click', (e) => {
    if (!document.querySelector('.page-basket.over18NotConfirmed')) {
      fireEvent(`Conditions Met - reach checkout`);
    }
  });
  document.querySelector('.basket-buttons-bottom a.button-primary').addEventListener('click', (e) => {
    if (!document.querySelector('.page-basket.over18NotConfirmed')) {
      fireEvent(`Conditions Met - reach checkout`);
    }
  });
};
