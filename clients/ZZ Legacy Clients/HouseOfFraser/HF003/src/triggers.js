/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '#divBagItems', '.BodyWrap', () => {
    let run = false;
    const bagItems = document.getElementById('divBagItems');
    if (bagItems) {
        const bagItemsAtt = JSON.parse(bagItems.getAttribute('data-basket'));
        if (bagItemsAtt && bagItemsAtt.basketProductDetails &&  bagItemsAtt.basketProductDetails.length > 0) {
            run = true;
        }
    }
    return run;
}], activate);
