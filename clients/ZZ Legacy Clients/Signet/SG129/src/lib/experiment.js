/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
    setup();
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    const financeCTA = () => {
      // stop duplication
      if(document.querySelector('.SG129-financeButton')) {
        document.querySelector('.SG129-financeButton').remove();
      }

      const financeButton = document.createElement('div');
      financeButton.classList.add(`${ID}-financeButton`);
      financeButton.classList.add(`btn-wrapper`);
      financeButton.innerHTML = `Checkout with Finance`;

      if(getSiteFromHostname() === 'ernestjones') {
        document.querySelector(`.container__finance-display-section .btn-wrapper`).insertAdjacentElement('afterend', financeButton);
      } else {
        document.querySelector(`.c-option-template .c-btn.c-btn--large.t-green-btn`).insertAdjacentElement('afterend', financeButton);
      }


      // events
      financeButton.addEventListener('click', () => {
        document.querySelector('#labelledby-pay-with-finance').parentNode.click();
        events.send(`${ID} V${VARIATION}`, 'click', 'new checkout with finance button');
      });

      document.querySelector("#labelledby-pay-in-full").addEventListener("change", () => {
        financeButton.classList.remove(`${ID}-hidden`);
      });

      document.querySelector("#labelledby-pay-with-finance").addEventListener("change", () => {
        financeButton.classList.add(`${ID}-hidden`);
      });

      document.querySelector('.c-modal.c-fiance-calculator-modal .c-modal__close').addEventListener("click", () => {
        financeButton.classList.remove(`${ID}-hidden`);
      });

    }

    // if pay in full is selected
    if(!document.querySelector('.c-payment-method-toggle-label__not-available') && document.querySelector('#labelledby-pay-with-finance') && document.querySelector('#labelledby-pay-with-finance').checked === false){
      financeCTA();
    } else {

      // if finance is selected, add event on pay in full
      document.querySelector("#labelledby-pay-in-full").addEventListener("change", () => {
        financeCTA();
      });
    }




    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
