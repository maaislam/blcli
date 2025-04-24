/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-price','.product-summary',
    () => {
        const SKUS = ['2467488', '9178090', '4981383', '9178082', '4981359', '1077198', '4981367', '3450805', '6939856', '2467720', '9552235', '4981391', '4981308', '2467674'];
        const productSKU = window.digitalData.product[0].productInfo.masterSku;
        if(SKUS.indexOf(productSKU) > -1) {
            return true;
        }
    },
    () => {
        return !!window.Swiper;
    },
], activate);
