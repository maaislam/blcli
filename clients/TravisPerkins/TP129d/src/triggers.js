import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '#cboxWrapper', '.collection-branch-item .oos-hours',
], Experiment.init);
