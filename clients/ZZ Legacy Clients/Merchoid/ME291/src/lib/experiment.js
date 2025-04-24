/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/utils';
import ScarcityBar from './scarcity';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();
  const { ID, VARIATION } = shared;

  const brandName = document.querySelector('meta[property="og:brand"]').content.match(/[^,]*/);

  const createPriceBox = () => {

    const currentPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=finalPrice]');
    const oldPrice = document.querySelector('.page-main .product-info-main .price-box.price-final_price [data-price-type=oldPrice]');

    // create new price box
    const priceBox = document.createElement('div');
    priceBox.classList.add(`${ID}-priceContainer`);
    priceBox.innerHTML = `
      <div class="${ID}-priceWrapper">
        <p>Only <b>${currentPrice.textContent}</b></p>
        ${oldPrice ? `<span>${oldPrice.textContent}</span>` : ''}
      </div>
      <div class="${ID}-contentBottom">
        <div class="${ID}-priceMessages">
          <p><span>Hurry!</span> You’re shopping a trending brand, we’ve already sold out of <span>6</span> ${brandName[0]} lines</p>
        </div>
      </div>`;

    document.querySelector('.product-info-main .product-info-price').insertAdjacentElement('beforebegin', priceBox);

    sessionStorage.setItem(`${ID}-brand`, brandName[0]);
  }


  if(brandName[0]) {


    if(VARIATION === '1') {
      pollerLite(['#scarity-message'], () => {
         // if first product, show and get the brand
          if(!sessionStorage.getItem(`${ID}-brand`)) {
            new ScarcityBar();
          }

          // only show if brand matches
          else if(sessionStorage.getItem(`${ID}-brand`) === brandName[0]) {
            new ScarcityBar();
          }    
      });
    }

    if(VARIATION === '2') {
      if(!sessionStorage.getItem(`${ID}-brand`)) {
        createPriceBox();
      }

      // only show if brand matches
      else if(sessionStorage.getItem(`${ID}-brand`) === brandName[0]) {
        createPriceBox();
      } 
      
    }
  }
};
