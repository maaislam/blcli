import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;

const startExperiment = () => {
  let checkoutButton = document.querySelector('button[name="dwfrm_cart_checkoutCart"]');
  document.documentElement.classList.add(`${ID}-started`);

  checkoutButton.classList.add(`${ID}-stuck`);

  let cartActionCheckout = document.querySelector('.cart-total .cart-action-checkout');
  cartActionCheckout.insertAdjacentHTML('afterend', `<div class="${ID}-separator"><span>or, use Express Checkout</span></div>`);

  fireEvent('Interaction - experiment stuck the button to the bottom', true);

  let button = document.querySelector('.cart-total button[name="dwfrm_cart_checkoutCart"]');

  new IntersectionObserver((i) => {
    if (i[0].isIntersecting) {
      checkoutButton.classList.add(`${ID}-hidden`);
    } else {
      checkoutButton.classList.remove(`${ID}-hidden`);
    }
  }).observe(button);
};

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    const target = e.target;

    if (target.name == 'dwfrm_cart_checkoutCart' || target.closest('button[name="dwfrm_cart_checkoutCart"]')) {
      fireEvent(`Click - checkout button clicked`, true);
    }

    if (target.classList.contains('li-qty-plus') || target.closest('.li-qty-plus')) {
      fireEvent(`Click - quantity increased on product`, true);
    }

    if (target.classList.contains('li-qty-minus') || target.closest('.li-qty-minus')) {
      fireEvent(`Click - quantity decreased on product`, true);
    }

    if (target.classList.contains('remove') || target.closest('.button-text.remove[type="submit"]')) {
      fireEvent(`Click - product removed from basket`, true);
    }

    if (target.classList.contains('view') && target.closest('.delivery-info-title')) {
      fireEvent(`Click - user clicked to see delivery options`, true);
    }

    if (target.classList.contains('hide') && target.closest('.delivery-info-title')) {
      fireEvent(`Click - user clicked to hide delivery options`, true);
    }
  });
};

export default () => {
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
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
};
