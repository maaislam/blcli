/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body',
    '.product-summary',
    '.order-summary__container',
    '.container .page-title',
    '.product-summary__description',
    '.container section',
    () => {
        return !!window.digitalData.page.pageInfo.pageType;
    }, 
    () => {
        if(window.digitalData.page.pageInfo.pageType === 'Checkout') {
            return true;
        }
    }
], activate);
