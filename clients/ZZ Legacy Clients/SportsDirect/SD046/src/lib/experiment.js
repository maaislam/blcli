/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import settings from './shared';
import { events, pollerLite } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export default () => {
  setup();


  const { ID, VARIATION } = settings;
  const atbButton = document.querySelector('#aAddToBag');
  const productDetails = document.getElementById('productDetails');

  if (VARIATION == 2) {
    events.send(ID, 'SD046 Control', 'SD046 Control is active');
    return false;
  } else if(atbButton.classList.contains('hidden') || document.querySelector('#lblProductBrand').innerHTML.trim() == "Gift" || document.getElementById('pnlPersonalisation')) {
    console.log("product does not fit conditions");
    events.send(ID, 'SD046 Variation Inactive', 'SD046 Variation Inactive - product does not fit conditions');
    return false;
  } else {
    console.log("conditions matched");
    events.send(ID, 'SD046 Variation Active', 'SD046 Variation 1 is active');
  }

  
  
  const run = () => {
    console.log('run')

    // Disable original mini bag
    document.body.classList.add('SD046-newBag');
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
      console.log(detailsInfo);
      if (!detailsInfo) return;
      let ref = productDetails;
      
      ref.insertAdjacentHTML('beforeend', `
        <div class="SD046-addedToBagContainer">
          <div class="SD046-addedToBag">
            <p class="title">Added to your basket:</p>

            <ul class="SD046-list">
              <li>
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" width="22" height="16.731" viewBox="0 0 22 16.731"><defs><style>.a{fill:#333;}</style></defs><g transform="translate(0 -51.096)"><g transform="translate(0 51.096)"><path class="a" d="M21.753,51.365a.88.88,0,0,0-1.244-.022l-.022.022L6.149,65.7,1.491,61.045A.88.88,0,0,0,.247,62.289l5.28,5.28a.88.88,0,0,0,1.244,0l14.96-14.96A.88.88,0,0,0,21.753,51.365Z" transform="translate(0 -51.096)"/></g></g></svg>
                <p>${detailsInfo.qty} x ${detailsInfo.brand} ${detailsInfo.name}, size: ${detailsInfo.size}</p>
              </li>
            </ul>

            <a class="SD046-button" href="/cart"><span>Go to your basket</span></a>
            <a class="SD046-button checkout-button" href="/checkout/launch">Go to secure checkout</a>
          </div>
        </div>
      `);

      const addedEl = document.querySelector('.SD046-addedToBag');
      if (addedEl) {
        addedEl.classList.add('SD046-show');
      }
    };

    const details = fetchDetails();
    console.log('detais = ', details);

    if (details && sizeVal !== "not selected") {
      build(details);

      // Events
      const goBasket = document.querySelector('.SD046 .SD046-addedToBag a.SD046-button:first-of-type');
      const goCheckout = document.querySelector('.SD046 .SD046-addedToBag a.SD046-button:last-of-type');
      
      goBasket ? goBasket.addEventListener('click', () => {
        events.send(ID, 'SD046 Click', 'User clicked Go to Basket');
      }) : null;

      goCheckout ? goCheckout.addEventListener('click', () => {
        events.send(ID, 'SD046 Click', 'User clicked Go to Checkout');
      }) : null;

    }
    
  };

  const scrollToEl = (el) => {
    if (el) {
      el.scrollIntoView({behavior: "auto", block: "center", inline: "nearest"});
    }
  }

  let addedEl = document.querySelector('.SD046-addedToBag');

  atbButton.addEventListener('click', () => {
    if (document.querySelector('.SD046-addedToBag')) {
      
      addedEl = document.querySelector('.SD046-addedToBag');
      addedEl.parentNode.removeChild(addedEl);

      run();
      setTimeout(() => {
        addedEl = document.querySelector('.SD046-addedToBag');
        scrollToEl(addedEl);
      }, 300);
    } else {
      run();

      setTimeout(() => {
        addedEl = document.querySelector('.SD046-addedToBag');
        scrollToEl(addedEl);
      }, 300);
    }

  });

};

