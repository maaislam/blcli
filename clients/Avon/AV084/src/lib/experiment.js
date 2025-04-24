/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const doExperimentCode = () => {
  // Make basket changes
  const promoMessage = document.querySelector('.promo-message');
  if (promoMessage) {
    const markup = `
      <div class="${shared.ID}__promo-message">
        Add your <span>discount code</span> within the checkout!
      </div>
    `;
    promoMessage.insertAdjacentHTML('beforebegin', markup);
    promoMessage.style.display="none";
  };

  // Checkout changes
  pollerLite([
    '.order-summary__section--discount'
  ], () => {
    const orderSummary = document.querySelector('.order-summary__section--discount');
    const discountField = orderSummary.querySelector(`.field__input-wrapper`);
    if (discountField) {
      discountField.classList.add(`${shared.ID}__discount-field`)
    };

    const applyButton = orderSummary.querySelector('.field__input-btn');
    if (applyButton) {
      applyButton.addEventListener('click', () => {
        fireEvent('Code entered - apply btn clicked')
      })
    }
  })

  // mobile checkout changes
  pollerLite([
    '.order-summary-toggle__text'
  ], () => {
      const firstWrap = document.querySelectorAll('.order-summary-toggle__text')[0];
      const firstSpan = firstWrap.querySelector('span');
      firstSpan.innerHTML = `Show order summary &<br> <span class="${shared.ID}__purple">Add your discount code</span>`;

      const secondWrap = document.querySelectorAll('.order-summary-toggle__text')[1];
      const secondSpan = secondWrap.querySelector('span');
      secondSpan.innerHTML = `Hide order summary <br> <span class="${shared.ID}__purple">Add discount code below</span>`;

      if (shared.VARIATION == 2) {
        const summaryBtn = document.querySelector('.order-summary-toggle--show');
        console.log(summaryBtn);
        if(summaryBtn) {
          summaryBtn.click();
        }
      }
  })
};

const addEventTracking = () => {
  // ... do event tracking here
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
};

export default () => {
  setup();
  const { ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
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
    doExperimentCode();
  };

  init();
};
