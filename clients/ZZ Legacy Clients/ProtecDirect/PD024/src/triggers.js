import Run from './experiment';
import { poller } from '../../../../lib/uc-lib';

poller([
  '.subcat_rightCol .news_signup',
  '.refinementToggle h4',
  '.facetValues .allFacetValues .facet_block li',
], Run);
