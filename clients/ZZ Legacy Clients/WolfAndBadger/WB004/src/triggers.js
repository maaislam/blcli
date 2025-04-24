/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if (!document.body.classList.contains('WB004')) {
    var urlPath = window.location.pathname;
    if (urlPath.indexOf('checkout') < 1  && urlPath.indexOf('shopping-bag') < 1) {
        pollerLite(['body'], activate);
    } 
}

