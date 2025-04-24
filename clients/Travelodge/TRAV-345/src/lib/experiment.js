/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import timerWrapper from './components.js/timerWrapper';
import startCheckoutCountdown from './helpers/startCheckoutCountdown';

const { ID, VARIATION } = shared;

const arraysAreDifferent = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return true; // Different length means arrays are different
  }

  return arr1.some((item, index) => item !== arr2[index]);
};

const init = () => {
  const targetPoint = document.querySelector('#main');
  const allCheckoutBookingSummery = document.querySelectorAll('.checkout-booking-summary');
  const bookingArray = [];
  allCheckoutBookingSummery.forEach((booking, index) => {
    bookingArray.push(window.globalDataLayer[decodeURIComponent(`ocb${index + 1}`)]);
  });

  const modifiedBookingArray = bookingArray.map((booking) => decodeURIComponent(booking));

  if (modifiedBookingArray.length > 0 && !sessionStorage.getItem(`${ID}__bookingArray`))
    sessionStorage.setItem(`${ID}__bookingArray`, JSON.stringify(modifiedBookingArray));

  const getBookingArray = JSON.parse(sessionStorage.getItem(`${ID}__bookingArray`));

  if (
    arraysAreDifferent(modifiedBookingArray, getBookingArray) ||
    (!document.referrer.includes('https://www.travelodge.co.uk/checkout') && document.referrer !== '') ||
    sessionStorage.getItem('lastPage')
  ) {
    sessionStorage.removeItem(`${ID}-Remaining-Time`);
    sessionStorage.removeItem(`${ID}-Last-Updated`);
    sessionStorage.removeItem('lastPage');
  }

  sessionStorage.setItem(`${ID}__bookingArray`, JSON.stringify(modifiedBookingArray));

  if (sessionStorage.getItem(`${ID}__seenMsg`)) {
    return;
  }

  setup();

  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  if (!document.querySelector(`.${ID}__timerWrapper`)) {
    targetPoint.insertAdjacentHTML('beforebegin', timerWrapper(ID, VARIATION));
  }

  startCheckoutCountdown(ID, VARIATION);
};

export default () => {
  document.body.addEventListener('click', (e) => {
    const { target } = e;
    if (target.closest(`.${ID}__closeContent`)) {
      const clickedItem = target.closest(`.${ID}__closeContent`);
      const timerWrapper = clickedItem.closest(`.${ID}__timerWrapper`);
      timerWrapper && timerWrapper.remove();
      sessionStorage.setItem(`${ID}__seenMsg`, false);
      sessionStorage.removeItem(`${ID}-Remaining-Time`);
      sessionStorage.removeItem(`${ID}-Last-Updated`);
    }
  });

  init();
};
