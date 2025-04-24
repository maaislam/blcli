/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite, checkIntersection } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {
  pollerLite([".kr-body-container .hero-banner"], () => {

    const newBannerHTML = `<div class="${ID}-banner-container">
      <div class="${ID}-banner-section ${ID}-trustpilot">
      <div class="${ID}-banner-top">
        <div class="${ID}-title">
          <div class="${ID}-img-container">
            <img src="https://blcro.fra1.digitaloceanspaces.com/KG-296/stars-5-1.svg" alt="trustpilot score" class="${ID}-trustpilot-svg"/>
          </div>
          <h4>Over 17,000 ratings</h4>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none" class="${ID}-expand">
          <path d="M0.94 0.526611L4 3.58661L7.06 0.526611L8 1.47328L4 5.47328L0 1.47328L0.94 0.526611Z" fill="#032240"/>
        </svg>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none" class="${ID}-expand">
          <path d="M0.94 0.526611L4 3.58661L7.06 0.526611L8 1.47328L4 5.47328L0 1.47328L0.94 0.526611Z" fill="#032240"/>
        </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6" fill="none" class="${ID}-expand">
            <path d="M0.94 0.526611L4 3.58661L7.06 0.526611L8 1.47328L4 5.47328L0 1.47328L0.94 0.526611Z" fill="#032240"/>
          </svg>
          </div>
          <div class="${ID}-hidden-content ${ID}-hidden">
          <p>Equity release advising and arranging is covered by the Financial Services Compensation Scheme, so you’ll be protected up to £85,000</p>
        </div>
      </div>
    </div>`;

    const targetContainer = document.querySelector(".kr-body-container");

    targetContainer.insertAdjacentHTML("afterbegin", newBannerHTML);

    if(location.pathname.includes("/equity-release/calculator/retrieve")){
      console.log('location pathname')
      document.querySelector(`.${ID}-banner-container`).classList.add(`${ID}-retrieve-background`);

      const equityRetrieveCalc = document.querySelector(`.kr-body-container #er-calculator`);
      console.log(equityRetrieveCalc);
      document.querySelector(".kr-body-container #er-calculator").classList.add(`${ID}-equity-retrieve-margin-top`);
    }

    const bannerSections = document.querySelectorAll(`.${ID}-banner-section`);

    bannerSections.forEach((section) => {
      section.addEventListener("click", () => {
        section.classList.toggle(`${ID}-box-shadow`);
        section.querySelector(`.${ID}-hidden-content`).classList.toggle(`${ID}-hidden`);
        section.querySelector(`.${ID}-expand`).classList.toggle(`${ID}-rotate`);

        if(section.classList.contains(`${ID}-box-shadow`)){
        section.parentElement.classList.add(`${ID}-shadow-height`);
        } else {
          section.parentElement.classList.remove(`${ID}-shadow-height`);
        }

        bannerSections.forEach((otherSection) => {
          if(otherSection !== section){
            otherSection.classList.remove(`${ID}-box-shadow`);
            otherSection.querySelector(`.${ID}-hidden-content`).classList.add(`${ID}-hidden`);
            otherSection.querySelector(`.${ID}-expand`).classList.remove(`${ID}-rotate`);
          }
        });
      });
    });

    document.body.addEventListener("click", (e) => {
      if(!e.target.closest(`.${ID}-banner-section`)){
        bannerSections.forEach((section) => {
          section.classList.remove(`${ID}-box-shadow`);
          section.querySelector(`.${ID}-hidden-content`).classList.add(`${ID}-hidden`);
          section.querySelector(`.${ID}-expand`).classList.remove(`${ID}-rotate`);
        });
      }
    });
  });
};

const addTracking = () => {
    let seenCards = false;

    document.addEventListener("scroll", () => {
      if (!seenCards) {
        const targetIntersectionContainer = document.querySelector(".kr-body-container .KG-234__banner_container");
      if(targetIntersectionContainer){
        if (checkIntersection(targetIntersectionContainer, 0, true)) {
          fireEvent(`Scroll - A user sees the cards`, true);
          seenCards = true;
        }
      }
    }
  });
};

const addVariationTracking = () => {
  let seenCards = false;

  document.addEventListener("scroll", () => {
    if (!seenCards) {
      const targetIntersectionContainer = document.querySelector(`.kr-body-container .${ID}-banner-container`);
      if (checkIntersection(targetIntersectionContainer, 0, true)) {
        fireEvent(`Scroll - A user sees the cards`, true);
        seenCards = true;
      }
    }
  })

  document.body.addEventListener("click", (e) => {
    if (e.target.closest(`.${ID}-banner-section`)){
      fireEvent(`Click - A user clicks a drop down`, true)
    }
  });

  const scrollContainer = document.querySelector(`.${ID}-banner-container`);

  let scrolled = false;
  scrollContainer.addEventListener("scroll", () => {
    if (!scrolled) {
      fireEvent(`Scroll - A user scrolls on mobile to see trustmarks`, true);
      scrolled = true;
    }
  });

};

  
export default () => {
  let loadCount = parseInt(localStorage.getItem("ucdebug_count")) || 0;

  if (loadCount === 1) {
    // This is the second time the page is loaded
    localStorage.removeItem("ucdebug_count");
    return;
  }

  // Increment the load count
  localStorage.setItem("ucdebug_count", loadCount + 1);


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
