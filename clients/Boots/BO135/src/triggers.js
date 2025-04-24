/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '#globalNavigationContainer',
      '#estore_header_bottom_row .departmentMenu',
      () => {
        if(window.innerWidth > 1100 || window.innerWidth < 768) {
          return true;
        }
      }
    ], activate);
  }
}
