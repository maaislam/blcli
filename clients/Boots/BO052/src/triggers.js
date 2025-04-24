/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (window.location.pathname.indexOf('OrderItemDisplay') > -1){
    pollerLite(['#basket_adcard'], activate);
}
else {
    pollerLite(['.row.template_row_spacer'], activate);
}




