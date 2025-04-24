import { redirectToCardDetails, eventVoucher } from './experiment';
import flicker from './flickerPrevention';
import { poller } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

flicker();

/* eslint-disable */
const pathname = window.location.pathname;
const searchQuery = window.location.search;
const cookie = getCookie('FL006_paypal');
const cookieApple = getCookie('FL006_apple');
/* eslint-enable */

// When user is on the /checkout/payment page without the paypal query, redirect to card detail page

poller([
  () => {
    if (pathname.indexOf('/checkout/payment') > -1) {
      redirectToCardDetails();
    } else if (pathname.indexOf('/checkout/usegiftcard') > -1) {
      eventVoucher();
    }
    return true;
  },
], () => {
  const hide = document.getElementById('GDXXX_flickerPrevention');
  if (hide) {
    hide.parentElement.removeChild(hide);
  }
});
