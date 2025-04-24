/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';



pollerLite(['body','.product_listing_container .grid_mode li', '.row.facetContainer', '#price_range_input #price_range_go',
() => {
    return !!window.jQuery;
},
() => {
    return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
},
], () =>{
    setTimeout(()=> {
        activate();
    }, 1000);
});


pollerLite(['body','.product_listing_container .grid_mode li', '.row.facetContainer', '#price_range_input #price_range_go',
() => {
    return !!window.jQuery;
},
() => {
    return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
},
], () => {

    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('BO062');
                    const filterBlock = document.querySelector('.BO062-heroFilters');
                    if(filterBlock) {
                        filterBlock.remove();
                    }
                    
                    pollerLite([
                        'body','.product_listing_container .grid_mode li', '.plp_gridView_redesign', '.row.facetContainer', '#price_range_input #price_range_go',
                        ], () =>{
                            setTimeout(()=> {
                                activate();
                            }, 3000);
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

