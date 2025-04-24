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

  const scarcityMessageV1 = () => {
    const productImage = document.querySelector('#productImage');
    const scarcity = document.createElement('div');
    scarcity.classList.add(`${ID}-scarcity`);
    if(window.innerWidth > 767) {
      scarcity.innerHTML = `<span>0% Interest Free Credit for up to 4 years available on this product</span>`;
    } else {
      scarcity.innerHTML = `<span>0% Interest Free Credit for up to 4 years available</span>`;  
    }
    
    productImage.appendChild(scarcity);
  }

  if(shared.VARIATION === '1') {
    setTimeout(() => {
      scarcityMessage();
    }, 5000);
  }
 

  const scarcityMessageV2 = () => {
    const header = document.querySelector('#js-header');
    const scarcityBar = document.createElement('div');
    scarcityBar.classList.add(`${ID}-scarcityBar`);
    scarcityBar.innerHTML = `<span>Up to <b>4 years</b> Interest Free Credit available</span>`;

    header.insertAdjacentElement('afterend', scarcityBar);
  }

  if(shared.VARIATION === '2') {
    scarcityMessageV2();
  }

  
};
