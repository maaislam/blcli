/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';



if(document.location.href.indexOf('/pharmacy/basket') > -1) {

    pollerLite([
        '#checkOutBasketForm .styles-module__checkoutSectionContainer--2HH6q',
    ], () => {
        if(!document.querySelector('#checkOutBasketForm .styles-module__controlledDrugInfo--2ngG0 .styles-module__pill--1_okI')) {
            activate();
        }
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
                    document.body.classList.remove('BO065');
                    if(document.querySelector('.BO065-confirmationMsg')) {
                        document.querySelector('.BO065-confirmationMsg').remove();
                    }
                    if(document.location.href.indexOf('/pharmacy/basket') > -1) {
                        pollerLite([
                            '#checkOutBasketForm .styles-module__checkoutSectionContainer--2HH6q',
                        ], () => {
                            if(!document.querySelector('#checkOutBasketForm .styles-module__controlledDrugInfo--2ngG0 .styles-module__pill--1_okI')) {
                                activate();
                            }
                        });
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






