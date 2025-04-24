/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-stock__message', '.product-summary',
    () => {
        return !!window.digitalData.product[0].productInfo.productID
    },
    () => {
        return !!window.digitalData.product[0].productInfo.brand
    },
    () => {
        return !!window.digitalData.product[0].productInfo.brand
    },
    () => {
        return !!window.digitalData.product[0].productInfo.stock;
    },
    () => {
        if(window.digitalData.product[0].price.currentPrice >= 500) {
            return true;
        }
    },
    () => {
        if(window.digitalData.product[0].productInfo.stock === 'yes') {
            return true;
        }
    },
    
], 
activate);
