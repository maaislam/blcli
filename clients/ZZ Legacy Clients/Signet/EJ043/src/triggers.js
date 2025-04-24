/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(
    ['body','#js-header',
        () => document && document.body,
        () => window.digitalData && window.digitalData.page && window.digitalData.page.category,
        () => {
            
            const SKU = window.digitalData.product[0].productInfo.productID;
            const allProducts = [
                '5085268',
                '8117357',
                '1142283',
                '4029879',
                '8344701',
                '9100725',
                '4316908',
                '8117233',
                '4603869',
                '8216673',
                '5514738',
                '8660174',
                '4684710',
                '9272615',
                '4922492',
                '9917179',
                '1711342',
                '1641301',
                '2624788',
                '4115007',
                '6435092',
                '5018285',
                '4743784'
            ];
    
            if(allProducts.indexOf(SKU) > -1) {
                return true;
            }
        },
        // () => window.digitalData.page.category.primaryCategory === 'Watches',
        // () => window.digitalData.product[0].price.currentPrice > 49.99,
        // () => {
        //     const dataBrand = window.digitalData.product[0].productInfo.productName;

        //     const subCat = window.digitalData.page.category.subCategory1;
        //     if ((dataBrand.indexOf('Marvel') === -1 && dataBrand.indexOf('Disney') === -1) && subCat !== 'Smart Watches') {
        //         return true;
        //     } 
        // }
    ],
 activate);
