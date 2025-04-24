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
      // --- Reviews
      '#BVRRContainer',
      '#BVRRContainer ol.bv-content-list.bv-content-list-reviews',
      // '#BVRRContainer .bv-head-to-head-item',
      '#BVRRContainer ol.bv-content-list.bv-content-list-reviews li.bv-content-item.bv-content-review',
      '.bv-content-rating.bv-rating-ratio meta[itemprop="ratingValue"]',
      '.bv-content-summary .bv-content-summary-body-text p',
      // --- Price
      '#estore_product_price_widget',
      // --- Add
      '#add2CartBtn',
      () => {
        let runExperiment = false;

        if (document.querySelectorAll('#BVRRContainer ol.bv-content-list.bv-content-list-reviews li.bv-content-item.bv-content-review').length > 0) {
          runExperiment = true;
        }

        return runExperiment;
      },
    ], activate);
  }
}
