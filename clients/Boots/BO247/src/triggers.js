/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import shared from '../../../../core-files/shared';

const { VARIATION } = shared;

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    if(VARIATION === '1' || VARIATION === 'control') {
      if(window.location.href.indexOf('wcs/stores/servlet/BootsLogonForm') > -1) {
        pollerLite([
          'body',
          '.sign_in_registration',
          '.gigya-login-form',
          '.boots-login-main',
         
          () => {
            if(window.userObj && window.userObj.isLoggedIn == 'false') {
              return true;
            }
          }
        ], activate);
      }
    } else {
      if(VARIATION === '2' && window.location.href.includes('parenting-club') > -1) {
        pollerLite([
          'body',
          '.oct-decorative-panel',
          'a[href="https://www.boots.com/JoinClub?club=parentingclub&storeId=11352"]',
          () => {
            if(window.userObj && window.userObj.isLoggedIn == 'false') {
              return true;
            }
          }
        ], activate);
      }
    }
  }
}
