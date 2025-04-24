/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite(['body',
  '.product-info-main',
  '#maincontent',
  '#related-brand-products',
  'meta[property="og:brand"]',
  () => {
    return !!window.dataLayer[0].google_tag_params["ecomm_category"];
  }
], activate);
}
