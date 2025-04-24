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
      '#oct-basket-container',
      () => {
        if((!window.localStorage.dealProducts) || (window.localStorage.dealProducts && JSON.parse(window.localStorage.dealProducts).length !== 3)) {
          return true;
        }
      },
      () => {
        if(!localStorage.getItem('3for2-exclude')) {
          return true;
        }
      }
    ], activate);
  }
}
