/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {

    // if new style
    pollerLite([
      'body',
      '.oct-template',
      '.oct-decorative-panel',
      '.oct-grid__cell.oct-grid__cell--width-6.oct-grid-aem__cell',
    ], activate);


    // if old style
    pollerLite([
      'body',
     '.cm-placement-main',
     // '.oct-decorative-panel',
     // '.oct-grid__cell.oct-grid__cell--width-6.oct-grid-aem__cell',
    ], activate);
  }
}
