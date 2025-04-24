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
    // recipe page
    if(window.location.href.indexOf('recipe') > -1) {
      // PDP
      pollerLite([
        'body',
        '.recipe-wrapper',
        '.button-fancy-large.add-all-to-cart',
        '.sub-product-item.add-to-cart',
        '.product-recipe-item',
        () => {
          if(!sessionStorage.getItem(`${ID}-over18`)) {
            return true;
          }
        }
      ], () => {
        activate();
      });

    //basket
    }

    else if(window.location.href.indexOf('.html') > -1) {
      // PDP
      pollerLite([
        'body',
        '#pid',
        '.button-fancy-large.add-to-cart',
        () => {
          if(!sessionStorage.getItem(`${ID}-over18`)) {
            return true;
          }
        }
      ], () => {
        activate();
      });

    //basket
    } else if(window.location.href.indexOf('/basket') > -1 || window.location.href.indexOf('/my-account') > -1) {

        // PLP
        pollerLite([
          'body',
          '.einstain-inited',
          '.einstein-small-slider-container .content-tile',
          '.slick-track',
          '.content-tile-image',
          '.content-tile.already-tracked.slick-slide.slick-current.slick-active',
          () => {
            if(!sessionStorage.getItem(`${ID}-over18`)) {
              return true;
            }
          }
        ], () => {
          activate();
        });
      
    } else {

      // PLP
      pollerLite([
        'body',
        '.grid-tile .product-tile',
        '.product-image',
        '.quickview',
        '.grid-tile input',
        () => {
          if(!sessionStorage.getItem(`${ID}-over18`)) {
            return true;
          }
        }
      ], () => {
        activate();
      });
    }


     // observer
     pollerLite(['body'], () => {
  
      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                        document.documentElement.classList.remove('HC089');
                        document.documentElement.classList.remove('HC089-1');
                        document.documentElement.classList.remove('HC089-control');
                        document.documentElement.classList.remove('HC089-alcohol');
                        document.documentElement.classList.remove('HC089-noRestriction');
                        if(document.querySelector(`.HC085-ageBox`)) {
                          document.querySelector(`.HC085-ageBox`).remove();
                        }

                        if(window.location.href.indexOf('.html') > -1) {
                          pollerLite([
                            'body',
                            '#pid',
                            '.button-fancy-large.add-to-cart',
                            () => {
                              if(!sessionStorage.getItem(`${ID}-over18`)) {
                                return true;
                              }
                            }
                          ], () => {
                            activate();
                          });
                        } else {
                    
                          // PLP
                          pollerLite([
                            'body',
                            '.grid-tile .product-tile',
                            '.product-image',
                            '.quickview',
                            '.grid-tile input',
                            () => {
                              if(!sessionStorage.getItem(`${ID}-over18`)) {
                                return true;
                              }
                            }
                          ], () => {
                            setTimeout(() => {
                              console.log('ran')
                              activate();
                            }, 500);
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
  }
}
