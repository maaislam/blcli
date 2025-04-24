/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(document.location.href.indexOf('/pharmacy/basket') > -1) {

    pollerLite(['#checkOutBasketForm .styles-module__checkoutSectionContainer--2HH6q', '.styles-modules__buttonContainer--WFg2B button','.styles-modules__container--e_0EB',
        () => {
            return !!window.Optanon
        },
    ], () => {
       activate();
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
                    document.body.classList.remove('BO071');
                    if(document.querySelector('.BO071-ctaBtn__wrapper')) {
                        document.querySelector('.BO071-ctaBtn__wrapper').remove();
                    }
                    if(document.location.href.indexOf('/pharmacy/basket') > -1) {
                        pollerLite(['#checkOutBasketForm .styles-module__checkoutSectionContainer--2HH6q', '.styles-modules__buttonContainer--WFg2B button', '.styles-modules__container--e_0EB',
                            () => {
                                return !!window.Optanon
                            },
                        ], () => {
                            activate();
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
