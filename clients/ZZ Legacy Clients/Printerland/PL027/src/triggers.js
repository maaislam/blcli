/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
  let poller = false;
  if (window.digitalData && window.digitalData.products) {
    poller = true;
  }

  return poller;
},
], activate);
