import { fullStory } from '../../../../../lib/utils';
import shared from './shared';
import data from './data';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const genderBasedSectionProducts = (products, gender) => {
  const { ID, VARIATION } = shared;

  [].forEach.call(products, (product) => {
    let url = product.querySelector('a.product.photo.product-item-photo').getAttribute('href');
    url = url.replace('https://www.merchoid.com/', '');
    let parts = url.split('/')
    const pathname = parts[1];
    if (typeof data[`${pathname}`] !== 'undefined') {
      if (gender == 'male') {
        product.querySelector('img.lazy.product-image-photo').setAttribute('src', `${data[`${pathname}`].male_model}`)
      } else if (gender == 'female') {
        product.querySelector('img.lazy.product-image-photo').setAttribute('src', `${data[`${pathname}`].female_model}`)
      } 
    }
  });
};

export const bannersClickEventListener = (allProducts, bannerCTA) => {
  const { ID, VARIATION } = shared;

  bannerCTA.addEventListener('click', (e) => {
    if (!document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="men-banner"]').classList.contains('hidden')
    && document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="women-banner"]').classList.contains('hidden')) {
      [].forEach.call(allProducts, (product) => {
        let url = product.querySelector('a.product.photo.product-item-photo').getAttribute('href');
        url = url.replace('https://www.merchoid.com/', '');
        let parts = url.split('/')
        const pathname = parts[1];
        if (typeof data[`${pathname}`] !== 'undefined') {
          product.querySelector('img.lazy.product-image-photo').setAttribute('src', `${data[`${pathname}`].male_model}`)
        }
      });
    } else if (document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="men-banner"]').classList.contains('hidden')
    && !document.querySelector('.products.wrapper.grid.products-grid.gender-banner-products[data-banner-gender="women-banner"]').classList.contains('hidden')) {
      [].forEach.call(allProducts, (product) => {
        let url = product.querySelector('a.product.photo.product-item-photo').getAttribute('href');
        url = url.replace('https://www.merchoid.com/', '');
        let parts = url.split('/')
        const pathname = parts[1];
        if (typeof data[`${pathname}`] !== 'undefined') {
          product.querySelector('img.lazy.product-image-photo').setAttribute('src', `${data[`${pathname}`].female_model}`)
        }
      });
    } else {
      [].forEach.call(allProducts, (product) => {
        let url = product.querySelector('a.product.photo.product-item-photo').getAttribute('href');
        url = url.replace('https://www.merchoid.com/', '');
        let parts = url.split('/')
        const pathname = parts[1];
        if (typeof data[`${pathname}`] !== 'undefined') {
          if (VARIATION == '1') {
            product.querySelector('img.lazy.product-image-photo').setAttribute('src', `${data[`${pathname}`].first_img}`)
          } else if (VARIATION == '2') {
            product.querySelector('img.lazy.product-image-photo').setAttribute('src', `${data[`${pathname}`].original_img}`)
          }
          
        }
      });
    }
  });
};
