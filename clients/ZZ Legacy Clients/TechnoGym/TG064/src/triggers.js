import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.category-title',
  '.category-products .item-product',
  '.bottom-bar',
], activate);
