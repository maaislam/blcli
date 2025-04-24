/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  const getText = () => {
    let deliveryText;
    if(window.location.href.indexOf('/uk/') > -1) {
      deliveryText = `Delivery: <span>£0.00</span>`;
    } else {
      deliveryText = `Price includes all taxes. Shipping: <span>$0.00</span>`;
    }
    return deliveryText;
  }

  const delivText = document.querySelector('.product-info-price > p');
  delivText.classList.add(`${ID}-deliveryText`);
  delivText.innerHTML = getText();

  
};
