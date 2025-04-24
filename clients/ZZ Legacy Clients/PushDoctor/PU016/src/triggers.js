import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.registrationContainer',
], Experiment.init);
