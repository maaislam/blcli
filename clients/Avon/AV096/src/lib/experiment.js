/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import renderNewContent from './newContent';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  const termsCheckbox = document.querySelector("[data-backup='buyer_accepts_marketing']");

  termsCheckbox.addEventListener('click', () => {
    if (termsCheckbox.checked) {
      fireEvent('Customer clicked the tick box to accept marketing.');
    }
  });
  const fetchCartControl = async () => {
    const response = await fetch('/cart.json');
    return await response.json();
  };

  fetchCartControl()
    .then((cart) => {
      const basketItems = cart.items;
      const samplePresentInBasket = basketItems.some((item) => item.title.split(' ').includes('Sample'));
      if (samplePresentInBasket) {
        fireEvent('Sample in basket');
      }
    })
    .catch((reason) => console.log(reason.message));
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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

  const fetchCart = async () => {
    const response = await fetch('/cart.json');
    return await response.json();
  };

  fetchCart()
    .then((cart) => {
      const basketItems = cart.items;
      const samplePresentInBasket = basketItems.some((item) => item.title.split(' ').includes('Sample'));
      if (samplePresentInBasket) {
        renderNewContent(ID);
        fireEvent('Sample in basket');
      }
    })
    .catch((reason) => console.log(reason.message));
};
