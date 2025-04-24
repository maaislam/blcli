/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body',
    'meta[property="og:brand"]',
    '.product-usps-wrapper',
    () => {
        return !!window.dataLayer[0].ecommerce.detail.products[0].category;
    },
    () => {
        const title = document.querySelector('.page-title');
        if(title && title.textContent.toLowerCase().indexOf('preorder') === -1) {
            return true;
        }
    }
], activate);
