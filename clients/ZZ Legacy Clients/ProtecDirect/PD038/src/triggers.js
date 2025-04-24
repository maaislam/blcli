import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.pd1_navigation',
], Experiment.init);
