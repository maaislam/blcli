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
  const actualDate = document.getElementById('js-update-delivery').innerText.replace(/(,)(\s).+/, '').trim();
  const countdownMessage = () => {
    const countdownMessaging = document.createElement('div');
    countdownMessaging.classList.add(`${ID}-countdown_message`);
    countdownMessaging.innerHTML = 
    `<span class="${ID}-stock">In Stock.</span>
    <p><b>Free</b> express <span class="nextdaytext"></span>delivery on ${actualDate} when ordered in the next <span class="${ID}-countdown"></span></p>
    `;
    const productInfo = document.querySelector('.product-summary');
    productInfo.appendChild(countdownMessaging);
  };

  countdownMessage();
  deliveryCountdown();

  if (document.querySelector(`.${ID}-countdown`).innerHTML.indexOf('days')) {
    document.querySelector('.nextdaytext').style.display = 'none';
  }

};
  