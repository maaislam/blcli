import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '#dnn_ContentPane', '.existingCustomer', '.newCustomer',
], Experiment.init);
