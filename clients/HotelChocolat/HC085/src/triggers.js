/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import shared from '../../../../core-files/shared';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  const { ID, VARIATION } = shared;

  if(!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite([
      'body',
      '.cart-row',
      '.order-subtotal td',
      '#page_heading',
      '.item-details .name',
      () => {
        return !!window.jQuery
      }
    ], () => {
      activate();
    });


     // observer
     pollerLite(['body'], () => {
  
      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                      console.log('URL CHANGE')
                        document.documentElement.classList.remove('HC085');
                        document.documentElement.classList.remove('HC085-1');
                        document.documentElement.classList.remove('HC085-control');
                        if(document.querySelector(`.HC085-addonsBox`)) {
                          document.querySelector(`.HC085-addonsBox`).remove();
                        }
                      pollerLite([
                        'body',
                        '.cart-row',
                        '.order-subtotal td',
                        '#page_heading',
                        '.item-details .name',
                        () => {
                          return !!window.jQuery
                        }
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
