/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import checkConditions from './lib/checkConditions';
import loadScripts from './lib/loadScripts';
import { pollerLite } from '../../../../lib/uc-lib';
const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if (checkConditions()) {
    activate();
  } else {
    loadScripts(() => {
      // Check for jQuery
      pollerLite([
        () => {
          return !!window.jQuery && typeof window.jQuery == 'function';
        }
      ], activate);
    });
  }
}
