import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.product-tile-list__item.js-product-list-item',
  '.product-tile__pricing-container',
], activate);
