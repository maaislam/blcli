/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

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

  let brand = 'Merchoid';

  if(document.querySelector('meta[property="og:brand"]') && document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/)) {
    if(document.querySelector('meta[property="og:brand"]').content.indexOf('Warhammer') > -1) {
      brand = 'Warhammer 40,000';
    } else {
      brand = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
    }
  } else {
    brand = 'Merchoid'
  }

  const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
  const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');


  const priceBox = document.createElement('div');
  priceBox.classList.add(`${ID}-priceContainer`);
  priceBox.innerHTML = `
    <div class="${ID}-bannerText"><b>Last chance!</b> Secure yourself this officially licensed ${brand} product at our 2022 prices! 100% Money Back Guarantee.</div>`;

  document.querySelector('.product-usps').insertAdjacentElement('beforebegin', priceBox);
  
  
};
