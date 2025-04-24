/**
 * HC042 - Global Recently Viewed
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, generateSavedProductsElements } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  const pathname = window.location.pathname;
  
  if (pathname.indexOf('/shop/') == -1) {
    /**
     * @desc Poll for PDP elements
     */
    pollerLite(['#page_heading h1',
    '.product-primary-image img.primary-image',
    '.price-wrapper .product-price .price-sales'], () => {
      const prodUrl = window.location.pathname;
      const prodTitle = document.querySelector('#page_heading h1').innerText.trim();
      const prodImage = document.querySelector('.product-primary-image img.primary-image').getAttribute('src');
      const prodPrice = document.querySelector('.price-wrapper .product-price .price-sales').innerText.trim();
      let savedProducts = '';
      if (JSON.parse(sessionStorage.getItem(`${ID}-saved-products`)) !== null) {
        savedProducts = JSON.parse(sessionStorage.getItem(`${ID}-saved-products`));
        if (!savedProducts[`${prodUrl}`]) {
          savedProducts[`${prodUrl}`] = {
            'title': `${prodTitle}`,
            'img': `${prodImage}`,
            'url': `${prodUrl}`,
            'price': `${prodPrice}`,
          };

          sessionStorage.setItem(`${ID}-saved-products`, JSON.stringify(savedProducts));
        }


      } else {
        let productsToSave = {};
        if (!productsToSave[`${prodUrl}`]) {
          productsToSave[`${prodUrl}`] = {
            'title': `${prodTitle}`,
            'img': `${prodImage}`,
            'url': `${prodUrl}`,
            'price': `${prodPrice}`,
          };
          sessionStorage.setItem(`${ID}-saved-products`, JSON.stringify(productsToSave));
        }
        
      }

      
    });
  }

  /**
   * @desc If there are RECENTLY VIEWED products stored in Session Storage
   * then add Recently Viewed tab and list
   */
  if (JSON.parse(sessionStorage.getItem(`${ID}-saved-products`)) !== null
  && sessionStorage.getItem(`${ID}-recentlyViewed-removed`) == null) {
    generateSavedProductsElements();
  }

  

  // // At end of code, reset window.einstein expect type array
  // window.einstein.loaded = [];
};
