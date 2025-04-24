/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite, observer } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '.product_name>a',
      'span.plp-promotion-redesign',
      () => {
        let runExp = false;
        if (window.location.href.indexOf('searchTerm') > -1) {
          pollerLite(['.algolia-search .grid_mode .product_name>a'], () => {
            runExp = true;
          });
        } else if (window.dataLayer[1].event == "plpView") {
          pollerLite(['.product_listing_container'], () => {
            runExp = true;
          });
        }

        return runExp;
        
      }
    ], activate);


    const reRunExp = () => {
      observer.connect(document.querySelector('.product_listing_container ul.grid_mode'), () => {
        setTimeout(() => {
          activate();
        }, 500);
      }, {
        throttle: 200,
        config: {
          attributes: false,
          childList: true,
          // subtree: true,
        },
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
                      pollerLite([
                        'body',
                        '.product_name>a',
                        'span.plp-promotion-redesign',
                        () => {
                          let runExp = false;
                          if (window.location.href.indexOf('searchTerm') > -1) {
                            pollerLite(['.algolia-search .grid_mode .product_name>a'], () => {
                              runExp = true;
                            });
                          } else if (window.dataLayer[1].event == "plpView") {
                            pollerLite(['.product_listing_container'], () => {
                              runExp = true;
                            });
                          }
                  
                          return runExp;
                          
                        },
                        () => {
                          let runExp = false;
                          if (document.querySelectorAll('.plp_gridView_redesign ul li').length > 1) {
                            runExp = true;
                          }
                          return runExp;
                        },
                      ], reRunExp);                  

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
