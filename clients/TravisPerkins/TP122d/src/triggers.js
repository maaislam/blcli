import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.list_view #products', // All product Container - Markup insertion
  '.list_view #products .row .prod .prod_info a', // All product links
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
