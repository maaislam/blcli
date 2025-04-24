/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

pollerLite([
  'body',
], activate);

pollerLite(['body'], () => {
    // for observer
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    document.body.classList.remove('SG112');
                    if(window.digitalData.page.pageInfo.pageType === 'Checkout') {
                        pollerLite(['body',
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

/*if(window.digitalData && window.digitalData.page.pageInfo.pageType === 'Checkout') {
  pollerLite([
    'body',
  ], activate);
} else {
  pollerLite([
    'body',
    '.footer__link',
  ], activate);
}


// basket observer
pollerLite(['body'], () => {
  // for observer
  let oldHref = document.location.href;
  let bodyList = document.querySelector("body");
  const observer = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href) {
                  oldHref = document.location.href;
                  document.body.classList.remove('SG113');
                  if(window.digitalData.page.pageInfo.pageType === 'Checkout') {
                      pollerLite(['body',
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
});*/
