/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
    if(window.location.href.indexOf('/sitesearch') > -1) {
        return true;
    }
}
], activate);
