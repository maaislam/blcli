/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
// '.main-content-container section.nearest-me .content .discount-banner',
'.main-content-container .discount-banner',
// () => {
//   let poller = false;
//   if (window.location.href.indexOf("/takeaway?lookup=") > -1 || window.location.href.indexOf("/takeaway") > -1) {
//     poller = true;
//   }

//   return poller;
// },
], activate);
