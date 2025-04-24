/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks  ) {
  pollerLite([
    'body','.pr__btns', ()=>window.dataLayer !== undefined
  ], ()=>{  
    if((window.dataLayer[0].prodSkuAvailabilityCollection === "TCND" || window.dataLayer[0].prodSkuAvailabilityCollection === "CPC") && window.dataLayer[0].storeName !== ""){
      
      activate();
    }
  });
}
