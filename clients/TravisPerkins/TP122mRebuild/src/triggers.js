import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.advanced_plp_product_item.product_item', // All product Container - Markup insertion
  '.advanced_plp_product_item.product_item .product_item_header a', // All product links
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
