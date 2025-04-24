import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
poller([
  '.span-10.subcat_column-item.pd3--variant-product', '.pd3-prod-content.clearfix .cart', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
