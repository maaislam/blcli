import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { domAppend } from "./domAppend";
import Swiper from "swiper/swiper-bundle";
import { hideElements } from "./hideElement";

export default () => {
  const { ID, VARIATION } = shared;
  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  setup();
  // console.log(Swiper);
  fireEvent("Conditions Met");

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

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

  hideElements();
  domAppend();

  // Swiper Initialization
  if (document.querySelector(`.${ID}-babyAdviceSection`) && document.querySelector(`.${ID}-quoteSection`) && document.querySelector(`.${ID}-stepSection`)) {
    // Step Section Swiper
    new Swiper(`.${ID}-stepSection-swiper`, {
      slidesPerView: 1,
      spaceBetween: 40,
      navigation: {
        nextEl: `.${ID}-stepSection-swiper .swiper-button-next`,
        prevEl: `.${ID}-stepSection-swiper .swiper-button-prev`,
      },
      breakpoints: {
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
        769: {
          spaceBetween: 10,
          slidesPerView: 4,
        },
        520: {
          spaceBetween: 30,
          slidesPerView: 2.25,
        },
        320: {
          spaceBetween: 10,
          slidesPerView: 1.25,
        },
      },
    });

    // Quote Section Swiper
    new Swiper(`.${ID}-quoteSection-wrapper .swiper`, {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: `.${ID}-quoteSection-wrapper .swiper-button-next`,
        prevEl: `.${ID}-quoteSection-wrapper .swiper-button-prev`,
      },
      breakpoints: {
        1201: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        769: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
      },
    });

    // Baby Advice Section
    new Swiper(`.${ID}-babyAdviceSection-bodyContainer`, {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: `.${ID}-babyAdviceSection-bodyContainer .swiper-button-next`,
        prevEl: `.${ID}-babyAdviceSection-bodyContainer .swiper-button-prev`,
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
        dragSize: "auto",
      },
      breakpoints: {
        1280: {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        769: {
          spaceBetween: 4,
          slidesPerView: 4,
        },
        520: {
          spaceBetween: 20,
          slidesPerView: 2.25,
        },
        320: {
          spaceBetween: 10,
          slidesPerView: 1.25,
        },
      },
    });
  }

  // move usps and terms
  const moveUsps = () => {
    const usps = document.querySelector('section.oct-propositionbanner');
    document.querySelector(`.${ID}-usps`).appendChild(usps);
  }
  const moveTerms = () => {
    const terms = document.querySelector('.oct-grid__cell .oct-accordion');
    document.querySelector(`.${ID}-terms`).appendChild(terms);
  }

  const moveBanner = () => {
    const banner = document.querySelector('#cu_parentingClub_banner_2020').parentNode;
    banner.querySelector('.link').textContent = 'JOIN TODAY';
    document.querySelector(`.${ID}-heroBanner`).insertAdjacentElement('beforebegin', banner)
  }

  moveBanner();
  moveUsps();
  moveTerms();
  
  

  
};
