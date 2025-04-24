/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-stock__message', '.product-summary', '#js-update-delivery',
    () => {
        return !!window.digitalData.product[0].productInfo.productID
    },
    () => {
        return !!window.digitalData.product[0].productInfo.brand
    },
    () => {
        return !!window.digitalData.page.category.primaryCategory;
    },
    () => {
        return !!window.digitalData.product[0].productInfo.stock;
    },
    () => {
        if(window.digitalData.page.category.primaryCategory === 'Watches') {
            return true;
        }
    },
    () => {
        if(window.digitalData.product[0].productInfo.stock === 'yes') {
            return true;
        }
    },
    () => {
    const brand = window.digitalData.product[0].productInfo.brand;
    const allProducts = [
        'Omega', 'Breitling', 'TAG Heuer',
    ];
    
        if(allProducts.indexOf(brand) > -1) {
            return true;
        }
    },

    
], 
activate);
