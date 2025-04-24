/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  let buttonText;

  if(VARIATION === '1') {
    buttonText = 'Checkout';
  } else if(VARIATION === 'control'){
    buttonText = 'Go to basket';
  }

    // create message for control
    const addedToBagMessage = () => { 
    
      const productName = document.querySelector('#page_heading h1');
      const qty = document.querySelector('.inventory input');
      const addedProductMessage = document.createElement('div');
      addedProductMessage.classList.add(`${ID}-addedBox`);
      addedProductMessage.innerHTML = 
      `<div class="${ID}-innerText">
        <h3>Product added to bag: <span class="${ID}-product">${qty.value} x ${productName.textContent.trim()}</span></h3>
        ${VARIATION === '1' ? `<div class="${ID}-buttons">
          <a href="/basket" class="${ID}-button ${ID}-checkout">${buttonText}</a>
         <a href="https://www.hotelchocolat.com/uk/shop/collections/products/all-products/" class="${ID}-button ${ID}-continue">Continue Shopping</a>
        </div>` : `<a href="/basket" class="${ID}-button">${buttonText}</a>`}
      </div>`;
  
      document.querySelector('#pdpMain').insertAdjacentElement('afterbegin', addedProductMessage);


      const allButtons = document.querySelectorAll(`.${ID}-button`);
      for (let index = 0; index < allButtons.length; index += 1) {
        const element = allButtons[index];
        element.addEventListener('click', (e) => {
          const buttonName = e.currentTarget.textContent.trim();
          events.send(`${ID} varation:${VARIATION}`, 'click', `${buttonName} button`);
        }) 
      }
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
  
    // on add to bag and continue click
    const addtoBagClick = () => {
      const addToCartButton = document.querySelector('#add-to-cart');
      if(addToCartButton) {
  
        addToCartButton.addEventListener('click', () => {
  
          removeMessageOnAdd();
          addedToBagMessage();
          hideMiniBasket();
          messageRemoveAfterTen();
          events.send(`${ID} varation:${VARIATION}`, 'add to bag click', 'added product message shown');
          
        });
      }
    }
  
    addtoBagClick();

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};
