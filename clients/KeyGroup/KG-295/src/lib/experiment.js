/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  console.log("Experiment started");

  pollerLite(['.kr-body-container'], () => {
    const newMobileBannerHTML = `
    <section class="${ID}-sticky-banner ${ID}-scroll-into-view">
        <div class="${ID}-container">
          <section>
            <a class="${ID}-button" href="/equity-release/calculator">
                Calculate your tax-free amount 
            </a>
          </section>
        </div>
      </section>
    `;

    const targetContainer = document.querySelector('.kr-body-container');
    targetContainer.insertAdjacentHTML('afterbegin', newMobileBannerHTML);

    const scrollIntoViewTarget = document.querySelector('.kr-body-container .hero-banner');
    const newMobileBannerDOM = document.querySelector(`.${ID}-sticky-banner`);

    function updateStickyFooter() {
      const rect = scrollIntoViewTarget.getBoundingClientRect();  
      if (rect.top <= -300) {
          newMobileBannerDOM.classList.add(`slide-up`);
      } else {
          newMobileBannerDOM.classList.remove(`slide-up`);
      }
  }
  
  window.addEventListener('scroll', updateStickyFooter);
  
  // Call the function once to initialize the state on page load
  updateStickyFooter();
  });
};

const addTracking = () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.closest('nav a.button__secondary')) {
      fireEvent(`Click - CTA clicked in nav`, true);
    }

    if (e.target.closest('.sticky-banner a.button')) {
      fireEvent(`Click - CTA clicked in sticky banner`, true);
    }
  })
}

const addVariationTracking = () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.closest(`.${ID}-sticky-banner .${ID}-button`)) {
      fireEvent(`Click - CTA clicked in mobile sticky banner`, true );
    }
  })
}

export default () => {

  newEvents.initiate = true;
  newEvents.methods = ["datalayer"];
  newEvents.property = "G-LNFZ1KRLB8";
  
  setup();

  logMessage(ID + " Variation: " + VARIATION);

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  addTracking();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
  addVariationTracking();
};
