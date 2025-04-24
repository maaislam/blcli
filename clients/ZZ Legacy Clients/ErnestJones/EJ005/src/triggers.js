import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.main-site-header',
], Experiment.init);
