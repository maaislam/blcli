import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.large-6.columns.product-gallery',
  '.product-image .product-gallery-slider .slide',
  () => {
    if (document.querySelectorAll('.product-image .product-gallery-slider .slide').length > 3) {
      return true;
    }
  },
  () => {
    try {
      return typeof window.Flickity === 'function';
    } catch (e) {}
  },
], activate);
