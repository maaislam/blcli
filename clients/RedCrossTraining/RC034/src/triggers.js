import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.course-search-current',
  '.course-refinement',
  '.show-internal-search',
  '.ui-selectmenu-button',
], Experiment.init);
