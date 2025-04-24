/**
 * HSS037 - Recommended Hire Length On PDPs
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import HSS031_exp from './HSS031/HSS031_exp';
// import data from './data';
import data1 from './data1';
import { addMostPopularTag } from './helpers';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  // HSS031_exp;
  setup();
// alert('Run HSS037 now');
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
  const productData = data1[`${window.location.pathname}`];

  let newBlock;
  if (productData) {
    newBlock = `<div class="price-blk ${ID}-most-popular">
      <div class="banner">
        <div>Most Popular <span class="tooltiptext">Average hire time based on ${productData.number_of_customers_hired} customers who hired this product.</span></div>
     </div>
      <label><span class="HSS031-text"><strong>${productData.most_popular.toUpperCase()}</strong> <br><small>(Average Hire)</small></span></label>
      <p>${productData.price}</p>
      <!---<p>${productData.price}</p>--->
    </div>`;
  }

  const allPricesMobileTop = document.querySelectorAll('.day_price')[0].querySelectorAll('.price-row .price-blk');
  const allPricesTabletTop = document.querySelectorAll('.day_price')[1].querySelectorAll('.price-row .price-blk');
  const allPrices = document.querySelectorAll('.day_price')[1].querySelectorAll('.price-row .price-blk');
  addMostPopularTag(allPricesMobileTop, productData, newBlock);
  addMostPopularTag(allPricesTabletTop, productData, newBlock);
  addMostPopularTag(allPrices, productData, newBlock);


};
