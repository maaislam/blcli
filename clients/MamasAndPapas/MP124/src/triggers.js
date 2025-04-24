import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.nav_group',
  '.nav_group li',
], Experiment.init);
