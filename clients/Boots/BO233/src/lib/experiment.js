/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { insertAfterElement, insertBeforeElement } from "../../../../../lib/utils";
import Swiper from "swiper/bundle";
import card from "./card";

export default (data) => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }


  const isScrolledIntoView = (el) => {
    const rect = el.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    const isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }

  if(VARIATION === 'control' || VARIATION === 'control-1') {
    // check product details in view
    window.addEventListener('scroll', () => {
      if(isScrolledIntoView(document.querySelector('#estore_product_longdesc'))) {
        fireEvent('Customer Would Have Seen V1', true);
      }
    });

    window.addEventListener('scroll', () => {
      if(isScrolledIntoView(document.querySelector('#richRelevanceContainer'))) {
        fireEvent('Customer Would Have Seen V2', true);
      }
    });
  }


  if(VARIATION === '1' || VARIATION === '2' || VARIATION === '3') {
    let entry;
    

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

    if(VARIATION === '1') {
      entry = document.querySelectorAll("#estore_productpage_template_container > .rowContainer > .row")[1];
      insertAfterElement(entry, root);
    }

    if(VARIATION === '2' || VARIATION === '3') {
      entry = document.querySelector("#richRelevanceContainer");
      insertBeforeElement(entry, root);
    }

    const slidesContainer = root.querySelector(`.swiper-wrapper`);

    data.forEach((product) => {
      if (product) {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        slide.appendChild(
          card(
            product.product_data.referenceimageurl,
            product.product_data.offername,
            product.product_data.currentprice.toFixed(2),
            product.product_data.regularprice.toFixed(2),
            product.product_data.actionurl,
            product.product_data.averagereviewscore || 0,
            product.product_data.numberofreviews || 0,
            product.product_data.haspriceadvantagedeal,
            product.product_data.promotionaltext
          )
        );
        slidesContainer.append(slide);


      }
    });

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


    const slides = document.querySelectorAll(`.${ID}-carousel-container .swiper-slide`);
    for (let index = 0; index < slides.length; index += 1) {
      const element = slides[index];
      element.addEventListener('click', () => {
        fireEvent('Clicked similar product ' +index);
      })
    }

    window.addEventListener('scroll', () => {
      if(isScrolledIntoView(document.querySelector(`#${ID}-root`))) {
        fireEvent('Compare Similar Items in View', true);
      }
    });
  }
};
