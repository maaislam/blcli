/**
 * ME272 - Geeks Guide Imagery
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.merchoid.com/eu/geeks-guide-to-ugly-christmas-sweaterjumpers/
 */
import { setup, genderBasedSectionProducts, bannersClickEventListener } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import data from './data';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();
  window.scrollTo(window.scrollX, window.scrollY - 1);
  window.scrollTo(window.scrollX, window.scrollY + 1);

  // Write experiment code here
  if (VARIATION == '1') {
    const products = document.querySelectorAll('.products.wrapper.grid.products-grid .item.product.product-item');
    for (let index = 0; index < products.length; index += 1) {
      const element = products[index];
      // make image src that actual product image to avoid blank lazy load
      const imageData = element.querySelector('img').getAttribute('data-original');
      element.querySelector('img').setAttribute('src', imageData);
    }
    const allProducts = document.querySelectorAll('.guide-list-wrapper li.item.product.product-item');
    [].forEach.call(allProducts, (product) => {
      let url = product.querySelector('a.product.photo.product-item-photo').getAttribute('href');
      url = url.replace('https://www.merchoid.com/', '');
      let parts = url.split('/')
      const pathname = parts[1];
      if (typeof data[`${pathname}`] !== 'undefined') {
        const pImage = product.querySelector('img.lazy.product-image-photo');
        const newImg = data[`${pathname}`].first_img;
        product.querySelector('img.lazy.product-image-photo').src = newImg;
      }
    });

    const menContent = document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="men-banner"]');
    const womenContent = document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="women-banner"]');

    const allMenProducts = document.querySelectorAll('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="men-banner"] li.item.product.product-item');
    genderBasedSectionProducts(allMenProducts, 'male');
    const allWomenProducts = document.querySelectorAll('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="women-banner"] li.item.product.product-item');
    genderBasedSectionProducts(allWomenProducts, 'female');

    const himBannerCTA = document.querySelectorAll('.guide-gender-wrapper .banner-wrapper')[0];
    const herBannerCTA = document.querySelectorAll('.guide-gender-wrapper .banner-wrapper')[1];

    bannersClickEventListener(allProducts, himBannerCTA);
    bannersClickEventListener(allProducts, herBannerCTA);
  } else if (VARIATION == '2') {
    const products = document.querySelectorAll('.products.wrapper.grid.products-grid .item.product.product-item');
    for (let index = 0; index < products.length; index += 1) {
      const element = products[index];
      // make image src that actual product image to avoid blank lazy load
      const imageData = element.querySelector('img').getAttribute('data-original');
      element.querySelector('img').setAttribute('src', imageData);
    }
    const allProducts = document.querySelectorAll('.guide-list-wrapper li.item.product.product-item');

    const menContent = document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="men-banner"]');
    const womenContent = document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="women-banner"]');

    const allMenProducts = document.querySelectorAll('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="men-banner"] li.item.product.product-item');
    genderBasedSectionProducts(allMenProducts, 'male');
    const allWomenProducts = document.querySelectorAll('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="women-banner"] li.item.product.product-item');
    genderBasedSectionProducts(allWomenProducts, 'female');

    const himBannerCTA = document.querySelectorAll('.guide-gender-wrapper .banner-wrapper')[0];
    const herBannerCTA = document.querySelectorAll('.guide-gender-wrapper .banner-wrapper')[1];

    bannersClickEventListener(allProducts, himBannerCTA);
    bannersClickEventListener(allProducts, herBannerCTA);
  }

  

};


export default activate;
