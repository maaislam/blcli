import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.woocommerce-message.message-success',
], Experiment.init);
