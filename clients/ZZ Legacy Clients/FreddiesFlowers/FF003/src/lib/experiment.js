/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const dayOfTheWeek = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const daySuffix = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  21: 'st',
  22: 'nd',
  23: 'rd',
  31: 'st',
};

const getDeliveryDate = () => {
  // Now
  const today = new Date();
  const dateToDisplay = new Date();
  const currentHour = today.getHours();

  // Get the day that needs to be displayed
  currentHour < 10
    ? dateToDisplay.setDate(today.getDate() + 1)
    : dateToDisplay.setDate(today.getDate() + 8);

  // To display
  const day = dateToDisplay.getDate();
  const suffix = daySuffix[day] ?? 'th';
  const dayToDisplay = dayOfTheWeek[dateToDisplay.getDay()];
  const monthToDisplay = months[dateToDisplay.getMonth()];

  return `${dayToDisplay} ${day}${suffix} ${monthToDisplay}`;
};

const renderNewElement = () => {
  const billingSummaryElement = document.querySelector(
    '.orderSummary .orderSummary--billing'
  );

  if (
    billingSummaryElement &&
    document.querySelector('.card-details--container') // Only on the payment method page
  ) {
    billingSummaryElement.innerHTML = `And that's it. Hit the button below and your first box of fresh flowers will be with you on:`;

    const deliveryDateElement = document.querySelector(`.${ID}-delivery-date`);

    if (!deliveryDateElement) {
      billingSummaryElement.insertAdjacentHTML(
        'afterend',
        `<h4 class="${ID}-delivery-date">${getDeliveryDate()}</h4>`
      );

      document.querySelector(`.${ID}-delivery-date`).innerHTML =
        getDeliveryDate();
    } else {
      deliveryDateElement.innerHTML = getDeliveryDate();
    }
  }
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') return;

  const eventInterval = setInterval(function () {
    // Fire event only on the payment method page
    if (document.querySelector('.card-details--container')) {
      fireEvent(`FF003 - Delivery Day: ${getDeliveryDate()}`);
      clearInterval(eventInterval);
    }
  }, 1000);

  renderNewElement();

  setInterval(function () {
    renderNewElement();
  }, 1000);
};
