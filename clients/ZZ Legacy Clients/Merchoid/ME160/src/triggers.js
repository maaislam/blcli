import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '#merchoid-scarcity-message',
], Experiment.init);
