/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import countdown from './countdown';

export default () => {
  setup();

  const { ID } = shared;

  const addOffer = () => {
    const offerBox = document.createElement('div');
    offerBox.classList.add(`${ID}-offer`);
    offerBox.innerHTML = `<h4>Exclusive Price</h4><span>Offer ends in <div class="${ID}-countdown"></div></span>`;

    if (window.digitalData.product[0].productInfo.masterSku === "2396521"){
      offerBox.innerHTML = `<h4>Exclusive Offer</h4><span>Get this product free with any<br>diamond purchase above £300</span>`;
      document.querySelector('.product-price-offer').style.display = "none";
    }
    
    document.querySelector('.product-summary .product-price-pricing').insertAdjacentElement('afterend', offerBox);
  }

  addOffer();

  countdown();
};