/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from '../../../../core-files/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { getProductID } from './lib/helpers';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  if(!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite([
      'body',
      '#product-content .pdpForm fieldset',
      '#product-detail-wrapper input[name="productData"]',
      () => {
          let runExperiment = false;
          // Get Product ID and check if it's included in the experiment
          const productId = getProductID();
          if (productId !== '') {
            runExperiment = true;
          }

          return runExperiment;
      },
      () => {
        return !!window.jQuery;
      }, 
      () => {
        return !!window.$.fn.slick
      }, 
      // -----------------
      // If slick needed
      // -----------------
      () => {
        if(typeof window.jQuery.fn.slick !== 'undefined') {
          return true;
        }
      },
      // -----------------
      //
      () => !!(document.readyState == 'complete'), // Platform workaround rather than win-onload
    ], () => {
      activate();
    });
  }
}
