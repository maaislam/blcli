/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {

  const urls = 
  [
    '/baby-child/mothercare-clothing/shop-all-baby-kids-clothing', 
    '/clinique/clinique-full-range',
    '/fragrance/perfume/all-perfume',
    '/pampers/pampers-full-range',
    '/toys',
    '/estee-lauder/estee-lauder-skincare',
    '/beauty/skincare/facial-skincare/moisturiser',
    '/slimfast/all-slimfast-products',
    '/liz-earle-/shop-all-liz-earle',
    '/beauty/hair/hair-dye/hair-dye-permanent',
  ]


  if(!getCookie('Synthetic_Testing')) {
    if(window.location.href.indexOf('#facet') === -1) {
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
            for (var i = 0; i < urls.length; i += 1) {
              if(window.location.href.indexOf(urls[i]) > -1) {
                  return true
              }
            }
          },
        () => {
          return !!window.jQuery
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
            if(!document.querySelector('.facetSelected')) {
              activate();
            }
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
                          document.documentElement.classList.remove('BO191');
                          document.documentElement.classList.remove('BO191-control');
                          document.documentElement.classList.remove('BO191-1');
                          document.documentElement.classList.remove('BO191-2');
                          document.documentElement.classList.remove('BO191-3');

                          
                          if(document.querySelector('.BO191-topLinks')) {
                            document.querySelector('.BO191-topLinks').remove();
                          }

                          if(document.querySelector('.productCarousel_2021')) {
                            window.jQuery('.productCarousel_2021').slick('resize');
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
                            () => {
                              if(!document.querySelector('.facetSelected')) {
                                  return true;
                              }
                          },
                          ], () => {
                              setTimeout(()=> {
                                if(!document.querySelector('.BO191-topLinks')) {
                                  if(!document.querySelector('.facetSelected')) {
                                    activate();
                                  }
                                }
                                  
                              }, 2000);
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
}
