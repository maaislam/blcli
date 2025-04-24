/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { insertAfterElement, pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import recProduct from './product';
import Swiper from "swiper/swiper-bundle";

export default (data) => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  const entry = document.querySelector("#estore_productpage_template_container #estore_pdp_blcol").parentNode;
  const root = document.createElement("div");
  root.id = `${ID}-root`;

  // Comparison table
  if(VARIATION === '1' || VARIATION === '3') {
    root.innerHTML = /* HTML */ `
    <h2>Compare Similar Items</h2>
    <div class="${ID}-inner-table">
      <div class="${ID}-productAttributes">
        <div class="${ID}-blank-image">
          <img src="https://boots.scene7.com/is/image/Boots/Empty?scl=1&fmt=png-alpha " alt="_blank" />
        </div>
        <div class="${ID}-blank"></div>
        <ul>
          <li class="${ID}-label-price">Price</li>
          <li class="${ID}-label-rating">Rating</li>
          <li class="${ID}-label-adpoints">Advantage points</li>
          <li class="${ID}-label-promo">Promotion</li>
          <li class="${ID}-label-promo">Size</li>
        </ul>
      </div>
      <div class="${ID}-carousel-container">
        <div class="swiper" id="${ID}-swiper">
          <div class="swiper-wrapper"></div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>`;

  // Products carousel
  } else if(VARIATION === '2' || VARIATION === '4'){

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
  }

  insertAfterElement(entry, root);

  const slidesContainer = document.querySelector(`#${ID}-root .swiper-wrapper`);

  // add in current product to front of carousel
  if (VARIATION === "1" || VARIATION === "3") {
    const currentProduct = document.createElement("div");
    currentProduct.classList.add("swiper-slide");
    currentProduct.classList.add("current-product");

    const PDPRE = /.*(-)([\d]{7,8}(p)|[\d]{7,8}).*/;
    const PDPcode = window.location.pathname.match(PDPRE)[2];

    const currentImage = `https://boots.scene7.com/is/image/Boots/${PDPcode}?fit=constrain,1&wid=500&hei=500&fmt=jpg`;
    const currentTitle = document.querySelector("#estore_product_title").innerText;
    const currentPrice = document.querySelector("#PDP_productPrice").innerText.replace("£", "");
    const currentUrl = "";
    const currentAdvantagePoints = document.querySelector(".rwdPointsContent strong").innerText.replace('points', '');
    let currentPromotionalText = "";
    let currentReviewScore = document.querySelector('.bv_avgRating_component_container').innerText;
    let currentReviewCount = document.querySelector('.bv_numReviews_text').innerText.replace(')', '').replace('(', '');

    let currentOldPrice;
    if (document.querySelector(".was_price.was_price_redesign")) {
      currentOldPrice = document.querySelector(".was_price.was_price_redesign").innerText.replace("£", "").replace("Was", "").trim();
    }

    if (!document.querySelector(".bv_numReviews_text").innerText === "(0)") {
      currentReviewScore = parseFloat(document.querySelector(".bv_avgRating_component_container").textContent, 10).toFixed(1);
      currentReviewCount = document.querySelector('meta[itemprop="reviewCount"]').content;
    }

    if (document.querySelector(".pdp-promotion-redesign a")) {
      currentPromotionalText = document.querySelector(".pdp-promotion-redesign a").innerText;
    }

    currentProduct.appendChild(recProduct(true, currentImage, currentTitle, currentPrice, currentOldPrice, currentUrl, currentReviewScore, currentReviewCount, currentAdvantagePoints, currentPromotionalText));

    slidesContainer.append(currentProduct);
  }

  // Add the data products
  data.forEach((product) => {
    if (product) {  
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.appendChild(
        recProduct(
          false,
          product.product_data.referenceimageurl,
          product.product_data.offername,
          product.product_data.currentprice.toFixed(2),
          product.product_data.regularprice.toFixed(2),
          product.product_data.actionurl,
          product.product_data.averagereviewscore || 0,
          product.product_data.numberofreviews || 0,
          product.product_data.adcardpoints,
          product.product_data.promotionaltext,
          product.product_data.objectid
        )
      );

      slidesContainer.append(slide);
    }
  });

  if (VARIATION === "1" || VARIATION === "3") {
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
        nextEl: `#${ID}-root .swiper-button-next`,
        prevEl: `#${ID}-root .swiper-button-prev`,
      },
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          slidesPerGroup: 1,
          spaceBetween: 0,
        },
        540: {
          slidesPerView: 2.5,
          slidesPerGroup: 1,
          spaceBetween: 0,
        },
        760: {
          slidesPerView: 3,
          slidesPerGroup: 1,
          spaceBetween: 0,
        },
        1020: {
          slidesPerView: 4,
          slidesPerGroup: 1,
          spaceBetween: 0,
        },
      },
    });
  } else if (VARIATION === "2" || VARIATION === "4") {
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
  }

  const slides = document.querySelectorAll(`.${ID}-carousel-container .swiper-slide`);
  for (let index = 0; index < slides.length; index += 1) {
    const element = slides[index];
    element.addEventListener('click', () => {
      if (VARIATION === "1" || VARIATION === "3") {
        fireEvent('Clicked comparison product ' +index);
      } else {
        fireEvent('Clicked similar product ' +index);
      }
    })
  }

  const isScrolledIntoView = (el) => {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    //var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }


  window.addEventListener('scroll', () => {
    isScrolledIntoView(document.querySelector(`#${ID}-root`)) ? fireEvent('Viewed comparison products') : null;
  });

  if(VARIATION === '1' || VARIATION === '3') {
    let currentSize = document.querySelector('.details_redesign').innerText.replace(/\s(\|).*/, '').replace(' ', '');
    if (currentSize === ""){
      currentSize = "-";
    }
    document.querySelectorAll('.BO240-card-ppu')[0].innerHTML = currentSize;
  }

};
