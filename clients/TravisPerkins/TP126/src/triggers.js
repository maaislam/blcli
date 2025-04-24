import run from './experiment';
import { poller } from '../../../../lib/uc-lib';


// flicker();
poller([
  '.allFacetValues .facet_block  > li',
  '#breadcrumb',
  '#facets_filters > .item',
  '#facets_filters > #facets_filters',
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
