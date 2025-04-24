import Experiment from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.course-search-header',
  '.venue-search-item',
], Experiment.init);
