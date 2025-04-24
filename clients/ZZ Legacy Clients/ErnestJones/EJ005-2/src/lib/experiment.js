import {
  setup,
  generateNotification,
  updateCartValue,
  addToCartRequest,
} from './services';
import settings from './settings';
import { events } from '../../../../../lib/utils';

const { ID } = settings;

const activate = () => {
  setup();
  if (localStorage.getItem(`${ID}-cart`)) {
    localStorage.removeItem(`${ID}-cart`);
  }
  if (window.location.href.indexOf('hsamuel') > -1) {
    document.body.classList.add('hsamuel');
  }
  // Insert a fake button
  const fakeButton = document.createElement('div');
  fakeButton.classList.add(`${ID}_buttonWrap`);
  fakeButton.innerHTML = `
    <button type="submit" value="Buy" class="${ID}_button buying-buttons__buy">Buy
    <div class="${ID}-loader-container ${ID}-ball-pulse-double">
    <div class="${ID}-loader">
      <div class="${ID}-ball-1"></div>
      <div class="${ID}-ball-2"></div>
    </div>
  </div></button>
  `;
  document.getElementById('buy').insertAdjacentElement('beforebegin', fakeButton);
  // Add a listener to the fake button and trigger events
  document.querySelector(`.${ID}_buttonWrap`).addEventListener('click', function (e) {
    let cart = [];
    let quantity = document.querySelector('.quality .quality__input').value;
    const productName = window.digitalData.product[0].productInfo.productName;

    events.send(`${ID} v${settings.VARIATION}`, 'click', 'Add to cart');

    if (document.querySelector(`.${ID}_notificationWrap`)) {
      document.querySelector(`.${ID}_notificationWrap`).remove();
    }

    if (document.querySelector('#js-options-select')) {
      //if the product has a size dropwdown
      const selectVal = document.querySelector('.childSku .childSku__select').selectedIndex;

      if (selectVal != 0) {

        // @TODO - any other validation??
      
        e.preventDefault();
        
        document.querySelector(`.${ID}-loader-container`).classList.add(`${ID}-loader_show`);
        addToCartRequest(() => {
          generateNotification(quantity, productName);
          updateCartValue(quantity);
        });
      }
    } else {
      // if the product has not a size dropdown
      e.preventDefault();

      const qty = parseInt(document.querySelector('#quantityChange').value, 10);
      if(qty >= 1) {
        if (document.querySelector(`.${ID}_notificationWrap`)) {
          document.querySelector(`.${ID}_notificationWrap`).remove();
        }

        // show the loader
        document.querySelector(`.${ID}-loader-container`).classList.add(`${ID}-loader_show`);

        addToCartRequest(() => {
          generateNotification(quantity, productName);
          updateCartValue(quantity);
        });
      }
    }
  });
};

export default activate;
