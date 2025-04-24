/**
 * SD010 - Checkout Order Summary
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import settings from './shared';
import { events, observer } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';
import { fetch } from './fetch';
import { build } from './build';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 3) {
    events.send(ID, 'SD010 Control', 'SD010 Control is active');
    return false;
  } else {
    events.send(ID, `SD010 Variation ${VARIATION} Active`, `SD010 Variation ${VARIATION} is active`);
  }

  
  const totalPriceEl = document.querySelector('.OrderSumm #TotalValue');
  let newTotalPrice;
  if (totalPriceEl) {
    newTotalPrice = totalPriceEl.textContent;
  }

  const toggleIt = (el, clickEl) => {
    if (!el || !clickEl) return;

    clickEl.addEventListener('click', () => {
      if (VARIATION !== 2) {
        events.send(ID, 'SD010 Click', 'SD010 toggled cart info');
      }
      if (el.classList.contains('active')) {
        el.classList.remove('active');
      } else {
        el.classList.add('active');
      }
    });
  }


  fetch.then((data) => {

    const { totalPrice } = data;
    const { productArr } = data;

    const productHTML = productArr.map(prod => {
      // console.log('single prod ', prod);
      const builtHTML = build(prod);
      console.log(builtHTML);
      return builtHTML;
    }).join(' ');

    
    let ref = document.querySelector('#BodyWrap');
    if (VARIATION == 2) {
      ref = document.querySelector('.ContentWrap');
    }
    if (ref) {
      ref.insertAdjacentHTML('beforeend', `
        <div class="SD010-cart">
          <div class="SD010-cart--top">
            <p class="SD010-title">ORDER SUMMARY <span class="arrow"></span></p>

            <p>total: ${newTotalPrice ? newTotalPrice : totalPrice.outerHTML}</p>
          </div>

          <div class="SD010-cart--bottom">
            ${productHTML}
          </div>
        </div>
      `);
    }

    const titleEl = document.querySelector('.SD010-cart--top');
    const cartEl = document.querySelector('.SD010-cart');

    toggleIt(cartEl, titleEl);

    // Product click events
    const addedProducts = document.querySelectorAll('.SD010-cart .SD010-product');
    for (let i = 0; addedProducts.length > i; i += 1) {
      addedProducts[i].addEventListener('click', () => {
        events.send(ID, 'SD010 Click', 'SD010 clicked product');
      });
    }

  });
  

  // Observe total price
  pollerLite(['.SD010-cart .SD010-cart--top p:last-of-type'], () => {
    const addedPrice = document.querySelector('.SD010-cart .SD010-cart--top p:last-of-type');
    observer.connect(totalPriceEl, () => {
      const tNewPrice = document.querySelector('.OrderSumm #TotalValue');
      const newTPrice = tNewPrice.textContent;
      addedPrice.textContent = '';
      addedPrice.insertAdjacentHTML('beforeend', `
        total: ${newTPrice}
      `);
    }, {
      config: {
        attributes: false,
        childList: true,
        subtree: true,
      }
    });
  });
  
};
