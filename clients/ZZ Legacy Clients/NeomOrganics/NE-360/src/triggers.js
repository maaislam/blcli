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
    '.widget-component.text-widget',
    () => {
      let runExp = false;
      if (window.location.href.indexOf('/pages/feel-good-gifts') > -1) {
        runExp = true;
      }

      return runExp;
    },
  ], activate);


  window.addEventListener('resize', function(event) {
    pollerLite([
      'body',
      '.widget-component.text-widget',
      () => {
        let runExp = false;
        if (window.location.href.indexOf('/pages/feel-good-gifts') > -1) {
          runExp = true;
        }
  
        return runExp;
      },
    ], activate);
  }, true);
}
