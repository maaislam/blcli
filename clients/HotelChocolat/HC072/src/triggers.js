/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from '../../../../core-files/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { carouselExists } from './lib/helpers';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  if(!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite([
      'body',
      '.productthumbnail',
      '#thumbnails',
      '.product-image-container',
      () => {
        if(document.querySelectorAll('.productthumbnail') && document.querySelectorAll('.productthumbnail').length > 1) {
          return true;
        }
      },
      // () => {
      //   return !!window.jQuery;
      // }, 
      // // -----------------
      // // If slick needed
      // // -----------------
      // () => {
      //   if(typeof window.jQuery.fn.slick !== 'undefined') {
      //     return true;
      //   }
      // },
      // // -----------------
      // //
    ], () => {
      activate();
    });
  }
}
