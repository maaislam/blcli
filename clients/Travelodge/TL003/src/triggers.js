/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {

  if(window.location.href.indexOf('/checkout') > -1) {
    if(sessionStorage.getItem('TL-purpose')) {
      pollerLite([
        'body',
        '#customerDetails_purposeOfStay_0',
        '#customerDetails_purposeOfStay_1',
      ], activate);
    }
  } else {
    pollerLite([
      'body',
      '.searchWidget',
      '.fieldCTA'
    ], activate);
  }

 
}
