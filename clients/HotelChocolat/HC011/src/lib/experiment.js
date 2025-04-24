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
import { isNextDayPossible } from './delivery';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  let deliveryText;

  const hasShippingDate = () => {
    const shipDate = document.querySelector('.product-availability-list .on-order');
    if(shipDate) {
      return true;
    }
  }

  if(hasShippingDate() === true) {
    deliveryText = `Choose your exact delivery date in checkout`;
  }
  else if(isNextDayPossible() === true) {
    deliveryText = `Choose your exact delivery date in checkout, <span class="${ID}-countdown"> from tomorrow</span>`;
  } else {
    deliveryText = `Choose your exact delivery date in checkout`;
  }

  const createDeliveryBoxes = () => {
    const boxMarkup = document.createElement('div');
    boxMarkup.classList.add(`${ID}-deliveryBoxes`);
    boxMarkup.innerHTML = `
    <div class="${ID}-box ${ID}-guarantee">
      <div class="${ID}-container">
        <div class="${ID}-icon"></div>
        <p>Safe, secure, tracked delivery with a 100% happiness guarantee${VARIATION === '2' ? `<span class="${ID}-tooltip"></span>` : ''}</p>
      </div>
      ${VARIATION === '2' ? `<p class="${ID}-infoBox"><span class="${ID}-toolClose">x</span>All purchases are covered by our No Excuses Guarantee. If you're not 100% happy with our products or we miss an important delivery date, we guarantee that we'll immediately put it right – refunding, replacing or issuing you with a Gift Card as appropriate. We never want you to lose faith in Hotel Chocolat and will always go the extra mile so you know how important your custom is to us.</p>` : ''}
    </div>
    <div class="${ID}-box">
      <div class="${ID}-container">
        <div class="${ID}-icon"></div>
        <p>${deliveryText}</p>
      </div>
    </div>`;

    const products = document.querySelector('.cart-items-form');
    if(window.innerWidth >= 767) {
        if(VARIATION === '1') {
          products.appendChild(boxMarkup);
        } else if(VARIATION === '2'){
          products.insertAdjacentElement('afterbegin', boxMarkup);
        }

        const voucherBox = document.querySelector('.cart-options-box');
        document.querySelector('.continue-shopping').insertAdjacentElement('afterend', voucherBox);
    } else {
      if(VARIATION === '1') {
        document.querySelector('.cart-total').insertAdjacentElement('afterend', boxMarkup);
      } else if(VARIATION === '2') {
        products.insertAdjacentElement('beforebegin', boxMarkup);
      }
    }
     
  }

  const toolTip = () => {
    const guaranteeBox = document.querySelector(`.${ID}-guarantee .${ID}-container`);
    const toolTrigger = document.querySelector(`.${ID}-guarantee .${ID}-tooltip`);
    const infoBox = document.querySelector(`.${ID}-deliveryBoxes .${ID}-infoBox`);
    const toolClose = document.querySelector(`.${ID}-deliveryBoxes .${ID}-toolClose`);

    if(window.innerWidth >= 1280) {
      toolTrigger.addEventListener('mouseenter', () => {
        infoBox.classList.add(`${ID}-infoActive`);
      });
      toolTrigger.addEventListener('mouseout', () => {
        infoBox.classList.remove(`${ID}-infoActive`);
      });
    } else {
      guaranteeBox.addEventListener('click', () => {
        if(infoBox.classList.contains(`${ID}-infoActive`)) {
          infoBox.classList.remove(`${ID}-infoActive`);
        }else {
          infoBox.classList.add(`${ID}-infoActive`);
        }
      });
    }

    toolClose.addEventListener('click', () => {
      infoBox.classList.remove(`${ID}-infoActive`);
    });
  }




  createDeliveryBoxes();
  if(VARIATION === '2') {
    toolTip();
  }

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];
};
