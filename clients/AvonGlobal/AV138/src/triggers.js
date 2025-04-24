/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  pollerLite([
    'body',
    '.mobile_version',
    '.mobile_scrolling_wrapper',
    () => {
      return document.querySelector('#v7_vue_pdp_detail .mobile_version .title_section p.title')?.textContent.includes('Glimmerstick');
    }
  ], activate);
}
