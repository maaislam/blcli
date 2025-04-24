import RunStorage from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.product.product-actions-container',
], RunStorage);