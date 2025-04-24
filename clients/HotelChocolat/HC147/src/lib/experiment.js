import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

const addTracking = () => {


  document.addEventListener('click', (e) => {

    if (e.target.closest('.button.mini-cart-link-checkout') || e.target.classList.contains('mini-cart-link-checkout')) {
      fireEvent('Click - Checkout button clicked in mini-bag', true);
    }

    if (e.target.closest('.menu-title') || e.target.classList.contains('menu-title')) {
      fireEvent('Click - Go to My Bag button clicked in mini-bag', true);
    }

  });


}

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

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

  document.documentElement.classList.add(`${ID}-pulsing-bag`);

  pollerLite(['.mini-cart-header'], () => {

    document.querySelector('.mini-cart-header').innerText = "Your chocolate goodies are waiting";

  });
  

};
