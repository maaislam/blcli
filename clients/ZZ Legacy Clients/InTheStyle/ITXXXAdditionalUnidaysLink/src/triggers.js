import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.cart #discount-coupon-form',
], Experiment.init);
