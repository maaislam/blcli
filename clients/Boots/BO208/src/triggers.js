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
    pollerLite([
      'body', '.grid_mode.grid', '.product_listing_container .grid_mode li', '.estore_product_container'
    ], activate);

    pollerLite(['body', '.grid_mode.grid', '.product_listing_container .grid_mode li', '.estore_product_container'], () => {

      // for observer
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (oldHref != document.location.href) {
            oldHref = document.location.href;
            document.documentElement.classList.remove('BO208');
            document.documentElement.classList.remove('BO208-1');
            document.documentElement.classList.remove('BO208-search');
            document.documentElement.classList.remove('BO208-plp');
            const allGridContent = document.querySelectorAll(`.BO208-root`);
            if (allGridContent) {
              for (let index = 0; index < allGridContent.length; index++) {
                const element = allGridContent[index];
                element.remove();
              }
            }
            pollerLite([
              'body', '.grid_mode.grid', '.product_listing_container .grid_mode li', '.estore_product_container'
            ], () => {
              setTimeout(() => {
                activate();
              }, 2000);
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
  }
}
