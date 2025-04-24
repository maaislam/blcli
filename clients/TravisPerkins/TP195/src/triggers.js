/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from './lib/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  var loggedIn = sessionStorage.getItem('loggedIn');
  if (loggedIn === 'No') {
    pollerLite(['body', '[data-test-id="pdp-wrapper"]',], () => {
      document.body.classList.remove(`${shared.ID}`);
  
      activate();
    });
  }
}
