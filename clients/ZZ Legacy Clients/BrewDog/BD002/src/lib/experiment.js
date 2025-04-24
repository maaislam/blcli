/**
 * BD002 - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import settings from './shared';

export default () => {
  setup();


  const { ID, VARIATION } = settings;
  
  // Check for products
  const hasItemsInCart = () => {
    const counterEl = document.querySelector('.header-mobile__actions__action__counter');
    const counter = parseInt(counterEl.textContent, 10);
    
    if (counter && counter > 0) {
      return true;
    } else {
      return false;
    }
  }

  const miniBasketIcon = document.querySelector(`.showcart`);
  miniBasketIcon.addEventListener('click', (e) => {
    
    e.preventDefault();

    events.send(ID, 'BD002 Click', 'BD002 Clicked Mini Bag');
    
    window.location.href = 'https://www.brewdog.com/uk/checkout/cart/';

  });


  // If is checkout/cart
  pollerLite(['.cart-empty-button', 'h1.cart-empty-message'], () => {
    const emptyCartBtn = document.querySelector('a.cart-empty-button');
    emptyCartBtn.addEventListener('click', (e) => {
      e.preventDefault();

      window.location.href = 'https://www.brewdog.com/uk/beers/headliners';
    })
  });
  
};
