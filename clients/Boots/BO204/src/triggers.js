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
          '[class^="styles__description"]',
          '[class^="styles__heading"]',
          '#blueButtonOrderNow',
          '[class^="styles-module__transparentButton"]',
          '[class^="styles__image"]',
      ], () => {
          activate();
          
      });
    }
  }
}



pollerLite(['body'], () => {

  // for observer
  let oldHref = document.location.href;
  let bodyList = document.querySelector("body");
  const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href) {
                  oldHref = document.location.href;
                  document.documentElement.classList.remove('BO204');
                  if(document.querySelector('.BO204-order')) {
                      document.querySelector('.BO204-order').remove();
                  }
                  if(document.location.href === 'https://www.boots.com/online/pharmacy/' || document.location.href.indexOf('https://www.boots.com/online/pharmacy/?') > -1) {
                      pollerLite([
                        '[class^="styles__description"]',
                        '[class^="styles__heading"]',
                        '#blueButtonOrderNow',
                        '[class^="styles-module__transparentButton"]',
                        '[class^="styles__image"]',
                      ], () => {
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
