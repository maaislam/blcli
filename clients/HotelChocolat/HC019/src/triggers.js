/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

window.addEventListener('load', () => {

    pollerLite([
    'body',
    '#BVRRSummaryContainer .bv-rating-ratio-number', 
    '.inventory',
    '#pid',
    '.product-col-1.product-image-container #thumbnails',
    '.slick-initialized',
    '.einstain-inited',
    '.einstain-inited .slick-active',
    () => !!(window.einstein && window.einstein.loaded),
    () => !!window.__zmags && !!window.zmagsJsonp,
    () => {
      
        return !!window.jQuery;
    }, 
    () => {
        if(typeof window.jQuery.fn.slick !== 'undefined') {
          return true;
        }
    },
    ], () => {
      window.einstein.loaded = true;
      activate();

    });
});
