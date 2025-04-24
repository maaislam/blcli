/**
 * ME274 - Guarantee PDP
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.merchoid.com/uk/star-wars-baby-yoda-christmas-sweater-jumper/
 * https://www.merchoid.com/uk/game-of-thrones-winter-is-coming-stark-knitted-christmas-sweater-jumper/
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  // console.log(`${ID} is running >>>>`);

  let guaranteeMsgContainer = `<div class="${ID}-guarantee__wrapper">
    <div class="text"><span class="header"><strong>Not quite right?</strong></span><br><span>If you're not happy, you have <strong>100 days</strong> to</br>return your order for a</br>full refund.<span></div>
  </div>`;
  if (window.innerWidth <= 350) {
    guaranteeMsgContainer = `<div class="${ID}-guarantee__wrapper">
      <div class="text"><span class="header"><strong>Not quite right?</strong></span><br><span>If you're not happy, you have</br><strong>100 days</strong> to return your order</br>for a full refund.<span></span></span></div>
    </div>`;
  }
  document.querySelector('.product-add-form').insertAdjacentHTML('afterend', guaranteeMsgContainer);

  // pollerLite(['.product-preorder-date-wrapper'], () => {
    
  // });
};


export default activate;
