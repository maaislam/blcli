/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import handlePrices from './handlePrices';
import { setup, fireEvent } from './services';
import shared from './shared';

export default () => {
  setup();

  fireEvent('Conditions met');

  if(shared.VARIATION == 'control') {
    return;
  }

  const prices = document.querySelectorAll('.day_price');
  prices.forEach(container => {
    container.insertAdjacentHTML('afterEnd', `
      <div class="${shared.ID}-notification">*Final price will be calculated in the checkout</div>
    `);
  });  

  handlePrices();
};
