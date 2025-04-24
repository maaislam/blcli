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
    '#maincontent',
    '.christmas-sweater-page',
    '.page-product-configurable',
    '.gallery-placeholder img',

    // () => {
    //   return !!window.brandUSPs;
    // },
    () => {
      if(window.location.href.indexOf('christmas') > -1) {
        return true;
      }
    }
  ], activate);
}
