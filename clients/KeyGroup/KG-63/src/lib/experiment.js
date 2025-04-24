/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent, newEvents } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite, checkIntersection } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const startExperiment = () => {

  pollerLite([".kr-body-container .swiper-card-container-0 .card--secondary .card__content p"], () => {
    // console.log('kg63')
    const productBannerParagraphs = document.querySelectorAll(
      ".kr-body-container .swiper-card-container-0 .card--secondary .card__content p"
    );

    const productBannerImages = document.querySelectorAll(".swiper-card-container-0 .card__image");
    productBannerImages.forEach((image) => {
      image.classList.remove("b-lazy");
      image.classList.remove("b-loaded");
    });

    const newParagraphCopies = [
      `<div class="${ID}-card-content">
          <svg class="${ID}-svg-desktop ${ID}-hide-mobile" xmlns="http://www.w3.org/2000/svg" width="4" height="104" viewBox="0 0 4 104" fill="none">
            <path d="M2 1.72339L2 100" stroke="#032240" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <svg class="${ID}-svg-desktop ${ID}-hide-desktop" xmlns="http://www.w3.org/2000/svg" width="4" height="154" viewBox="0 0 4 154" fill="none">
            <path d="M2 1.72339L2 150" stroke="#032240" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <p>Unlock tax-free funds from your home’s value</p>
          <a href="/equity-release">See how a Key lifetime mortgage works</a>
          <p>Find out how much you could release</p>
      </div>
      `,
      `<div class="${ID}-card-content">
          <svg class="${ID}-svg-desktop ${ID}-hide-mobile" xmlns="http://www.w3.org/2000/svg" width="4" height="104" viewBox="0 0 4 104" fill="none">
            <path d="M2 1.72339L2 100" stroke="#032240" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <svg class="${ID}-svg-desktop ${ID}-hide-desktop" xmlns="http://www.w3.org/2000/svg" width="4" height="154" viewBox="0 0 4 154" fill="none">
            <path d="M2 1.72339L2 150" stroke="#032240" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <p>A range of later life mortgages for over 50s</p>
          <p>Remortgage or buy a new home in later life</p>
          <p>Find the right mortgage for your needs</p>
      </div>
  `,
      `<div class="${ID}-card-content">
        <svg class="${ID}-svg-desktop ${ID}-hide-mobile" xmlns="http://www.w3.org/2000/svg" width="4" height="104" viewBox="0 0 4 104" fill="none">
          <path d="M2 1.72339L2 100" stroke="#032240" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <svg class="${ID}-svg-desktop ${ID}-hide-desktop" xmlns="http://www.w3.org/2000/svg" width="4" height="154" viewBox="0 0 4 154" fill="none">
          <path d="M2 1.72339L2 150" stroke="#032240" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <p>Take control of your financial future</p>
        <p>Make sure loved ones know what you want</p>
        <p>Focus on enjoying your later life</p>
      </div>
      `,
    ];

    productBannerParagraphs.forEach((paragraph, index) => {
      paragraph.outerHTML = newParagraphCopies[index];
    });

    const buttonCopies = [
      `Use our calculator`,
      `Find a mortgage`,
      `Order our guide`
    ];

    const productBannerButtons = document.querySelectorAll(".kr-body-container .swiper-card-container-0 .card--secondary .card__button-container a");

    productBannerButtons.forEach((button, index) => {
      button.innerHTML = buttonCopies[index];
    });


    const productBannerCards = document.querySelectorAll('.swiper-card-container-0 .card--secondary');
    productBannerCards.forEach((card, index) => {
      const cardAnchor = document.createElement('div');
      cardAnchor.innerHTML = card.innerHTML;
      cardAnchor.classList.add(`${ID}-card-secondary`);
      // cardAnchor.href = card.querySelector('.card__button-container a').href;
      card.parentElement.replaceChild(cardAnchor, card);
    });

    // const swiperWrapper = document.querySelector('.swiper-card-container-0 .swiper-wrapper');
    // const swiperButton = document.querySelector('.swiper-card-container-0').closest('.card-container').querySelector('.card-container__btn--next-0');
    // let startValue = 55;
    // swiperButton.addEventListener('click', function() {
    //   console.log(swiperWrapper.style.transform);

    //   let newValue = startValue - 320;
    //   startValue = newValue;


    //   swiperWrapper.style.transform = `translate3d(${newValue}px, 0, 0)`;
    // });
  });
};

const addTracking = () => {
  document.addEventListener("click", (e) => {
    if (e.target.closest(".kr-body-container .hero-banner .card--secondary .card__button-container a")) {
      fireEvent(`Click - A user clicks a card`, true);
    }
  });

  let seenCards = false;

  document.addEventListener("scroll", () => {
    if (!seenCards) {
      const targetIntersectionContainer = document.querySelector(".kr-body-container .hero-banner");
      if (checkIntersection(targetIntersectionContainer, 0, true)) {
        fireEvent(`Scroll - A user sees the cards`, true);
        seenCards = true;
      }
    }
  });
}

const addTrackingVariation = () => {
  document.addEventListener("click", (e) => {
    if (e.target.closest(`.kr-body-container .${ID}-card-secondary`)) {
      fireEvent(`Click - A user clicks a card`, true);
    }
  });
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
  addTrackingVariation();
};
