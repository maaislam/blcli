import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', 'table#order_history', '.item_container_holder.acnt_order_history',
], Experiment.init);
