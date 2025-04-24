import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  'body',
  '.flickity-slider',
  '.flickity-slider li',
], Experiment.init);
