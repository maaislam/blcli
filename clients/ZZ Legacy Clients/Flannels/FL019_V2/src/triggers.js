import run from './experiment';
import { poller } from '../../../../lib/uc-lib';
import flicker from './flickerprevention';


flicker();
// poller([
//   '#divContinueSecurelyTop', '#TotalValue', '#SubtotalRow', '#TotalRow', '#divContinueShopping', '.currency-gbp', () => {
//     let checkjQuery = false;
//     if (window.jQuery) {
//       checkjQuery = true;
//     }
//     return checkjQuery;
//   },
// ], run);

poller([
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
