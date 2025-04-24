/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks && location.href.match(/glasses\//i)) {
  pollerLite([
    'body',
    '.product-info',
    () => {
      const btn = document.querySelector('.buy-btn');
      if(btn && btn.innerText.trim().match(/choose lenses & buy/i)) {
        return true;
      }

      return false;
    }
  ], activate);
}
