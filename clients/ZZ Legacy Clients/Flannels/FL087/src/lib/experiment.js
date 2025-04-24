/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  const { ID, VARIATION } = settings;
  if (VARIATION == 2) {
    events.send(ID, 'FL087 Control', 'FL087 Control is active');
    return false;
  } else {
    events.send(ID, 'FL087 Variation Active', 'FL087 Variation 1 is active');
  }

  const atbButton = document.querySelector('.FlanProdDet .addToBasketContainer .ImgButWrap a');
  const mobileAtbButton = document.querySelector('.BasketWishContainer');

  const run = () => {

    // Disable original mini bag
    document.body.classList.add('FL087-newBag');

    const fetchDetails = () => {
      const details = {
        qty: 1,
        price: document.querySelector('.FlanProdDet .AltProdDet .pdpPrice > span').textContent,
        brand: document.querySelector('#lblProductBrand').textContent,
        name: document.querySelector('#lblProductName').textContent,
        size: document.querySelector('.SizeDropDown option[selected="selected"]:not(:first-of-type)').getAttribute('value'),
      };

      return details;
    }

    const build = (detailsInfo) => {
      if (!detailsInfo) return;
      let ref = mobileAtbButton;
      
      ref.insertAdjacentHTML('afterend', `
        <div class="FL087-addedToBag">
          <p class="title">Added to your basket:</p>

          <ul class="FL087-list">
            <li>
              <span></span>
              <p>${detailsInfo.qty} x ${detailsInfo.brand} ${detailsInfo.name}, size ${detailsInfo.size}</p>
            </li>
          </ul>

          <a class="FL087-button" href="/cart"><span>Go to your basket</span></a>
          <a class="FL087-button" href="/checkoutselect"><span>Go to secure checkout</span></a>
        </div>
      `);

      const addedEl = document.querySelector('.FL087-addedToBag');
      if (addedEl) {
        addedEl.classList.add('FL087-show');
      }
    };

    const details = fetchDetails();
    if (details) {
      build(details);

      // Events
      const goBasket = document.querySelector('.FL087 .FL087-addedToBag a.FL087-button:first-of-type');
      const goCheckout = document.querySelector('.FL087 .FL087-addedToBag a.FL087-button:last-of-type');
      
      goBasket ? goBasket.addEventListener('click', () => {
        events.send(ID, 'FL087 Click', 'User clicked Go to Basket');
      }) : null;

      goCheckout ? goCheckout.addEventListener('click', () => {
        events.send(ID, 'FL087 Click', 'User clicked Go to Checkout');
      }) : null;

    }
    
  };

  const scrollToEl = (el) => {
    if (el) {
      el.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"});
    }
  }
  
  let addedEl = document.querySelector('.FL087-addedToBag');

  atbButton.addEventListener('click', () => {
    if (document.querySelector('.FL087-addedToBag')) {
      
      addedEl = document.querySelector('.FL087-addedToBag');
      addedEl.parentNode.removeChild(addedEl);

      run();
      setTimeout(() => {
        addedEl = document.querySelector('.FL087-addedToBag');
        scrollToEl(addedEl);
      }, 300);
    } else {
      run();

      setTimeout(() => {
        addedEl = document.querySelector('.FL087-addedToBag');
        scrollToEl(addedEl);
      }, 300);
    }

  });

};

