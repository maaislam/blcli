import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
// import flicker from './flickerprevention';


// flicker();
poller([
  '#rollover_cart_popup', () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
