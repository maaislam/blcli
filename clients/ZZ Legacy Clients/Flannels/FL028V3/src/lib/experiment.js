/**
 * FL028 - Final version after site changes broke the previous version of this.
 * Monday 3/12/18
 * @author User Conversion
 */
import { setup, renderMessage, removeMessage, sizeChosen, addToBag } from './services';
import { events } from '../../../../../lib/utils';
import { cacheDom } from './../../../../../lib/cache-dom';
import settings from './settings';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();
  // Experiment code
  const wishlistContainer = cacheDom.get('.BasketWishContainer');
  const wishlistAnchor = cacheDom.get('.BasketWishContainer #addToWishListContainer a');
  const sizeOptions = cacheDom.getAll('#productVariantAndPrice select.SizeDropDown option');
  const loginEl = cacheDom.get('.basketLink a.login');
  const atbBtn = cacheDom.get('.BasketWishContainer a.addToBag');

  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'Control', 'Control is active');
    wishlistAnchor.addEventListener('click', () => {
      events.send(settings.ID, 'Click', 'Control click on wishlist');
    });
    return false;
  }


  // If logged OUT
  if (loginEl) {
    wishlistAnchor.addEventListener('click', (e) => {
      e.preventDefault();
      if (sizeChosen(sizeOptions)) {
        renderMessage(wishlistContainer);
        addToBag(atbBtn);
        events.send(settings.ID, 'Click', 'Wishlist clicked and product added to basket');
        const addedMessage = document.querySelector('.FL028-message');
        // setTimeout(() => {
        //   removeMessage(addedMessage);
        // }, 4500);
      } else {
        if (!document.querySelector('.FL028-size-message')) {
          wishlistContainer.insertAdjacentHTML('beforeend', `
            <div class="FL028-size-message">
              <p>Please choose a size.</p>
            </div>
          `);
        }
        const sizeMessage = document.querySelector('.FL028-size-message');
        if (sizeMessage) {
          // setTimeout(() => {
          //   removeMessage(sizeMessage);
          // }, 1500);
        }
      }
    });
  }
};

export default activate;
