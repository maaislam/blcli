/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
   


    pollerLite([
      'body',
      '.row.facetContainer',
      '.showing_products',
      '#productsFacets',
      '.grid_mode',
      '[id*=facetLabel]',
      '.facetCountContainer',
        () => {
            return !!window.jQuery;
        },
        ], () =>{
          setTimeout(() => {
            activate();
          },1000);
            
        });


        pollerLite([
          'body',
        '.row.facetContainer',
        '.showing_products',
        '#productsFacets',
        '.grid_mode',
        '[id*=facetLabel]',
        '.facetCountContainer',
          () => {
              return !!window.jQuery;
          },
          ], () => {

            // for observer
            let oldHref = document.location.href;
            let bodyList = document.querySelector("body");
            const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (oldHref != document.location.href) {
                            oldHref = document.location.href;
                            document.documentElement.classList.remove('BO143');
                            document.documentElement.classList.remove('BO143-control');
                            document.documentElement.classList.remove('BO143-1');
                            document.documentElement.classList.remove('BO143-2');
                            const filterBlock = document.querySelector('.BO143-filterBar');
                            const mobileFilter = document.querySelector('.BO143-sortFilter');

                            const allFilters = document.querySelectorAll('.BO143-filter');

                            for (let index = 0; index < allFilters.length; index++) {
                              const element = allFilters[index];
                              element.remove();
                            }

                            if(filterBlock) {
                                filterBlock.remove();
                            }
                            if(mobileFilter) {
                              mobileFilter.remove();
                            }

                            pollerLite([
                              'body',
                              '.row.facetContainer',
                              '.showing_products',
                              '#productsFacets',
                              '.grid_mode',
                              '[id*=facetLabel]',
                              '.facetCountContainer',
                  
                            ], () => {
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
  }
}
