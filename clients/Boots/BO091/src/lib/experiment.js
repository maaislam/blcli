/**
 * BO091 - PLP lazy load
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getUrlParameter } from '../../../../../lib/utils';
import { cookieOpt, setup, generateExperimentContent, clickEvents, fireEvent } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import pageData from './pageData';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();
  
  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  if (VARIATION == 'control') {
    fireEvent(`Conditions Met - Experiment running - ${VARIATION}`);
  } else if (VARIATION == '1') {
    fireEvent(`Conditions Met - Experiment running - ${VARIATION}`);
    
    let url = window.location.href;

    generateExperimentContent();

    if (Object.keys(pageData.list).length > 0) {
      // --- Replace "Show X Products" on Header
      let showProductsRange = document.querySelector('.header_bar .showing_products .showing_products_current_range');
      let showProductsRangeText = showProductsRange.innerText.trim();
      showProductsRangeText = /- (.+)/.exec(showProductsRangeText)[1];
      showProductsRange.innerText = showProductsRangeText;
    }

    /**
     * @desc Observe URL changes and re-attach content observer
     * and new content
     */
    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observerUrl = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    
                    let currentPage = document.querySelector('.pageControl.number li a.current_state').innerText.trim();
                    // --- ADD LOADER
                    const loaderContainer = `<div class="${ID}-loader__wrapper">
                      <div class="${ID}-loader-pop-up">
                        <img src="https://www.boots.com/wcsstore/eBootsStorefrontAssetStore//images/boots/boots_loader_spinner.gif">
                      </div>
                    </div>`;
                    document.querySelector('.product_listing_container').insertAdjacentHTML('afterbegin', loaderContainer);
                    document.querySelector('#progress_bar').classList.add('hide');
                    
                    if (document.querySelector(`.product_listing_container ul.${ID}-latestList`)) {
                      const allTaggedLists = document.querySelectorAll(`.product_listing_container ul.${ID}-latestList`);
                      [].forEach.call(allTaggedLists, (taggedList) => {
                        taggedList.classList.remove(`${ID}-latestList`);
                      });
                    }
                    

                    /**
                     * @desc When NEW page products have loaded
                     * then re-add all previous product lists
                     */
                    observer.connect(document.querySelector('.product_listing_container'), () => {
                      document.querySelector('.product_listing_container ul').classList.add(`${ID}-latestList`);
                      let currentPage = document.querySelector('.pageControl.number li a.current_state').innerText.trim();
                      pageData.currentPage = currentPage;

                      for (var key in pageData.list) {
                        if (pageData.list.hasOwnProperty(key)) {
                          // document.querySelector('.product_listing_container').insertAdjacentElement('afterbegin', pageData.list[`${key}`]);
                          const allTaggedLists = document.querySelectorAll(`.product_listing_container ul.${ID}-latestList`);
                          allTaggedLists[allTaggedLists.length - 1].insertAdjacentElement('beforebegin', pageData.list[`${key}`]);
                        }
                      }

                      // --- Latest Product list addition
                      pollerLite(['.product_listing_container ul'], () => {
                        // --- On Load
                        document.querySelector('body').classList.add('bo-fixed');

                        const allListsOnPage = document.querySelectorAll('.product_listing_container ul');
                        const lastAddedList = allListsOnPage[allListsOnPage.length - 1];
                        // --- ADD LOADER
                        const loaderContainer = `<div class="${ID}-loader__wrapper">
                          <div class="${ID}-loader-pop-up">
                            <img src="https://www.boots.com/wcsstore/eBootsStorefrontAssetStore//images/boots/boots_loader_spinner.gif">
                          </div>
                        </div>`;
                        document.querySelector('.product_listing_container').insertAdjacentHTML('afterbegin', loaderContainer);

                        // --- Replace "Show X Products" on Header
                        let showProductsRange = document.querySelector('.header_bar .showing_products .showing_products_current_range');
                        let showProductsRangeText = showProductsRange.innerText.trim();
                        showProductsRangeText = /- (.+)/.exec(showProductsRangeText)[1];
                        showProductsRange.innerText = showProductsRangeText;

                        setTimeout(() => {
                          document.querySelector('body').classList.remove('bo-fixed');
                          
                          // --- Remove Loader
                          setTimeout(() => {
                            lastAddedList.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
                            setTimeout(() => {
                              document.querySelector(`.${ID}-loader__wrapper`).parentNode.removeChild(document.querySelector(`.${ID}-loader__wrapper`));
                            }, 250);
                          }, 100);
                          
                        }, 100);
                        
                      });
                      
                      // --- Re-add Progress Bar and View More CTA
                      let numOfProducts = document.querySelectorAll('.product_listing_container ul li').length;
                      let totalNumOfProducts = parseInt(document.querySelector('.showing_products_total').innerText.trim());
                      let progressPercentage = numOfProducts * 100 / totalNumOfProducts;
                      let progressBarContainer = `<div class="product_listing-progress-bar">
                        <p class="${ID}-progress-bar-viewed product_listing-progress-bar-viewed">Showing ${numOfProducts} of ${totalNumOfProducts}</p>
                        <span class="product_listing-progress-bar-indicator" style="background: linear-gradient(to right, #999999 0%,#999999 ${progressPercentage}%,#d0d0d0 ${progressPercentage}%,#d0d0d0 100%);/* margin: 12px auto 0; *//* width: 225px; *//* background: #d0d0d0; *//* height: 3px; *//* display: block; *//* border-radius: 3px; */"></span>
                      </div>
                      <button class="${ID}-results-btn-viewmore results-btn-viewmore">View more</button>`;
                      let paginationEl = document.querySelector('.pageControl.number');
                      paginationEl.insertAdjacentHTML('beforebegin', progressBarContainer);

                      // --- Check NEXT PAGE -- If this is the last page, hide "VIEW MORE" CTA
                      let next = parseInt(currentPage) + 1;
                      const nextPageResults = document.querySelector(`a#WC_SearchBasedNavigationResults_pagination_link_${next}_categoryResults`);

                      if (currentPage !== '1'
                      && parseInt(currentPage) !== document.querySelectorAll(`.product_listing_container ul`).length) {
                        document.querySelector(`.product_listing-progress-bar`).setAttribute('style', 'display: none;');
                        document.querySelector(`button.${ID}-results-btn-viewmore`).setAttribute('style', 'display: none;');
                        document.querySelector('.pageControl.number').setAttribute('style', 'display: block;');
                      } else if (currentPage !== '1' && !nextPageResults) {
                        document.querySelector(`button.${ID}-results-btn-viewmore`).setAttribute('style', 'display: none;');
                      }

                      // --- VIEW MORE -- CTA
                      document.querySelector(`.${ID}-results-btn-viewmore`).addEventListener('click', () => {
                        fireEvent('Click - View More CTA');
                        /**
                         * @desc Re-clone previous lists
                         */
                        setTimeout(() => {
                          let allProdListsNew = document.querySelectorAll(`.product_listing_container ul`);
                          let originalProds = '';
                          setTimeout(() => {
                            for (let i = 0; i < allProdListsNew.length; i += 1) {
                              let prodList = allProdListsNew[i];
                              originalProds = allProdListsNew[i].cloneNode(true);
                              pageData.list[`${i}`] = originalProds; 
                            }
                          }, 100);
                          
                        }, 100);
                        
                        let next = parseInt(currentPage) + 1;
                        const nextPageBtn = document.querySelector(`a#WC_SearchBasedNavigationResults_pagination_link_${next}_categoryResults`);
                        if (nextPageBtn) {
                          nextPageBtn.click();
                        }
                      });

                      // --- Re-add Click Events
                      setTimeout(() => {
                        clickEvents();
                      }, 3000);
                  
                    }, {
                      throttle: 200,
                      config: {
                        attributes: false,
                        childList: true,
                        // subtree: true,
                      },
                    });
                  ////////
                }
            });
        });
    const config = {
        childList: true,
        subtree: true
    };
    
    observerUrl.observe(bodyList, config);

  }
};
