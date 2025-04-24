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

  const { ID } = shared;

  const addOffer = () => {
    const offerBox = document.createElement('div');
    offerBox.classList.add(`${ID}-offer`);
    offerBox.innerHTML = `<h4>Exclusive Price</h4><span>Offer ends Valentines Day</span>`;

    if (window.digitalData.product[0].productInfo.masterSku === "5863163" || window.digitalData.product[0].productInfo.masterSku === "5863414"){
      offerBox.innerHTML = `<h4>Save £1500!</h4><span>Get this ring for £799.<br>Add to basket to claim!</span>`;
      if (document.querySelector('.product-price-offer')) {
      document.querySelector('.product-price-offer').style.display = "none";
      }
    } 
    
    document.querySelector('.product-summary .product-price-pricing').insertAdjacentElement('afterend', offerBox);
  }

  addOffer();
};