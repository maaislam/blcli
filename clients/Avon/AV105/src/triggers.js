/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCart } from './lib/helpers/addToCart';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks && location.pathname.indexOf('/cart') !== -1) {
  pollerLite(['body', '#MainContent', () => window.DY.API], () => {
    //get cart.
    getCart().then((res) => {
      if (res['item_count'] <= 0) return;
      activate();
    });
  });
}
// if (!ieChecks) {
//   pollerLite(['body', '#MainContent', () => window.DY.API], () => {
//     // DY.API('callback', activate);
//     console.log(window.DY.API);
//     activate();
//   });
// }
