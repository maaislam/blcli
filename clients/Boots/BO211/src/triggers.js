/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(window.location.href === 'https://www.boots.com/love-island/in-the-villa' || window.location.href.indexOf('https://www.boots.com/love-island/in-the-villa?') > -1){
  if(!ieChecks) {
    if(!getCookie('Synthetic_Testing')) {
      pollerLite([
        'body',
        '#estore_lister_template_container',
        '.cm-placement-slot5',
      ], activate);
    }
  }
}

else if(window.location.href === 'https://www.boots.com/love-island' || window.location.href.indexOf('https://www.boots.com/love-island?') > -1) {

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '.oct-template',
      '.oct-grid__cell.oct-grid__cell--width-12.oct-grid-aem__cell.oct-grid-aem__cell__width--firstRow.oct-grid-aem__cell__width--lastRow',
      '.oct-experience-fragment.oct-experience-fragment__single-row .oct-teaser',
    ], activate);
  }
}
}
