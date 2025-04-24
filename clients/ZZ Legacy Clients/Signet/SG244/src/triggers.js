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
      '.pageType-ProductPage',
      '.product-detail__add-to-cart',
      () => {
        if(window.GWPData && window.GWPData.skus && window.GWPData.GWPimage && window.GWPData.GWPlink) {
          return true;
        }
      },
      () => {
        const skus = window.GWPData.skus;
        for (let index = 0; index < skus.length; index++) {
          const element = skus[index];
          if(window.location.href.indexOf(`V-${element}`) > -1) {
            return true;
          }
        }
        
      }
    ], activate);
  }
}
