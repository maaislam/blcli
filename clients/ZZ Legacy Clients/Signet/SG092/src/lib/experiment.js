/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import countdown from './countdown';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    const deliveryDateText = document.querySelector('.product-delivery__text #js-update-delivery');
    const productStock = document.querySelector('.product-summary .product-stock');

    let deliveryPricing = '';
    let priceCutoff = 100;
    if(getSiteFromHostname() == 'ernestjones') {
      deliveryPricing = '£5.00';
      priceCutoff = 100;
    }

    if(getSiteFromHostname() == 'hsamuel') {
      deliveryPricing = '£4.95';
      priceCutoff = 49;
    }

    if(deliveryDateText && productStock) {
      const markup = `
        <div class="${ID}-countdown-wrapper">

          <strong>✔ In Stock</strong>. Order in the next 
          <div>
            <span class="${ID}-countdown"></span> 
            for delivery as early as <strong>${deliveryDateText.innerText.trim()}</strong>
          </div>
        </div>
      `;

      productStock.innerHTML = markup;

      const curPrice = window?.digitalData?.product?.[0]?.price?.currentPrice;
      if(curPrice && curPrice < priceCutoff && deliveryPricing) {
        productStock.insertAdjacentHTML('beforeend', `
          <div class="${ID}-next-day">
            Next Day Delivery available from ${deliveryPricing}.
          </div>
        `);
      }

      countdown();
    }
  }
};
