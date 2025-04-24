/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, checkIntersection } from '../../../../../lib/utils';

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

const startExperiment296 = () => {
  pollerLite(['.kr-body-container '], () => {
    const newBannerHTML = `<div class="${ID}-wrapper"><div class="${ID}-banner-container">
      <div class="${ID}-banner-section ${ID}-trustpilot">
      <div class="${ID}-banner-top">
        <div class="${ID}-title">
          <div class="${ID}-trustlogo">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
              <path d="M19.3002 7.11885H11.9301L9.65366 0.104492L7.37008 7.11885L0 7.11174L5.96862 11.4513L3.68504 18.4585L9.65366 14.1261L15.6152 18.4585L13.3387 11.4513L19.3002 7.11885Z" fill="#00B67A"/>
            </svg>
            <h4 style="margin-left: 2px;">Trustpilot</h4>
          </div>
          <div class="${ID}-img-container">
            <img src="https://blcro.fra1.digitaloceanspaces.com/KG-296/stars-5-1.svg" alt="trustpilot score" class="${ID}-trustpilot-svg"/>
          </div>
          <h4 style="text-wrap: nowrap;">17,000+ ratings</h4>
        </div>
       
      </div>
        <div class="${ID}-hidden-content ${ID}-hidden">
          <p>We're rated 5 Star on Trustpilot based on 17,383 reviews</p>
        </div>
      </div>
      <div class="${ID}-banner-section ${ID}-release-equity">
      <div class="${ID}-banner-top">
        <div class="${ID}-title">
          <div class="${ID}-img-container">
            <img src="https://blcro.fra1.digitaloceanspaces.com/KG-296/equityRelease.png" alt="Equity Release Council"/>
          </div>
          <h4>No negative equity guarantee</h4>
        </div>
        
        </div>
        <div class="${ID}-hidden-content ${ID}-hidden">
        <p>You'll never owe more than the value of your home</p>
      </div>
      </div>
      <div class="${ID}-banner-section ${ID}-fscs">
      <div class="${ID}-banner-top">
        <div class="${ID}-title">
          <div class="${ID}-img-container">
            <img src="https://blcro.fra1.digitaloceanspaces.com/KG-296/fscsLarge.png" alt="FSCS"/>
          </div>
          <h4>Covered by the FSCS</h4>
        </div>
          
          </div>
          <div class="${ID}-hidden-content ${ID}-hidden">
          <p>Equity release advising and arranging is covered by the Financial Services Compensation Scheme, so you’ll be protected up to £85,000</p>
        </div>
      </div>
    </div></div>`;

    const targetContainer = document.querySelector('.kr-body-container');

    targetContainer.insertAdjacentHTML('afterbegin', newBannerHTML);

    const KG398Active = document.querySelector(`.KG-389-1`);
    if (KG398Active) {
      document.querySelector('#er-calculator')?.classList.add(`${ID}-margin-top`);
    }
    const isPPC = location.pathname.includes('/campaigns');
    const errCalc = document.querySelector('#er-calculator');
    if (isPPC && errCalc) {
      errCalc.style.marginTop = '80px';
    }

    const checkForRetrieve = () => {
      if (
        location.pathname.includes('/equity-release/calculator/retrieve') ||
        location.pathname.includes('/equity-release-calculator-ppc-cd-(1)/retrieve') ||
        location.pathname.includes('/key-equity-release-calculator-ppc/retrieve') ||
        location.pathname.includes('/equity-release-calculator-ppc/retrieve') ||
        location.pathname.includes('/equity-release-calculator-fb/retrieve')
      ) {
        console.log('location pathname ppc');
        document.querySelector(`.${ID}-banner-container`).classList.add(`${ID}-retrieve-background`);

        const equityRetrieveCalc = document.querySelector(`.kr-body-container #er-calculator`);
        console.log(equityRetrieveCalc);
        document.querySelector('.kr-body-container #er-calculator').classList.add(`${ID}-equity-retrieve-margin-top`);
      }
    };

    checkForRetrieve();

    onUrlChange(checkForRetrieve);

    const bannerSections = document.querySelectorAll(`.${ID}-banner-section`);

    bannerSections.forEach((section) => {
      // section.addEventListener('click', () => {
      //   section.classList.toggle(`${ID}-box-shadow`);
      //   section.querySelector(`.${ID}-hidden-content`).classList.toggle(`${ID}-hidden`);
      //   section.querySelector(`.${ID}-expand`).classList.toggle(`${ID}-rotate`);
      //   if (section.classList.contains(`${ID}-box-shadow`)) {
      //     section.parentElement.classList.add(`${ID}-shadow-height`);
      //   } else {
      //     section.parentElement.classList.remove(`${ID}-shadow-height`);
      //   }
      //   bannerSections.forEach((otherSection) => {
      //     if (otherSection !== section) {
      //       otherSection.classList.remove(`${ID}-box-shadow`);
      //       otherSection.querySelector(`.${ID}-hidden-content`).classList.add(`${ID}-hidden`);
      //       otherSection.querySelector(`.${ID}-expand`).classList.remove(`${ID}-rotate`);
      //     }
      //   });
      // });
    });

    document.body.addEventListener('click', (e) => {
      if (!e.target.closest(`.${ID}-banner-section`)) {
        bannerSections.forEach((section) => {
          section.classList.remove(`${ID}-box-shadow`);
          section.querySelector(`.${ID}-hidden-content`).classList.add(`${ID}-hidden`);
          section.querySelector(`.${ID}-expand`).classList.remove(`${ID}-rotate`);
        });
      }
    });
  });
};

