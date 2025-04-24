/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getCookie } from '../../../../lib/utils';

if(!getCookie('Synthetic_Testing')) {
  pollerLite(['body','.product_listings-stats > strong', '.estore_product_container', '.product_add .shopperActions', '#MiniShoppingCart',
    () => {
      return !!window.jQuery;
    },
    () => {
      return !!window.OnetrustActiveGroups;
    },
    () => {
        return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
    },
  ], () => {
    setTimeout(()=> {
        activate();
    }, 1000);
  });


  pollerLite(['body','.product_listings-stats > strong', '.estore_product_container', '.product_add .shopperActions', '#MiniShoppingCart',
  () => {
      return !!window.jQuery;
  },
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
      return !!window.jQuery && !!window.jQuery.fn && !!window.jQuery.fn.slick;
  },
], () => {

  const getIds = () => [].slice.call(document.querySelectorAll('.estore_product_container')).map(elm => elm.dataset.productid).join('');

  // for observer
  let oldHref = document.location.href;
  let oldIds = getIds();
  let bodyList = document.querySelector(".product_listing_container");
  let timeout = null;
  const observer = new MutationObserver(function(mutations) {
      clearTimeout(timeout);
      setTimeout(() => {
          
      
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href || oldIds != getIds()) {
                  oldHref = document.location.href;
                  oldIds = getIds();
                  document.body.classList.remove('BO063');
                 
                  const carousel = document.querySelector('#richRelevanceContainer');

                  if(carousel) {
                    carousel.remove();
                  }

                  pollerLite(['body','.product_listings-stats > strong', '.estore_product_container', '.product_add .shopperActions', '#MiniShoppingCart',
                  
                  ], () => {
                      setTimeout(()=> {
                          activate();

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
