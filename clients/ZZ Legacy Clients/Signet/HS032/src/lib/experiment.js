/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import deliveryCountdown from './deliveryCountdown';

export default () => {
  setup();
  const { ID } = shared;

  /**
   * If in stock, add the countdown
   */
  const actualDate = document.getElementById('js-update-delivery').innerText.trim();
 
  const countdownMessage = () => {
    const countdownMessaging = document.createElement('div');
    countdownMessaging.classList.add(`${ID}-countdown_message`);
    countdownMessaging.innerHTML = 
    `<span class="${ID}-stock">In Stock.</span>
    <p><b>Free</b> express delivery on <span class="${ID}-deliveryDate">${actualDate}</span> when ordered in the next <span class="${ID}-countdown"></span></p>
    `;
    const productInfo = document.querySelector('.product-summary');
    productInfo.appendChild(countdownMessaging);
  };

  countdownMessage();
  deliveryCountdown();



  // on change of the size dropdown, change the delivery date
  const sizeSelect = document.querySelector('#js-sku-change');
  if(sizeSelect) {
    sizeSelect.addEventListener('change', () => {
      const deliveryDate = document.querySelector(`.${ID}-deliveryDate`);
     
      setTimeout(() => {
        const newDate = document.getElementById('js-update-delivery').innerText.trim();
        deliveryDate.textContent = newDate;
      }, 1500);
    });
  }
};
  