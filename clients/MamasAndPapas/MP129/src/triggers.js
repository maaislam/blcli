import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.bg-grayLight.infoBar .text-center.text-capitalize',
], Experiment.init);
