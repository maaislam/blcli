import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
