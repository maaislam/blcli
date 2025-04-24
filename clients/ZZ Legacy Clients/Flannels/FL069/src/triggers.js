import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#divBagItemsChild',
  'a.addToBag',
], activate);
