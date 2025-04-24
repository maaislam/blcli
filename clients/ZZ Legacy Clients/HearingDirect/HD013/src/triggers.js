import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.onestepcheckout-index-index',
  '.site-header',
], Experiment.init);
