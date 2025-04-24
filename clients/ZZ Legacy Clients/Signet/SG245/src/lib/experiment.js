/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { observer, pollerLite } from '../../../../../lib/utils';
import { addProduct, addRequest, checkMainBasketProducts, checkMiniBasketProducts } from './helpers';

const { ID, VARIATION } = shared;

/**
 * Get Site from hoestname EJ or HS
 */
export const getSiteFromHostname = () => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  return window.location.hostname.indexOf('ernestjones') > -1 ? 'ernestjones' : 'hsamuel';
};

/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  const siteIdent = getSiteFromHostname();
  if(siteIdent) {
    document.documentElement.classList.add(siteIdent);
  }

 
  const checkSession = setInterval(function(){
    const { ID, VARIATION, CLIENT, LIVECODE } = shared;

    if(sessionStorage.getItem('analyticsDataSentFor') && sessionStorage.getItem('analyticsDataSentFor') === window.location.pathname) {
      if(typeof s !== 'undefined'){
        s.eVar111 = `${ID} - V${VARIATION}`;
        s.tl();
      }  
      clearInterval(checkSession);
    }
  }, 1000);

  var checkCS = setInterval(function () {
    if (window._uxa) {
       window._uxa = window._uxa || [];
       window._uxa.push(["trackDynamicVariable", {key: `${ID}`, value: `Variation ${VARIATION}`} ]);
       clearInterval(checkCS);
    }
  }, 800)
 
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if(VARIATION !== 'control') {
    let bonusProduct;
    if(window.bonusProduct) {
      bonusProduct = window.bonusProduct;
    } else {
      bonusProduct = {
          skusToMatch: ['1001604', '4816129'],
          sku: '1002821',
          token: 'b20ab47b-5f70-4357-a3f2-b3cc15da0a7c', // from PDP [name="CSRFToken"]
          name: "Bremont Argonaut Men's Blue Fabric Strap Watch",
          image: 'https://uat8.ernestjones.co.uk/productimages/processed/V-1002821_0_100.jpg?pristine=true',
          currentPrice: '£3,595.00',
          wasPrice: '£4,000.00', // delete if not on sale
          url: '#',
          miniBasket: true,
          basketPage: true,
      }
    }




    // If cart page
    if(window.location.href.indexOf("/cart") > -1) {
      if(window.bonusProduct.basketPage === true) {
        pollerLite(['.cart-list', '.product-item', 'input[name="productCode"]'], () => {
          if(checkMainBasketProducts(bonusProduct.skusToMatch)) {

            document.querySelector('.cart-list').insertAdjacentHTML('beforeend', addProduct(bonusProduct, 'basketPage'));

            document.querySelector(`.${ID}-bonus-product.${ID}-basketPage .add-cta`).addEventListener('click', () => {
              addRequest(bonusProduct.sku, bonusProduct.token).then(() => {
                sessionStorage.setItem('bonusAdded', true);
                fireEvent('Bonus product added on basket page', true);
                window.location.reload();
              });
            });   
          }
        });
      }
    }

    

    // If mini basket
    if(bonusProduct.miniBasket === true) {

      const removeUpsell = () => {
        if(document.querySelector(`.${ID}-bonus-product.${ID}-miniBasket`)) {
          document.querySelector(`.${ID}-bonus-product.${ID}-miniBasket`).remove();
        }
      }


      observer.connect(document.querySelector('#cart-popup-modal'), () => {
       
          pollerLite(['.mini-cart-list', '.mini-cart-item', '.mini-cart-item input[name="productCode"]'], () => {

            if(checkMiniBasketProducts(bonusProduct.skusToMatch)) {
              const products = addProduct(bonusProduct, 'miniBasket');

              setTimeout(() => {
                // remove product
                removeUpsell();
                document.querySelector('#cart-popup-modal .mini-cart-list').insertAdjacentHTML('afterend', products);

                // add to bag
                document.querySelector(`.${ID}-bonus-product.${ID}-miniBasket .add-cta`).addEventListener('click', () => {
                  addRequest(bonusProduct.sku, bonusProduct.token).then(() => {
                    sessionStorage.setItem('bonusAdded', true);
                    fireEvent('Bonus product added in mini basket', true);
                    window.location.reload();
                  });
                }); 
              }, 500);
              
            }
          });
        
      }, {
        throttle: 200,
        config: {
          attributes: true,
          childList: false,
          subTree: false
        },
      });
    }


    
    
  } else {
    // any control code here
  }
};
