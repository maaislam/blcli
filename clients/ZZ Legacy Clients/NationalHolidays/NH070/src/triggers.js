import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  () => {
    let poller = false;
    if (window.location.pathname.indexOf('/itineraries/') > -1 || window.location.pathname.indexOf('/search-results') > -1) {
      poller = true;
    } else if (window.location.pathname.indexOf('/my-shortlist') > -1) {
      poller = true;
    }
    return poller;
  },
], activate);
