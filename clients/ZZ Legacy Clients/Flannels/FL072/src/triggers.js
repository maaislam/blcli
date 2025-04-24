import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  'li.deliveryGroup_DeliveryCollection',
], activate);
