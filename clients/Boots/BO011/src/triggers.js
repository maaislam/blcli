/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
 import activate from './lib/experiment';
 import { getCookie, pollerLite } from '../../../../lib/utils';
 
 const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
 
 if(!ieChecks) {
   if(!getCookie('Synthetic_Testing')) {
     if(!document.documentElement.classList.contains('BO011')) {
 
         pollerLite([
            'body','#sold_out_text', '#estore_productpage_template_container', '#isInStock', '.rrItemContainer','.rrItemTitle',
            () => {
                return !!window.jQuery;
            },
            () => {
                return document.querySelector('#isInStock') && document.querySelector('#isInStock').value == 'false';
            },
            () => {
                var recommendedProducts = document.querySelector('#item_page.rec1rrItemsContainer');
                var othersViewed2 = document.querySelector('.rrPlacements');
                if(recommendedProducts || othersViewed2) {
                    return true
                }
            },
         ], activate);
     }
    }
 }
