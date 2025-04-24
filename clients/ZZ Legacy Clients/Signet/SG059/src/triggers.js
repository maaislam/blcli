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
      '.product-name',
      '.product-summary',
      '.detail-page__right-column',
      () => {
        const SKUS = ['1575481', '4530225','1580809'];
        const productSKU = window.digitalData.product[0].productInfo.masterSku;
        if(SKUS.indexOf(productSKU) > -1) {
            return true;
          }
      },
      () => {
          return !!window.Swiper;
      },
    ], activate);
  }
}
