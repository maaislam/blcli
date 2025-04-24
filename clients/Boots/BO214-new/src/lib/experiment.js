/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

import { is3For2, lastProductAdded, openDealBuilder, showBasketNotication } from './helpers';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  

  const getCurrBasketAmount = () => {

    return new Promise((resolve, reject) => {
  
      let headers = {
        siteid: 'UK',
        channel: 'Ecommerce',
        context: 'BASKET'
      };
  
      $.ajax({
        cache: true,
        type: 'GET',
        url: '/api/checkout/basket?calculatePromotions=true',
        data: '',
        headers: headers,
        dataType: 'json',
        success: function (returnedData) {
          if (returnedData) {
            let totalItemCount = returnedData.basketDetails?.totalItemCount ? returnedData.basketDetails.totalItemCount : 0;
  
            let basket = {
              totalItemCount: totalItemCount
            }
  
            resolve(basket);
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          if (textStatus != 'abort') console.error(textStatus + errorThrown);
          return null;
        }
      });
  
      
  
    });
  
  }

  let currTotalItems = 0;
    
  
  // if pdp, on add to bag click, wait for requeest then update storage
  pollerLite(['#estore_productpage_template_container', '#estore_product_title', '.pdp-promotion-redesign-container .pdp-promotion-redesign', '#productPageAdd2Cart'], () => {

    // if 3 for 2
    if(is3For2() && document.querySelector('#estore_product_title').textContent.indexOf('No7') > -1) {
      
      if(VARIATION === '1') {
        const overlay = `<div class="${ID}-overlay"></div>`;
        document.body.insertAdjacentHTML('beforeend', overlay);
      }

      const runTest = () =>{
         
        if(window.localStorage.dealProducts && JSON.parse(window.localStorage.dealProducts).length !== 3) {
          if(VARIATION === 'control') {
            fireEvent('3 for 2 - test would have fired', true);
          }

          if(VARIATION === '1') {
            // Deal builder
            fireEvent('3 for 2 - Open Deal Builder', true);
            openDealBuilder();
          }

          if(VARIATION === '2') {
            // basket message
            pollerLite(['#oct-notification-container', '.oct-notification__ctas'], () => {
              fireEvent('3 for 2 - Show Basket Message', true);
              showBasketNotication();
            });
          }         
        }
      }

      const addTobagCTA = document.querySelector('#productPageAdd2Cart');
      addTobagCTA.addEventListener('click', () => {
        window.addEventListener("add-to-basket:success", () => {
            let currentAmount;
            if(!document.querySelector('.oct-basket-icon__badge')) {
              currentAmount = 0;
            } else {
              currentAmount = parseInt(document.querySelector('.oct-basket-icon__badge').textContent, 10);
            }
            getCurrBasketAmount().then((basket) => {
              currTotalItems = basket.totalItemCount;
              if(currTotalItems > currentAmount) {
                lastProductAdded().then(() => {
                  runTest();
                });
              }
            });
      
        }, {once : true});
      });



      // If update qty
      const updateQty = document.querySelector('#in_stock_actions #increseQty');
      updateQty.addEventListener('click', () => {
        let currentAmount;
        if(!document.querySelector('.oct-basket-icon__badge')) {
          currentAmount = 0;
        } else {
          currentAmount = parseInt(document.querySelector('.oct-basket-icon__badge').textContent, 10);
        }

          window.addEventListener("oct-basket:updated", () => {
            getCurrBasketAmount().then((basket) => {
              currTotalItems = basket.totalItemCount;
              if(currTotalItems > currentAmount) {
                lastProductAdded().then(() => {
                  runTest();
                });
              }
            });
          });
      });

      // If decrease qty
      const decreaseQty = document.querySelector('#in_stock_actions #desreseQty');
      decreaseQty.addEventListener('click', () => {

        let currentAmount;
        if(!document.querySelector('.oct-basket-icon__badge')) {
          currentAmount = 0;
        } else {
          currentAmount = parseInt(document.querySelector('.oct-basket-icon__badge').textContent, 10);
        }

        window.addEventListener("oct-basket:updated", () => {
          getCurrBasketAmount().then((basket) => {
            currTotalItems = basket.totalItemCount;
            if(currTotalItems < currentAmount) {
              const products = JSON.parse(window.localStorage.dealProducts);
              products.splice(-1);
              window.localStorage.setItem('dealProducts', JSON.stringify(products));
            }
          });
        }, {once : true});
      });


      // if item full removed from qty
      // const removeItemFromBasket = document.querySelector('#basket_confirmation_button_yes');
      // removeItemFromBasket.addEventListener('click', () => {

      //   let currentAmount;
      //   if(!document.querySelector('.oct-basket-icon__badge')) {
      //     currentAmount = 0;
      //   } else {
      //     currentAmount = parseInt(document.querySelector('.oct-basket-icon__badge').textContent, 10);
      //   }

      //   window.addEventListener("update-basket:success", () => {

      //     getCurrBasketAmount().then((basket) => {
      //       currTotalItems = basket.totalItemCount;
      //       if(currTotalItems < currentAmount) {

      //         const products = JSON.parse(window.localStorage.dealProducts);
      //         const productName = document.querySelector('#estore_product_title h1').textContent.trim();
      //         const index = products.findIndex(e => e.name === productName);
      //         products.splice(index, 1);
    
      //         window.localStorage.dealProducts = JSON.stringify(products);
      //       }
      //     });
      //   }, {once : true});
      // });
    }
  });
  
  // if plp and added, remove from test
  pollerLite(['#estore_lister_template_container'], () => {
    window.addEventListener("add-to-basket:success", () => {
       //if(window.localStorage.dealProducts.length > 0){
          localStorage.setItem('3for2-exclude', true);
          fireEvent('Added on PLP - excluded from test', true);
       //}
    });
  });


  // if storage and product is removed, bucket out of test
  window.addEventListener("oct-basket:updated", () => {
    pollerLite(['.oct-basket-messagingRow', '.oct-products', '.oct-text.oct-basket-header__descriptionEnd', '.oct-product-buttons__remove-cta'], () => {

    if(window.localStorage.dealProducts.length > 0){
      const allProducts = document.querySelectorAll('.oct-product-tile');
      if(allProducts) {
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          if(element.querySelector('.oct-product-buttons__remove-cta')) {
            element.querySelector('.oct-product-buttons__remove-cta').addEventListener('click', () => {
              localStorage.setItem('3for2-exclude', true);
              fireEvent('Removed from basket - excluded from test', true);
            });
          }

          if(element.querySelectorAll('.oct-drop-down.oct-drop-down--small')[1]) {
            element.querySelectorAll('.oct-drop-down.oct-drop-down--small')[1].addEventListener('click', (e) => {
              localStorage.setItem('3for2-exclude', true);
              fireEvent('Basket changed - excluded from test', true);
            });
          }
        }
      }
    }
   });
      
  });

  
};
