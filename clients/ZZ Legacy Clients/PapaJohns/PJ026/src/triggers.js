import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.mainMenuCont a',
], Experiment.init);
