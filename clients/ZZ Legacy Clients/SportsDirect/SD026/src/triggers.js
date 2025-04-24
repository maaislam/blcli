/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
    'body',
    '.manuallyAddAddress',
    () => {
        let run = false;
        if (window.dataLayer && window.dataLayer[1]) {
            if (window.dataLayer[1].language) {
                if (window.dataLayer[1].language == 'en') {
                    run = true;
                } else if (window.dataLayer[1].language == 'fr') {
                    run = true;
                } else if (window.dataLayer[1].language == 'de') {
                    run = true;
                } else if (window.dataLayer[1].language == 'ie') {
                    run = true;
                }
            }

        }
        return run;
    }], activate);
