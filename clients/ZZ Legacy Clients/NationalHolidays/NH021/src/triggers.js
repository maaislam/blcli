import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';
import nh010 from './lib/NH010';

nh010();

poller([
  'body',
  '.NH010',
], Experiment.init);
