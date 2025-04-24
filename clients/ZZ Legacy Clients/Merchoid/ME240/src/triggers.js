import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#maincontent',
  '.cart.item',
  '.action.primary.checkout',
  '.cart-preamble',
], activate);
