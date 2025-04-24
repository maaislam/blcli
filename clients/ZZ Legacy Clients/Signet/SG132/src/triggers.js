/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.book-appointments-section .product-book-appointment',
    '.detail-page__upper-row',
    '.s-product-description-markdown p',
    '.product-buy-now__button',
    () => {
      return !!window.digitalData && window.digitalData.page.pageInfo.pageType === 'PDP'
    }
  ], activate);
}
