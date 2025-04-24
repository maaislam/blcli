

import countdown from './countdown';
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  const bottomContent = () => {
    let message;
    let deliveryText;
    let price;

    const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
    if(window.location.pathname.indexOf('/uk/') > -1) {
      deliveryText = 'delivery';
      price = '£5.99';
    } else if(currentPrice.textContent.indexOf('$') > -1){
      deliveryText = 'shipping';
      price = '$7.99';
    } if(currentPrice.textContent.indexOf('€') > -1){
      deliveryText = 'shipping';
      price = '€7,99';
    } 

    if(shared.VARIATION === 'control') {
      message = `Buy today and secure <span>free ${deliveryText}</span>`;
    } else if(shared.VARIATION === '1') {
        message = `<div class="${ID}-usp">Buy today and secure <span>free ${deliveryText}</span></div>
        <div class="${ID}-usp ${ID}-countdownUSP">Next orders dispatched in: <div class="${ID}-countdown"></div>`;
    } else if(shared.VARIATION === '2') {
      message = `<div class="${ID}-usp">Buy today and secure <span>free ${deliveryText}</span></div>
      <div class="${ID}-deliveryCost">No code needed; just add this product to your basket to secure free delivery worth <b>${price}</b></div>`;
    }

    return message;
  }


  const createPriceBox = () => {

    const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
    const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');

    // create new price box
    const priceBox = document.createElement('div');
    priceBox.classList.add(`${ID}-priceContainer`);
    priceBox.innerHTML = `
      <div class="${ID}-priceWrapper">
        <p>Only <b>${currentPrice.textContent}</b></p>
        ${oldPrice ? `<span>${oldPrice.textContent}</span>` : ''}
      </div>
      <div class="${ID}-contentBottom">${bottomContent()}</div>`;

    document.querySelector('.product-info-main .product-info-price').insertAdjacentElement('beforebegin', priceBox);



  }
  createPriceBox();
  if(shared.VARIATION === '1') {
    countdown();
  }
};
