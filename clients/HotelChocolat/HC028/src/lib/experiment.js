/**
 * HC028 - Basket Discount and Delivery
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.hotelchocolat.com/uk/basket
 */
import { setup, checkHiddenCouponField, deliveryInformationRebuild, generateCouponInputField } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';

const activate = () => {
  const { ID, VARIATION } = shared;

  setup();
  // console.log(`${ID} is running on the page >>>`);

  /**
   * @desc VOUCHER CODE
   */
  generateCouponInputField();
  checkHiddenCouponField();

  pollerLite([`.cart-coupon-code .toggleContent`], () => {
    //alert('element exists');
    const discountInputFieldEl = document.querySelector(`.cart-coupon-code .toggleContent`);
    // discountInputFieldEl.setAttribute('style', 'background-color: lightcoral;');
    const discountFieldWrapper = document.querySelector(`.${ID}-discountInput__wrapper`);
    const test = document.querySelector('.cart-options-box');

    // discountFieldWrapper.insertAdjacentElement('afterbegin', test);
  });


  /**
   * @desc DELIVERY INFO ------------
   */
  deliveryInformationRebuild();

  /**
   * @desc Coupon Code input
   * Make button black when input field is focused
   */
  observer.connect(document.querySelector(`#${ID}_cart_couponCode`), () => {
    // console.log('SOMETHING HAS CHANGED-------');
    if (document.querySelector(`#${ID}_cart_couponCode`).classList.contains('focus-visible')) {
      document.querySelector(`.${ID}-discountInput__row`).classList.add('focused');
    } else {
      document.querySelector(`.${ID}-discountInput__row`).classList.remove('focused');
    }
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};

export default activate;
