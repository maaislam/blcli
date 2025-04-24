/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

console.log("Working");
if (!ieChecks) {
  if (!getCookie('Synthetic_Testing')) {
      pollerLite(
        [
          'body',
          '#productsFacets',
          '.grid_mode',
          '#estore_lister_template_container',
          () => {
            return !!window.jQuery;
          },
          () => {
              if (window.location.pathname.indexOf('no7-shop-all') > -1) {
                return true;
              }
          },
        ],
        () => {
          activate();
        }
      );

   
  }
}
