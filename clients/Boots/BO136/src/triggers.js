/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
 import activate from './lib/experiment';
 import { getCookie, pollerLite } from '../../../../lib/utils';
 
 const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
 
 if(!ieChecks) {
   if(!getCookie('Synthetic_Testing')) {
    if(document.location.href === 'https://www.boots.com/online/pharmacy/' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/?') > -1) {
      pollerLite([
          'body', 
          '[class*="styles-module__primary"]',
          '[class*="styles-module__secondary"]',
          'header',
       ], () =>{
           setTimeout(()=> {
               activate();
           }, 500);
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
                       document.documentElement.classList.remove('BO136');
                       document.documentElement.classList.remove('BO136-1');
                       document.documentElement.classList.remove('BO136-control');

                       if(document.querySelector(`.BO136-homeContent`)) {
                        document.querySelector(`.BO136-homeContent`).remove();
                       }
                       if(document.querySelector('.BO136-lightboxModal')) {
                        document.querySelector('.BO136-lightboxModal').remove();
                       }
                       if(document.querySelector('.BO136-overlay')) {
                        document.querySelector('.BO136-overlay').remove();
                       }

                       if(document.location.href === 'https://www.boots.com/online/pharmacy/' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/?') > -1) {
                           pollerLite([
                               'body', 
                               'header',
                               '[class*="styles-module__primary"]',
                               '[class*="styles-module__secondary"]',
                           ], activate);
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
 