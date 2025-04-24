import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '#sticky-footer-container',
], Experiment.init);
