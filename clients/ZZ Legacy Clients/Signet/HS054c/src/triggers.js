/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-stock', '.product-name', '#basketForm', '.email-sign-up',
    () => {
        return !!window.digitalData.product[0].price.currentPrice;
    },
    () => {
        if(window.digitalData.product[0].price.currentPrice > 48.99) {
            return true;
        }
    },
    () => {
        return !!window.digitalData.page.category.primaryCategory;
    },
    () => {
        const cat = window.digitalData.page.category.primaryCategory;

        if(cat === 'Watches') {
            return true;
        }
    },
], 
activate);
