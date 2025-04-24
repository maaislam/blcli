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
    pollerLite([
      'body',
      '#access-content',
      '.detail-page__right-column',
      '.product-price',
      '.product-buy-now',
      '.product-gallery__image-container img',
      '#basketForm',
      '.product-delivery__text .product-delivery__text-span',
      () => {
        return !!window.digitalData;
      },
      () => {
        return !!window.Swiper;
      },
    ], activate);
  }
}
