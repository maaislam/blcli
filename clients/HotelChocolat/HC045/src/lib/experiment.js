
import { observer } from '../../../../../lib/utils';
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

  const { ID,VARIATION } = shared;

  const priceFramingBox = () => {


    const productPrice = document.querySelector('#product-content .product-price .price-sales');
    const wasPrice = document.querySelector('#product-content .product-price .price-standard');

    

    const rrpsavingPrice = () => {
      let savingPrice;
      if(wasPrice) {
        const currentPrice = parseFloat(productPrice.textContent.trim().replace('£',''));
        const parsedWasPrice = parseFloat(wasPrice.textContent.trim().replace('£',''));
  
        savingPrice = (parsedWasPrice - currentPrice).toFixed(2);
        return savingPrice;
      } 
    }
    

    const priceBox = document.createElement(`div`);
    priceBox.classList.add(`${ID}-priceBox`);
    if(wasPrice) {
      priceBox.classList.add(`${ID}-offer`);
    }
    priceBox.innerHTML = 
    `<div class="${ID}-price">
      ${wasPrice && VARIATION !== 'control' ? `Now` : 'Only'} <span class="${ID}-productPrice">${productPrice.textContent}</span> ${wasPrice ? `<span class="${ID}-was">${wasPrice.textContent}</span>` : ``}
      ${wasPrice && VARIATION !== 'control' ? `<p class="${ID}-savings">Order today and save £${rrpsavingPrice()} on the RRP</p>` : ''}
      </div>
      <div class="${ID}-content">
      <p></p>
    </div>`;

    if(VARIATION === 'control') {
      priceBox.querySelector(`.${ID}-content p`).innerHTML = "If you're not 100% happy with our products or service, we guarantee that we'll immediately put it right for you – refunding, replacing or issuing a Gift Card";
    } else if(VARIATION === '1') {
      priceBox.querySelector(`.${ID}-content p`).innerHTML = 'We’re committed to using only real, natural ingredients – nothing artificial, ever';
    }  else if(VARIATION === '2') {
      priceBox.querySelector(`.${ID}-content p`).innerHTML = "If you're not 100% happy with our products or service, we guarantee that we'll immediately put it right for you – refunding, replacing or issuing a Gift Card";
    }

    document.querySelector(`#product-content`).insertAdjacentElement('afterbegin', priceBox);
  }


  priceFramingBox();

  observer.connect(document.querySelector('#product-detail-wrapper'), () => {
      if(document.querySelector(`#product-content .${ID}-priceBox`)) {
        document.querySelector(`#product-content .${ID}-priceBox`).remove();
      }
      setTimeout(() => {
        priceFramingBox();
      }, 1000);
     
    }, {
      config: { attributes: true, childList: true, subtree: false },
      throttle: 1000,
    });
  
};
