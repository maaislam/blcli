/**
 * BO101 - Buy Again SLP / PLP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.boots.com/health-pharmacy/hand-sanitiser-antibacterial-cleaners-disinfectants
 */

import { cookieOpt, setup, fireEvent, checkListProductsAndUpdate, getPreviouslyBoughtProducts, plpPageObserver, srpObserver } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import responseData from './responseData';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
  if (VARIATION == 'control') {
    fireEvent('Conditions Met - Control fired');
  } else if (VARIATION == '1') {
    fireEvent('Conditions Met - V1 fired');
    
    let prodListCount = 0;

    const productContainer = document.querySelector('.product_listing_container');
    let allProducts = productContainer.querySelectorAll('ul.grid_mode.grid li');

    // --- Test - Dummy Data
    // let prevOrderedProducts = ['10228384', '10272072', '10268977', '10289302', '10277214',
    // '10291592', '10163578', '10287464', '10275254', '10212891', '10237586001', '10298009'];
    
    // checkListProductsAndUpdate(allProducts, prevOrderedProducts, productContainer);

    /**
     * @desc Check if page is a PLP or SRP
     */
    if (window.location.href.indexOf('searchTerm') > -1) {

      // ----------- SRP -----------
      getPreviouslyBoughtProducts('srp');

      observer.connect(document.querySelector('ul.grid_mode.grid'), () => {
        if (document.querySelector('ul.grid_mode.grid[data-bo101-products]')) {
          // console.log('SOMETHING HAS CHANGED-------');
          let previouslyBoughtIDs = document.querySelector('ul.grid_mode.grid').getAttribute('data-bo101-products');
          previouslyBoughtIDs = previouslyBoughtIDs.split(",");

          setTimeout(() => {
            checkListProductsAndUpdate(previouslyBoughtIDs, productContainer);

            // ----------- SRP -----------
            srpObserver(prodListCount);
          }, 100);
          
        }
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
          // subtree: true,
        },
      });
    

    } else {

      document.querySelector('body').classList.add('BO101plp');

      // ----------- PLP -----------
      if (!document.querySelector(`body.${ID}-observerUrl`)) {
        getPreviouslyBoughtProducts('plp');

        observer.connect(document.querySelector('ul.grid_mode.grid'), () => {
          if (document.querySelector('ul.grid_mode.grid[data-bo101-products]')) {
            // console.log('SOMETHING HAS CHANGED-------');
            let previouslyBoughtIDs = document.querySelector('ul.grid_mode.grid').getAttribute('data-bo101-products');
            previouslyBoughtIDs = previouslyBoughtIDs.split(",");
            // console.log(previouslyBoughtIDs);

            setTimeout(() => {
              pollerLite([
                '.product_listing_container ul.grid_mode.grid li',
              ], checkListProductsAndUpdate(previouslyBoughtIDs, productContainer)); 
            }, 100);
            
          }
        }, {
          throttle: 200,
          config: {
            attributes: true,
            childList: false,
            // subtree: true,
          },
        });
        
        /**
         * @desc Observe URL changes and re-attach content observer
         * and new content
         */
        // plpPageObserver();
        let oldHref = document.location.href;
        let bodyList = document.querySelector("body");
        const observerUrl = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                      oldHref = document.location.href;
                      
                      observer.connect(document.querySelector('.product_listing_container ul'), () => {
                        // console.log('SOMETHING HAS CHANGED-------');
                        setTimeout(() => {
                          pollerLite([
                            '.product_listing_container',
                            '.product_listing_container ul li',
                          ], activate);
                        }, 100);
                        
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
        //=========

        document.querySelector('body').classList.add(`${ID}-observerUrl`);
      }
      
    }
  
  }

 
};


export default activate;
