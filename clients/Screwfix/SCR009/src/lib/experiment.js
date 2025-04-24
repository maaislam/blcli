/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { clickHandler } from './handler/clickHandler';
import { quantityHandler } from './handler/quantityHandler';
import { autoOptionAndQuatitySelector } from './helper/autoOptionAndQuatitySelector';
import { priceTagHTMLGenerator } from './helper/priceHTMLGenerator';
import { productOfferViewer } from './helper/productOfferViewer';
import { offerInfo } from './utils';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  // Goals -->
  document.body.addEventListener(`click`, function ({ target }) {
    clickHandler(target);
  });
  // user interacts with Quantity
  quantityHandler();
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
  window[`${ID}-$$savingOptions`] = [];
  const init = () => {
    const pdpContainer = document.querySelector(`div.pr__product`);
    const bulkSavingContainer = pdpContainer.querySelector(`.bulk-savings`);
    if (bulkSavingContainer) {
      let productOfferInfo;
      const productID = pdpContainer.querySelector(`input[id="productId"]`)?.value?.trim();
      // if (productID) productOfferInfo = await productOfferViewer(productID);
      if (productID)
        offerInfo(productID).then((info) => {
          productOfferInfo = productOfferViewer(info);
          if (productOfferInfo.length > 0) {
            let offerHTML = `<div class="${ID}-bulk-savings--options">
            ${productOfferInfo
              .map((info, id) => {
                const { quantity, price } = info;
                console.log(productID, id, info);
                priceTagHTMLGenerator(id, info);

                const highestVal = quantity.match(/[0-9]/g).slice(-1)[0];
                const lowestVal = quantity.match(/[0-9]/g).slice(0)[0];
                console.log(lowestVal, highestVal);

                return `
              <div class="saving-option${
                id == 0 ? ` saving-option-active" data-value="1"` : `" data-value="${id * 2 + 1}"`
              } id=saving-option-${id} data-highestQ="${highestVal}" data-lowestQ="${lowestVal}">
                  <span class="saving-option-qty">Buy ${quantity}</span>
                  <span class="saving-option-price">${price} each</span>
              </div>
              `;
              })
              .join('')}
      </div>`;
            // console.log(`%cwindow object`, `font-size:30px;`, window[`${ID}-$$savingOptions`]);
            bulkSavingContainer.insertAdjacentHTML('beforeend', offerHTML);
            // console.log(productOfferInfo, offerHTML);
            autoOptionAndQuatitySelector();
          }
        });
    }
  };
  init();
};
