/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
    '#group_1 .action-radio',
    '#group_2 [rel="a"] .action-radio',
    '#group_2 [rel="b"] .action-radio',
    '.groups .wrapper_action',
    '.path-a.single-path .wrapper-products',
    '#group_2 .buy_product.submit.button.btn-default',
    () => {
        return !!window.jQuery
    }
], activate);
