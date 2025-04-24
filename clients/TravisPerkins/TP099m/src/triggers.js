import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';
// Poller for setting up test
poller([
  '#searchForm', '#search', '#ui-id-1', '#go', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], Run);

