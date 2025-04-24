import { cardDetails, redirectToCardDetails, redirectToPaypal } from './experiment';
import flicker from './flickerPrevention';
import { poller } from '../../../../lib/uc-lib';
import { getCookie, deleteCookie } from '../../../../lib/utils';

flicker();

/* eslint-disable */
const pathname = window.location.pathname;
const searchQuery = window.location.search;
const cookie = getCookie('FL006_paypal');
/* eslint-enable */

// When user is on the /checkout/payment page without the paypal query, redirect to card detail page
poller([
  () => {
    let trigger = false;
    let paypal = false;
    if (pathname.indexOf('/checkout/payment') > -1 && paypal === false) {
      if (cookie && cookie === 'true') {
        trigger = false;
        paypal = true;
      } else {
        trigger = true;
      }
    }
    return trigger;
  },
], redirectToCardDetails);

// When user is on the /checkout/payment page with the paypal query, click the paypal button
poller([
  'li[id*="PaypalCheckoutButton"] .PaymentMethodSelectionLink',
  () => {
    let trigger = false;
    if (cookie === 'true') {
      deleteCookie('FL006_paypal');
      trigger = true;
    }
    return trigger;
  },
], redirectToPaypal);

poller([
  'iframe[id*="_CardCaptureFrame"]',
], cardDetails);

