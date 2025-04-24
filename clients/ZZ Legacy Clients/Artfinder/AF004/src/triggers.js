/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', 'input[name="csrfmiddlewaretoken"]', '#js-discount', () => {
    let run = false;
    if (window.convert.$) {
        run = true
    }
    return run;
}], activate);
