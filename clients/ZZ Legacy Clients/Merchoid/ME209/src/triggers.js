import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.products .product-small',
  '.large-12.columns',
], activate);
