/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

if(document.location.href.indexOf('checkout/#payment') > -1) {
pollerLite([
    'body', 
    '.payment-group .step-title', 
    '.billing-address-same-as-shipping-block input', 
    '.billing-address-form', 
],
    activate);
}


    pollerLite([
        'body', 
    ], () => {

        // for observer
        let oldHref = document.location.href;
        let bodyList = document.querySelector("body");
        const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (oldHref != document.location.href) {
                        oldHref = document.location.href;
                        document.body.classList.remove('ME276');
                        if(document.querySelector('.ME276-deliveryBox')) {
                            document.querySelector('.ME276-deliveryBox').remove();
                        }
                        if(document.querySelector('.ME276-billingTitle')) {
                            document.querySelector('.ME276-billingTitle').remove();
                        }
                        if(document.location.href.indexOf('checkout/#payment') > -1) {
                            pollerLite([
                                'body', 
                                '.payment-group .step-title', 
                                '.billing-address-same-as-shipping-block input', 
                                '.billing-address-form', 
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
    


