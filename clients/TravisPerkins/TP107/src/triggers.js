import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '#header ul.tpHeaderContent_holder',
], Experiment.init);
