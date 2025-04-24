import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#hero', // Page Container
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
