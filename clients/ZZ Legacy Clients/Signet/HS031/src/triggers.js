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
        () => window.digitalData.page.category.primaryCategory === 'Watches',
        () => window.digitalData.product[0].price.currentPrice > 49.99,
        () => {
            const dataBrand = window.digitalData.product[0].productInfo.productName;

            const subCat = window.digitalData.page.category.subCategory1;
            if ((dataBrand.indexOf('Marvel') === -1 && dataBrand.indexOf('Disney') === -1) && subCat !== 'Smart Watches') {
                return true;
            } 
        }
    ],
 activate);
