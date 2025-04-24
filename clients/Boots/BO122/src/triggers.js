/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    if(window.location.href.indexOf('AdvantageCardApply') > -1 || window.location.href.indexOf('/ApplyAdvantageCardCheck') > -1) {
      pollerLite([
        'body',
        '#eStore_registration_form.adcard_form.adcard_form_redesign',
        '.title',
        () => {
          if(window.userObj && window.userObj.isLoggedIn && window.userObj.isLoggedIn === "false") {
            return true;
          }
        }
      ], activate);
    }
  }
}
