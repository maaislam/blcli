/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const PDPRE = /.*(-)([\d]{7,8}(p)|[\d]{7,8}).*/;
const PDPcode = window.location.pathname.match(PDPRE)[2];

const url = window.location.href
const urlToMatch = url.match(/((.com)(\/))([A-Za-z-]+)/)[4];

if(urlToMatch && PDPcode) {
  if(!ieChecks) {
    if(!getCookie('Synthetic_Testing')) {
      pollerLite([
        'body',
        '#estore_productpage_template_container',
        '#estore_product_title',
        '#estore_pdp_trcol_2',
        () => {
          if(typeof window.__algolia !== 'undefined') {
            return true;
          }
        }
      ], activate);
    }
  }
}
