/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';



pollerLite(['body','.product_listing_container .grid_mode li', '.estore_product_container', '.plp_gridView_redesign',
], () =>{
    setTimeout(()=> {
        activate();
    }, 1000);
});


pollerLite(['body','.product_listing_container .grid_mode li', '.estore_product_container', '.plp_gridView_redesign'], () => {

    const getIds = () => [].slice.call(document.querySelectorAll('.estore_product_container')).map(elm => elm.dataset.productid).join('');

     // for observer
     let oldHref = document.location.href;
     let oldIds = getIds();
     let bodyList = document.querySelector("body");
     const observer = new MutationObserver(function(mutations) {
             mutations.forEach(function(mutation) {
                 if (oldHref != document.location.href || oldIds != getIds()) {
                     oldHref = document.location.href;
                     oldIds = getIds();
                     document.body.classList.remove('BO059');
                    const allGridContent = document.querySelectorAll(`.BO059-block`);
                    const allLi = document.querySelectorAll(`.BO059-gridBlock`);
                    if(allGridContent) {
                        for (let index = 0; index < allGridContent.length; index++) {
                            const element = allGridContent[index];
                            element.remove();
                        }
                    }
                    if(allLi) {
                        for (let index = 0; index < allLi.length; index++) {
                            const element = allLi[index];
                            element.remove();
                        }
                    }
                    pollerLite([
                        'body','.product_listing_container .grid_mode li', '.estore_product_container', '.plp_gridView_redesign',
                        ], () =>{
                            setTimeout(()=> {
                                activate();
                            }, 1000);
                        });
                    
                }
            });
        });
    const config = {
        childList: true,
        subtree: true
    };
    
    observer.observe(bodyList, config);
});