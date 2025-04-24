import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
pollerLite([
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
