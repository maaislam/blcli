import activate from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.items .product-tile__price-value',
], activate);
