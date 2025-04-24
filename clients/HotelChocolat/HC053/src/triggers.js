/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from './lib/shared';
import { pollerLite } from '../../../../lib/uc-lib';
import { events } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  pollerLite([
    'body',
    '.availability-msg .preorder-msg',
    'button#add-to-cart',
    '#pdpMain .product-col-1.product-image-container .product-detail',
    '.price-wrapper .product-price .price-sales',

    // -----------------
    // Crashing issues mean adding in Einstein checks(?):
    // Otherwise leave commented
    // -----------------
    //'.einstain-inited',
    //'.einstain-inited .slick-active',
    //() => !!(window.einstein && window.einstein.loaded),
    //() => !!window.__zmags && !!window.zmagsJsonp,
    // -----------------
    //
    () => {
        return !!window.jQuery;
    }, 

    // -----------------
    // If slick needed
    // -----------------
    //() => {
    //    if(typeof window.jQuery.fn.slick !== 'undefined') {
    //      return true;
    //    }
    //},
    // -----------------
    //
    () => !!(document.readyState == 'complete'), // Platform workaround rather than win-onload

  ], () => {
    // Initial check control or variant - if control, send event
    // to identify as such, and bail out of executing rest of code
    if(VARIATION == 'control') {
      events.send(`${ID}-control`, 'init');
    } else {
      events.send(`${ID}-${VARIATION}`, 'init');

      activate();
    }
  });
}
