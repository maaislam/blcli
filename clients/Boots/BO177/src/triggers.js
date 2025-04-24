/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    if(window.location.href.indexOf('/parenting-club') > -1) {
      pollerLite([
        'body',
      ], activate);
    }
    if(window.location.href.indexOf('https://www.boots.com/webapp/wcs/stores/servlet/BootsLogonForm') > -1) {
      pollerLite([
          'body',
          '.sign_in_registration',
          '#gigyaLoginDiv',
          '#gigya-login-screen',
          '.gigya-login-form .gigya-layout-cell.with-site-login',
          '.gigya-layout-cell.responsive.with-social-login h2',
          '.boots-register-benefits',
          '.boots-button-secondary.boots-register',
          '#gigya-login-form',
        ], activate);
    }
    if(window.location.href.indexOf('https://www.boots.com/AjaxLogonForm?myAcctMain=1') > -1) {
      pollerLite([
          'body',
          '.my_account_header',
        ], activate);
    }
  }
}
