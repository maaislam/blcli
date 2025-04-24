/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
// 'section.menu-page div[data-component="secondary-header"] h2',
() => {
  let poller = false;
  if (window.location.pathname.indexOf('/takeaway/all') > -1
  || window.location.pathname.indexOf('/takeaway') > -1
  || window.location.href.indexOf('/takeaway/menu') > -1
  || window.location.href.indexOf('/takeaway/basket') > -1) {
    poller = true;
  }

  return poller;
},
], activate);
