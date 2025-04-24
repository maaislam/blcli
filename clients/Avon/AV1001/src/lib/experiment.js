/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/utils';
import { newBannerHTML } from './newBannerHTML';
import { newTopRated } from './newTopRated';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {

  pollerLite(['.shopify-section.hero.hero-holiday'], () => {

    console.log('AV1001 TEST')



    let firstHero = document.querySelector('#MainContent section:first-child');

    const experimentContainer = document.createElement('section');
    experimentContainer.setAttribute('id', `${ID}-main-container`);
    experimentContainer.classList.add(`${ID}-main-container`);

    firstHero.insertAdjacentElement('afterend', experimentContainer);

    experimentContainer.insertAdjacentHTML('beforeend', newBannerHTML);
    experimentContainer.insertAdjacentHTML('beforeend', newTopRated);

    })

    function addToCartAPI(productId, button) {
      const apiUrl = 'https://avon.uk.com/cart/add.js';

      let screenWidth = window.innerWidth;
      let quantity = 0;
      console.log(screenWidth)

      if(screenWidth < 768){
        quantity = button.closest('.product-actions').querySelector(`.mobile-dropdown .mobile-quantity-select`).value
      } else {
        quantity = button.closest('.product-actions').querySelector(`.${ID}-product-quantity-container .product-quantity`).value
      }

      console.log('atc clicked', productId, quantity);


      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: quantity,
          id: productId
        }),
      };

      fetch(apiUrl, requestData)
      .then(response => response.json())
      .then(() => {
            button.innerText = 'Added';
        fetch('https://avon.uk.com/cart.js', { cache: 'default' })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(returnedData => {
            let basketCountElement = document.querySelector('.cart-count');
            basketCountElement.innerText = returnedData.item_count;
            if (returnedData.item_count > 0 && basketCountElement.classList.contains('no-items')) {
              basketCountElement.classList.remove('no-items');
            }
            setTimeout(() => {
              button.innerText = 'Add to basket';
            }, 3000);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    
      })
      .catch(error => {
        console.error('Error adding to cart:', error);
      });
    

    }


    let atcButtons = document.querySelectorAll(`.${ID}-atc-button`);
    
    atcButtons.forEach(button => {
      const productIdString = button.closest(`.${ID}-product-listing-container`).getAttribute('variant-product-id');
      const productId = parseInt(productIdString)
      console.log(productId);
      button.addEventListener('click', () => {
        addToCartAPI(productId, button);
      })
    })
}
    


export default () => {

  setup();

  logMessage(ID + " Variation: "+VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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
