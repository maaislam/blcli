/**
 * HC052 - PDP on-site offers
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, addBanner, getPromoData, generateCarouselContent, observeWindowWidthAndReload } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';
import offerPages from './offerPages';
import initiateSlick from './initiateSlick';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  if (VARIATION == '1') {
    let promoData = getPromoData();
    if (Object.keys(promoData).length > 0) {
      const newPromoMessageContainer = `<div class="${ID}-promoMixMatch__wrapper">
        <div class="${ID}-promoMixMatch__container">
          <h2>${promoData.promoHeader}</h2>
          <a href="${promoData.promoUrlPLP}">Shop all ${promoData.promoHeader} Mix & Match</a>
        </div>
      </div>`;

      document.querySelector('#product-content .promotion').insertAdjacentHTML('afterend', newPromoMessageContainer);

      // --- Hide Promo Message
      document.querySelector('#product-content .promotion').setAttribute('style', 'display: none;');
    }
  } else if (VARIATION == '2') {
    if (JSON.parse(sessionStorage.getItem(`${ID}-saved-products`)) == null) {
      let obj = {};
      sessionStorage.setItem(`${ID}-saved-products`, JSON.stringify(obj));
    }
    
    generateCarouselContent();

    pollerLite([
      `#${ID}-carousel-recommendations`,
      `#${ID}-carousel-recommendations .product-tile`,
      () => {
          const pdpUrl = window.location.pathname;
          const allOfferProducts = document.querySelectorAll(`#${ID}-carousel-recommendations .product-tile`);
          [].forEach.call(allOfferProducts, (prod) => {
            const prodUrl = prod.querySelector('a.thumb-link').getAttribute('href');
            // --- If current PDP Product exists in Carousel,
            // ---- then remove this product from the carousel
            if (pdpUrl.indexOf(`${prodUrl}`) > -1) {
              prod.parentNode.removeChild(prod);
            }
          });
          return true;
      }, 
    ], () => {
      // Initiate Slick
      initiateSlick();
    });

    observeWindowWidthAndReload();
    
  } else if (VARIATION == '3' || VARIATION == '4') {
    let promoData = getPromoData();

    const addToCartBtn = document.querySelector('button#add-to-cart');
    addToCartBtn.addEventListener('click', () => {
      let numOfItemsAdded = document.querySelector('.inventory .quantity input.input-group-qty').value;
      numOfItemsAdded = parseInt(numOfItemsAdded);

      observer.connect(document.querySelector('.minicart-total-qty'), () => {
        // console.log('---SOMETHING HAS CHANGED');
        let offerBannerText = '';
        // --- GET PDP PRODUCT DATA
        let productData = document.querySelector('input[name="productData"]').value
        let prodSku = JSON.parse(productData).productSKU;

        // --- GET BASKET CONTENT DATA
        let basketData = document.querySelector('input[name="cartData"]').value
        let basketContent = JSON.parse(basketData);
        let productsInBasket = basketContent.product;

        if (VARIATION == '3'
        && sessionStorage.getItem(`${ID}-promo-banner-shown-v${VARIATION}`) == null) {

          for (const [key, value] of Object.entries(productsInBasket)) {
            if (prodSku == value.product_SKU) {
              if (value.product_quantity < promoData.promoQty) {
                let prodPrice = value.product_price;
                let costOfProdAdded = value.product_quantity * prodPrice;
                let qtyDiff = promoData.promoQty - value.product_quantity;
                if (qtyDiff == 1) {
                  qtyDiff = 'one';
                } else if (qtyDiff == 2) {
                  qtyDiff = 'two';
                }
                let priceDiffOffer = promoData.promoPrice - costOfProdAdded;
                priceDiffOffer = Math.round(priceDiffOffer * 100) / 100;
                Number.prototype.countDecimals = function () {
                  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
                  return this.toString().split(".")[1].length || 0; 
                }
                if (priceDiffOffer.countDecimals() == 1) {
                  priceDiffOffer = `${priceDiffOffer}0`;
                } else if (priceDiffOffer.countDecimals() == 0) {
                  priceDiffOffer = `${priceDiffOffer}.00`;
                }
                offerBannerText = `<strong>Added to bag!</strong></br>${promoData.promoHeader} - add another ${qtyDiff} for just £${priceDiffOffer}`;
              }

              break;
            }
          }

          // --- add banner
          if (sessionStorage.getItem(`${ID}-promo-banner-shown-v${VARIATION}`) == null) {
            addBanner(offerBannerText);
          }
          
        } else if (VARIATION == '4'
        && sessionStorage.getItem(`${ID}-promo-banner-shown-v${VARIATION}`) == null) {
          // --- just add banner
          offerBannerText = `<strong>Added to bag!</strong></br><a href="${promoData.promoUrlPLP}">Shop all ${promoData.promoHeader} Mix & Match</a></br>`;
          if (sessionStorage.getItem(`${ID}-promo-banner-shown-v${VARIATION}`) == null) {
            addBanner(offerBannerText);
          }

          let prodExistsInBasket = false;
          let banner = document.querySelector(`.${ID}-topOfferBanner__wrapper`);
          for (const [key, value] of Object.entries(productsInBasket)) {
            if (prodSku == value.product_SKU) {
              prodExistsInBasket = true;

              if (value.product_quantity >= promoData.promoQty) {
                banner = document.querySelector(`.${ID}-topOfferBanner__wrapper`);
                if (banner) {
                  banner.setAttribute('style', 'display: none !important;');
                }
              }
            } 
            
          }
          banner = document.querySelector(`.${ID}-topOfferBanner__wrapper`);
          if (banner && !prodExistsInBasket) {
            banner.parentNode.removeChild(banner);
          }
          
        } else if (sessionStorage.getItem(`${ID}-promo-banner-shown-v${VARIATION}`) == "true") {
          /**
           * @desc If banner has already been shown, then hide it
           */
          banner = document.querySelector(`.${ID}-topOfferBanner__wrapper`);
          if (banner) {
            banner.setAttribute('style', 'display: none !important;');
          }
        }
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

};
