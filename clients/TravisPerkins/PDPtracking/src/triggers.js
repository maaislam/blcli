/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body',
() => {
    const ga = window.ga;
    if(ga) {
        return true;
    }
},
() => {
    const dl = window.dataLayer;
    if(dl) {
        return true;
    }
},
() => {
    const url = window.location.href;
    if(url.indexOf('/p/')) {
        return true;
    }
},
], activate);
