/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.detail-page__right-column',
  '.product-specification tr',
  '.product-gallery__image',
  '.s-product-description-markdown',
  '.detail-page__left-column .js-syte-functionality',
  '.tangiblee-button',
  
  () => {
    return !!window.Swiper;
  },
  () => {
    return !!window.digitalData && window.digitalData.product[0].price.currentPrice && window.digitalData.page.category.subCategory1 === "Rings";
  },
  () => {
    if(window.location.href.indexOf('gucci') === -1 || window.location.href.toLowerCase().indexOf('serena+williams') === -1 || window.location.href.toLowerCase().indexOf('wedding') === -1 || window.location.href.toLowerCase().indexOf('fashion') === -1) {
      return true
    }
  },
  () => {
    if(window.location.href.indexOf('diamond') > -1 || window.location.href.indexOf('Diamond') > -1) {
      return true
    }
  },
  () => {
    if(document.querySelectorAll('.product-gallery__image-container img').length > 3) {
      return true
    }
  },
  () => {
    const price = window.digitalData.product[0].price.currentPrice;
    if(price >= 1500) {
      return true
    }
  }
], activate);
