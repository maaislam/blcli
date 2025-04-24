import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '#coupon_code',
  '.btn-checkout',
], Experiment.init);
