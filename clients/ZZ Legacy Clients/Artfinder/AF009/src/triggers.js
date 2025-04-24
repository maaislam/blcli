/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', 'span.af-normal-text', '#product-description', '.af-underline-links', () => {
    let run = false;
    if (window.convert.$ && document.readyState == 'complete') {
        run = true;
    }
    return run;
}], activate);
