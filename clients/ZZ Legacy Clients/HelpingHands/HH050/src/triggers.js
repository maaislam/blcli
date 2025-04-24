/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
  let poller = false;
  if (window.location.pathname.indexOf("/about-us/contact-us/") > -1) {
    poller = true;
  }
  return poller;
},
], activate);
