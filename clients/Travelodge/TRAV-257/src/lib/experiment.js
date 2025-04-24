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

const startExperiment = () => {
  function appendToMap(button){
    const map = document.querySelector('.map');
    map.insertAdjacentElement('afterbegin', button);
  }

  function appendToHotelsFound(button){
    const hotelsFound = document.querySelector('.qa-pagination-total span');
    hotelsFound.insertAdjacentElement('afterend', button);
  }

  pollerLite(['.qa-search-page .qa-map-open'], () => {
    
    const openMapButton = document.querySelector('.qa-search-page .qa-map-open');
    openMapButton.classList.add(`${ID}-open-map-button`);

    openMapButton.addEventListener('click', function() {
      this.classList.toggle(`${ID}-open-map-button`);
      appendToMap(this);
    });
  
    const hotelsFoundParagraph = document.querySelector('.jsx-2171004328 .qa-pagination-total');
    hotelsFoundParagraph.classList.add(`${ID}-hotels-found-paragraph`);
  
    const hotelsFoundSpan = document.querySelector('.jsx-2171004328 .qa-pagination-total span');
    hotelsFoundSpan.classList.add(`${ID}-hotels-found-span`);
    hotelsFoundSpan.insertAdjacentElement('afterend', openMapButton);


    // Select the node that will be observed for mutations
    const targetNode = document.querySelector(".qa-search-page .qa-pagination-total");

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          const openMapButton = document.querySelector('.qa-search-page .qa-map-open');
          if(openMapButton){
          openMapButton.addEventListener('click', function() {
            this.classList.toggle(`${ID}-open-map-button`);
            appendToHotelsFound(this);
          });
        }

          const closeMapButton = document.querySelector('.qa-search-page .qa-map-close');
          if(closeMapButton){
            closeMapButton.addEventListener('click', function() {
              appendToMap(this);
            });
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    // Later, you can stop observing
    // observer.disconnect();
  })


}

const addUniversalTracking = () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('.qa-search-page .qa-map-open')) {
      fireEvent(`Click - Open map button clicked`, true);
    }

    if (e.target.closest('.qa-search-page .qa-map-popover-hotel-link')) {
      fireEvent(`Click - User clicks to go to HDP from map`, true);
    }
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
  addUniversalTracking();

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

  let width = window.innerWidth;
  if (width < 500) {
    startExperiment();
  }
};
