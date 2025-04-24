/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  // create message for V2
  const addedToBagMessage = () => { 
    
    const productName = document.querySelector('#page_heading h1');
    const qty = document.querySelector('.inventory input');
    const addedProductMessage = document.createElement('div');
    addedProductMessage.classList.add(`${ID}-addedBox`);
    addedProductMessage.innerHTML = 
    `<div class="${ID}-innerText">
      <h3>Product added to bag: <span class="${ID}-product">${qty.value} x ${productName.textContent.trim()}</span></h3><a href="/basket" class="${ID}-button">Go to basket</a>
    </div>`;

    document.querySelector('#pdpMain').insertAdjacentElement('afterbegin', addedProductMessage);
  }

  // hide the mini basket
  const hideMiniBasket = () => {
    const miniCart = document.querySelector('#mini-cart');
    miniCart.classList.add(`${ID}-miniCart-hide`);

    // stop overlay
    document.body.classList.add(`${ID}-overlayHide`);
    
  
    setTimeout(() => {
      miniCart.classList.remove(`${ID}-miniCart-hide`);
      document.body.classList.remove(`${ID}-overlayHide`);
    }, 7000);
  }

  const removeMessageOnAdd = () => {
    const message = document.querySelector(`.${ID}-addedBox`);
    if(message) {
      message.remove();
    }
  }

  const messageRemoveAfterTen = () => {
    const message = document.querySelector(`.${ID}-addedBox`);
    if(message) {
      setTimeout(() => {
        message.remove();
      }, 10000);
    }
  }

  // on add to bag click
  const addtoBagClick = () => {
    const addToCartButton = document.querySelector('#add-to-cart');
    if(addToCartButton) {

      addToCartButton.addEventListener('click', () => {

        if(VARIATION === '1') {
          window.location.href = '/basket';
          events.send(`${ID} varation:${VARIATION}`, 'add to bag click', 'redirect to basket');
        } else if (VARIATION === '2') {
          removeMessageOnAdd();
          addedToBagMessage();
          hideMiniBasket();
          messageRemoveAfterTen();
          events.send(`${ID} varation:${VARIATION}`, 'add to bag click', 'added product message shown');
        }
      });
    }
  }

  addtoBagClick();


};
