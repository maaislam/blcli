/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import productChanges from './components/productChanges';
import financeChanges from './components/financeChanges';
import GiftOption from './components/giftmessage';
import BasketUSPs from './components/usps';
import SlideOutBox from './components/slideoutBox';
import storeProducts from './components/storeProducts';
import SavedProducts from './components/savedProducts';
import priceArea from './components/priceArea';
import paypal from './components/paypal';
import removeSaved from './components/removeSaved';
import { pollerLite } from '../../../../../lib/utils';
import emptyBasket from '../lib/components/emptyBasket';

export default () => {
  setup();

  const { ID } = shared;

  pollerLite([
    '.product-summary',
    '.order-summary__container',
    '.container .page-title',
    '.product-summary__description',
    '.container section',
    ], () => {

      // add norton logo
      document.querySelector('.page-title').insertAdjacentHTML('beforeend', `<div class="${ID}-norton"></div>`);

      // changes to the main products
      productChanges();

      // add the new gift link
      new GiftOption();

      // changes the total price section
      priceArea();

      // slide out box for usps
      new SlideOutBox();
      
      // add usps about delivery, returns
      new BasketUSPs();

      // if finance is available but not selected
      financeChanges();

      // save for later functionality
      storeProducts();


      // paypal changes
      paypal();



      // add the customer help box
      const customerHelp = () => {
        const customerBox = document.createElement('div');
        customerBox.classList.add(`${ID}-customerService_container`);
        customerBox.innerHTML = 
        `<h3>Need help with your order?</h3>
        <div class="${ID}-inner_text">
        <a href="tel:0800 458 1065"><p>Call: <strong>0800 458 1065</strong></p></a>
        </div>`;

        document.querySelector('main .container').appendChild(customerBox);
      }

      customerHelp();
    });

  new SavedProducts();
  removeSaved();

  // if basket is empty
  if(!document.querySelector('.order-summary__container')) {
    emptyBasket();
  }

}
