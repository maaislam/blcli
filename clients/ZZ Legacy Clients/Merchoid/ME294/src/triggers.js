/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCheckoutPage } from './lib/helpers';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.page-header .panel.header',
    'span.action.showcart',
    '#block-discount-heading',
    '#maincontent .cart-steps',
    '.minicart-container', 
    '.sections.nav-sections',
    () => {
      return !!window.jQuery;
    }, 
  ], activate);

  if (getCheckoutPage() == 'cart') {
    var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
    let prevOrientations = window.orientation;
    window.addEventListener(orientationEvent, function() {
        window.location.reload();
    }, false);
  }
  
}
