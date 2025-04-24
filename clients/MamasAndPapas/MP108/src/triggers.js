import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '#voucher .vouchermsg',
  '.checkout_item',
], Experiment.init);
