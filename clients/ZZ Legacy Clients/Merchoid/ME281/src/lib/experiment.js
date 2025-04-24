/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID, VARIATION } = shared;


  // create message based on variation
  const messageContent = () => {
    let message;
    let brand;
    let name;

    if(document.querySelector('.page-title > span').childNodes[1]) {
      name = document.querySelector('.page-title > span').childNodes[1];
    } else {
      name = document.querySelector('.page-title > span').childNodes[0];
    }
   
    if(document.querySelector('meta[property="og:brand"]') && document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/)) {
      if(document.querySelector('meta[property="og:brand"]').content.indexOf('Warhammer') > -1) {
        brand = 'Warhammer 40,000';
      } else {
        brand = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
      }
    } else {
      brand = ''
    }
    
    if(VARIATION === '1') {
      message = `Secure Your <b>Premium ${brand} Merchandise</b> at an Affordable Price`;
    } else {
      message = `<b>Premium Affordable ${brand} Merch</b>Add this ${name.textContent.trim().replace('Preorder', '').toLowerCase()} to your ${brand} Collection Today.`;
    }

    return message;
  }

  // create price box
  const luxuryMessageBox = () => {
    const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
    const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');
    
    const luxBox = document.createElement('div');
    luxBox.classList.add(`${ID}-priceMessage`);
    luxBox.innerHTML = `
    <div class="${ID}-priceWrapper">
      <h3>${currentPrice.textContent}</h3>
      ${oldPrice ? `<span>${oldPrice.textContent}</span>` : ''}
    </div>
    <div class="${ID}-message">
      <p>${messageContent()}</p>
    </div>`;

    document.querySelector('.product-info-main .product-info-price').insertAdjacentElement('beforebegin', luxBox);
  }

  luxuryMessageBox();
};