const startExperiment60 = () => {
  if (localStorage.getItem('er-calculator')) {
    pollerLite(['.kr-body-container .retrieve-quote #DOB'], () => {
      const { value, dob } = JSON.parse(localStorage.getItem('er-calculator'));
      console.log('in localstorage if');
      document.querySelector('.kr-body-container .retrieve-quote #HousePrice').value = value;
      document.querySelector('.kr-body-container .retrieve-quote #DOB').value = dob;

      const erCalculatorForm = document.querySelector('#er-calculator form');
      erCalculatorForm.addEventListener('submit', function () {
        fireEvent('Submit - User submits the retrieve form');
      });
    });
  }

  pollerLite(['.kr-body-container #er-calculator .btn--success'], () => {
    console.log('startExperiment');

    function trackValueAndDOB() {
      const value = document.querySelector('.kr-body-container #er-calculator #HousePrice').value;
      const dob = document.querySelector('.kr-body-container #er-calculator #DOB').value;

      if (value && dob) {
        localStorage.setItem('er-calculator', JSON.stringify({ value, dob }));
      }
    }

    const erCalculatorForm = document.querySelector('#er-calculator form');

    erCalculatorForm.addEventListener('submit', function () {
      console.log('submit');
      trackValueAndDOB();
      fireEvent('Submit - User submits the calculate form');
    });
  });
};

const removeTrustmarksFromResults = () => {
  //hide trustmarks on results page - use oberserver to see when retrieve is shown
  const targetRetrieveContainer = document.querySelector('.kr-body-container #er-calculator');

  const config = { attributes: true, childList: true, subtree: true };

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        console.log('A child node has been added or removed.');
        pollerLite(['.kr-body-container .retrieve-quote .btn--info'], () => {
          observer.disconnect();
          console.log('observer disconnected, remove trustmarks');
          const equityRetrieveResults = document.querySelector(`.kr-body-container #er-calculator .retrieve-quote .btn--info`);
          equityRetrieveResults.addEventListener('click', () => {
            document.querySelector(`.${ID}-banner-container`)?.remove();

            const equityRetrieveCalc = document.querySelector(`.kr-body-container #er-calculator`);
            equityRetrieveCalc.classList.remove(`${ID}-equity-retrieve-margin-top`);
          });
        });

        pollerLite(['.kr-body-container #er-calculator .btn--success'], () => {
          observer.disconnect();
          console.log('observer disconnected og calc, remove trustmarks');
          const equityCalcResults = document.querySelector(`.kr-body-container #er-calculator .btn--success[type="submit"]`);
          equityCalcResults.addEventListener('click', () => {
            document.querySelector(`.${ID}-banner-container`)?.remove();

            const equityRetrieveCalc = document.querySelector(`.kr-body-container #er-calculator`);
            equityRetrieveCalc.classList.remove(`${ID}-equity-retrieve-margin-top`);
          });
        });
      }
    }
  };

  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetRetrieveContainer, config);
};

const addTracking296 = () => {
  let seenCards = false;

  document.addEventListener('scroll', () => {
    if (!seenCards) {
      const targetIntersectionContainer = document.querySelector('.kr-body-container .KG-234__banner_container');
      if (targetIntersectionContainer) {
        if (checkIntersection(targetIntersectionContainer, 0, true)) {
          fireEvent(`Scroll - A user sees the cards`, true);
          seenCards = true;
        }
      }
    }
  });
};

const addVariationTracking296 = () => {
  let seenCards = false;

  document.addEventListener('scroll', () => {
    if (!seenCards) {
      const targetIntersectionContainer = document.querySelector(`.kr-body-container .${ID}-banner-container`);
      if (checkIntersection(targetIntersectionContainer, 0, true)) {
        fireEvent(`Scroll - A user sees the cards`, true);
        seenCards = true;
      }
    }
  });

  document.body.addEventListener('click', (e) => {
    if (e.target.closest(`.${ID}-banner-section`)) {
      fireEvent(`Click - A user clicks a drop down`, true);
    }
  });

  const scrollContainer = document.querySelector(`.${ID}-banner-container`);

  let scrolled = false;
  scrollContainer.addEventListener('scroll', () => {
    if (!scrolled) {
      fireEvent(`Scroll - A user scrolls on mobile to see trustmarks`, true);
      scrolled = true;
    }
  });
};

export default () => {
  // let loadCount = parseInt(localStorage.getItem("ucdebug_count")) || 0;

  // if (loadCount === 1) {
  //   console.log('load count 1 retur')
  //   // This is the second time the page is loaded
  //   localStorage.removeItem("ucdebug_count");
  //   return;
  // }

  // // Increment the load count
  // localStorage.setItem("ucdebug_count", loadCount + 1);

  newEvents.initiate = true;
  newEvents.methods = ['datalayer'];
  newEvents.property = 'G-LNFZ1KRLB8';

  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  addTracking296();
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

  startExperiment296();
  addVariationTracking296();
  startExperiment60();
  removeTrustmarksFromResults();
};
