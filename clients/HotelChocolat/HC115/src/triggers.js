/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from '../../../../core-files/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;


  if(!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite([
      'body',
    ], () => {

      const overThreeHundred = /.*(\?)(sz)(=)(3)[\d]{2}.*/;
      const overTwoHundred = /.*(\?)(sz)(=)(2)[\d]{2}.*/;
      const overOneHundred = /.*(\?)(sz)(=)(1)[\d]{2}.*/;
      const underHundred = /.*(\?)(sz)(=)[\d]{2}.*/;

      if (window.location.href.match(overThreeHundred)){

        setTimeout(() => {
          activate();
        }, 6000);

      }

      else if (window.location.href.match(overTwoHundred)){

        setTimeout(() => {
          activate();
        }, 5000);

      }

      else if (window.location.href.match(overOneHundred)){

        setTimeout(() => {
          activate();
        }, 4000);

      }

      else if (window.location.href.match(underHundred)){

        setTimeout(() => {
          activate();
        }, 3000);

      } else {
        activate();
      }
    });

    // For PLPs
    pollerLite(['body'], () => {
  
      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                        document.documentElement.classList.remove('HC115');
                        document.documentElement.classList.remove('HC115-1');
                        document.documentElement.classList.remove('HC115-2');
                        document.documentElement.classList.remove('HC115-3');
                        document.documentElement.classList.remove('HC115-control');
                        document.documentElement.classList.remove('running');

                        
                    
                          // PLP
                          pollerLite([
                            'body',
                            '.grid-tile .product-tile',
                            '.product-image',
                            '.quickview',
                            '.grid-tile input',
                            '.product-sales-price',
                            '#search-result-items',
                          ], () => {

                            const overThreeHundred = /.*(\?)(sz)(=)(3)[\d]{2}.*/;
                            const overTwoHundred = /.*(\?)(sz)(=)(2)[\d]{2}.*/;
                            const overOneHundred = /.*(\?)(sz)(=)(1)[\d]{2}.*/;
                            const underHundred = /.*(\?)(sz)(=)[\d]{2}.*/;

                            if (window.location.href.match(overThreeHundred)){

                              setTimeout(() => {
                                activate();
                              }, 6000);

                            }

                            else if (window.location.href.match(overTwoHundred)){

                              setTimeout(() => {
                                activate();
                              }, 5000);

                            }

                            else if (window.location.href.match(overOneHundred)){

                              setTimeout(() => {
                                activate();
                              }, 4000);

                            }

                            else if (window.location.href.match(underHundred)){

                              setTimeout(() => {
                                activate();
                              }, 3000);

                            } else {
                              setTimeout(() => {
                                activate();
                              }, 1000);
                            }
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
