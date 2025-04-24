/**
 * HS-416 - HS416 - Recommended Hire Length Within PDPs
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
// import HSS031_exp from './HSS031/HSS031_exp';
// import data from './data';
import data_new from './data_new';
import { addMostPopularTag, clickShowTooltip, hoverOverTooltip } from './helpers';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  // HSS031_exp;
  setup();
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
  const productData = data_new[`${window.location.pathname}`];

  let newBlock;
  if (productData) {
    newBlock = `<div class="${ID}-most-popular__wrapper">
      <div class="${ID}-most-popular first">
        <!---<div class="banner">
          <div>Most Popular <span class="tooltiptext">Average hire time based on ${productData.number_of_customers_hired} customers who hired this product.</span></div>
      </div>--->
        <div class="${ID}-text"><span>Average hire - </span><span class="bold"> ${productData.most_popular}</span><span class="tooltiptext">Average hire time based on ${productData.number_of_customers_hired} customers who hired this product.</span></div>
        <!---<label><span class="HSS031-text"><strong>${productData.most_popular.toUpperCase()}</strong> <br><small>(Average Hire)</small></span></label>--->
        <!---<p>${productData.price}</p>--->
      </div>
      <div class="${ID}-most-popular second">
        <div class="${ID}-text">Prices ${document.querySelector('[name="in-vat"]')?.checked ? 'include' : 'exclude'} VAT</div>
      </div>
    </div>`;
  }

  if (VARIATION == '1') {
    // --- desktop
    document.querySelector('div#primary_image.productImagePrimary.clickImage').insertAdjacentHTML('afterbegin', newBlock);
    // --- tablet - mobile
    document.querySelector('.mob-productImage .bx-wrapper .bx-viewport').insertAdjacentHTML('afterbegin', newBlock);
    
    clickShowTooltip(document.querySelectorAll(`.${ID}-most-popular__wrapper`)[0]);
    clickShowTooltip(document.querySelectorAll(`.${ID}-most-popular__wrapper`)[1]);
    hoverOverTooltip(document.querySelectorAll(`.${ID}-most-popular__wrapper`)[1]);
  } else if (VARIATION == '2') {
    // --- desktop
    document.querySelectorAll('.item_info .netprice-pdp')[0].insertAdjacentHTML('afterend', newBlock);
    // --- tablet - mobile
    document.querySelectorAll('.item_info .netprice-pdp')[1].insertAdjacentHTML('afterend', newBlock);
    
    clickShowTooltip(document.querySelectorAll(`.${ID}-most-popular__wrapper`)[0]);
    clickShowTooltip(document.querySelectorAll(`.${ID}-most-popular__wrapper`)[1]);
    hoverOverTooltip(document.querySelectorAll(`.${ID}-most-popular__wrapper`)[1]);
  }
  

  // --- OLD CODE
  // const allPricesMobileTop = document.querySelectorAll('.day_price')[0].querySelectorAll('.price-row .price-blk');
  // const allPricesTabletTop = document.querySelectorAll('.day_price')[1].querySelectorAll('.price-row .price-blk');
  // const allPrices = document.querySelectorAll('.day_price')[1].querySelectorAll('.price-row .price-blk');
  // addMostPopularTag(allPricesMobileTop, productData, newBlock);
  // addMostPopularTag(allPricesTabletTop, productData, newBlock);
  // addMostPopularTag(allPrices, productData, newBlock);


};
