import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product-gallery .product-gallery-slider',
], activate);

