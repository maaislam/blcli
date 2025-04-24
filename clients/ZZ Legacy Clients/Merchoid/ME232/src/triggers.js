import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.logoBrand img',
  '.product-info-price',
], activate);
