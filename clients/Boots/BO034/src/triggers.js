/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite(['body', '.product_listing_container .grid_mode li', '.estore_product_container',
], () =>{
    setTimeout(()=> {
        activate();
    }, 1000);
});


pollerLite(['body', '.product_listing_container .grid_mode li', '.estore_product_container',], () => {

    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('BO034');
                    const allGridContent = document.querySelectorAll(`.BO034-block`);
                    if(allGridContent) {
                        for (let index = 0; index < allGridContent.length; index++) {
                            const element = allGridContent[index];
                            element.remove();
                        }
                    }
                    if(document.location.href.indexOf('?searchTerm=mascara') > -1 || document.location.href.indexOf('/the-ordinary') > -1) {
                        pollerLite([
                            'body', '.product_listing_container .grid_mode li', '.estore_product_container',

                        ], () =>{
                            setTimeout(()=> {
                                activate();
                            }, 1000);
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
