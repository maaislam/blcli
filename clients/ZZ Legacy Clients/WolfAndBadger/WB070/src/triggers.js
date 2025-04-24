import run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.desiger-info', '.row-fluid.product-row > .span7.product-image-column', '.span5.product-details-column > .row:not(.variant-row)', '#pjax-container .wishlist-add-form-container', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
