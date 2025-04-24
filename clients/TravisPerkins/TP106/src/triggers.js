import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '.tpHeaderContent_holder',
], Experiment.init);
