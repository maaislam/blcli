import { guestLogin, checkoutSuccess } from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';


// Poller for guest login page
// Do not show the test content again if a session storage item exists
if ((window.location.pathname.indexOf('/guest/login') > -1) && (!sessionStorage.getItem('TP109'))) {
  pollerLite([
    '#content > .order_basket', // Basket area
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
if ((window.location.pathname.indexOf('/guest/order_thank_you_page') > -1) && (sessionStorage.getItem('TP109'))) {
  pollerLite([
    '.confirmation_head', // Confirmation message
  ], checkoutSuccess);
}
