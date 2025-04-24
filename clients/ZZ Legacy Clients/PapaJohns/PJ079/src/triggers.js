/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.offers-m-cont .offer-desc p a',
'#ctl00_cphBody__objOffersMobile_pnlPostCode',
() => {
  let poller = false;
  if (document.querySelector('.offers-m-cont .offer-desc a').getAttribute('id')) {
    const id = document.querySelector('.offers-m-cont .offer-desc a').getAttribute('id');
    if (id.indexOf('PickStore') > -1) {
      poller = true;
    }
  }

  return poller;
},
], activate);
