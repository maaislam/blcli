/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { countdown } from "../../../../../lib/uc-lib";

export default () => {
  setup();

  const { ID } = shared;

  const offerMessage = document.createElement('div');
  offerMessage.classList.add(`${ID}-offer_banner`);
  offerMessage.innerHTML = `<p class="${ID}-message">Up to 20% off Watches. <span class="${ID}-countdownText">Ends in: <span class="${ID}-countdown"></span></span></p>`;

  const header = document.querySelector('#js-header');

  if(window.innerWidth > 767) {
    header.appendChild(offerMessage);
  } else {
    document.querySelector('#js-header .header__container').insertAdjacentElement('afterend', offerMessage);
  }

  const today = new Date();
  const tempDate = new Date();

  tempDate.setMonth(2);
  tempDate.setHours(23,59,59);
  tempDate.setDate(1);

  if(today - tempDate > 0) {
      // hide the countdown
      document.querySelector(`.${ID}-offer_banner`).style.display = 'none';
      return;
  }

  countdown({
    element: `.${ID}-countdown`,
    cutoff: tempDate,
    zeroPrefixHours: false,
    zeroPrefixMinutes: false,
    hoursInsteadOfDays: true,
    labels: {
      d: 'days',
      h: 'hrs',
      m: 'min',
      s: 'sec',
    },
  });
};
