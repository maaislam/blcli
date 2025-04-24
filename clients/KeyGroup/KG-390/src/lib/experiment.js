/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { newEvents } from '../../../../../core-files/services';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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

  console.log('straight to retrieve')

  // if(location.pathname.indexOf('calculator') > -1) {
  //   console.log('LOADED ON CALCULATOR PAGE');
  // }

  pollerLite(['.retrieve-quote'], () => {
    // console.log('straight to retrieve poller')

    let retrieveQuoteForm = document.querySelector('.retrieve-quote');

    retrieveQuoteForm.querySelector('legend').innerText = "Retrieve your equity release estimate";

    retrieveQuoteForm.querySelector('.btn--info').innerText = "Retrieve your estimate";

    const newTextDOM = document.querySelector(`.${ID}-newtext`);
    if(!newTextDOM) { 
      retrieveQuoteForm.insertAdjacentHTML('afterbegin', `<p class="${ID}-newtext">Welcome back to Key, it's great to see you again. We saved your estimate from last time so you can pick up where you left off. </p>`);
    }

  })

}

const addTracking = () => {

  pollerLite(['.retrieve-quote'], () => {

    let retrieveQuoteForm = document.querySelector('.retrieve-quote');

    retrieveQuoteForm.querySelector('.btn--info').addEventListener('click', () => {
      fireEvent('Click - Retrieve Quote Clicked', true);
    });

  })



}

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["ga4"];
  newEvents.property = "G-LNFZ1KRLB8";

  setup();

  fireEvent('Conditions Met');

  // Needed for attribution to Adobe Dynamics - do not remove
  document.documentElement.classList.add(`experimentation-${VARIATION == "control" ? `control` : `variant-${VARIATION}`}`);

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
  onUrlChange(() => startExperiment());
  
};


