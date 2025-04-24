/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(window.location.href.indexOf('location=Manchester') > -1) {
    pollerLite([
      'body',
      '.search-page .hotel-card',
      'a.link',
      '.search-page.qa-search-page .container',
    ], activate);
  }
}
