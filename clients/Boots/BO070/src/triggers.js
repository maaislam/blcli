/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

/**
 * All pages
 */
if(!getCookie('Synthetic_Testing')) {
    /* all pages */
    pollerLite(['body', '#widget_minishopcart', '#MiniShoppingCart',
    () => {
        return !!window.jQuery;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
    ], activate);


    /* PLP observer */
    pollerLite(['body', '#widget_minishopcart', '.product_listing_container', '.product_add .shopperActions', '#MiniShoppingCart',
        () => {
            return !!window.jQuery;
        },
        () => {
            return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
        },
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
                        document.body.classList.remove('BO070');
                        document.body.classList.remove('BO070-PLP');
                        const minibasketOverlay = document.querySelector('.BO070-basketOverlay');
                        const minibasket = document.querySelector('.BO070-miniBasketWrapper');
                        const miniAdd = document.querySelector('.BO070-miniAdd');

                        if(minibasketOverlay) {
                            minibasketOverlay.remove();
                        }
                        if(minibasket) {
                            minibasket.remove();
                        }
                        if(miniAdd) {
                            miniAdd.remove();
                        }

                        pollerLite(['body','.product_listing_container .grid_mode li', '.estore_product_container', '.showing_products_current_range','.product_add .shopperActions', '#MiniShoppingCart',
                        
                        ], () => {
                            setTimeout(()=> {
                                activate();

                            }, 1000);
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
