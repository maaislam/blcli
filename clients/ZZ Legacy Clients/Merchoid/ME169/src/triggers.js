import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.flickity-slider',
  '.product-gallery .images',
  '.product-gallery-slider .flickity-slider .slide a > img',
  '.product-thumbnails',
  '.price.large',
  () => {
		return window.jQuery;
  },
  () => {
    return window.Flickity;
  },
], activate);
