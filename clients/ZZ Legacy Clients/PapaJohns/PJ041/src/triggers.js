import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    if (window.location.pathname.indexOf('/basket-confirmation.aspx') > -1 || window.location.pathname.indexOf('/checkout-mobile.aspx') > -1) {
      return true;
    }
  },
], Experiment.init);
