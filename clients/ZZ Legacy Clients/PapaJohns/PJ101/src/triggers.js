/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.main',
// () => {
//   let poller = false;
//   if (window.location.pathname('/offers.aspx') > -1) {
//     poller = true;
//   }
//   return poller;
// },
() => !!(window.location.pathname.indexOf('/offers.aspx') > -1),
], activate);
