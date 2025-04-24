/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/utils';

export default () => {
  setup();

  const currentURL = window.location.href;

  const urls = {
    'https://www.boots.com/botanics': 'https://www.boots.com/botanics/all-botanics-products', 
    'https://www.boots.com/yourgoodskin': 'https://www.boots.com/yourgoodskin/yourgoodskin-shop-all', 
    'https://www.boots.com/mark-hill': 'https://www.boots.com/mark-hill/all-mark-hill-products',
    'https://www.boots.com/botanics/': 'https://www.boots.com/botanics/all-botanics-products', 
    'https://www.boots.com/yourgoodskin/': 'https://www.boots.com/yourgoodskin/yourgoodskin-shop-all', 
    'https://www.boots.com/mark-hill/': 'https://www.boots.com/mark-hill/all-mark-hill-products',
  };

  if(urls[currentURL] && currentURL.indexOf('?=BO010') === -1) {
   window.location.href = urls[currentURL];
  }

  pollerLite(['.col12 .imgBanner'], () => {
    if(document.querySelector('.col12 .imgBanner')) {
      const banner = document.querySelector('.col12 .imgBanner');
      if(currentURL.indexOf('https://www.boots.com/yourgoodskin/yourgoodskin-shop-all') > -1) {
        banner.setAttribute('href', 'https://www.boots.com/yourgoodskin?=BO010');
      } 
      else if (currentURL.indexOf('https://www.boots.com/botanics/all-botanics-products') > -1) {
        banner.setAttribute('href', `https://www.boots.com/botanics?=BO010`);
      }
    }
  });
  
  pollerLite(['.col12 .brandHeader'], () => {
    if(currentURL.indexOf('https://www.boots.com/mark-hill/all-mark-hill-products') > -1) {
      const altbanner = document.querySelector('.col12 .brandHeader');
      altbanner.setAttribute('href', `https://www.boots.com/mark-hill?=BO010`);
      }
    });

};
