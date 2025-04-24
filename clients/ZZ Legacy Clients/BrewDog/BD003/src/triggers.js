/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', () => {
    let run = false;
    if (window.dataLayer && window.dataLayer[0] && window.dataLayer[0].customer) {
        run = true
    }
    return run;
}], activate);
