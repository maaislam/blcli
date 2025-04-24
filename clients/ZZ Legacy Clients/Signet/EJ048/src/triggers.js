/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-stock', '.product-name', '#basketForm',
    () => {
        return !!window.digitalData.product[0].productInfo.productID
    },
    () => {
        const primCat = window.digitalData.product[0].category.primaryCategory;
        const secCat = window.digitalData.product[0].category.subCategory1;
        let brand;
        if (window.digitalData.product[0].productInfo.brand){
            brand = window.digitalData.product[0].productInfo.brand;
        }
            if(primCat === "Jewellery" && secCat === "Rings") {
                return true;
            }
            else if (primCat === "Watches" && (/(Emporio Armani|BOSS|Hugo Boss|Michael Kors|Olivia Burton)/gmi.test(brand))) {
                return true;
            }
        },
], 
activate);
