import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    if (window && window.location && window.location.href && window.location.href.indexOf('/product/') > -1) {
      return !!document.querySelector('#merchoid-scarcity-message');
    } else if (window && window.location && window.location.href && window.location.href.indexOf('/checkout/order-received') > -1) {
      return true;
    }
  },
], Experiment.init);
