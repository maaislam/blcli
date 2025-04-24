/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${shared.ID}`)) {
    pollerLite([
      'body',
      '.product-gallery__main',
      () => {
        let eligibleSku = /.*(webstore\/d).*(3055124|3061604|3070107|3069699|6268390|2624524|1777297|1777955|5274885|8161457|8159782|9780815|8161838|8160038|8159467|4716957|1187090|1186752|1187120|1186825).*/
        if(window.location.href.match(eligibleSku)) {
          return true;
        }
      }
    ], activate);
  }
}
