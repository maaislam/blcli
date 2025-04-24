/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.items .product-tile-list__item', 
() => {
    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
        return true;
    }
}
], activate);
