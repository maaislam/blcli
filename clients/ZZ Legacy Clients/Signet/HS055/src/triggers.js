/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
    () => {
        return !!window.digitalData.page.pageInfo.pageType;
    },
    () => {
        const pageType = window.digitalData.page.pageInfo.pageType;
        if(pageType === 'PDP' || pageType === 'Checkout') {
            return true;
        }
    }
],
 activate);
