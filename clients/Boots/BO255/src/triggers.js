/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
console.log('polling');
if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {

        if(window.location.href.indexOf('#facet') === -1) {
            pollerLite(['body','#productsFacets','.grid_mode','#estore_lister_template_container',
            () => {
                return !!window.jQuery;
            },
            () => {
                if(!document.querySelector('.facetSelected')) {
                    if (window.location.search.indexOf('promotionalText%5B0%5D=Save%2B10%2Bpercent%2Bon%2Bselected%2BBoots%2BBrand%2Bwith%2Byour%2BAdvantage%2BCard&promotionalText%5B1%5D=with%2BAdvantage%2BCard') > -1 || window.location.search.indexOf('promotionalText%5B0%5D=Save%2B10%2Bpercent%2Bon%2Bselected%2BBoots%2BBrand%2Bwith%2Byour%2BAdvantage%2BCard&promotionalText%5B1%5D=with%2BAdvantage%2BCard') > -1 || window.location.search.indexOf('promotionalText%5B0%5D=Save%2B10%2Bpercent%2Bon%2Bselected%2BBoots%2BBrand%2Bwith%2Byour%2BAdvantage%2BCard.%2BPrice%2BAdvantage%2Bprice%2Bdisplayed%2Bincludes%2Bthe%2B10%2Bpercent%2Boff.&promotionalText%5B1%5D=Save%2B10%2Bpercent%2Bon%2Bselected%2BBoots%2BBrand%2Bwith%2Byour%2BAdvantage%2BCard') > -1
                    ) {
                        return true;
                    }      
                }
            },
            
            ], () =>{
                setTimeout(()=> {
                    activate();
                }, 1000);
            });


            pollerLite(['body','#productsFacets','.grid_mode','#estore_lister_template_container',
            
            ], () => {

                // for observer
                let oldHref = document.location.href;
                let bodyList = document.querySelector("body");
                const observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if (oldHref != document.location.href) {
                                oldHref = document.location.href;
                                document.documentElement.classList.remove('BO255');
                                document.documentElement.classList.remove('BO255-1');
                                const filterBlock = document.querySelector('.BO255-heroFilters');
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

