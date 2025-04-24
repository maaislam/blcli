/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import heroFilters from './lib/components/filters/heroFilters';

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
      '.price_range_container.low_price_input_container #low_price_input',
      '.price_range_container.high_price_input_container #high_price_input',
        () => {
            return !!window.jQuery;
        },
        () => {
          return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
        },
        ], () =>{
         //setTimeout(() => {
            activate();
          //},1000);
        });


        pollerLite([
          'body',
          '.row.facetContainer',
          '.showing_products',
          '#productsFacets',
          '.grid_mode',
          '[id*=facetLabel]',
          '.facetCountContainer',
          '.price_range_container.low_price_input_container #low_price_input',
          '.price_range_container.high_price_input_container #high_price_input',
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
                            document.documentElement.classList.remove('BO166');
                            document.documentElement.classList.remove('BO166-control');
                            document.documentElement.classList.remove('BO166-1');
                            document.documentElement.classList.remove('BO166-2');
                            document.documentElement.classList.remove('BO166-3');
                            document.documentElement.classList.remove('BO166-4');
                            document.documentElement.classList.remove('BO166-fixedFilter');
                            document.documentElement.classList.remove('BO166-heroFilter');

                            const heroFilter = document.querySelector('.BO166-heroFilters')
                            const topFilters = document.querySelector('.BO166-filterBar');
                            const mobileFilter = document.querySelector('.BO66-sortFilter');
                            const allInGrid = document.querySelectorAll('.BO166-inGridBlock');

                            if(allInGrid) {
                              for (let index = 0; index < allInGrid.length; index++) {
                                const element = allInGrid[index];
                                element.remove();
                              }
                            }

                            if(heroFilter) {
                              heroFilter.remove();
                            }

                            if(topFilters) {
                              topFilters.remove();
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
                              '.price_range_container.low_price_input_container #low_price_input',
                              '.price_range_container.high_price_input_container #high_price_input',
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