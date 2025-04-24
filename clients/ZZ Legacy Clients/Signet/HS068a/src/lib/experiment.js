/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  if(shared.VARIATION === '1' || shared.VARIATION === '2') {
    document.querySelector('.product-buy-now__button .product-buy-now__text').textContent = 'Add to Basket';
  }
};
