/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite(['body','.product_listing_container .grid_mode li', '.estore_product_container', '.showing_products_current_range','.product_add .shopperActions', '#MiniShoppingCart',
    ], activate);


   pollerLite(['body','.product_listing_container .grid_mode li', '.estore_product_container', '.showing_products_current_range','.product_add .shopperActions', '#MiniShoppingCart',
   
  ], () => {

        const getIds = () => [].slice.call(document.querySelectorAll('.estore_product_container')).map(elm => elm.dataset.productid).join('');

        // for observer
        let oldHref = document.location.href;
        let oldIds = getIds();
        let bodyList = document.querySelector(".product_listing_container");
        let timeout = null;
        const observer = new MutationObserver(function(mutations) {
            clearTimeout(timeout);
            setTimeout(() => {
                mutations.forEach(function(mutation) {
                    if (oldHref != document.location.href || oldIds != getIds()) {
                        oldHref = document.location.href;
                        oldIds = getIds();
                        document.documentElement.classList.remove('BO094');
                        const quickViewBox = document.querySelector('.BO094-quickView');
                        const allButtons = document.querySelectorAll('.BO094-quickViewCTA');
                        const overlay = document.querySelector('.BO094-overlay')

                        if(quickViewBox) {
                          quickViewBox.remove();
                        }
                        if(overlay) {
                          overlay.remove();
                        }

                        if(allButtons.length > 0) {
                          for (let index = 0; index < allButtons.length; index += 1) {
                            const element = allButtons[index];
                            element.remove();
                          }
                        }

                        pollerLite(['body','.product_listing_container .grid_mode li', '.estore_product_container', '.showing_products_current_range','.product_add .shopperActions', '#MiniShoppingCart',
                        
                        ], () => {
                            setTimeout(()=> {
                                activate();

                            }, 800);
                        });
                    }
                });
                }, 600);
            });
        const config = {
            throttle: 500,
            childList: true,
            subtree: false
        };
        
        observer.observe(bodyList, config);
    }); 
  }
}
