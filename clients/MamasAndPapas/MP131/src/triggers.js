import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  /*eslint-disable */
  () => {
    if (window.universal_variable && window.universal_variable.page && window.universal_variable.page.type && window.universal_variable.page.type === 'Product') {
      // if page type is product, then we can fail the poller when specific elements don't exist...
      return !!document.querySelector('.productDetail_price.font-size-5.font-weight-semibold.py-1'); // must exist
    } else {
     return true; // if page type is not product, return true as we must assume this check passes (other polling conditions will check other elements)...
    }
  },
  () => {
    if (window.location.pathname === '/en-gb/c/mattress-covers') {
      // if page category is mattress-covers, then we can fail the poller when specific elements don't exist...
      return !!document.querySelector('.productCard .usp-outer');
      return !!document.querySelector('.usp-inner > img');
    } else {
     return true; // if not page category mattress-covers, return true as we must assume this check passes (other polling conditions will check other elements)...
    }
  },
  /* eslint-enable */
], Experiment.init);
