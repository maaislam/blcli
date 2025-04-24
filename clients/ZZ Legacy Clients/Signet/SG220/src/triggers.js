/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${shared.ID}`)) {

    if(window.location.href.indexOf('/webstore/d') > -1) {
      pollerLite([
        'body',
        '.detail-page__right-column',
        '.product-price--current',
        '.product-buy-now'
      ], activate);
    } else if(window.location.href.indexOf('/webstore/basket/') > -1) {
      pollerLite([
        'body',
        '.voucher__body-inner',
        '.voucher__body--promocode-value',
        '#labelled-by-add-promo-code',
        '.container__finance-display-section',
        '.payment-breakdown__row--emphasis'
      ], activate);
    }
  }
}
