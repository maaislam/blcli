/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '.with-site-login .gigya-composite-control.gigya-composite-control-link.boots-block.boots-button-secondary.boots-register',
      '.sign_in_registration',
      () => {
        if(window.location.href.indexOf('https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm') > -1) {
          return true
        }
      },
      () => {
        if(document.referrer.indexOf('/parenting-club') > -1) {
          return true
        }
      }
    ], activate);
  }
}
