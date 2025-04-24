/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
  let poller = false;
  if (window.location.pathname.indexOf('store-locator.aspx') === -1) {
    poller = true;
  }

  return poller;
},
() => {
  let poller = false;
  if (window.location.href.indexOf('?selectstore=') === -1) {
    poller = true;
  }

  return poller;
},
() => {
  return !!document.querySelector('table.nStoreTable') && !!document.querySelector('input#ctl00_cphBody_txtPostcode') && !!document.querySelector('a#ctl00_cphBody_lbGetStarted');
},
() => {
  let poller = false;
  if( (new Date()).getHours() < 22 && (new Date()).getHours() > 6 ) {
    if (!!document.querySelector('table.nStoreTable') && !!document.querySelector('input#ctl00_cphBody_txtPostcode') && !!document.querySelector('a#ctl00_cphBody_lbGetStarted')) {
      poller = true;
    }
  }

  return poller;
},
], activate);
