/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {


    if(window.location.href.indexOf('#facet') === -1) {
        pollerLite(['body','#productsFacets','.grid_mode','#estores_product_listing_widget',
        () => {
            return !!window.jQuery;
        },
        () => {
            if(!document.querySelector('.facetSelected')) {
                return true;
            }
        },
        () => {
            return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
        },
        ], () =>{
            setTimeout(()=> {
                activate();
            }, 1000);
        });


        pollerLite(['body','#productsFacets','.grid_mode','#estores_product_listing_widget',
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
                            document.documentElement.classList.remove('BO151');
                            document.documentElement.classList.remove('BO151-1');
                            const filterBlock = document.querySelector('.BO151-heroFilters');
                            if(filterBlock) {
                                filterBlock.remove();
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
    }

  }
}

