/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events, observer, pollerLite } from '../../../../../lib/utils';
import { isNextDayPossible } from './delivery';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  const hasInternationalDelivery = () => {
    const internationDeliveryText = document.querySelector('.product-col-2.product-detail .prod-opt-d');
    if(internationDeliveryText.classList.contains('true')) {
      return true;
    }
  }

  const deliveryUSP = () => {
    const clickAndCollect = document.querySelector('.product-col-2.product-detail .prod-opt-c');
    const shippingMessage = document.querySelector('.preorder-msg');
    let content;
    if(shippingMessage) {
      content = '';
    }
    else if(isNextDayPossible() === true){
      content = `<li class="${ID}-nextDay">Next and Nominated day delivery available from £5.95*</li>`;
    } 
    else if (clickAndCollect.classList.contains('true')) {
      content = `<li class="${ID}-clickCollect">Available for UK Click & Collect only.</li>`;
    } else {
      content = `<li class="${ID}-nominated">Nominated day delivery available from £5.95*</li>`;
    }
    return content;
  }

  const addPriceFramingBox = () => {
    
    const priceBox = document.createElement('div');
    priceBox.classList.add(`${ID}-priceBox`);
    priceBox.innerHTML = `<div class="${ID}-topRow">
      <div class="${ID}-price"></div>
      <div class="${ID}-reviews"></div>
    </div>
    <div class="${ID}-priceUsps">
      <li class="${ID}-stock">In stock for UK ${hasInternationalDelivery() === true ? `and International ` : ''}delivery</li>
      
     ${deliveryUSP() !== '' ? deliveryUSP() : ''}
      
      <li class="${ID}-gift">Add a gift message with a FREE card at checkout</li>
    </div>`;

    const productPrice = document.querySelector('.price-wrapper');
    priceBox.querySelector(`.${ID}-price`).appendChild(productPrice);

    // move and restyle reviews
    const reviews = document.querySelector('#product-content .product-add-to-cart .product-review-links');
    const reviewRating = document.querySelector('#BVRRSearchContainer .bv-rating-ratio-number .bv-rating span');
    if(reviews && reviewRating) {

      const reviewNumber = document.querySelector('#BVRRSearchContainer .bv-rating-ratio-number .bv-rating span');
      const reviewAmount = document.querySelector('.product-review-links.product-review-links-top .bv-rating-ratio-count span').innerText.replace('Reviews', '').replace(/\s/g, '');

      priceBox.querySelector(`.${ID}-reviews`).appendChild(reviews);
      // add new review count
      priceBox.querySelector(`.${ID}-reviews`).insertAdjacentHTML('beforeend', `<div class="${ID}-reviewCount"><span>${reviewNumber.innerText}</span><p>(${reviewAmount})</p></div>`);
    
    }

    document.querySelector('.pdpForm').insertAdjacentElement('afterbegin', priceBox);

    if(document.querySelector(`.${ID}-priceBox .${ID}-reviews`)) {
      pollerLite(['#tabReviews'], () => {
        document.querySelector(`.product-review-links.product-review-links-top`).addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.reviews.ui-tabs-anchor').click();
        document.getElementById("tabReviews").scrollIntoView();
        });
      });
    }
  }

  addPriceFramingBox();

  observer.connect(document.querySelector('#product-detail-wrapper'), () => {
    if(document.querySelector(`.${ID}-priceBox`)) {
 
      document.querySelector(`.${ID}-priceBox`).remove();
    }
    setTimeout(() => {
     
      addPriceFramingBox();
    }, 1000);
   
  }, {
    config: { attributes: true, childList: true, subtree: false },
    throttle: 1000,
  });

  // At end of code, reset window.einstein expect type array
  window.einstein.loaded = [];



};
