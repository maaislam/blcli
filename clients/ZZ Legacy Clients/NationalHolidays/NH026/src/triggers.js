import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.main-content .result-item .buttons',
], Experiment.init);
