/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.order-summary__row__divider', '#checkout-form-1', 'a.cta--secondary',
() => {
    const ga = window.ga;
    if(ga) {
        return true;
    }
},
() => {
    const digitalData = window.digitalData.cart.attributes.basketTotal;
    if(digitalData) {
        return true;
    }
},
], activate);
