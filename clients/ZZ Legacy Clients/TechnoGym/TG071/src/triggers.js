import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.swiper-slide img',
  '.content-container.container-fluid',
  '.product-name h1',
  '.feature-secondary-container',
  '#product-info',
  () => {
    if (document.querySelector('.product-img-box .product-gallery .swiper-wrapper .swiper-slide:first-of-type .lazy-loaded img').getAttribute('src')) {
      return true;
    }
  },
  () => {
    return !!window.jQuery;
  },
], activate);
