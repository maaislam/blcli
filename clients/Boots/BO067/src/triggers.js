/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

// PLP
pollerLite(['body', '#widget_minishopcart', '#estores_product_listing_widget', '.product_listing_container', '#estore_category_heading', '.product_add .shopperActions',
() => {
     return !!window.jQuery
},
], () => {
     setTimeout(()=> {
          activate();
     }, 1000);
});

// PDP
pollerLite(['body', '#widget_minishopcart', '#estore_productpage_template_container', '#productPageAdd2Cart',
() => {
     return !!window.jQuery
},
], activate);

/* PLP observer */
pollerLite(['body', '#widget_minishopcart', '#estores_product_listing_widget', '.product_listing_container', '#estore_category_heading', '.product_add .shopperActions'], () => {

    const getIds = () => [].slice.call(document.querySelectorAll('.estore_product_container')).map(elm => elm.dataset.productid).join('');

     // for observer
     let oldHref = document.location.href;
     let oldIds = getIds();
     let bodyList = document.querySelector("body");
     const observer = new MutationObserver(function(mutations) {
             mutations.forEach(function(mutation) {
                 if (oldHref != document.location.href || oldIds != getIds()) {
                     oldHref = document.location.href;
                     oldIds = getIds();
                     document.body.classList.remove('BO067');
                     const GridContent = document.querySelectorAll(`.BO067-quickBuy`);
                     for (let index = 0; index < GridContent.length; index +=1 ) {
                          const element = GridContent[index];
                          if(element) {
                              element.remove();
                           }
                     } pollerLite(['body','.product_listing_container .grid_mode li', '.estore_product_container', '.showing_products_current_range','.product_add .shopperActions',
                     
                    ], () => {
                         setTimeout(()=> {
                              console.log('obs active');
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
