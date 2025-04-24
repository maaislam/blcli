/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if(!getCookie('Synthetic_Testing')) {
  pollerLite([
    'body',
    '.heroCarousel',
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
      return !!window.Optanon
  },
  () => {
    return !!window.jQuery;
  },
  () => {
      return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
  },
  ], activate);
}
