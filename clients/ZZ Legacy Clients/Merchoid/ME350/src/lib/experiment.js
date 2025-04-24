/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  let deliveryType;
  if(window.location.href.indexOf('/uk/') > -1) {
    deliveryType = 'delivery';
  } else {
    deliveryType = 'shipping';
  }

  const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
  const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');

  const priceBox = document.createElement('div');
    priceBox.classList.add(`${ID}-priceContainer`);
    priceBox.innerHTML = `
    <div class="${ID}-priceMsg">${window.priceFramingData.message}</div>
    <div class="${ID}-priceWrapper">
      <p class="${ID}-price">${currentPrice.textContent}</p>
      ${oldPrice ? `<span class="${ID}-wasPrice">${oldPrice.textContent}</span>` : ''}
    </div>
    <span class="${ID}-delivery">Price includes free ${deliveryType}</span>
    <div class="${ID}-priceIcon"><img src="${window.priceFramingData.icon}"/></div>`;

    document.querySelector('.product-info-main .product-info-price').insertAdjacentElement('beforebegin', priceBox);
};
