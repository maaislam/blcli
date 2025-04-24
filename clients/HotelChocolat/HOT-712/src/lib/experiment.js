import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
const { ID, VARIATION } = shared;
let headerHoverInterval;
const startExperiment = () => {
  pollerLite(
    [
      '.primary-content',
      '.paTracker-widget-area-placeholder',
      () => {
        return window.dataLayer;
      },
    ],
    () => {
      document.documentElement.classList.add(`${ID}-expbegins`);
      let dataLayer = window.dataLayer;
      let pdpDetails = dataLayer.find((obj) => obj.event == 'productDetails');
      //let imageURL = pdpDetails.product_image;

      const recsConditionObj = {
        1: 'below 10',
        2: 'below 15',
      };

      let newATBHTML = `
  
    <div class="${ID}-atc-holder ${ID}-hidden">
    
     

      <div class="${ID}-upsells upsell-2 ${ID}-upsells--v${VARIATION}" style="display:none;">
        <div class="${ID}-upsellcontainer ab-atc-upsells ab-atc-upsells--mightalsolike ab-atc-upsells--mightalsolike--v${VARIATION}" data-recscondition="${recsConditionObj[VARIATION]}">
      </div>
      </div>
      <div class="${ID}-upsells ${ID}-upsells--v${VARIATION}">
        <div class="${ID}-upsellcontainer ab-atc-upsells ab-atc-upsells--recentlyviewed ab-atc-upsells--recentlyviewed--v${VARIATION}"></div>
      </div>
    
    </div>
  
  
  `;

      let insertionPoint = document.querySelector('.paTracker-widget-area-placeholder');

      insertionPoint.insertAdjacentHTML('afterend', newATBHTML);

      document.body.addEventListener('click', (e) => {
        if (e.target.id == 'add-to-cart' || e.target.closest('#add-to-cart')) {
          e.preventDefault();
          if (!e.target.classList.contains('add-to-cart-disabled')) {
            displayATCDialog();
            fireEvent('Click - add to bag clicked, ATB upsell displayed', true);
          }
        }

        if (e.target.id == `${ID}-continue-shopping`) {
          e.preventDefault();

          document.querySelector(`.${ID}-atc-holder`).classList.add(`${ID}-hidden`);
          document.getElementById('product-detail-wrapper').classList.remove(`${ID}-hidden`);
          document.getElementById('mini-cart')?.classList.remove(`${ID}-disabled`);
          clearInterval(headerHoverInterval);

          fireEvent('Click - continue shopping clicked from within ATB Upsell', true);
        }

        if (e.target.id == `${ID}-checkout`) {
          fireEvent('Click - proceed to checkout clicked from within ATB Upsell', true);
        }
      });
    }
  );
};

const displayATCDialog = () => {
  if (window.outerWidth < 600) {
    window.scrollTo(0, 0);
  }

  let productName = document.querySelector('#page_heading h1').innerText;
  let productPrice = document.querySelector('.product-price .price-sales').innerText;
  let parsedProductPrice = parseFloat(productPrice.replace('£', '').replace(',', ''));
  let productQuantity = document.querySelector('.quantity input[name="Quantity"]').value;

  document.getElementById(`${ID}-product-name`).innerText = productName;
  let productQuantityText = productQuantity > 1 ? `${productQuantity} items were` : `${productQuantity} item was`;
  document.getElementById(`${ID}-product-quantity`).innerText = productQuantityText;

  document.getElementById(`${ID}-product-price`).innerText =
    productQuantity > 1 ? '£' + (parsedProductPrice * productQuantity).toFixed(2) : productPrice;

  // subtotal

  let subtotal = document.querySelector('.mini-cart-wrapper .subtotal')?.innerText
    ? document.querySelector('.mini-cart-wrapper .subtotal').innerText
    : '£0.00';
  let parsedSubtotal = parseFloat(subtotal.replace('£', '').replace(',', ''));
  subtotal = '£' + (parsedSubtotal + parsedProductPrice * productQuantity).toFixed(2);
  document.querySelector(`.${ID}-total`).innerText = subtotal;

  // items

  let items = document.querySelector('.minicart-total-qty')?.innerText
    ? document.querySelector('.minicart-total-qty').innerText
    : '0';
  document.querySelector(`.${ID}-subitems`).innerText =
    parseInt(items) + parseInt(productQuantity) + (parseInt(items) + parseInt(productQuantity) == 1 ? ' item' : ' items');

  document.querySelector(`.${ID}-atc-holder`).classList.remove(`${ID}-hidden`);
  document.getElementById('product-detail-wrapper').classList.add(`${ID}-hidden`);
  // disabling the dropdown on the mini cart for 10s while atc takeover displays
  clearInterval(headerHoverInterval);
  headerHoverInterval = setInterval(() => {
    if (!document.getElementById('mini-cart')?.classList.contains(`${ID}-disabled`)) {
      document.getElementById('mini-cart')?.classList.add(`${ID}-disabled`);
    }
    if (document.getElementById('mini-cart')?.classList.contains('hover')) {
      document.getElementById('mini-cart')?.classList.remove('hover');
    }
  }, 1);

  let delay = 5000;
  if (window.outerWidth < 600) {
    delay = 500;
  }
  setTimeout(() => {
    clearInterval(headerHoverInterval);
  }, delay);
};

const addControlTracking = () => {
  if (VARIATION == 'control') {
    document.body.addEventListener('click', (e) => {
      if (e.target.id == 'add-to-cart' || e.target.closest('#add-to-cart')) {
        fireEvent('Click - add to bag clicked', true);
      }
    });
  }
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addControlTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
};
