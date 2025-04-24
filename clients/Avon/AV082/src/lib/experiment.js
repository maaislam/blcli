/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/uc-lib';

const runCartChanges = () => {
  // Make changes in basket
  pollerLite([
    '#basket-main'
  ], () => {
    var totalDiscount = 0;
    const basketItems = document.querySelectorAll('.basket-item');
    [].forEach.call(basketItems, (basketItem) => {
      const originalPrice = basketItem.querySelector('.original-price');
      if (originalPrice.innerText) {
        const originalInt = parseFloat(originalPrice.innerText.replace('£', '').replace(',', ''));

        // Get sale price;
        const saleText = basketItem.querySelector('.money');
        const saleInt = parseFloat(saleText.innerText.replace('£', '').replace(',', ''));

        const priceDiff = originalInt - saleInt;
        totalDiscount += priceDiff;

        // percentage off
        var percentage = (saleInt / originalInt) * 100;
        percentage = Math.round(percentage);
        percentage = 100 - percentage;

        // add markup
        const markup = `
          <div class="${shared.ID}__discount">
            ${percentage.toFixed(0)}% off
          </div>
        `;
        const productPriceWrap = basketItem.querySelector('.product-price');
        if (productPriceWrap) {
          productPriceWrap.insertAdjacentHTML('beforebegin', markup);
        }
      }
    })

    // make change to breakdown
    if (totalDiscount > 0) {
      const basketBreakdown = document.querySelector('.basket-breakdown');
      if (basketBreakdown) {
        const firstLi = basketBreakdown.querySelectorAll('li')[0];
        const liMarkup = `
          <li class="${shared.ID}__li">
            <span class="label">Discount</span>
            <span class="value">-£${totalDiscount.toFixed(2)}</span>
          </li>
        `;
        if (firstLi) {
          firstLi.insertAdjacentHTML('afterend', liMarkup);
        }
      }
    }

  })
}

const runCheckoutChanges = () => {
  const prodSavings = {};

  let totalDiscount = 0;

  const ecommLayer = dataLayer.filter(item => item.event == 'begin_checkout');
  (ecommLayer?.[0]?.ecommerce?.items || []).forEach(prod => {
    if(prod.item_discount_value) {
      totalDiscount += prod.item_discount_value;

      prodSavings[prod.item_name.trim()] = {
        orig_price: prod.item_original_price,
        price: prod.price,
        discount: prod.item_discount_value,
        discount_percent: 100 - Math.round(100 * prod.item_discount_value / prod.price),
      }
    }
  });
    
  // make change to breakdown
  if (totalDiscount > 0) {
    const basketBreakdown = document.querySelector('.total-line-table__tbody');
    if (basketBreakdown) {
      const firstLi = basketBreakdown.querySelectorAll('tr')[0];
      const liMarkup = `
        <tr class="total-line ${shared.ID}__li">
          <th class="total-line__name">
            <span class="label">Discount</span>
          </th>

          <td class="total-line__price">
            <span class="value">-£${totalDiscount.toFixed(2)}</span>
          </td>
        </tr>
      `;
      if (firstLi) {
        firstLi.insertAdjacentHTML('afterend', liMarkup);
      }
    }
  }

  const pageProds = document.querySelectorAll('.order-summary__section .product-row');
  [].forEach.call(pageProds, p => {
    const title = p.querySelector('.product-title');
    const priceElm = p.querySelector('.product-row-price');

    if(title && priceElm && prodSavings[title.innerText.trim()]) {
      const markup = `
        <div class="${shared.ID}__discount ${shared.ID}__discount--checkout">
          ${prodSavings[title.innerText.trim()].discount_percent.toFixed(0)}% off
        </div>
      `;

      priceElm.insertAdjacentHTML('beforeend', markup);
    }
  });

};

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if(VARIATION == 'control') {
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...
    if(location.pathname.match(/cart/)) {
      runCartChanges();
    } else if (location.pathname.match(/checkouts/)) {
      runCheckoutChanges();
    }
  };

  // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  init();
};
