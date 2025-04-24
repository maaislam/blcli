import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getUrlParameter } from '../../../../lib/utils';

pollerLite([
  'body',
  'table.nStoreTable',
  'a#ctl00_cphBody_lbGetStarted',
  () => {
    let poller = false;
    if( (new Date()).getHours() < 22 && (new Date()).getHours() > 6 ) {
      if (window.location.pathname === '/' && !getUrlParameter('selectstore')) {
        poller = true;
      }
    }

    return poller;
  },
], activate);
