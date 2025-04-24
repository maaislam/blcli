import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  /*eslint-disable */
  () => {
    if (window.universal_variable && window.universal_variable.page && window.universal_variable.page.type && window.universal_variable.page.type === 'Product') {
      // if page type is product, then we can fail the poller when specific elements don't exist...
      // return !!document.querySelector('.MP081'); // must exist
      return !!document.querySelector('.js-detailPane'); // must exist
    } else {
     return true; // if page type is not product, return true as we must assume this check passes (other polling conditions will check other elements)...
    }
  },
  () => {
    if (window.location.pathname === '/en-gb/pushchairs-prams') {
      // if page category is pushchairs-prams, then we can fail the poller when specific elements don't exist...
      return !!document.querySelector('#btn-toggle'); // must exist 
    } else {
     return true; // if not page category pushchairs-prams, return true as we must assume this check passes (other polling conditions will check other elements)...
    }
  },
  /* eslint-enable */
], Experiment.init);
