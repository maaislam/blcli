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
      // --- Reviews Summary
      '#BVRRSummaryContainer',
      // --- Reviews - Container / Content
      '#BVRRContainer',
      '#BVRRContainer ol.bv-content-list.bv-content-list-reviews',
      '#BVRRContainer ol.bv-content-list.bv-content-list-reviews li.bv-content-item.bv-content-review',
      '.bv-content-rating.bv-rating-ratio meta[itemprop="ratingValue"]',
      '.bv-content-summary .bv-content-summary-body-text p',
      // --- Filter Button 
      'button.bv-content-btn.bv-filter-control.bv-expand-filter-button.bv-focusable',
    ], activate);
  }
}
