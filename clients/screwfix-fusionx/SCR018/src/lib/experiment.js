/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import promoMsg from './components/promoMsg';
import obsIntersection from './helpers/observeIntersection';

const { ID, VARIATION } = shared;

export default () => {
  setup(); //use if needed
  //fireEvent('Conditions Met'); //use if needed
  document.body.addEventListener('click', ({ target }) => {
    if (target.closest(`.${ID}__terms--title`)) {
      document.querySelector(`.${ID}__terms--content`).classList.toggle('open');
      document.querySelector(`.${ID}__closebtn`).classList.toggle('open');
      const openState = document.querySelector(`.${ID}__closebtn`).classList.contains('open');
      fireEvent(`User ${openState ? 'opens' : 'closes'} T&Cs tab`);
    } else if (target.closest('.bosch-toolbag')) {
      fireEvent('User interacts with the hyperlink in the promo');
    } else if (target.closest('[data-qaid="pdp-button-deliver"]')) {
      fireEvent('User interacts with the delivery CTA');
    } else if (target.closest('[data-qaid="pdp-button-click-and-collect"]')) {
      fireEvent('User interacts with the click & collect CTA');
    }
  });

  //document.querySelector('.pr__product #qty').addEventListener('keyup', () => {});

  //console.log(ID);

  const prodDescription = document.querySelector('#product_description');
  const intersectionCallback = (entry) => {
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      fireEvent('Conditions Met');
    }
  };

  obsIntersection(prodDescription, 1, intersectionCallback);
  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  if (VARIATION === 'control') {
    return;
  }

  //-----------------------------
  //Write experiment code here
  //-----------------------------
  //...
  const anchorElem = document.querySelector('[data-qaid="pdp-product-overview"]');
  //anchorElem.classList.add(`${ID}__hide`);
  anchorElem.insertAdjacentHTML('beforebegin', promoMsg(ID, VARIATION));
};
