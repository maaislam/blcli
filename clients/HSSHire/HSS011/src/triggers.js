/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
  '.price-row .price-blk',
  () => {
    let poller = false;
    if (window.location.pathname.indexOf('/p/') > -1 && !document.querySelector('.hire_now div.out-of-stock-content.col-xs-12')) {
      poller = true;
    }

    return poller;
  },
  () => {
    let poller = false;
    if (window.innerWidth < 420) {
      poller = true;
    }

    return poller;
  },
], activate);
