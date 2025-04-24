/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if(!getCookie('Synthetic_Testing')) {
  pollerLite([
    'body',
    '.mobile_facet_controls.select_filter',
    '.pageControlMenu',
    '.sorting_view_controls_container',
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
      return !!window.Optanon
  },
  ], activate);
}
