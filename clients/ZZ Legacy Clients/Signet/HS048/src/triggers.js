/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-stock', '.product-name', '#basketForm', '#js-update-delivery',
    () => {
        return !!window.digitalData.product[0].productInfo.productID
    },
    () => { 
        if((document.getElementById('js-update-delivery') || {}).innerText){
        return true;
        }
    },
    () => {
        const primCat = window.digitalData.product[0].category.primaryCategory;
        const secCat = window.digitalData.product[0].category.subCategory1;

            if(primCat === "Jewellery" && secCat === "Rings") {
                return true;
            }
            else if (primCat === "Watches") {
                return true;
            }
        },
], 
activate);