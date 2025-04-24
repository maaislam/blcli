/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {

  if(window.location.href.indexOf('/checkout/cart/') > -1) {
    pollerLite([
      '.page-header',
      '.action.nav-toggle',
    ], () => {
      activate();
    });

  }else {
    pollerLite([
      '.page-header',
      '.slick-initialized',
      '.action.nav-toggle',
      '#reviews.slick-initialized.slick-slider',
      '.review-fans',
    () => !!window.jQuery,
    ], () => {
      activate();
    });
  }
}
