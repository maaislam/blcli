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
    'section.section .container .column.is-3-desktop.is-4-tablet.is-6-mobile',
    '#MainContent .columns.is-multiline.is-mobile.has-padding-top-tiny .column',
    () => {
      let runExp = false;
      if (window.location.href.indexOf('/collections/') > -1
      && document.querySelectorAll('#MainContent .columns .column.is-3-desktop.is-4-tablet.is-6-mobile').length > 7) {
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


  window.addEventListener('resize', function(event) {
    if (document.querySelector(`.NE-421-first`)) {
      document.querySelector(`.NE-421-first`).parentElement.removeChild(document.querySelector(`.NE-421-first`));
    }
    // if (document.querySelector(`.NE-421-second`)) {
    //   document.querySelector(`.NE-421-second`).parentElement.removeChild(document.querySelector(`.NE-421-second`));
    // }
    if (!document.querySelector(`.NE-421-first`)) {
      // setTimeout(() => {
      //   activate();
      // }, 250);
      activate();
    }
  }, true);
}
