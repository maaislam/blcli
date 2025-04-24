/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import { getSiteFromHostname } from './lib/services';

pollerLite([
  'body',
    '.product-specification',
    '.email-sign-up',
    '.detail-page__right-column',
    '.product-ring-size',
    '.product-gallery__image-container img',
    () => {
        return !!window.Swiper;
    },
    () => {
        return !!window.digitalData.product[0].productInfo.masterSku
    },
    () => {
        if(window.digitalData && window.digitalData.page.pageInfo.pageType === 'PDP' && window.digitalData.page.category.subCategory1 && window.digitalData.page.category.subCategory1 === 'Rings') {
            return true;
        }
    },
    () => {
      if(window.digitalData.product[0].price.currentPrice > 799) {
        return true
      }
    },
    () => {
      // make sure all the four c's exist
      let specs;
      if(getSiteFromHostname() === 'hsamuel') {
        specs = document.querySelectorAll('.product-specification .product-specification__item');
      } else {
        specs = document.querySelectorAll('.product-specification tr');
      }

      let numMatch = 0;

      for (let index = 0; index < specs.length; index += 1) {
          const element = specs[index];
          let specTitle;

          if(getSiteFromHostname() === 'hsamuel') {
            specTitle = element.querySelector('.product-specification__info');
            
          } else {
            specTitle = element.querySelector('td:first-child');
          }
          if(specTitle) {
              if(specTitle.innerText.trim() === 'Total diamond carat weight' || specTitle.innerText.trim() === 'Diamond colour' || specTitle.innerText.trim() === 'Stone shape' || specTitle.innerText.trim() === 'Diamond clarity') {
                numMatch += 1;
              }
          }
      }
      if(numMatch >= 4) {
          return true;
      } else {
       
          return false;
      }  
  }
], activate);
