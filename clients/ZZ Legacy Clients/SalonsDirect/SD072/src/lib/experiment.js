/**
 * SD072 - PLP Out Of Stock
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 * 
 * https://www.salonsdirect.com/nails/nail-extensions/acrylic-liquids
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  setup();

  // Write experiment code here
  const productsContainer = document.querySelector('ol.products.list.items.product-items');
  productsContainer.insertAdjacentHTML('beforebegin', `<div class="${ID}-overlay"></div>`);
  const allProducts = document.querySelectorAll('li.item.product.product-item');
  let outOfStockProductsMoved = false;
  [].forEach.call(allProducts, (product) => {
    if (product.querySelector('.stock.unavailable')) {
      productsContainer.insertAdjacentElement('beforeend', product);
      outOfStockProductsMoved = true;
    }
  });
  document.querySelector(`.${ID}-overlay`).setAttribute('style', 'display: none !important;');

  if (outOfStockProductsMoved) {
    events.send(`${ID}`, 'Out of Stock Product', { sendOnce: true });
  }
};


export default activate;
