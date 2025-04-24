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
      if (document.querySelector('.grid_mode.grid').getAttribute('data-dojo-props').indexOf('{0:1') > -1 && window.location.href.indexOf('#facet') > -1) {
        return false
      } else {
        activate();
      }
    }


    pollerLite(['body',
      '.product_listing_container .grid_mode.grid li',
      '.estore_product_container', '.showing_products_current_range',
      '#productsFacets #price',
      '#productsFacets #rating',
    ], () => {
      checkGrid();
      
    });

    pollerLite(['body',
      '.product_listing_container .grid_mode.grid li',
      '.estore_product_container', '.showing_products_current_range',
      '#productsFacets #price',
      '#productsFacets #rating',
    ], () => {

      const getIds = () => [].slice.call(document.querySelectorAll('.estore_product_container')).map(elm => elm.dataset.productid).join('');

      // for observer
      let oldHref = document.location.href;
      let oldIds = getIds();
      let bodyList = document.querySelector(".product_listing_container");
      let timeout = null;
      const observer = new MutationObserver(function (mutations) {
        if(window.location.href.indexOf('#facet') === -1) {
          clearTimeout(timeout);
          setTimeout(() => { 
            mutations.forEach(function (mutation) {
              if (oldHref != document.location.href || oldIds != getIds()) {
                oldHref = document.location.href;
                oldIds = getIds();
                document.documentElement.classList.remove('BO095');
                document.documentElement.classList.remove('BO095-1');
                document.documentElement.classList.remove('BO095-2');
                document.documentElement.classList.remove('BO095-3');
                const block = document.querySelectorAll(`.BO095-inGridBlock`);
                for (let index = 0; index < block.length; index += 1) {
                  const element = block[index];
                  if (element) {
                    element.remove();
                  }
                }

                pollerLite(['body',
                  '.product_listing_container .grid_mode.grid li',
                  '.estore_product_container', '.showing_products_current_range',
                  '#productsFacets #price',
                  '#productsFacets #rating'
                ], () => {
                  setTimeout(() => {
                      checkGrid();
                  }, 1000);                
                });
              }
            });
          }, 600);
        }
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
