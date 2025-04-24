import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.delivery_method_item',
  '.checkout_orderTotal > .clearLeft',
], Experiment.init);
