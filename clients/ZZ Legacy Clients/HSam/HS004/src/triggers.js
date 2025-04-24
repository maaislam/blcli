import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.page-title',
  '.browse__banner-content-inner p',
], Experiment.init);
