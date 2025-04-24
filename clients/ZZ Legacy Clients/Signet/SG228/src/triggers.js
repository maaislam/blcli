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
        let eligibleSku = /.*(webstore\/d).*(3167968|3167976|3168530|3168549|5090008|5093139|5094143|4252217|5046319|4227026|2847701|6365809|1675877|1676156|3151239|1670565|1670980|1671111|4248694|8128200|8132674|4244907|5928680|8149100|8150680|8145466|8146578|8145806|8151806|8130639|1674870|5293464|8139822|5293693|5294703|3077519|6788106|6788246|6790542|8124280|8127352|8133182|6745598|6953662|6954316|6988113|8002053|8002444|8003440|6579876|6582982|6591892|6579159|8018464|8018898|8019932|6565751|6577016|6953301|6946666|6947255|8003734|8004153|8013446|1246739|2626373|2933624|2933772|4324994|4325133|5109205|5884268|6157904|9949240).*/
        if(window.location.href.match(eligibleSku)) {
          return true;
        }
      }
    ], activate);
  }
}
