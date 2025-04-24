import { events } from "../../../../../lib/utils";
import shared from "./shared";

export default () => {

    const { ID } = shared;

    const addedToBagMessage = () => { 
        const addedProductMessage = document.createElement('div');
        addedProductMessage.classList.add(`${ID}-addedBox`);
        addedProductMessage.innerHTML = 
        `<div class="${ID}-innerText">
            <div class="${ID}-productsAdded">
            <h3>Successfully added to bag:</h3>
            <div class="${ID}-products"></div>
            </div>
          <div class="${ID}-buttons">
            <a href="/basket" class="${ID}-button ${ID}-checkout">Checkout</a>
            <a href="https://www.hotelchocolat.com/uk/shop/collections/products/all-products/" class="${ID}-button ${ID}-continue">Continue Shopping</a>
          </div>
        </div>`;
    
        document.querySelector('#main').insertAdjacentElement('afterbegin', addedProductMessage);
  
  
        const allButtons = document.querySelectorAll(`.${ID}-button`);
        for (let index = 0; index < allButtons.length; index += 1) {
          const element = allButtons[index];
          element.addEventListener('click', (e) => {
            const buttonName = e.currentTarget.textContent.trim();
            events.send(`${ID} varation:${VARIATION}`, 'click', `${buttonName} button`);
          }) 
        }
      }

    const addProductsFromStorage = () => {
        const storedItems = sessionStorage.getItem(`${ID}-productsAdded`);
        const products = JSON.parse(storedItems);

        Object.keys(products).forEach((i) => {
          const data = products[i];
          const addedItem = document.createElement('p');
          addedItem.classList.add(`${ID}-itemAdded`);
          addedItem.innerHTML = data.name;

          document.querySelector(`.${ID}-addedBox .${ID}-products`).appendChild(addedItem);
       });
    }

    const messageRemoveAfterTen = () => {
      const message = document.querySelector(`.${ID}-addedBox`);
      if(message) {
        setTimeout(() => {
          message.remove();
          // clear the storage
          sessionStorage.removeItem(`${ID}-productsAdded`);
        }, 10000);
      }
    }

    addedToBagMessage();
    addProductsFromStorage();
    messageRemoveAfterTen();

}