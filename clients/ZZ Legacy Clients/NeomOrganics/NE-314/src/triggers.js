/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCookie, deleteCookie } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.mini-cart.has-background-white',
    () => {
      let runExp = false;
      // deleteCookie(`NE-314-gift-selection`);
      if (!getCookie(`NE-314-gift-selection`)) {
        runExp = true;

        if (localStorage.getItem(`NE-314-gift-selection`) !== null) {
          localStorage.removeItem(`NE-314-gift-selection`);
        }
      }

      return runExp;
    }
  ], ()=> {
    setTimeout(() => {
      activate();
    }, 500);
    
  });
}
