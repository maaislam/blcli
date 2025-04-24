import { setup } from '../services';
import { events } from '../../../../../../lib/utils';

export const buildBottomBar = (price) => {
  const toppingsSection = document.querySelector('.PJ046-toppings_section');

  if(toppingsSection) {
    const bottomHtml = `
      <div class="PJ046-bottom-bar">
        <div class="PJ046-bottom-bar__price">${price || ''}</div>
        <div class="PJ046-bottom-bar__btn greenButton">
          <span class="leftB"></span>
          <span class="centerB">Add To Basket</span>
          <span class="rightB"></span>
        </div>
      </div>
    `;

    toppingsSection.insertAdjacentHTML('afterend', bottomHtml);

    // Events
    const bottomBtn = document.querySelector('.PJ046-bottom-bar__btn');
    const mainBtn = document.querySelector('.PJ046-addToBasket');
    if(bottomBtn && mainBtn) {
      bottomBtn.addEventListener('click', () => {
        events.send('PJ046', 'bottom-add-to-cart-clicked');

        mainBtn.click();

        window.scrollTo(0,0);
      });
    }
  }
};

export const updateBottomBar = (price) => {
  if(price) {
    const bottomBarPrice = document.querySelector('.PJ046-bottom-bar__price');
    if(bottomBarPrice) {
      bottomBarPrice.innerHTML = price;
    }
  }
};
