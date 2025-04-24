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
      '#access-content',
      '.product-description',
      '.product-gallery__image-container img',
      () => {
        if(window.digitalData.page.pageInfo.pageType === 'PDP') {
          return true
        }
      },
      
      () => {
       const skus = [
        '8046174',
        '8044783',
        '8042195',
        '8043019',
        '8041741',
        '8041946',
        '8044368',
        '8035210',
        '8036403',
        '8036764',
        '8037728',
        '8039283',
        '8041202',
        '8041350',
       ]

       if(skus.indexOf(window.digitalData.product[0].productInfo.masterSku) > -1) {
        return true;
       }
      },
      () => {
        return !!window.Swiper;
      },
    ], activate);
  }
}
