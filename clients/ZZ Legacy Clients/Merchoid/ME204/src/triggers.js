import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.price.large .woocommerce-Price-amount.amount',
  '.large-6.columns.product-gallery',
  () => {
    return !!window.jQuery;
  },
  () => {
    return typeof window.Flickity === 'function';
  },
], activate);
