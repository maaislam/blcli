/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(document.location.href.indexOf('new-to-boots-triage') > -1) {
    pollerLite([
        'body', 
        '.styles-module__pageContent--qMz8A',
        '#landing-page-blue-start-btn .styles-module__transparentButton--1QECb', 
        '#blueButtonYes', 
        () => {
            return !!window.Optanon
        },
        //'.optanon-alert-box-wrapper',  
    ], () =>{
        setTimeout(()=> {
            activate();
        }, 1000);
    });
}

pollerLite(['body'], () => {

    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('BO007');
                    if(document.location.href.indexOf('new-to-boots-triage') > -1) {
                        pollerLite([
                            'body', 
                            '.styles-module__pageContent--qMz8A',
                            '#landing-page-blue-start-btn .styles-module__transparentButton--1QECb', 
                            '#blueButtonYes',
                            () => {
                                return !!window.Optanon
                            },
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
});






