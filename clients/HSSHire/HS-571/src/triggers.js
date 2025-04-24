/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { addJsToPage } from './lib/helpers/utils';

const isPdp = window.location.pathname.includes('/hire/p/');
if (isPdp) {
  addJsToPage('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js', 'HSS-moment');
  pollerLite(['#chosen_hire', () => typeof window.moment !== 'undefined'], activate);
}
