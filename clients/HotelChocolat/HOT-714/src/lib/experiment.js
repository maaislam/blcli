/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const calendarImg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M16.417 2.49984H13.667V2.08317C13.667 1.24984 13.0003 0.666504 12.2503 0.666504C11.5003 0.666504 10.8337 1.24984 10.8337 2.08317V2.49984H7.16699V2.08317C7.16699 1.24984 6.50033 0.666504 5.75033 0.666504C5.00033 0.666504 4.33366 1.24984 4.33366 2.08317V2.49984H1.58366C1.08366 2.49984 0.666992 2.9165 0.666992 3.4165V4.49984V5.33317V16.3332C0.666992 16.9165 1.08366 17.3332 1.58366 17.3332H16.417C16.917 17.3332 17.3337 16.9165 17.3337 16.3332V5.33317V4.49984V3.4165C17.3337 2.9165 16.917 2.49984 16.417 2.49984ZM11.7503 2.49984V2.08317C11.7503 1.80734 11.9745 1.58317 12.2503 1.58317C12.5003 1.58317 12.7503 1.74984 12.7503 2.08317V2.49984V3.9165C12.7503 4.1665 12.5837 4.4165 12.2503 4.4165C12.0003 4.4165 11.7503 4.24984 11.7503 3.9165V2.49984ZM5.25033 2.49984V2.08317C5.33366 1.83317 5.50033 1.58317 5.75033 1.58317C6.00033 1.58317 6.25033 1.74984 6.25033 2.08317V2.49984V3.9165C6.25033 4.1665 6.08366 4.4165 5.75033 4.4165C5.50033 4.4165 5.25033 4.24984 5.25033 3.9165V2.49984ZM16.417 16.3332H1.58366V5.49984H16.417V16.3332Z" fill="black"/>
<path d="M4.33366 10.7495H3.50033C3.00033 10.7495 2.66699 10.4162 2.66699 9.91618V9.08285C2.66699 8.58285 3.00033 8.24951 3.50033 8.24951H4.33366C4.83366 8.24951 5.16699 8.58285 5.16699 9.08285V9.91618C5.16699 10.3328 4.75033 10.7495 4.33366 10.7495Z" fill="black"/>
<path d="M7.75065 10.7495H6.91732C6.41732 10.7495 6.08398 10.4162 6.08398 9.91618V9.08285C6.08398 8.58285 6.41732 8.24951 6.91732 8.24951H7.75065C8.25065 8.24951 8.58398 8.58285 8.58398 9.08285V9.91618C8.58398 10.3328 8.16732 10.7495 7.75065 10.7495Z" fill="black"/>
<path d="M11.0837 10.7495H10.2503C9.75033 10.7495 9.41699 10.4162 9.41699 9.91618V9.08285C9.41699 8.58285 9.75033 8.24951 10.2503 8.24951H11.0837C11.5837 8.24951 11.917 8.58285 11.917 9.08285V9.91618C11.917 10.3328 11.5837 10.7495 11.0837 10.7495Z" fill="black"/>
<path d="M14.5007 10.7495H13.6673C13.2507 10.7495 12.834 10.4162 12.834 9.91618V9.08285C12.834 8.58285 13.2507 8.24951 13.6673 8.24951H14.5007C14.9173 8.24951 15.334 8.58285 15.334 9.08285V9.91618C15.334 10.3328 15.0007 10.7495 14.5007 10.7495Z" fill="black"/>
<path d="M4.33366 14.4165H3.50033C3.00033 14.4165 2.66699 13.9998 2.66699 13.5832V12.7498C2.66699 12.2498 3.00033 11.9165 3.50033 11.9165H4.33366C4.83366 11.9165 5.16699 12.2498 5.16699 12.7498V13.5832C5.16699 13.9998 4.75033 14.4165 4.33366 14.4165Z" fill="black"/>
<path d="M7.75065 14.4165H6.91732C6.41732 14.4165 6.08398 13.9998 6.08398 13.5832V12.7498C6.08398 12.2498 6.41732 11.9165 6.91732 11.9165H7.75065C8.25065 11.9165 8.58398 12.2498 8.58398 12.7498V13.5832C8.58398 13.9998 8.16732 14.4165 7.75065 14.4165Z" fill="black"/>
<path d="M11.0837 14.4165H10.2503C9.75033 14.4165 9.41699 13.9998 9.41699 13.5832V12.7498C9.41699 12.2498 9.75033 11.9165 10.2503 11.9165H11.0837C11.5837 11.9165 11.917 12.2498 11.917 12.7498V13.5832C11.917 13.9998 11.5837 14.4165 11.0837 14.4165Z" fill="black"/>
<path d="M14.5007 14.4165H13.6673C13.2507 14.4165 12.834 13.9998 12.834 13.5832V12.7498C12.834 12.2498 13.2507 11.9165 13.6673 11.9165H14.5007C14.9173 11.9165 15.334 12.2498 15.334 12.7498V13.5832C15.334 13.9998 15.0007 14.4165 14.5007 14.4165Z" fill="black"/>
</svg>`;

export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const htmlStr = `<div class="${ID}-xmas-message">
    ${calendarImg}
    <span></span>
  </div>`;

  const attachpoint = document.querySelector('#add-to-cart');

  if (attachpoint) {
    attachpoint.insertAdjacentHTML('beforebegin', htmlStr);
  }

  const getCountdownMessageToChristmas = () => {
    const now = new Date();
    const christmas = new Date(`${now.getFullYear()}-12-25T00:00:00`);
    const deadlines = [
      {
        date: new Date(`${now.getFullYear()}-12-20T23:59:59`),
        message: 'Order in time for Christmas',
      },
      {
        date: new Date(`${now.getFullYear()}-12-23T23:59:59`),
        message: 'Last chance for Express Delivery',
      },
      {
        date: new Date(`${now.getFullYear()}-12-24T23:59:59`),
        message: 'Last chance for Click & Collect',
      },
    ];

    let message = '';
    let countdown = '';

    for (const deadline of deadlines) {
      if (now <= deadline.date) {
        message = deadline.message;
        break;
      }
    }

    if (!message) {
      message = 'Merry Christmas!';
    }

    const timeDiff = christmas - now;
    if (timeDiff > 0) {
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((timeDiff / 1000) % 60);
      countdown = `<span>${days}</span>d <span>${hours}</span>h <span>${minutes}</span>m <span>${seconds}</span>s`;
    } else {
      countdown = '0d 0h 0m 0s';
    }

    return `${message} ${countdown}`;
  };

  // Example usage
  setInterval(() => {
    const message = getCountdownMessageToChristmas();
    const xmasMessageElem = document.querySelector(`.${ID}-xmas-message > span`);
    if (xmasMessageElem) {
      xmasMessageElem.innerHTML = message;
    }
  }, 1000);
};
