/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const intentScore = parseInt(localStorage.getItem('uc_key_intent'));

if(!ieChecks) {
  if (intentScore >= 1) {
    activate();
  }
}
