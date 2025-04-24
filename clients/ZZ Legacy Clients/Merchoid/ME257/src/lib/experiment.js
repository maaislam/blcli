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


  /**
   * Message to be shown based on variation
   */
  const bottomContent = () => {
    let message;

    let deliveryText;

    if(window.location.pathname.indexOf('/uk/') > -1) {
      deliveryText = 'delivery';
    } else {
      deliveryText = 'shipping';
    } 

    const brandText = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);

    if(shared.VARIATION === 'control') {
      message = `Buy today and secure <span>free ${deliveryText}</span>`;
    } else {
      if(brandText) {
        message = `To secure the best quality <span>${brandText}</span> merch online.`
      } else {
        message = `To secure the best quality merch online.`
      }
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
};
