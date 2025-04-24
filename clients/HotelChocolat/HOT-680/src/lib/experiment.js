/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

import discountOfferMessage from './components/discountOfferMessage';
import progressBar from './components/progressBar';
import { observeDOM } from './helpers/utils';

const showInBasket = true;
//const couponCode = 'HOHOHO';
const isCartEmpty = () => document.querySelector('.mini-cart-content.empty');
const { ID, VARIATION } = shared;

const init = () => {
  //console.log('init');
  if (isCartEmpty()) {
    const progressBanner = document.querySelector(`.${ID}__basketProgressCard`);
    if (progressBanner) progressBanner.remove();
    return;
  }
  //console.log('cart has items');
  //conditions met
  fireEvent('conditions met');
  const isMobile = () => document.querySelector('nav.stuckMenu');
  const thresholdPrice = 40;
  const location = window.location.href;
  const basketTotalPriceElem = document.querySelector('.mini-cart-subtotals .subtotal');
  const basketTotalPrice = basketTotalPriceElem ? +basketTotalPriceElem.textContent.replace('£', '') : 0;

  const isThresholdMet = basketTotalPrice < thresholdPrice;
  if (isThresholdMet) {
    fireEvent('user meets the threshold');
  }

  const progressWidth = (basketTotalPrice / thresholdPrice) * 100;
  const deductedPrice = isThresholdMet && (thresholdPrice - basketTotalPrice).toFixed(2);

  const discountProgressCardHtml = `
    <div class="${ID}__discountProgressCard">
      ${discountOfferMessage(ID, isThresholdMet, deductedPrice)}
      ${progressBar(ID, progressWidth.toFixed(2))}
    </div>
  `;

  if (showInBasket && location.includes('/basket') && !document.querySelector(`.${ID}__discountProgressCard`)) {
    const anchorPoint = document.querySelector('#page_heading');
    const appendPosition = isMobile() ? 'beforebegin' : 'afterend';
    anchorPoint.insertAdjacentHTML(appendPosition, discountProgressCardHtml);
    document.querySelector(`.${ID}__discountProgressCard`).classList.add(`${ID}__basketProgressCard`);

    if (isThresholdMet) return;

    // const couponInput = document.querySelector('.voucher-field input');
    // const couponApplyBtn = document.querySelector('#add-coupon');
    // const couponError = document.querySelector('.cart-coupon-code .coupon-error');
    // const discountApplied = document.querySelector('.order-discount.discount');

    // if (couponError.innerText.trim() !== '' || discountApplied) return;
    // //not working
    // couponInput.value = couponCode;
    // couponApplyBtn.click();
  } else if (!location.includes('/checkout') && !document.querySelector(`.${ID}__miniCartProgressCard`) && basketTotalPrice > 0) {
    const anchorPoint = document.querySelector('.mini-cart-header');
    anchorPoint.insertAdjacentHTML('afterend', discountProgressCardHtml);

    const miniCardProgressCard = document.querySelector(`.mini-cart-content .${ID}__discountProgressCard`);
    miniCardProgressCard.classList.add(`${ID}__miniCartProgressCard`);
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  setup();

  if (VARIATION === 'control') {
    if (!isCartEmpty()) {
      fireEvent('conditions met');
    }
    return;
  }

  init();

  const configObj = {
    childList: true,
    attributes: true,
    attributeFilter: ['class'],
  };
  //we will do this part from the AB tasty tool, we will trigger the experiment when the user hovers on the mini cart
  observeDOM('#mini-cart', init, configObj);

  // const miniCart = document.getElementById('mini-cart');
  // miniCart.addEventListener('pointerup', () => {
  //   fireEvent('user sees the threshold');
  // });
};
