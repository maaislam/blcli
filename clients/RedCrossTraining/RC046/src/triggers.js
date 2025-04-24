import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
  '.course-search-header',
  '.venue-search-item',
], Experiment.init);
