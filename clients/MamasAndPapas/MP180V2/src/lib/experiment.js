/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  // Check if new user
  const moduleContent = document.querySelector('.email-sign-up-subtext');

  moduleContent.innerHTML = '';

  moduleContent.insertAdjacentHTML('beforeend', `
    <h2 style="color: #f6c998; font-size: 24px">Quick! As a brand new user, enjoy 10% off your next order over £150*</h2>
    <p>Enter your email address and receive your welcome code via email to use on Mamas & Papas products within the next 30 days, along with news on our offers and promotions, new product launches and more!</p>
  `);

};
