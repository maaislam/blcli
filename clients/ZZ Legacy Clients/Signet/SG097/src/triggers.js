/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  // () => !!window.jQuery,
  () => {
    let poller = false;
    if (window.location.pathname.indexOf('/webstore/l/') > -1
    && document.querySelector('ol#js-product-list li a.productLink')) {
      poller = true;
    } else if (window.location.pathname.indexOf('/webstore/d/') > -1) {
      poller = true;
    }

    return poller;
  },
], activate);
