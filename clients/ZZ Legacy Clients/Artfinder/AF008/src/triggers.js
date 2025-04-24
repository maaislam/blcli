/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '#results-container', '.accordion-navigation', () => {
    let run = false;
    if (window.dataLayer[0] && window.dataLayer[0].user_currency) {
        run = true;
    } 
    return run;
}, 
() => !!window.convert.$,
() => !!window.localStorage.getItem('uc_intentObject')], activate);
