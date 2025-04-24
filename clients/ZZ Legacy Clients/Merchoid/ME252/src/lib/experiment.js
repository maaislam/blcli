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

  const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
  const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');

  const brandLogo = document.querySelector('.official-licensed .official-licensed-product img');

  let bottomContent;

  if(VARIATION === '1') {

    // use logo or brand name, if none just use standard message
    if(brandLogo && brandLogo.getAttribute('src').indexOf('/slider/') > -1) {
      bottomContent = `for this officially licensed <div class="${ID}-logo"><img src="${brandLogo.getAttribute('src')}"/></div> merchandise`;
    } else if(document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/)) {
      const brand = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);
      bottomContent = `for this officially licensed ${brand} merchandise`;
    } else {
      bottomContent = `for this officially licensed merchandise`;
    }
  } 

  
  else if (VARIATION === '2') {
    bottomContent = `Buy today risk free with <span>100 day</span> hassle free returns`;
  } 

  else if (VARIATION === '3') {
    if(window.location.pathname.indexOf('/uk/') > -1){
      bottomContent = `Buy today and secure <span>free delivery</span>`;
    } else {
      bottomContent = `Buy today and secure <span>free shipping</span>`;
    }
  }


  // create new price box
  const priceBox = document.createElement('div');
  priceBox.classList.add(`${ID}-priceContainer`);
  priceBox.innerHTML = `
    <div class="${ID}-priceWrapper">
      <p>Only <b>${currentPrice.textContent}</b></p>
      ${oldPrice ? `<span>${oldPrice.textContent}</span>` : ''}
    </div>
    <div class="${ID}-contentBottom">${bottomContent}</div>`;

  document.querySelector('.product-info-main .product-info-price').insertAdjacentElement('beforebegin', priceBox);
  

};
