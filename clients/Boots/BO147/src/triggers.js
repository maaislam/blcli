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
        '[class*="styles__grid"] [class*="styles__labelledIcon"]',
        '[class*="styles__label"]',
      ], () =>{
          activate();
      });
    }

    if(document.location.href === 'https://www.boots.com/online/pharmacy//new-to-boots-triage' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/new-to-boots-triage?') > -1) {
      pollerLite([
        'body', 
        '[class*="styles-module__appContainer"]',
      ], () =>{
          activate();
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
                      document.documentElement.classList.remove('BO147');
                      document.documentElement.classList.remove('BO147-1');
                      document.documentElement.classList.remove('BO147-control');

                      if(document.querySelector('.BO147-triageContainer')) {
                        document.querySelector(`.BO147-triageContainer`).remove();
                      }
                     
                    
                      if(document.location.href === 'https://www.boots.com/online/pharmacy/' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/?') > -1) {
                          pollerLite([
                            'body', 
                            '[class*="styles__label"]',
                          ], () =>{
                             activate();
                          });
                        }
  
                        if(document.location.href === 'https://www.boots.com/online/pharmacy/new-to-boots-triage' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/new-to-boots-triage?') > -1) {
                          pollerLite([
                            'body', 
                            '[class*="styles-module__appContainer"]',
                          ], () =>{
                             activate();
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
