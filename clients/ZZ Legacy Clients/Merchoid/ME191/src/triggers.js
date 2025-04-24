import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.product-gallery .product-image',
  () => {
    return !!window.jQuery;
  },
], activate);
