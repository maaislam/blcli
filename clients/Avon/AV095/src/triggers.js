/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const checkoutPage = window.location.pathname.includes('checkouts');

if (!ieChecks && !checkoutPage) {
  pollerLite(
    ['body', '#MainContent', '#klevu-target', '.page-header', '#shopify-section-collection-klevu', '.klevuWrap', '.yotpo'],
    activate
  );
} else if (!ieChecks && checkoutPage) {
  pollerLite(['body', '#checkout_reduction_code'], activate);
}
console.log('AV095 is running');
