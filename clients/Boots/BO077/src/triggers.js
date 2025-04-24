/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

if(!getCookie('Synthetic_Testing')) {
  pollerLite([
    'body',
    '.rrPlacements',

  () => {
    return document.querySelectorAll('.rrPlacements').length == 3;
  },  
    
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
      return !!window.Optanon
  },
  ], activate);
}
