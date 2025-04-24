/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-price','.product-summary',
    () => {
        const SKUS = ['4953665', '4956486', '4958632', '4953606', '4953541', '3506428', '6440983', '1003119', '1002821', '5129370', '6440967','1002880'];
        const productSKU = window.digitalData.product[0].productInfo.masterSku;
        if(SKUS.indexOf(productSKU) > -1) {
            return true;
        }
    },
    () => {
        return !!window.Swiper;
    },
], activate);
