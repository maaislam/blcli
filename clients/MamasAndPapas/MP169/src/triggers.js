import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#addToCartForm > button.btn.btn-default',
], activate);
