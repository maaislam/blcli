/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
  let poller = false;
  const homepage = window.location.pathname == "/";
  const regex = RegExp('/scheduled-courses\/.*');
  // const regex = RegExp('/scheduled-courses\/.*|courses\/');
  const coursePage = regex.test(window.location.href);
  const searchPage = window.location.pathname.indexOf('/course-search') > -1;
  const coursePLP = window.location.pathname.indexOf('/courses/') > -1 && window.location.pathname.indexOf('public-first-aid-courses') == -1;
  
  if (homepage) {
    poller = true;
  } else if (coursePage) {
    poller = true;
  } else if (searchPage) {
    poller = true;
  } else if (coursePLP) {
    poller = true;
  }

  return poller;
},
], activate);
