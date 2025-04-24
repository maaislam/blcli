import Experiment from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body', '#facets_filters', '.prod_search_result_pagination h1.bold',
], Experiment.init);
