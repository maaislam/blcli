import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    '.checkout-guest-registration', '#RegistrationForm', '#dwfrm_multishipping_editAddress_addressFields_lastName', '[name="dwfrm_multishipping_editAddress_save"]'
  ], activate);
}
