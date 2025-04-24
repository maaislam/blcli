import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '#paymentSummaryTable',
  '#placeOrder',
], Experiment.init);
