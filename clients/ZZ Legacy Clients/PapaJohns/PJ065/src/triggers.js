import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
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
