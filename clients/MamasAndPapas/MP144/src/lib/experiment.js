/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite } from '../../../../../lib/uc-lib';
// import { cacheDom } from './../../../../../lib/cache-dom';
import mobileLightbox from './mobileLightbox';
import { events } from '../../../../../lib/utils';


const activate = () => {
  setup();
  pollerLite(['#pickupstore_search_button'], () => {
    mobileLightbox();

    // add the css on store search
    const findStoreButton = document.querySelector('.modal-find-stores #pickupstore_search_button');
    findStoreButton.addEventListener('click', () => {
      document.body.classList.add('MP144-store_searched');
    });

    // remove the css on close of lightbox
    const closeLightbox = document.querySelector('.modal-find-stores .ico.ico-cross');
    closeLightbox.addEventListener('click', () => {
      document.body.classList.remove('MP144-store_searched');
    });

    const overlay = document.querySelector('.modal-backdrop');
    overlay.addEventListener('click', () => {
      document.body.classList.remove('MP144-store_searched');
    });
  });

  const basketItems = document.querySelectorAll('.cartItem .col-xs-12.click-c.cartclick-deliv');
  console.log(basketItems);
  for (let index = 0; index < basketItems.length; index += 1) {
    const element = basketItems[index];
    console.log(element);
    const newTickBox = document.createElement('div');
    newTickBox.classList.add('MP144-checkbox');

    // add the "fake" checkbox which will fire the lightbox
    const storeCheckbox = element.querySelector('.checkout_checkboxContainer');
    if (storeCheckbox) {
      storeCheckbox.appendChild(newTickBox);
      storeCheckbox.querySelector('.custom-radio').classList.add('MP144-checkbox_hide');

      const chooseStoreLink = element.querySelector('.pickupInStoreBtn');
      pollerLite(['.MP144-checkbox'], () => {
        element.querySelector('.MP144-checkbox').addEventListener('click', () => {
          if (chooseStoreLink) {
            chooseStoreLink.click();
          }
        });
      });

      const storeCheckBoxChecked = element.querySelector('.checkbox_toggle_bordered.active');
      if (storeCheckBoxChecked) {
        storeCheckbox.querySelector('.custom-radio').classList.remove('MP144-checkbox_hide');
        element.querySelector('.MP144-checkbox').classList.add('MP144-hide_box');
      }
    }
    const collectionFromStore = element.querySelector('.pickupInStoreBtn');
    if (collectionFromStore) {
      collectionFromStore.addEventListener('click', () => {
        events.send('MP144', 'clicked', 'choose from" word link');
      });
    }
  }

  const proceedToCheckout = document.querySelector('#checkoutButtonBottom');
  proceedToCheckout.addEventListener('click', () => {
    events.send('MP144', 'clicked', 'choose from" word link');
  });
};

export default activate;
