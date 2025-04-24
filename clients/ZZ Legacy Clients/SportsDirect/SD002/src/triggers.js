import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#dnn_ContentPane',
  '.Checkout',
  '.CheckoutLaunch',
], activate);
