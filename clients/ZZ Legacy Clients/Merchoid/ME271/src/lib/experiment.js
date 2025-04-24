
 /* ID - Description
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

  const url = window.location.href;

  const productName = document.querySelector('.page-title').innerText.replace('Preorder', '').replace(':', '');


  const getContent = () => {
    let content;

    let brand;
    if(document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/)) {
      brand = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
    }

    if(VARIATION === '1') {
      content = `We all need a bit of Christmas cheer this year. Treat someone (even yourself!) to an <b>officially licensed</b> ${productName}`;
    } else if (VARIATION === '2') {
      content = `Buy our <b>officially licensed</b> ${productName} and kickstart your festive cheers this year.`;
    }

    return content;
  }
 

  const addPriceFraming = () => {
    const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
    const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');
    let markup;

    markup = 
      `<div class="${ID}-contentBottom">${getContent()}</div>
      <div class="${ID}-priceWrapper">
        <p>Only <b>${currentPrice.textContent}</b></p>
        ${oldPrice ? `<span>${oldPrice.textContent}</span>` : ''}
      </div>`;


    // create new price box
    const priceBox = document.createElement('div');
    priceBox.classList.add(`${ID}-priceContainer`);
    priceBox.innerHTML = markup;

    document.querySelector('.product-info-main .product-info-price').insertAdjacentElement('beforebegin', priceBox);
  }

  addPriceFraming();
  

};
