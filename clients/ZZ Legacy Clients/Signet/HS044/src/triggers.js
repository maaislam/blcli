/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const url = window.location.href;
pollerLite(['body', '#js-header',
 () => {
    if(url.indexOf('fitbit') > -1) {
        return false;
    } else {
        return true;
    }
 },
 () => {
    if(url.indexOf('/fitness-tracker-watches/') > -1) {
        return false;
    } else {
        return true;
    }
 },
], activate);
