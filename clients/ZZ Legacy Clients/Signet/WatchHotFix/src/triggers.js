/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(window.location.href.indexOf('ernestjones') > -1) {
    pollerLite(['body', '.usp-list .usp-list__item:nth-child(1)',
() => {
    return !!window.digitalData.product[0].productInfo.brand
}
], activate);
}

if(window.location.href.indexOf('hsamuel') > -1) {
    pollerLite(['body', '.product-propositions .product-propositions__item',
() => {
    return !!window.digitalData.product[0].productInfo.brand
}
], activate);
}

