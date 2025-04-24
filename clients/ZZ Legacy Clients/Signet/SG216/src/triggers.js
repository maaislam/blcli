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
        if(window.digitalData.product[0].productInfo.masterSku){
          return true;
        }
      },
      () => {
        const sku = window.digitalData.product[0].productInfo.masterSku;
        const matchingSkus = ['6942261','6942849','3926443','3156044','6342604','8735174','8151725','6942202','6942210','6942229','8024073','6942245','6942237','6942253', '6376525','8338980','9794166','6376703','6376681','4413709','1016849','8063974','1016903','5331617','5676657','9792937','5276454','6343139','6343147','2871416','3770087', '8044783','8045550','8042195','8043019','8041741',
        '8041946','8044368','8057486','8035210','8036403','8037728','8036764', '8039283','8041202','8041350', '8044740','8044724','8044732','8044643','8162570','8044767','8044759','8044716'];
        if(matchingSkus.includes(sku)){
          return true
        }
      }
    ], activate);
  }
}
