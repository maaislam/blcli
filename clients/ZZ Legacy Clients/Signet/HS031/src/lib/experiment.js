/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';

export default () => {
  setup();
  
  const price = document.querySelector('.buying-info__price--current span');

  const productPrice = parseInt(price.textContent.replace('£',''), 10);
  
  let bannerMessage;
  if(productPrice >= 50 && productPrice <= 99) {
    bannerMessage = 'Save £10 on this watch, add to cart and use code <b>SAVE10</b>';
  }
  if(productPrice >= 100 && productPrice <= 249) {
    bannerMessage = 'Save £20 on this watch, add to cart and use code <b>SAVE20</b>';
  }
  if(productPrice >= 250) {
    bannerMessage = 'Save £50 on this watch, add to cart and use code <b>SAVE50</b>';
  }
  
  const offerMessage = document.createElement('div');
  offerMessage.classList.add('HS031-offer_banner');
  offerMessage.innerHTML = `<p>${bannerMessage}</p>`;

  const header = document.querySelector('#js-header');
  header.insertAdjacentElement('afterend', offerMessage);
};
