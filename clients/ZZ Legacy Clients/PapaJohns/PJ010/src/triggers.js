import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.leftColumn',
], Experiment.init);
