/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  // console.log('Experiment started');

  pollerLite(['#content .product_listing_section .prod_list_outer'], () => {
    // console.log('Poller fired');

    const allProducts = document.querySelectorAll('#content .product_listing_section .prod_list_outer');

    allProducts.forEach((product) => {

      product.classList.add(`${ID}-product-listing-outer`)

      const productDetails = product.querySelector('.details');
      let buyOrHire = product.querySelector('.hire-CTA').innerText.trim();
      if (buyOrHire === 'Buy Now') {
        buyOrHire = 'Buy';
      } else {
        buyOrHire = 'For Hire';
      }

      const badgeHTML = `<div class="${ID}-badge">${buyOrHire}</div>`;

      const productPrice = product.querySelector('.resalePriceBox');
      const productPriceExVAT = product.querySelector('.resalePriceBoxExVat');

      // if (productPrice) {
      //   productPrice.classList.add(`${ID}-display-none`);
      // }
      // if (productPriceExVAT) {
      //   productPriceExVAT.classList.add(`${ID}-display-none`);
      // }

      productDetails.insertAdjacentHTML('beforebegin', badgeHTML);
    });
  });
}

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    if(e.target.closest('a.productMainLink') || e.target.closest('a.hire-CTA') || e.target.closest('span.productMainLink')) {
      fireEvent('Click - Clicks a PDP')
    }

    if(e.target.closest('button.add_to_cart_button')) {
      fireEvent('Click - Clicks to add to bag PDP')
    }
  });
}

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["ga4"];
  newEvents.property = "G-69ML6JH4G6";

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  addTracking();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
