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
    '#related-brand-products',
    '.product-secondary-tabs-wrapper',
    '.gallery-placeholder img',
    () => {
      if(document.referrer.indexOf('https://www.merchoid.com/') === -1) {
        return true;
      }
    },
    () => {
      if(window.location.href.match(/.*(sweater|jumper).*/)[0] && window.location.href.indexOf('christmas') > -1) {
        return true;
      }
    }
  ], activate);
}
