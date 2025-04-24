/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const path = window.location.pathname;

if(!ieChecks) {
  pollerLite([
    'body' , ()=>{ return path.includes('/glasses/buy-and-fit');}
  ], activate);
}
