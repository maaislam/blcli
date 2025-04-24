/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { pollerLite } from '../../../../lib/uc-lib';

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if(!ieChecks) {
  pollerLite([
    'body',
    '.cart.item',
    '#maincontent',
    () => {
      if(document.querySelector('.cart.item')) {
        const allProducts = document.querySelectorAll(".cart.item");
        for (let index = 0; index < allProducts.length; index += 1) {
          const element = allProducts[index];
          if(element.querySelector('.product-item-name').textContent.indexOf('Christmas Jumper') > -1 || element.querySelector('.product-item-name').textContent.indexOf('Christmas Sweater') > -1) {
            return true;
          }
        }
      }
    }
  ], activate);
}
