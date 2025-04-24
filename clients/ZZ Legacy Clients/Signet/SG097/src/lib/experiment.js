/**
 * SG097 - Pin / Save Feature
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname, addPinsToProducts, generateSavedProductsElements, productPageFunctions } from './services';
import { events } from '../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import session from './session';

const { ID, VARIATION } = shared;

const activate = () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();
    function sessionCount(){
      if (localStorage.getItem("count") === null) {
      sessionStorage.setItem("count", 's');
      localStorage.setItem("count", 's');
      }
      else if (sessionStorage.getItem("count") === null) {
      var lsCount = localStorage.getItem("count");
      sessionStorage.setItem("count", lsCount + 's');
      localStorage.setItem("count", lsCount + 's');
      }
      else {
      }
      var sessionRetrieve = sessionStorage.getItem("count");
      return sessionRetrieve.length;
    }
    sessionCount();
    if(sessionCount() > 1) {
      // if second or more visit
      session.firstSession = false;
    }



    if(getSiteFromHostname() == 'ernestjones') {
      sessionStorage.setItem(`${ID}-pinSaveFeature`, true);
      // EJ-specific JS
      /**
       * @desc Generate Saved Products tab
       * and lightbox
       */
      generateSavedProductsElements();

      pollerLite(['section#list', 'ol#js-product-list'], () => {
        /**
         * @desc Adds Pins to each Product
         */
        addPinsToProducts();

        /**
         * @desc Product Pins Event Listeners
         * Add / Remove product from 'Saved Product'
         */
        const allPinIcons = document.querySelectorAll(`.${ID}-icon__wrapper`);
        let allProducts = document.querySelectorAll('ol#js-product-list li');
        // [].forEach.call(allPinIcons, icon => {
        [].forEach.call(allProducts, product => {
          // if (product.querySelector(`.${ID}-icon__wrapper`)) {
            const icon = product.querySelector(`.${ID}-icon__wrapper`);
            if (icon && !icon.classList.contains('eventAdded')) {
              icon.classList.add('eventAdded');
              icon.addEventListener('click', (e) => {
                
                icon.classList.toggle('active');
                const productTitle = product.querySelector('.product-tile__description').innerHTML;
                const productImg = product.querySelector('img.product-tile__image').getAttribute('src');
                let productUrl = product.querySelector('a.productLink').getAttribute('href');
                productUrl = `https://www.ernestjones.co.uk${productUrl}`;
                // new pathname
                productUrl = new URL(productUrl).pathname;
                const currentPrice = product.querySelector('.product-tile__current-price-container').outerHTML;
                let oldPrice = '';
                if (product.querySelector('.product-tile__price-history-container del')) {
                  oldPrice = product.querySelector('.product-tile__price-history-container del').outerHTML;
                }
                /**
                 * @desc Heart/Pin icon is ACTIVE
                 * Add new product to Saved list
                 */
                if (icon.classList.contains('active')) {
                 
                  events.send(`${ID} variation:${VARIATION}`, 'click', 'save product');
                  document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('show');
                  let savedProducts = null;
                  
                  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
                    savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
                    if (!savedProducts[`${productUrl}`]) {
                      savedProducts[`${productUrl}`] = {
                        'title': `${productTitle}`,
                        'img': `${productImg}`,
                        'url': `${productUrl}`,
                        'current-price': `${currentPrice}`,
                        'old-price': `${oldPrice}`,
                      };
                      localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
                    }
  
                  } else {
                    let productsToSave = {};
                    if (!productsToSave[`${productUrl}`]) {
                      productsToSave[`${productUrl}`] = {
                        'title': `${productTitle}`,
                        'img': `${productImg}`,
                        'url': `${productUrl}`,
                        'current-price': `${currentPrice}`,
                        'old-price': `${oldPrice}`,
                      };
                      localStorage.setItem(`${ID}-saved-products`, JSON.stringify(productsToSave));
                    }
                    
                  }
                  // console.log('[092] (+) HERE:');
                  // console.log(JSON.parse(localStorage.getItem(`${ID}-saved-products`)));
                /**
                 * @desc Heart/Pin icon is INACTIVE
                 * Remove product from Saved list
                 */
                } else {
                  // --- Checks localstorage if there are no more Saved Items
                  // console.log('[096] (-) HERE:');
                  // console.log(JSON.parse(localStorage.getItem(`${ID}-saved-products`)));
                  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
                    let savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
                    delete savedProducts[`${productUrl}`];
                    localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
                    if (Object.keys(savedProducts).length === 0) {
                      document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
                    }
  
                  } else {
                    document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
                  }
                  
                }
              });
            }
            
          // }
        });
      });


      /**
       * @desc PDP =======================
       */
      if (window.location.pathname.indexOf('/webstore/d/') > -1) {
          productPageFunctions();
      }

    }

    if(getSiteFromHostname() == 'hsamuel') {
      const hsamuelCode = () => {       
        // HS-specific JS
        sessionStorage.setItem(`${ID}-pinSaveFeature`, true);
        // EJ-specific JS
        /**
         * @desc Generate Saved Products tab
         * and lightbox
         */
        generateSavedProductsElements();

        pollerLite(['section#list', 'ol#js-product-list'], () => {
          /**
           * @desc Adds Pins to each Product
           */
          addPinsToProducts();

          /**
           * @desc Product Pins Event Listeners
           * Add / Remove product from 'Saved Product'
           */
          const allPinIcons = document.querySelectorAll(`.${ID}-icon__wrapper`);
          let allProducts = document.querySelectorAll('ol#js-product-list li');
          // [].forEach.call(allPinIcons, icon => {
          [].forEach.call(allProducts, product => {
            const icon = product.querySelector(`.${ID}-icon__wrapper`);
            if (icon && !icon.classList.contains('eventAdded')) {
              icon.classList.add('eventAdded');
              icon.addEventListener('click', (e) => {

                icon.classList.toggle('active');
                const productTitle = product.querySelector('.product-tile__description').innerHTML;
                const productImg = product.querySelector('img.product-tile__image').getAttribute('src');
                // const productUrl = product.querySelector('a.productLink').getAttribute('href');
                let productUrl = product.querySelector('a.productLink').getAttribute('href');
                productUrl = `https://www.hsamuel.co.uk${productUrl}`;
                // new pathname
                productUrl = new URL(productUrl).pathname;
                
                // let productUrl = product.querySelector('a.productLink').getAttribute('href');
                // console.log(productUrl);
                // // let urlParts = productUrl.split('/');
                // // if (urlParts[urlParts.length - 1] !== "") {
    
                // // }
                // console.log('+ + + +');
                // productUrl = `https://www.ernestjones.co.uk${productUrl}`;
                // // new pathname
                // productUrl = new URL(productUrl).pathname;
                // console.log(productUrl);
                // console.log('- - - - - - - -');
                let currentPrice = '';
                if (product.querySelector('.product-tile__pricing-container')) {
                  currentPrice = product.querySelector('.product-tile__pricing-container').outerHTML;
                }
                let oldPrice = '';
                if (product.querySelector('.product-tile__pricing-container del')) {
                  oldPrice = product.querySelector('.product-tile__pricing-container del').outerHTML;
                }
                /**
                 * @desc Heart/Pin icon is ACTIVE
                 * Add new product to Saved list
                 */
                if (icon.classList.contains('active')) {
                  events.send(`${ID} variation:${VARIATION}`, 'click', 'save product');
                  document.querySelector(`.${ID}-savedItems__wrapper`).classList.add('show');
                  let savedProducts = null;
                  
                  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
                    savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
                    if (!savedProducts[`${productUrl}`]) {
                      savedProducts[`${productUrl}`] = {
                        'title': `${productTitle}`,
                        'img': `${productImg}`,
                        'url': `${productUrl}`,
                        'current-price': `${currentPrice}`,
                        'old-price': `${oldPrice}`,
                      };
                      localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
                    }
    
                  } else {
                    let productsToSave = {};
                    if (!productsToSave[`${productUrl}`]) {
                      productsToSave[`${productUrl}`] = {
                        'title': `${productTitle}`,
                        'img': `${productImg}`,
                        'url': `${productUrl}`,
                        'current-price': `${currentPrice}`,
                        'old-price': `${oldPrice}`,
                      };
                      localStorage.setItem(`${ID}-saved-products`, JSON.stringify(productsToSave));
                    }
                    
                  }
                  // console.log('[092] (+) HERE:');
                  // console.log(JSON.parse(localStorage.getItem(`${ID}-saved-products`)));
                /**
                 * @desc Heart/Pin icon is INACTIVE
                 * Remove product from Saved list
                 */
                } else {
                  // --- Checks localstorage if there are no more Saved Items
                  // console.log('[096] (-) HERE:');
                  // console.log(JSON.parse(localStorage.getItem(`${ID}-saved-products`)));
                  if (JSON.parse(localStorage.getItem(`${ID}-saved-products`)) !== null) {
                    let savedProducts = JSON.parse(localStorage.getItem(`${ID}-saved-products`));
                    delete savedProducts[`${productUrl}`];
                    localStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
                    if (Object.keys(savedProducts).length === 0) {
                      document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
                    }
    
                  } else {
                    document.querySelector(`.${ID}-savedItems__wrapper`).classList.remove('show');
                  }
                  
                }
              });
            }
            

          });
        });


        /**
         * @desc PDP =======================
         */
        if (window.location.pathname.indexOf('/webstore/d/') > -1) {
          productPageFunctions();
        }
      };
      
      hsamuelCode();
      // pollerLite([
      //   () => !!window.jQuery,
      // ], hsamuelCode);
    }
  }


  var oldHref = document.location.href;
  var bodyList = document.querySelector("body");
  var observerUrl = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
              if (oldHref != document.location.href
                && document.location.href.indexOf('Pg') == -1) {
                  oldHref = document.location.href;
                    // activate();
                    window.location.reload();
                }
          });
      });
  var config = {
          childList: true,
          subtree: true
      };
  observerUrl.observe(bodyList, config);


  if (window.location.pathname.indexOf('/webstore/l/') > -1) {
    observer.connect(document.querySelector('section#list ol#js-product-list'), () => {
      // console.log('SOMETHING HAS CHANGED-------');
      // activate();
      // window.location.reload();
      activate();
    }, {
      throttle: 200,
      config: {
        attributes: false,
        childList: true,
        // subtree: true,
      },
    });
  }
};

export default activate;
