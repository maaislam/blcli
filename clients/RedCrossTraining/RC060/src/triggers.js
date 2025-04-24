/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
  const pathname = window.location.pathname;
  let poller = false;
  if (pathname.indexOf("/basket") === -1 && pathname.indexOf("/purchase") === -1) {
    poller = true;
  }
  return poller;
},
], activate);
