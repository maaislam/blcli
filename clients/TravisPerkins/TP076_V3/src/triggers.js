import Run from './experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  '.tp_filtersWrapper > .ui-block-a.tp_filterSearchBtnWrapper', // Filter search button container
  '#tpFilterSearch ul.ui-collapsible-set  > li > h2 > a', // Individual filter option
  '#tpFilterSearch ul.ui-collapsible-set  > li a > label', // Individual filter label
  '.tp_filtersWrapper > .ui-block-a.tp_filterSearchBtnWrapper > a', // filter search button
  '#tpFilterSearch ul.ui-collapsible-set  > li', // Filter option parent (li element)
], Run);
