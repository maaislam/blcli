/**
 * TG105 - Basket & Checkout redesign
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import BasketHeader from './components/header';
import formChanges from './components/formChanges';
import PriceBox from './components/PriceBox';
import shared from './shared';
import { pollerLite } from '../../../../../lib/utils';
import { __ } from './helpers';

const { ID } = shared;

export default () => {
  setup();
  new BasketHeader();
  formChanges();
  new PriceBox();

  // continue shopping button on mobile
  const addContinueMobile = () => {
    const continueShoppingMobile = document.createElement('div');
    continueShoppingMobile.classList.add(`${ID}-continue`);
    continueShoppingMobile.innerHTML = `<a href="www.technogym.com">${__('Continue Shopping')}</a>`;

    if(window.innerWidth < 767) {
      document.querySelector('.page-title.title-buttons').insertAdjacentElement('beforebegin', continueShoppingMobile);
    }
  }

  addContinueMobile();

 /* const qtyUpdate = () => {
    const productUpdate = document.querySelector('tfoot .btn.btn-default.btn-update');

    const products = document.querySelectorAll(`form tbody tr`);
    
    for (let index = 0; index < products.length; index += 1) {
      const element = products[index];
      const updateQty = element.querySelector(`.${ID}-update`);

      if(updateQty) {
        console.log('got update qty');
          updateQty.addEventListener('click', () => {
            console.log('clicked update');
              productUpdate.click();
          });
      }
    }
  }*/
  // update qty on products
  // on click of the update quantity, click the update cart button
  /*pollerLite(['tfoot .btn.btn-default.btn-update', `.${ID}-update`], () => {
    //qtyUpdate();
  });*/

  // add desktop title
  const desktopSize = (window.innerWidth > 766);

  const addDesktopTitle = () => {
    const title = document.createElement('div');
    title.classList.add(`${ID}-desktopBasket_title`);
    title.innerHTML = `${__('My Basket')}`;

    document.querySelector('#main .cart').insertAdjacentElement('afterbegin', title);
  };

  if(desktopSize) {
    addDesktopTitle();
  }
};
