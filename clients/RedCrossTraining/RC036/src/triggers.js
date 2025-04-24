import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.sidebar-last',
  '.sidebar-first',
], Experiment.init);
