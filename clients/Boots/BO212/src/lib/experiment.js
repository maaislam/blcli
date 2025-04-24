/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { insertAfterElement } from "../../../../../lib/utils";
import Swiper from "swiper/bundle";
import card from "./card";

export default (data) => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem(`${ID}`) !== "Fired") {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );

      sessionStorage.setItem(`${ID}`, "Fired");
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION == "control") {
    return;
  }

  const entry = document.querySelectorAll(
    "#estore_productpage_template_container > .rowContainer > .row"
  )[1];
  const root = document.createElement("div");
  root.id = `${ID}-root`;
  root.innerHTML = /* HTML */ `
    <h2>Shop Similar Items</h2>
    <div class="${ID}-carousel-container">
      <div class="swiper" id="${ID}-swiper">
        <div class="swiper-wrapper"></div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
  `;

  insertAfterElement(entry, root);

  const slidesContainer = root.querySelector(`.swiper-wrapper`);

  data.forEach((product) => {
    if (product) {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.appendChild(
        card(
          product.referenceImageURL,
          product.offerName,
          product.currentPrice.toFixed(2),
          product.regularPrice.toFixed(2),
          product.actionURL,
          product.averageReviewScore || 0,
          product.numberOfReviews || 0,
          product.productAttributes.hasPriceAdvantageDeal,
          product.promotionalText[0]
        )
      );

      // productSlider.appendSlide(slide);
      // productSlider.update();
      slidesContainer.append(slide);

      // Tracking Start
      slide.addEventListener("click", () => fireEvent("Similar item clicked"));
      // Tracking End
    }
  });

  // const productSlider = new Swiper(`#${ID}-swiper`, {
  new Swiper(`#${ID}-swiper`, {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 10,
    centerInsufficientSlides: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        slidesPerGroup: 1,
        spaceBetween: 20,
      },
      540: {
        slidesPerView: 2.5,
        slidesPerGroup: 2,
        spaceBetween: 20,
      },
      760: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
      },
      1020: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 20,
      },
    },
  });
};
