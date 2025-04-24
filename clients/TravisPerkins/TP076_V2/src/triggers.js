import run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '#tpFilterSearch-popup', // Filters container
  '.tp_filtersWrapper > .ui-block-a.tp_filterSearchBtnWrapper', // filter search button
  '#tpFilterSearch .ui-collapsible.ui-collapsible-themed-content', // Filter headers for tracking
  '#tpFilterSearch .ui-listview a.ui-collapsible-heading-toggle', // Individual filter
  '.ui-footer > .tpApplyFilter', // Apply filter button
  () => {
    let checkjQuery = false;
    if (window.jQuery) {
      checkjQuery = true;
    }
    return checkjQuery;
  },
], run);
