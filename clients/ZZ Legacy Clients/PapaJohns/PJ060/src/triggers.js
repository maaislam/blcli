import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  /**
   * @desc Checks if user is on Basket Confirmation page or Checkout page
   * if on Basket Confirmation page then check that the basket amount is not £0.00 and that email input fields exist
   */
  () => {
    if ((window.location.pathname.indexOf('/basket-confirmation.aspx') > -1 && document.querySelector('#ctl00_cphBody_txtEmailPopup') && document.querySelector('#ctl00_cphBody_txtPasswordPopup'))) {
      if (parseFloat(document.querySelector('#hdnBasketValue').value) > 0) {
        return true;
      }
    } else if ((window.location.pathname.indexOf('/checkout.aspx') > -1 || window.location.pathname.indexOf('/checkout-mobile.aspx') > -1)) {
      return true;
    }
  },
], activate);
