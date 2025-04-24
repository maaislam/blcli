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

    if(window.location.href.indexOf('/webstore/l/engagement-rings/') > -1) {
      pollerLite([
        'body',
        '.top-section',
        () => {
          if(window.digitalData.page.pageInfo.pageType === 'PLP') {
            return true;
          }
        },
      ], activate);
    } else {
      pollerLite([
        'body',
        '.detail-page__product-accordion-container',
        () => {
          if(window.digitalData.page.pageInfo.pageType === 'PDP') {
            return true;
          }
        },
        () =>{
          const matchingSKUS = ['8057486','8046174', '8044783','8045550'];
          if(matchingSKUS.indexOf(window.digitalData.product[0].productInfo.masterSku) > -1){
            return true;
          }
        }
      ], activate);
    }
  }
}
