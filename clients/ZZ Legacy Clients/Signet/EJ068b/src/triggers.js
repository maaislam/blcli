/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
'.product-buy-now__button .product-buy-now__text',
    () => {
        const selectBox = document.querySelector('.detail-page__payment-wrapper .product-step-up-down option');
        const ringSize = document.querySelector('.product-ring-size');
        if(selectBox) {
            return true;
        }
        if(ringSize) {
            return true;
        }
    }
], activate);
