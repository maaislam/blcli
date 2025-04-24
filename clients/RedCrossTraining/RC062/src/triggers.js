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
  if (pathname === "/"
  || pathname === "/where-we-train/course-search/"
  || pathname.indexOf("/courses/") > -1
  || pathname === "/where-we-train/"
  || pathname === "/what-we-do/") {
    poller = true;
  }
  return poller;
},
], activate);
