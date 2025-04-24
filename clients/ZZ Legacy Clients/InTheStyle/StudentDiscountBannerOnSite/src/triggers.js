import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body', '.wrapper-banner-container',
], Experiment.init);
