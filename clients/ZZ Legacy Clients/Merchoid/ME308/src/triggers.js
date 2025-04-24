/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.page-wrapper',
    '.slick-initialized',
    () => {
      return !!window.jQuery;
    }, 
    () => {
      let runExp = false;
      // --- Check if page is Christmas Jumper PDP
      const url = window.location.href;
      const regex = /.*(christmas)(-)(sweater|jumper).*/g;
      const found = url.match(regex);

      if (window.dataLayer[0].google_tag_params.ecomm_pagetype !== 'product' && window.location.href.indexOf('geeks-guide-to-ugly-christmas-sweaterjumpers') == -1
      && window.location.href.indexOf('/checkout') == -1) {
        runExp = true;
      } else if (window.dataLayer[0].google_tag_params.ecomm_pagetype == 'product' && found !== null) {
        runExp = true;
      }

      return runExp;
    },
  ], activate);

  
  window.addEventListener('resize', function(event) {
    if (document.querySelector(`.ME308-banner`)) {
      document.querySelector(`.ME308-banner`).parentElement.removeChild(document.querySelector(`.ME308-banner`));
    }
    if (!document.querySelector(`.ME308-banner`)) {
      // setTimeout(() => {
      //   activate();
      // }, 250);
      activate();
    }
  }, true);

}
