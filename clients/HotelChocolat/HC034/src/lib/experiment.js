import { observer } from '../../../../../lib/utils';
import dataJSON from './productData';
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

  const matchingData = () => {
    const sku = parseInt(document.querySelector('#product-content .pdpForm #pid').value, 10);
    let matchingInfo;

    // loop through JSON to get matching details
    dataJSON.forEach(el => {
      if(el.productSKU === sku) {
        matchingInfo = el;
      }
    });

    return matchingInfo;
  }

  const priceFramingBox = () => {
    const productInfo = matchingData();
    const productPrice = document.querySelector('#product-content .product-price .price-sales');
    const wasPrice = document.querySelector('#product-content .product-price .price-standard');

    const priceBox = document.createElement(`div`);
    priceBox.classList.add(`${ID}-priceBox`);
    priceBox.innerHTML = 
    `<div class="${ID}-price">Only <span class="${ID}-productPrice">${productPrice.textContent}</span> ${wasPrice ? `<span class="${ID}-was">${wasPrice.textContent}</span>` : ``}</div>
    <div class="${ID}-content">
    <p></p>
    </div>`;

    if(VARIATION === 'control') {
      priceBox.querySelector(`.${ID}-content p`).innerHTML = "If you're not 100% happy with our products or service, we guarantee that we'll immediately put it right for you – refunding, replacing or issuing a Gift Card";
    } else if(VARIATION === '1') {
      priceBox.querySelector(`.${ID}-content p`).innerHTML = 'We’re committed to using only real, natural ingredients – nothing artificial, ever';
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
