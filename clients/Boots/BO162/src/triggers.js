/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!getCookie('Synthetic_Testing')) {
    pollerLite([
      'body',
      '.estore_product_container',
      '.product_offer.plp-promotion-redesign-container',
    ], activate);


    // obsever that checks for URL changes to refire the test, needed on pages where the page doesn't refresh on changes
    pollerLite(['body'], () => {  
      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;

                      // remove all changes made
                        document.documentElement.classList.remove('BO162');
                        document.documentElement.classList.remove('BO162-1');
                        document.documentElement.classList.remove('BO162-control');

                        // re add them
                      pollerLite([
                        'body',
                        '.estore_product_container',
                        '.product_offer.plp-promotion-redesign-container',
                      ], activate);

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
