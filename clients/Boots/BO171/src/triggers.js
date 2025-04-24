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
      '.oct-template',
      '.oct-grid__row.oct-grid__row--full-width .oct-grid.oct-aem-grid .oct-grid__row.oct-grid__row--full-width',
      () => {
        return !!window.jQuery
      }
    ], activate);
  }
}
