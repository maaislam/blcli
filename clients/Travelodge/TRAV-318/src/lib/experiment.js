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

const infoSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <circle cx="8" cy="8" r="7.36" stroke="#464646" stroke-width="1.28"/>
  <path d="M8.96004 4.15578C8.96004 4.43735 8.863 4.66704 8.66892 4.84487C8.47484 5.0227 8.25304 5.11162 8.0035 5.11162C7.74935 5.11162 7.52524 5.02764 7.33116 4.85969C7.13708 4.6868 7.04004 4.45711 7.04004 4.1706C7.04004 3.87916 7.13477 3.64452 7.32423 3.4667C7.51369 3.28887 7.74011 3.19995 8.0035 3.19995C8.26228 3.19995 8.48639 3.2864 8.67585 3.45929C8.86531 3.63218 8.96004 3.86434 8.96004 4.15578ZM8.86993 6.43052V13.0621C8.86993 13.1954 8.84221 13.2918 8.78675 13.351C8.7313 13.4103 8.64119 13.44 8.51643 13.44H7.52524C7.39585 13.44 7.30112 13.4103 7.24105 13.351C7.18098 13.2918 7.15094 13.1954 7.15094 13.0621V6.43052C7.15094 6.19835 7.27571 6.08227 7.52524 6.08227H8.51643C8.63657 6.08227 8.72437 6.10697 8.77982 6.15636C8.83989 6.20576 8.86993 6.29715 8.86993 6.43052Z" fill="#464646"/>
</svg>
`;


const onUrlChange = (callback, onError = null) => {
  if (typeof callback !== 'function') {
    throw new Error('Callback function must be provided');
  }
  const mutationConfig = {
    childList: true,
    subtree: true,
  };
  //Create a new MutationObserver instance to observe changes to the document body
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      //Store the current URL in a separate variable to make the code more concise
      const currentUrl = window.location.href;
      //Check if the URL has changed since the last observation
      if (observer.previousUrl !== currentUrl) {
        const oldHref = observer.previousUrl;
        //Update the previous URL and execute the callback function
        observer.previousUrl = currentUrl;
        //console.log('URL changed!');
        observer.disconnect();
        try {
          setTimeout(() => {
            callback(oldHref, mutation);
          }, 1000);
        } catch (error) {
          console.log(`Error in callback function: ${error}`);
        }
        observer.observe(document.documentElement, mutationConfig);
      }
    });
  });
  //Initialize the previous URL to the current URL
  try {
    observer.previousUrl = window.location.href;
    //Start observing changes to the document documentElement to detect URL changes
    observer.observe(document.documentElement, mutationConfig);
  } catch (error) {
    if (onError && typeof onError === 'function') {
      onError(error);
    } else {
      console.log(`Error starting onUrlChange observer: ${error}`);
    }
  }
};

const startExperiment = () => {
  pollerLite(['.main .qa-search-page .hotel-card', () => { return window.globalDataLayer.hotelsReturnedMax != undefined }], () => {
      // console.log('Experiment started'); 
      
      const hotelReturnedMax = window.globalDataLayer.hotelsReturnedMax;
      const hotelReturned = window.globalDataLayer.hotelsReturned;

      const differencedReturned = hotelReturnedMax - hotelReturned;

      const createAndInsertInfoBox = (differencedReturned) => {

        const infoBox = `
        <div class="${ID}-info-box">
          <p class="${ID}-info-box-text">
            ${infoSVG} ${differencedReturned} hotels are fully booked for your dates and are not displayed below.
          </p>
        </div>
        `;

        const targetContainer  = document.querySelector('.main .qa-search-page .qa-pagination-total');

        const infoBoxDOM = document.querySelector(`.${ID}-info-box`);
        if(!infoBoxDOM) {
        targetContainer.insertAdjacentHTML('afterend', infoBox);
        }
      };

      if(differencedReturned > 3) {
        createAndInsertInfoBox(differencedReturned);
      }

      const newSearch = () => {
        const oldResults = document.querySelector(`.${ID}-info-box`);
        console.log(oldResults, 'OLD RESULTS');
        if(oldResults) {
          oldResults.remove();
        }

        pollerLite(['.main .qa-search-page .hotel-card', () => { return window.globalDataLayer.hotelsReturnedMax != undefined }], () => {
          console.log('new search');           


          const hotelReturnedMax = window.globalDataLayer.hotelsReturnedMax;
          const hotelReturned = window.globalDataLayer.hotelsReturned;
    
          const differencedReturned = hotelReturnedMax - hotelReturned;
    
          const createAndInsertInfoBox = (differencedReturned) => {
    
            const infoBox = `
            <div class="${ID}-info-box">
              <p class="${ID}-info-box-text">
                ${infoSVG} ${differencedReturned} hotels are fully booked for your dates and are not displayed below.
              </p>
            </div>
            `;
    
            const targetContainer  = document.querySelector('.main .qa-search-page .qa-pagination-total');
            const infoBoxDOM = document.querySelector(`.${ID}-info-box`);
            if(!infoBoxDOM) {
              targetContainer.insertAdjacentHTML('afterend', infoBox);
            }
          };
    
          if(differencedReturned > 3) {
            createAndInsertInfoBox(differencedReturned);
          }
        });
      }

      onUrlChange(newSearch);
    });



}

const addTracking = () => {
  document.documentElement.addEventListener('click', (e) => {
    if(e.target.closest('a') && e.target.closest('.hotel-card')) {
      // console.log('Hotel Card Clicked link');
      fireEvent('Click - user clicks to go to a hotel page')
    }
  });
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
