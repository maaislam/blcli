import { checkoutSuccess, guestLogin } from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// Poller for guest login page
if ((window.location.pathname.indexOf('/guest/login') > -1) && (!sessionStorage.getItem('TP110'))) {
  pollerLite([
    '.guestCheckoutContainer', // Guest Form
    () => {
      let checkjQuery = false;
      if (window.jQuery) {
        checkjQuery = true;
      }
      return checkjQuery;
    },
  ], guestLogin);
}


// Poller for checkout success
// Check for checkout succes page and session storage item before polling

if ((window.location.pathname.indexOf('/guest/order_thank_you_page') > -1) && (sessionStorage.getItem('TP110'))) {
  pollerLite([
    '.order_success_wrapper > .tp_OrderTitle', // Success header
  ], checkoutSuccess);
}
