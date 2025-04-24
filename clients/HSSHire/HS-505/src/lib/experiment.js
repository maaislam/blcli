/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/utils';


const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {

  const isBuyPage = window.location.href.includes('/buy/');
  if(isBuyPage) {
    console.log('buy page');
    pollerLite(['.productDetailsPage .galleryContainer'], () => {

      const viewThreshold = 10;
      const count = parseInt("{{ report_value_by_key('5ddec8846e454d6046284bd2', params.product_id) }}");
      console.log(count, 'count in code');
      if (count < viewThreshold || count === "None" || count === undefined || count === null || isNaN(count)) {
          return;
      }

      let socialProofHTML = `
      <div class="${ID}_main_container">
        <p class="${ID}_social_message">${count} people viewed in the last 24hrs</p>
      </div>
      `

      let targetContainer = document.querySelector('.productImage .productImagePrimary .productImagePrimaryLink');
      targetContainer.insertAdjacentHTML('beforeend', socialProofHTML);

      function fadeOut() {
        document.querySelector(`.${ID}_main_container`).style.opacity = 0;
      }

      setTimeout(fadeOut, 5000)

    })

      let atcButton = document.querySelector(`#addToBasket`);
      let productId = document.querySelector("#prd-code2").textContent.trim()
        atcButton.addEventListener('click', () => {
          fireEvent(`Click - add to bag button clicked for productId: ${productId}`, true);
    })
}

  

}

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["ga4"];
  newEvents.property = "G-69ML6JH4G6";

  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
};
