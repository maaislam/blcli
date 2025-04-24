/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if(!getCookie('Synthetic_Testing')) {
  pollerLite([
    'body', '#estore_category_heading', '.cm-placement-main', '.heroCarousel',
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
      return !!window.Optanon
  },
  () => {
    if(typeof window.jQuery.fn.slick !== 'undefined') {
      return true;
    }
  }
  
  ], activate);
}
