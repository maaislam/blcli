/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getUrlParameter } from './lib/helpers';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    'section.section .container .column.is-3-desktop.is-4-tablet.is-6-mobile',
    '#MainContent .columns.is-multiline.is-mobile.has-padding-top-tiny .column',
    // () => {
    //   return !!window.jQuery;
    // }, 
    () => {
      let runExp = false;
      if (window.location.href.indexOf('/collections/') > -1) {
        runExp = true;
        if (window.location.href.indexOf('?page=') > -1) {
          if (getUrlParameter('page', window.location.href) == '1') {
            runExp = true;
          } else {
            runExp = false;
          }
        }
        
      }

      return runExp;
    },
  ], activate);


  // window.addEventListener('resize', function(event) {
  //   if (document.querySelector(`.NE-422-banner`)) {
  //     document.querySelector(`.NE-422-banner`).parentElement.removeChild(document.querySelector(`.NE-422-banner`));
  //   }
  //   if (!document.querySelector(`.NE-422-banner`)) {
  //     // setTimeout(() => {
  //     //   activate();
  //     // }, 250);
  //     activate();
  //   }
  // }, true);
}
