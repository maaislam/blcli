/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import { getCookie, pollerLite } from '../../../../lib/utils';
import activate from './lib/experiment';


if(!getCookie('Synthetic_Testing')) {
  pollerLite([
    'body', '.heroCarousel',
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
      return !!window.Optanon
  },
  () => {
    return !!window.jQuery
  }
  ], activate);
}

