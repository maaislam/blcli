/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    if(document.location.href === 'https://www.boots.com/online/pharmacy/delivery-option' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/delivery-option?') > -1) {
      pollerLite([
        'body', 
        '[class*="styles-module__radioGroup"]',
        '[class*="styles-module__optionContainer"]',
        '[class*="styles-module__description"]',
        '[class*="styles-module__checkBoxGroup"]',
      ], () =>{
          setTimeout(()=> {
              activate();
          }, 1000);
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
                      document.documentElement.classList.remove('BO103');
                      document.documentElement.classList.remove('BO103-1');
                      document.documentElement.classList.remove('BO103-control');
                      if(document.location.href === 'https://www.boots.com/online/pharmacy/delivery-option' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/delivery-option?') > -1) {
                          pollerLite([
                              'body', 
                              '[class*="styles-module__radioGroup"]',
                              '[class*="styles-module__optionContainer"]',
                              '[class*="styles-module__description"]',
                              '[class*="styles-module__checkBoxGroup"]',
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
