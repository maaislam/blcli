/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(document.location.href.indexOf('new-to-boots-triage') > -1) {
    pollerLite([
        'body', '.styles-module__pageContent--qMz8A',    
    ], activate);
}

// for observer
let oldHref = document.location.href;
const bodyList = document.querySelector("body");
const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (oldHref != document.location.href) {
                oldHref = document.location.href;
                document.body.classList.remove('BO007');
                if(document.location.href.indexOf('new-to-boots-triage') > -1) {
                    pollerLite([
                        'body', '.styles-module__pageContent--qMz8A',
                    ], activate);
                }
            }
        });
    });
const config = {
    childList: true,
    subtree: true
};
observer.observe(bodyList, config);
