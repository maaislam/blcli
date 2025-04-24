/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
 import activate from './lib/experiment';
 import {
   getCookie,
   pollerLite
 } from '../../../../lib/utils';
 
 const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
 
 if (!ieChecks) {
   if (!getCookie('Synthetic_Testing')) {
 
     function checkGrid() {
       if (document.querySelector('.grid_mode.grid').getAttribute('data-dojo-props').indexOf('{0:1') > -1 || document.querySelector('.facetSelected .filter_option')) {
         return false
       } else {
         activate();
       }
     }
 
 
     pollerLite(['body',
       '.product_listing_container .grid_mode.grid li',
       '.estore_product_container', '.showing_products_current_range',
       '#productsFacets #brand',
     ], () => {
       checkGrid();
       
     });
 
     pollerLite(['body',
       '.product_listing_container .grid_mode.grid li',
       '.estore_product_container', '.showing_products_current_range',
       '#productsFacets #brand',
     ], () => {
 
       const getIds = () => [].slice.call(document.querySelectorAll('.estore_product_container')).map(elm => elm.dataset.productid).join('');
 
       // for observer
       let oldHref = document.location.href;
       let oldIds = getIds();
       let bodyList = document.querySelector("body");
       let timeout = null;
       const observer = new MutationObserver(function (mutations) {
           clearTimeout(timeout);
           setTimeout(() => { 
             mutations.forEach(function (mutation) {
               if (oldHref != document.location.href || oldIds != getIds()) {
                 oldHref = document.location.href;
                 oldIds = getIds();
                 document.documentElement.classList.remove('BO098');
                 document.documentElement.classList.remove('BO098-1');
                 document.documentElement.classList.remove('BO098-2');
                 const block = document.querySelectorAll(`.BO098-inGridBlock`);
                 for (let index = 0; index < block.length; index += 1) {
                   const element = block[index];
                   if (element) {
                     element.remove();
                   }
                 }
 
                 pollerLite(['body',
                   '.product_listing_container .grid_mode.grid li',
                   '.estore_product_container', '.showing_products_current_range',
                   '#productsFacets #brand',
                 ], () => {
                   setTimeout(() => {
                      checkGrid();
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
 }
 