/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    // '.NE-320',
    // '.NE-281',
    '.MobileSlidingNav .MobileSlidingNav__level.MobileSlidingNav__level-1 .MobileSlidingNav__extra-content a',
    '.MobileSlidingNav .MobileSlidingNav__level.MobileSlidingNav__level-1 .MobileSlidingNav__extra-content a img',
    '.MobileSlidingNav .MobileSlidingNav__level.MobileSlidingNav__level-1 .MobileSlidingNav__extra-content a img[src]',
  ], activate);
}
