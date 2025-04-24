import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#main #secondary.summary .section-header',
  '.checkout-mini-cart',
  '.checkout-order-totals',
], activate);
