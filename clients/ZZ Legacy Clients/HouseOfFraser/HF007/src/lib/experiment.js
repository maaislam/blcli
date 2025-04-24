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
    events.send(ID, 'HF007 Control', 'HF007 Control is active');
    return false;
  } else {
    events.send(ID, 'HF007 Variation Active', 'HF007 Variation 1 is active');
  }

  const atbButton = document.querySelector('#aAddToBag');
  
  const run = () => {


    // Disable original mini bag
    document.body.classList.add('HF007-newBag');
    let sizeVal = "";
    if(document.querySelector('.sizeVariantHighlight')) {
      sizeVal = document.querySelector('.sizeVariantHighlight > a > span').textContent;
    } else {
      sizeVal = "not selected";
    }
    



    const fetchDetails = () => {
      const details = {
        qty: 1,
        price: document.querySelector('#lblSellingPrice').textContent,
        brand: document.querySelector('#lblProductBrand').textContent,
        name: document.querySelector('#lblProductName').textContent,
        size: sizeVal,
      };

      return details;
    }

    const build = (detailsInfo) => {
      if (!detailsInfo) return;
      let ref = atbButton;
      let pos = 'afterend';
      if (window.innerWidth <= 1021) {
        ref = document.querySelector('.BasketWishContainer');
        pos = 'beforeend';
      }
      
      ref.insertAdjacentHTML(pos, `
        <div class="HF007-addedToBag">
          <p class="title">Added to your bag</p>

          <ul class="HF007-list">
            <li>
              <p><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"/></svg>${detailsInfo.qty} x ${detailsInfo.brand} ${detailsInfo.name}, size: ${detailsInfo.size}</p>
            </li>
          </ul>

          <a class="addToBag" href="/checkout/launch"><span>Go to secure checkout</span></a>
          <a class="HF007-link" href="/cart"><span>Go to your bag</span></a>
          
        </div>
      `);

      const addedEl = document.querySelector('.HF007-addedToBag');
      if (addedEl) {
        addedEl.classList.add('HF007-show');
      }
    };

    const details = fetchDetails();
    if (details && sizeVal !== "not selected") {
      build(details);

      // Events
      const goCheckout = document.querySelector('.HF007 .HF007-addedToBag a.HF007-button:first-of-type');
      const goBasket = document.querySelector('.HF007 .HF007-addedToBag a.HF007-button:last-of-type');
      
      goBasket ? goBasket.addEventListener('click', () => {
        events.send(ID, 'HF007 Click', 'User clicked Go to Basket');
      }) : null;

      goCheckout ? goCheckout.addEventListener('click', () => {
        events.send(ID, 'HF007 Click', 'User clicked Go to Checkout');
      }) : null;

    }
    
  };

  const scrollToEl = (el) => {
    if (el) {
      el.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"});
    }
  }
  
  atbButton.addEventListener('click', () => {
    console.log("clicked button");
    if (document.querySelector('.HF007-addedToBag')) {
      const addedEl = document.querySelector('.HF007-addedToBag');
      addedEl.parentNode.removeChild(addedEl);
      run();
      setTimeout(() => {
        scrollToEl(addedEl);
      }, 300);
    } else {
      run();
      const addedEl = document.querySelector('.HF007-addedToBag');
      setTimeout(() => {
        scrollToEl(addedEl);
      }, 300);
    }

  });

};

