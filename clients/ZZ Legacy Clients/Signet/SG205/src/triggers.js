/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';
import shared from '../../../../core-files/shared';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  if(!document.documentElement.classList.contains(`${shared.ID}`)) {


    
      pollerLite([
        'body',
        '.product-description',
        '.product-gallery__image-container img',
        () => {
          return !!window.Swiper;
        },
        () => {
          if(document.querySelectorAll(".product-gallery__image-container img").length > 2) {
            return true
          }
        },
        () => {
          return !!window.digitalData
        },
        () => {
          let brandsArr  = ['Eternal Diamond', 'Arctic Light', 'The Diamond Story', 'Omega', 'Cartier', 'Breitling', 'TAG Heuer', 'Tudor', 'Bremont', 'Chanel', 'Bell & Ross', 'Longines', 'Montblanc', 'Maurice Lacroix', 'Rado', 'Raymond Weil', 'Gucci Watches', 'Zenith', 'Vera Wang Love'];
          const productBrand = window.digitalData.product[0].productInfo.brand;
          const excludedBrand = brandsArr.some(brand => productBrand.includes(brand));

          if(excludedBrand === false) {
            return true
          }
        },
        () => {
          if(window.location.href.toLowerCase().indexOf('diamond')) {
            if(window.digitalData.page.category.subCategory1 !== 'Rings') {
              return true
            }
          }
        },
        () => {
          if(window.location.href.toLowerCase().indexOf('engagement') === -1 || window.location.href.toLowerCase().indexOf('bridal+set') === -1 || window.location.href.toLowerCase().indexOf('wedding') === -1) {
            return true
          }
        }
      ], activate);
    
  }
}
