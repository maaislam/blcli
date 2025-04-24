/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite, observer } from '../../../../lib/utils';

if(!getCookie('Synthetic_Testing')) {
  pollerLite([
    'body',
    '#leftHandNav',
    '#productsFacets fieldset',
  () => {
    return !!window.OnetrustActiveGroups;
  },
  () => {
      return !!window.Optanon
  },
  ], activate);
}


pollerLite(['body'], () => {
  // for observer
  let oldHref = document.location.href;
  let bodyList = document.querySelector("body");
  const observerUrl = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href) {
                  oldHref = document.location.href;
                  document.body.classList.remove('BO080');
                  
                  pollerLite(['#leftHandNav', '#productsFacets fieldset',
                      () => {
                          return !!window.Optanon
                      },
                  ], () => {
                      activate();

                      observer.connect(document.querySelector('.product_listing_container ul.grid_mode.grid'), () => {
                        activate();
                      }, {
                        throttle: 200,
                        config: {
                          attributes: false,
                          childList: true,
                          // subtree: true,
                        },
                      });
                      
                  });
 
              }
          });
      });
  const config = {
      childList: true,
      subtree: true
  };
  
  observerUrl.observe(bodyList, config);
});
