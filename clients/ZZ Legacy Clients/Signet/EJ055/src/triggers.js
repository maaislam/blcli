/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body','.product-buy-now__button',
    () => {
        const inStore = document.querySelector('.detail-page__in-store');
        if(!inStore) {
            return true;
        }
    },
    () => {
        return !!window.digitalData.page.pageInfo.pageType;
    },
    () => {
        const pageType = window.digitalData.page.pageInfo.pageType;
        if(pageType === 'PDP') {
            return true;
        }
    },
],
 activate);
