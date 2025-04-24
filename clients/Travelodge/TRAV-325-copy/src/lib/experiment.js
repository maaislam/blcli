/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import renderModal from './components/modal';
import { getRateData } from './helpers/utils';

const { ID, VARIATION } = shared;

//https://blcro.fra1.digitaloceanspaces.com/TRAV-325/modal-image.png

export default () => {
  setup();
  
  fireEvent('Conditions Met');
  document.body.addEventListener('click', (e) => {
    const { target } = e;

    const overlay = document.querySelector(`.${ID}__overlay`);
    const modal = document.querySelector(`.${ID}__modal`);
    //target.closest('[data-room-rate-type-name="Saver"]')
    if (target.closest('.selected[data-room-rate-type-name="Saver"]')) {
      const pricesAndButtons = getRateData(target);
      window.pricesAndButtons = pricesAndButtons;
      // Log the results
      console.log('Result Object:', pricesAndButtons);

      //updateModal
      const modalRedBtn = document.querySelector(`.${ID}__modal-content .box_btn span`);
      const totalPrice = document.querySelector(`.${ID}__modal-content .box_total span:last-child`);

      modalRedBtn.innerText = `Add flexible rate | ${pricesAndButtons.flexiblePriceText} total`;
      totalPrice.innerText = `${pricesAndButtons.saverPriceText}`;
    } else if (target.closest('[data-click="proceed"]')) {
      document.querySelector(`.${ID}__overlay`).click();
      document.querySelector('.bookNow.btn-block').click();
    } else if (target.closest('[data-click="flexible"]')) {
      const pricesAndButtons = window.pricesAndButtons;

      const totalElem = document.querySelector(`.${ID}__modal-content .box_total span:last-child`);

      totalElem.innerText = `${pricesAndButtons.flexiblePriceText}`;

      pricesAndButtons.flexibleRateBtn.click();

      fireEvent('Flexible rate clicked');
    } else if (target.closest(`.modal__close`) || target.closest(`.${ID}__overlay`)) {
      overlay.classList.add(`${ID}__hide`);
      modal.classList.add(`${ID}__hide`);
      fireEvent('user closed modal');
    } else if (target.closest(`.${ID}-bookNow`)) {
      e.preventDefault();
      //add more conditions here
      document.querySelector('.selected[data-room-rate-type-name="Saver"]').click();
      overlay.classList.remove(`${ID}__hide`);
      modal.classList.remove(`${ID}__hide`);
    } else if (target.closest(`.${ID}-room-rate-setect`)) {
      const rateBtn = target.closest(`.${ID}-room-rate-setect`).previousElementSibling;
      rateBtn.click();
      fireEvent('Proceed to extra clicked');
    } else if (target.closest('.bookNow') && VARIATION === 'control') {
      fireEvent('Proceed to extra clicked');
    }
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  renderModal(ID);
  const originalProceedBtn = document.querySelector('.pgHotel .main .c-section .db-view .bookNow');
  const fakeProceedBtn = `<div class="${ID}-bookNow">Proceed to Extras</div>`;
  originalProceedBtn.insertAdjacentHTML('afterend', fakeProceedBtn);
  originalProceedBtn.style.display = 'none';

  const rateBtns = document.querySelectorAll('#rebase .rate-btn[data-rate-plan-code="SAVER"]');
  rateBtns.forEach((rateBtn, i) => {
    if (i === 0) {
      rateBtn.classList.add('selected');
    }

    //add a fake btn underneath each rate button
    const fakeBtn = `<div class="${ID}-room-rate-setect">${rateBtn.innerHTML}</div>`;
    rateBtn.insertAdjacentHTML('afterend', fakeBtn);
    //hide the original rate button
    const parent = rateBtn.parentElement;
    const grandParent = parent.parentElement;
    parent.classList.add(`${ID}__rate-parent`);
    grandParent.classList.add(`${ID}__rate-grandparent`);
  });
};
