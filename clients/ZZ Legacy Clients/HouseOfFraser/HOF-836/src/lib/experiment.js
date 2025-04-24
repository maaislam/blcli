/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {

  events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  pollerLite(['.buy-now-button-wrapper'], () => {

    const apiKey = document.getElementById('buyNowData').getAttribute('data-stripe-key')
    const stripe = Stripe(apiKey);

    const paymentRequest = stripe.paymentRequest({
      country: 'GB',
      currency: 'gbp',
      total: {
        label: 'Sports Direct',
        amount: 1
      }
    });

    paymentRequest.canMakePayment().then(function(result) {
      if (result && result.applePay) {
        if(VARIATION == 1) {
          document.documentElement.classList.add(`${ID}-applepay-shown`);
          const buyNowButtons = document.querySelectorAll('.buy-now-button-wrapper');
          [].slice.call(buyNowButtons).forEach((buyNowButton) => {
            buyNowButton.addEventListener('click', () => {
                fireEvent('Click - user has clicked on the Apple Pay button to begin the payment process', true);
            });
          });
        }
        fireEvent('Interaction - Apple Pay is available', true);
      } else {
        fireEvent('Interaction - Apple Pay is NOT available', true);
      }
    });

  });

  pollerLite(['.ContinueOn'], () => {
    document.body.addEventListener('click', (e) => {
      if(e.target.closest('.ContinueOn')) {
        fireEvent(`Click - user has clicked on the Continue Securely button to begin the payment process`, true);
      }
    });
  });
  
};
