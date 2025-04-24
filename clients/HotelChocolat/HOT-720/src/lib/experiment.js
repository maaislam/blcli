/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { VARIATION } = shared;
const START_PRICE = 20;
const END_PRICE = 50;

const setDefaultDeliveryOption = () => {
  const nextDayShippingMethods = document.querySelectorAll('.shipping-methods .shipping-method label[for*="nextday-gb"]');

  if (nextDayShippingMethods.length > 0) {
    nextDayShippingMethods.forEach((nextDayshippingMethod) => {
      if (nextDayshippingMethod) {
        nextDayshippingMethod.click();
      }
    });
  }
};

const init = () => {
  const basketDataElem = document.querySelector('input[name="basketData"]');
  const basketData = JSON.parse(basketDataElem.value);

  if (basketData.order_items_total <= END_PRICE && basketData.order_items_total >= START_PRICE) {
    setup();
    fireEvent('Conditions Met');

    if (VARIATION == 'control') {
      return;
    }
    setDefaultDeliveryOption();
  }
};

export default () => {
  newEvents.initiate = true;
  newEvents.methods = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';
  init();
};
