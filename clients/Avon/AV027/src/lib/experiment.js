/**
 * AV027 - PLP Usability Fixes
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getUrlParameterAvon } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { waitForApp, changePlpSortBy, angularContextWrap } from '../../../../../lib/utils/avon';

const { ID, VARIATION } = shared;

const SCROLL_ENABLED = false;

/**
 * Set the local session object
 */
const setObject = (distFromTop, productName) => {
  let sortBy = '';
  if (getUrlParameterAvon('sort') !== null) {
    sortBy = getUrlParameterAvon('sort');
  }
  
  let pageNum = '';
  if (getUrlParameterAvon('page') !== null) {
    pageNum = getUrlParameterAvon('page');
  }

  const productObj = {
    'url' : window.location.href,
    'distFromTop' : distFromTop,
    'productName' : productName,
    'sortBy' : sortBy,
    'page' : pageNum,
    'viewAll': $('[ng-controller="ProductListController"]')?.scope()?.ProductListState?.ViewAll ? 1 : 0
  };
  sessionStorage.setItem(`${shared.ID}-data`, JSON.stringify(productObj));
};

/**
 * Helper do scroll based on storedData
 */
const doScroll = (storedData) => {
  if(!SCROLL_ENABLED) {
    return false;
  }

  if(storedData && storedData['distFromTop'] && document.body.classList.contains('Layout_Desktop')) {
    window.scrollTo(0, storedData['distFromTop']);
  }
}

/**
 * Store data helper
 */
const storedDataHelper = (storedData) => {
  setTimeout(() => {
    const products = document.querySelectorAll('.ProductListCell');

    if(!document.body.classList.contains(`${ID}-unloaded-added`)) {
        document.body.classList.add(`${ID}-unloaded-added`);

        window.addEventListener('beforeunload', () => {
          setObject(window.scrollY, '');
        });
    } else {
      // roaa
      [].forEach.call(products, (product) => {
        const productImg = product.querySelector('.ProductImage');
        const productName = product.querySelector('.ProductDetailsTop a.ProductName').innerText;

        product.querySelector('.ProductListItem').addEventListener('click', function(e) {
          const isClickInside = product.contains(e.target);
          // alert(sortBy);
          // alert(page);
          if (isClickInside) {
            const productDistFromTop = document.documentElement.scrollTop;
            setObject(productDistFromTop, productName);
          }
        });
      });
    }

    //observer.connect(document.querySelector('.ProductList'), () => {
    //  activate();
    //}, {
    //  throttle: 200,
    //  config: {
    //    attributes: false,
    //    childList: true,
    //  },
    //});
  }, 2000);
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  const storedData = JSON.parse(sessionStorage.getItem(`${shared.ID}-data`));

  sessionStorage.removeItem(`${shared.ID}-data`);

  const url = window.location.href;

  let didFinish = false;

  // --------------------------------------------
  // Stored data is set
  // --------------------------------------------
  const pathname = window.location.pathname;
  if (storedData && storedData['url'].indexOf(`${pathname}#`) > -1 && storedData['url'] !== url) {

    events.send(`${ID}-${VARIATION}`, 'did-do-scroll');

    // --------------------------------------------
    // We're back on page 1 but the last URL
    // had filters applied to it
    // --------------------------------------------
    angularContextWrap(() => {
      if(storedData['sortBy']) {
        const filter = Number(storedData['sortBy']);
        changePlpSortBy(filter);
      }
    });

    setTimeout(() => {
      // --------------------------------------------
      // 1. Call ShowPage()
      // 2. Initialise the stored data helper checks
      // --------------------------------------------
      angularContextWrap(() => {
        pollerLite(['[ng-controller="ProductListController"]'], () => {
          const plpScope = $('[ng-controller="ProductListController"]').scope();
          
          // ----
          // [1]
          // ----
          if(storedData['page'] > 1) {
            plpScope.ShowPage(`${storedData['page']}`);

            if(storedData['sort']) {
              doScroll(storedData);
            } else { 
              window.AppModule.RootScope.$on('ProductListUI.FilteringFinished', () => {
                if(!didFinish) {
                  didFinish = true

                  doScroll(storedData);
                }
              });
            }
          } else {
            plpScope.ShowPage();

            doScroll(storedData);
          }

          // ----
          // [2]
          // ----
          pollerLite(['.ProductListCell'], () => {
            storedDataHelper(storedData);    
          });

        });
      }, 1000)
    }, 500);
    
    
  } else if (storedData && storedData['url'] === url) {

    events.send(`${ID}-${VARIATION}`, 'did-do-scroll');

    // --------------------------------------------
    // We're back on the page that was the
    // last page we visited
    // --------------------------------------------
    angularContextWrap(() => {
      // --------------------------------------------
      // Update sort param
      // --------------------------------------------
      if(storedData['sortBy']) {
        const filter = Number(storedData['sortBy']);
        changePlpSortBy(filter);
      }
    });

    setTimeout(() => {
      // --------------------------------------------
      // 1. Call ShowPage()
      // 2. Initialise the stored data helper checks
      // --------------------------------------------
      angularContextWrap(() => {
        pollerLite(['[ng-controller="ProductListController"]'], () => {
          const plpScope = $('[ng-controller="ProductListController"]').scope();
          
          // ----
          // [1]
          // ----
          if(storedData.viewAll == 1) {
            plpScope.ViewAllToggle();

            window.AppModule.RootScope.$on('ProductListUI.FilteringFinished', () => {
              if(!didFinish) {
                didFinish = true

                setTimeout(() => {
                  doScroll(storedData);
                }, 500);
              }
            });
          } else if(storedData['page'] > 1) {
            plpScope.ShowPage(`${storedData['page']}`);

            if(storedData['sort']) {
              setTimeout(() => {
                doScroll(storedData);
              }, 3000);
            } else { 
              window.AppModule.RootScope.$on('ProductListUI.FilteringFinished', () => {
                if(!didFinish) {
                  didFinish = true

                  setTimeout(() => {
                    doScroll(storedData);
                  }, 500);
                }
              });
            }
          } else {
            plpScope.ShowPage();

            doScroll(storedData);
          }

          // ----
          // [2]
          // ----
          pollerLite(['.ProductListCell'], () => {
            storedDataHelper(storedData);
          });

        });
      }, 1000)
    }, 500);
  } else {
    pollerLite(['.ProductListCell'], () => {
      storedDataHelper(storedData);
    });
  }
  
  
};

export default activate;
