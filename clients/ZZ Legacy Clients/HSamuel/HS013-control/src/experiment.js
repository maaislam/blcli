import { events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.site-logo',
  'main .container',
  '.product-summary__right',
  '.order-summary',
  '#lower-button-group',
], () => {
  const ID = 'HS013';
  const VARIATION = 'Control';

  // Tracking
  events.send(ID, VARIATION, `${ID} activated`);

  // Finance availibility event
  const isFinance = !!document.querySelector('#ifcPaymentPlan');
  const financeAvailable = !!document.querySelector('.ifcBuyButton');
  if (isFinance || financeAvailable) {
    events.send(ID, VARIATION, 'Finance is available');
  }

  // Finance options click event
  pollerLite(['.js-ifcBuyButton'], () => {
    const financeCTA = document.querySelector('.ifcBuyButton');
    financeCTA.addEventListener('click', () => {
      events.send(ID, VARIATION, 'Interest Free options clicked');
    });
  });

  // Edit finance options click event
  pollerLite(['.ifc-btn-edit'], () => {
    const financeEditCTA = document.querySelector('.ifc-btn-edit');
    financeEditCTA.addEventListener('click', () => {
      events.send(ID, VARIATION, 'Edit finance options clicked');
    });
  });

  // Checkout top click event
  pollerLite(['#checkout-form-1 .cta--basket'], () => {
    const checkoutCTA = document.querySelector('#checkout-form-1 .cta--basket');
    checkoutCTA.addEventListener('click', () => {
      events.send(ID, VARIATION, 'Checkout Now top button clicked');
    });
  });

  // Checkout button click event
  pollerLite(['#checkout-form-2 .cta--basket'], () => {
    const checkoutCTA = document.querySelector('#checkout-form-2 .cta--basket');
    checkoutCTA.addEventListener('click', () => {
      events.send(ID, VARIATION, 'Checkout Now bottom button clicked');
    });
  });

  // Paypal button click event
  pollerLite(['.cta--basket-paypal-button'], () => {
    const paypalCTA = document.querySelector('.cta--basket-paypal-button');
    paypalCTA.addEventListener('click', () => {
      events.send(ID, VARIATION, 'Paypal button clicked');
    });
  });

  // Continue shopping click event
  pollerLite(['.js-continue-shopping'], () => {
    const continueShoppingCTA = document.querySelector('.js-continue-shopping');
    continueShoppingCTA.addEventListener('click', () => {
      events.send(ID, VARIATION, 'Continue shopping clicked');
    });
  });
});
