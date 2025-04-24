import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#breadcrumb', '#carousel_alternate .thumb', '#productDetailUpdateable .span-4', 'div#tab-details', '#productDetailUpdateable', '#content > .span-24 > .catBanner', 'div#tab-relatedItems', '#tab_08', '#tab_strip', '#productDetailUpdateable .prod .code', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
