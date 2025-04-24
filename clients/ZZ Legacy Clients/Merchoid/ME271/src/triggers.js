/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product-info-main .product-info-price',
() => {
    if(window.location.href.indexOf('christmas-sweater-jumper') > -1) {
        return false;
    } else {
        return true;
    }
}
], activate);
