/**
 * NE-314 - Gifting audience self-identification mechanism
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getCookie } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { closeGiftMsg, setCookie, observerOnProductPages } from './helpers';

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
  let msg = '';
  if (window.innerWidth <= 545) {
    msg = 'Looking for a gift?';
  } else {
    msg = 'Are you looking for a gift?';
  }
  const giftBox = `<div class="${ID}-gift-box__wrapper">
    <div class="${ID}-close__icon"></div>
    <div class="${ID}-gift-box__container">
      <div class="${ID}-gift-box__main">
        <p>${msg}</p>
      </div>
      <div class="${ID}-gift-btn__wrapper">
        <button class="${ID}-submit" id="${ID}-gift-yes">Yes</button>
        <button class="${ID}-submit" id="${ID}-gift-no">No</button>
      </div>
    </div>
  </div>`;

  document.querySelector('body').insertAdjacentHTML('beforeend', giftBox);
  // --- When component has been added, then send GA event
  if (document.querySelector(`.${ID}-gift-box__wrapper`)) {
    fireEvent(`Visible - Gift Identification`);
  }

  if (document.querySelector('.mini-cart.has-background-white').classList.contains('is-active')) {
    document.querySelector(`.${ID}-gift-box__wrapper`).setAttribute('style', 'display: none;');
    if (document.querySelector(`.${ID}-gift-msg__visible`)) {
      document.querySelector('body').classList.remove(`${ID}-gift-msg__visible`);
    }
  } else {
    document.querySelector(`.${ID}-gift-box__wrapper`).removeAttribute('style');
    if (window.innerWidth <= 545) {
      document.querySelector('body').classList.add(`${ID}-gift-msg__visible`);
    }
  }

  // --- Mobile Only
  if (window.innerWidth <= 545) {
    document.querySelector('body').classList.add(`${ID}-gift-msg__visible`);
  }

  document.querySelector(`button.${ID}-submit#${ID}-gift-yes`).addEventListener('click', (e) => {
    fireEvent('Click - Shopping for gift');
    document.querySelector(`.${ID}-gift-box__main p`).innerHTML = `Thanks! We’ll tailor your visit.`;
    document.querySelector(`.${ID}-gift-btn__wrapper`).innerHTML = `<button class="${ID}-submit" id="${ID}-gift-close">Close</button>`;

    setCookie(`${ID}-gift-selection`, 'gift', 7);
    localStorage.setItem(`NE-314-gift-selection`, 'gift');
    closeGiftMsg();
  });
  
  document.querySelector(`button.${ID}-submit#${ID}-gift-no`).addEventListener('click', (e) => {
    fireEvent('Click - Shopping for self');
    document.querySelector(`.${ID}-gift-box__main p`).innerHTML = `Ok! Thanks for confirming.`;
    document.querySelector(`.${ID}-gift-btn__wrapper`).innerHTML = `<button class="${ID}-submit" id="${ID}-gift-close">Close</button>`;

    setCookie(`${ID}-gift-selection`, 'self', 7);
    localStorage.setItem(`NE-314-gift-selection`, 'self');
    closeGiftMsg();
  });

  // if (window.location.href.indexOf('/products/') > -1 ) {
  //   pollerLite(['.product-sections-container .is-product'], () => {
  //     observerOnProductPages();
  //   });
  // }
  observer.connect(document.querySelector('.mini-cart.has-background-white'), () => {
    if (document.querySelector('.mini-cart.has-background-white').classList.contains('is-active')) {
      document.querySelector(`.${ID}-gift-box__wrapper`).setAttribute('style', 'display: none;');

      if (document.querySelector(`.${ID}-gift-msg__visible`)) {
        document.querySelector('body').classList.remove(`${ID}-gift-msg__visible`);
      }
      
    } else {
      document.querySelector(`.${ID}-gift-box__wrapper`).removeAttribute('style');

      if (window.innerWidth <= 545) {
        document.querySelector('body').classList.add(`${ID}-gift-msg__visible`);
      }
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
