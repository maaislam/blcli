/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
// '[data-element="desktop-summary"] [data-component="info-block"]',
() => {
  let poller = false;
  const pathname = window.location.pathname;
  console.log(pathname);
  if (pathname.indexOf('/takeaway/menu') > -1 || pathname.indexOf('/takeaway/basket') > -1) {
    poller = true;
  }

  return poller;
}
], activate);
