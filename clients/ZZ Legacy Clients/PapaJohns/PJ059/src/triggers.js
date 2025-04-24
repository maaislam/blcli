import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    // Check if page is checkout or basket confirmation page with PJ059 parameter
    if (window.location.pathname.indexOf('/checkout.aspx') > -1 || window.location.pathname.indexOf('/checkout-mobile.aspx') > -1 || (window.location.pathname.indexOf('/basket-confirmation.aspx') > -1 && window.location.href.indexOf('pj059')) > -1) {
      return true;
    }
  },
  () => window.jQuery,
], activate);
