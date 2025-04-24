/**
 * BO162 - PLP Offer Design
 * 
 * Restyles the offer message. If a product has multiple offers then the message changes to “View all offers for this product“ with the number of offers. 
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { observer, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  // triggers all passed event
  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  const offerCount = (str) => {
    const re = /(P1a)/g
    return ((str || '').match(re) || []).length
  }
  

  // loop through products
  const addMultiOffer = () => {
    const allProductOffers = document.querySelectorAll(`.estore_product_container .product_offer.plp-promotion-redesign-container`);

    for (let index = 0; index < allProductOffers.length; index += 1) {
      const element = allProductOffers[index];

      if(VARIATION === '1') {
        const offerInput = element.querySelector('input');

         // checks if product has more than offer, if it does change the html
        if(offerCount(offerInput.value) > 1) {
          const noOfOffers = offerCount(offerInput.value);

          element.classList.add(`${ID}-multiple`);
          element.querySelector('a').innerHTML = `<span>${noOfOffers}</span><p>View offers available on this product</p>`;
        };
      }

      // send event if clicked
      element.addEventListener('click', () => {
        fireEvent('Clicked PLP Offer');
      });
    }
  }

  addMultiOffer();


  // observer that checks for changes made within the PLP grid
  observer.connect(document.querySelector('.product_listing_container ul.grid_mode'), () => {
    setTimeout(() => {

      // re add the multi offer
      addMultiOffer();
    }, 500);
  }, {
    throttle: 200,
    config: {
      attributes: false,
      childList: true,
    },
  });
};
