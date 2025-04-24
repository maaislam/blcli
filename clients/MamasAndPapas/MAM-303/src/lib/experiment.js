/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const fireAndLogEvent = (event) => {
  logMessage(event);
  fireEvent(event, true);
}

const addVariationTracking = () => {

  if(window.location.href.indexOf('/cart') > -1) {
    pollerLite(['.pdp_rec_card'], () => {

      let allBasketRecs = document.querySelectorAll('.pdp_rec_card');
  
      [].slice.call(allBasketRecs).forEach((rec) => {
  
        rec.addEventListener('click', (e) => {
  
          let destURL = e.currentTarget.href;

          let prodSKU = [e.currentTarget.querySelector('.prodsku').innerText];

          if(localStorage.getItem(`${ID}-carousel-items-clicked`)) {
            let currLS = JSON.parse(localStorage.getItem(`${ID}-carousel-items-clicked`));
            prodSKU = e.currentTarget.querySelector('.prodsku').innerText;
            currLS.push(prodSKU);
            localStorage.setItem(`${ID}-carousel-items-clicked`, JSON.stringify(currLS));

          } else {
            localStorage.setItem(`${ID}-carousel-items-clicked`,  JSON.stringify(prodSKU));
          }
          
  
          fireAndLogEvent('Click - the user clicked on the carousel item and was taken to: '+destURL+' with sku: '+e.currentTarget.querySelector('.prodsku').innerText);
  
        })
  
      })
  
  
  
    })
  } else if(window.location.href.indexOf('/products') > -1) {

    // do add to bag tracking

    pollerLite(['.product-form__cart-submit'], (e) => {

      let atbButton = document.querySelector('button.product-form__cart-submit');

      atbButton.addEventListener('click', (e) => {

        let currURL = window.location.href;

        let prodSKU = window.dataLayerData.product.id;
        let currLSData = localStorage.getItem(`${ID}-carousel-items-clicked`);
        
        if(currLSData.includes(prodSKU)) {
          fireAndLogEvent('Click - user clicked the ATB button on product page: '+currURL+' with SKU: '+prodSKU+' which they clicked on from basket recs');
        } else {
          logMessage('item not in array, not clicked');
        }

        

      })

    })

  }
  

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

  addVariationTracking();
  
};
