import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.main-content',
  '.result-item',
  'button.tour-list-btn',
  'select.tour-list',
  () => {
    let poller = false;
    if (window.location.pathname.indexOf("/search-results") > -1) {
      poller = true;
    }

    return poller;
  },
], activate);
