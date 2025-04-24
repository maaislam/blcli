/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { insertAfterElement } from "./../../../../../lib/utils";
import Splide from "@splidejs/splide";
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
      <div class="splide" id="${ID}-splide">
        <div class="splide__track">
          <ul class="splide__list">
            <li class="${ID}-loading-card ${ID}-card splide__slide">
              <div class="${ID}-loading-card-image"></div>
              <div class="${ID}-loading-card-content">
                <div class="${ID}-loading-card-title"></div>
                <div class="${ID}-loading-card-price"></div>
                <div class="${ID}-loading-card-cta"></div>
              </div>
            </li>
            <li class="${ID}-loading-card ${ID}-card splide__slide">
              <div class="${ID}-loading-card-image"></div>
              <div class="${ID}-loading-card-content">
                <div class="${ID}-loading-card-title"></div>
                <div class="${ID}-loading-card-price"></div>
                <div class="${ID}-loading-card-cta"></div>
              </div>
            </li>
            <li class="${ID}-loading-card ${ID}-card splide__slide">
              <div class="${ID}-loading-card-image"></div>
              <div class="${ID}-loading-card-content">
                <div class="${ID}-loading-card-title"></div>
                <div class="${ID}-loading-card-price"></div>
                <div class="${ID}-loading-card-cta"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;

  insertAfterElement(entry, root);

  const slider = document.getElementById(`${ID}-splide`);

  const productSlider = new Splide(slider, {
    perPage: 3,
    gap: "1rem",
    dragMinThreshold: 10,
    flickPower: 100,
    breakpoints: {
      500: {
        perPage: 1,
      },
      700: {
        perPage: 2,
      },
    },
  });

  productSlider.mount();

  const getProductSKU = () => {
    return window.location.href.match(/(\d+)[^-]*$/g)[0];
  };

  const getSimilarProducts = () => {
    return Object.entries(data[getProductSKU()].recommended_items).map(
      (item) => item[1]
    );
  };

  const getSimilarProductData = () =>
    Promise.all(
      getSimilarProducts().map((item) =>
        fetch(`https://www.boots.com${item.recommended_url}`)
          .then((res) => res.text())
          .then((data) => {
            const tempDOM = new DOMParser().parseFromString(
              data,
              "text/html"
            ).body;

            const image = `https://boots.scene7.com/is/image/Boots/${item.recommended_item_code}?wid=300&hei=300&op_sharpen=1`;
            const title = tempDOM.querySelector("h1").innerText;
            const price = tempDOM.querySelector("#PDP_productPrice").innerText;
            const url = item.recommended_url;

            return {
              image,
              title,
              price,
              url,
            };
          })
          .catch((error) => {
            new Error(error);
            splideArrowObserver.disconnect();
            root.remove();
            return;
          })
      )
    ).then((products) => {
      productSlider.remove([0, 1, 2]);

      products.forEach((product) => {
        const slide = document.createElement("li");
        slide.classList.add("splide__slide");
        slide.appendChild(
          card(product.image, product.title, product.price, product.url)
        );
        productSlider.add(slide);

        // Tracking Start
        slide.addEventListener("click", () =>
          fireEvent("Similar item clicked")
        );
        // Tracking End
      });

      productSlider.refresh();
    });

  getSimilarProductData();

  const splideArrowObserver = new MutationObserver((entries) => {
    entries.forEach(() => {
      const pagination = document.querySelector(
        `#${ID}-splide .splide__pagination`
      );
      const arrows = document.querySelector(`#${ID}-splide .splide__arrows`);

      if (pagination) arrows.style.display = "flex";
      else arrows.style.display = "none";
    });
  });

  splideArrowObserver.observe(slider, {
    attributes: true,
    subtree: true,
    childList: true,
  });
};
