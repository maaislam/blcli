/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body', 
    '.review-banner-conveyor-belt .slick-track',
    '.review-quote',
    '.as-seen-block .review-banner-fade .label',
    '.product-info-price',
    '.brand-section-header',
    /*() => {
        if(document.querySelector('#disabled-email-form-container')) {
            if(document.querySelector('#disabled-email-form-container').style.display !== 'block') {
                return true;
            }
        } else {
            return true;
        }
    },*/
    //() => {
        //return !!jQuery.fn.slick;
    //}, 
], activate);
