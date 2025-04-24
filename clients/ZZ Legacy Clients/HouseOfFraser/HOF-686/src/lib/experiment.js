/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, pollerLite } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;


const startExperiment = () => {
  pollerLite(['.rating-container', '.bv_numReviews_text', '#BVRRContainer', 'div[data-bv-show="reviews"]'], () => {
    let ratingContainer = document.querySelector('.rating-container');
    let numReviews = ratingContainer.querySelector('.bv_numReviews_text').innerText.replaceAll('(', '').replaceAll(')', '');

    if(VARIATION == 1) {
      if(numReviews == 0) {
        ratingContainer.classList.add(`${ID}-hidden`);
        document.querySelector('div[data-bv-show="reviews"]').classList.add(`${ID}-hidden`);
        fireEvent('Interaction - the review container has been hidden');
      } else {
        fireEvent('Interaction - number of reviews is not 0, nothing changed');
      }
    } else {

      if(numReviews == 0) {
        ratingContainer.classList.add(`${ID}-updated`);
        document.querySelector('div[data-bv-show="reviews"]').classList.add(`${ID}-hidden`);
        ratingContainer.querySelector(`.bv_button_component_container`).classList.add(`${ID}-hidden`);
        ratingContainer.querySelector(`.bv_button_component_container`).insertAdjacentHTML('afterend', `<button id="${ID}-write-review" class="${ID}-write-review">Be the first to review this product</button>`)

        let writeReview = document.querySelector(`.${ID}-write-review`);
        writeReview.addEventListener('click', () => {
          ratingContainer.querySelector(`.bv_button_component_container button`).click()
          fireEvent(`Click - user has clicked on the altered write review button`);
        });

        fireEvent('Interaction - the review container has been updated');
      } else {
        fireEvent(`Interaction - number of reviews is not 0, nothing changed`, true);
      }

    }
    
  });


}

const addEvents = () => {

  pollerLite(['.rating-container', '.bv_numReviews_text', '#aAddToBag'], () => {

    
    if(VARIATION !== "2") {
      let reviewButton = document.querySelector(`.bv_button_component_container button`);
      reviewButton.addEventListener('click', () => {
        fireEvent(`Click - user has clicked on the write review button`);
      });
    }
    

    document.body.addEventListener('click', (e) => {  
    
      if(e.target.name == "bv-submit-button") {
        fireEvent(`Click - user has clicked on the submit button for the review add modal`);     
      }
      
    });  

    document.getElementById('aAddToBag').addEventListener('click', () => {
      fireEvent(`Click - user has clicked on the add to bag button`);
    });

  });

}


export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEvents();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();


};
