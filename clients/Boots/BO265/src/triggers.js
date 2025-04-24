/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
console.log("TRIGGERS BO265");
console.log(window.userObject);
if(!ieChecks) {
  pollerLite([
    'body', 
    '.oct-carousel-horizontalnav[data-testid="oct-carousel-horizontalnav"]', 
    ()=> window.userObject,
    ()=> window.userObject?.pageView?.length > 1,
  ], activate);
}
