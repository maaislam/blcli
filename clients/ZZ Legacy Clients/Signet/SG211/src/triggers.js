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
      '#js-product-gallery',
      () => {
        return !!window.Swiper;
      },
      () => {
        return !!window.digitalData && !!window.digitalData.product[0];
      },
      () => {
        const pageSku = window.digitalData.product[0].productInfo.productID;
        const skus = ['8666075', '1698907', '3105342' ,'6669638' ,'1698893' ,'9211144' ,'3020320' ,'9589422' ,'4131908' ,'3018822' ,'3018911' ,'3018954' ,'5100933' ,'8445621' ,'3817016' ,'3020479' ,'1020943' ,'1099353' ,'3019977' ,'1020935' ,'4685199' ,'3020304' ,'3018989' ,'3017796' ,'2925826' ,'2925613' ,'3019039' ,'3018997' ,'8080151' ,'3019233' ,'1098799' ,'1020951' ,'1098802' ,'3404072' ,'9574964' ,'3017745' ,'4393198' ,'8445583' ,'2925656' ,'3019284' ,'6312551' ,'3019004' ,'4680758' ,'4131738' ,'4131916' ,'3017729' ,'3031667' ,'3415139' ,'4131703' ,'4131924' ,'3017737' ,'5044243' ,'1726773' ,'3019241' ,'3020312' ,'3019128' ,'3018725' ,'9574999' ,'3420337' ,'3400433' ,'3017761' ,'1726838' ,'1541773' ,'3017710' ,'1020994' ,'1698915' ,'1727907' ,'3016862' ,'1726722' ,'3252841' ,'2925605' ,'3017575' ,'3017753' ,'1721941' ,'3017001' ,'3017788' ,'3017583'];
        if(skus.indexOf(pageSku) > -1) {
          return true
        }
      }
    ], activate);
  }
}
