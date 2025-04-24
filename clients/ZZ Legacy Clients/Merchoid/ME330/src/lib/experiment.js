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

import banner from "./components/banner/banner";
import categoryTabs from "./components/categoryTabs/categoryTabs";
import productGrid from "./components/productGrid/productGrid";
import filters from "./components/filters/filters";

import getProductData from "./utils/getProductData";
import RefiningLogic from "./utils/refiningLogic";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  (function removeNonProductGridItems() {
    const els = document.querySelectorAll(".product-item .mfwebp");

    els.forEach((el) => {
      if (!el.parentElement.classList.contains("product-image-wrapper")) {
        el.parentElement.parentElement.remove();
      }
    });
  })();

  (function renderBanner() {
    const bannerData = {
      title: document.querySelector("h1").textContent,
      text: document.querySelector(".brand-byline-text > p")?.textContent,
      logo: document.querySelector(".brand-logo-mobile").src,
      image: null,
      /**
       * TODO: Handle passed in image ("luxury" image)
       */
    };

    const entry = document.querySelector(".column.main");
    const element = banner(bannerData);

    entry.prepend(element);
  })(banner);

  (function renderCategoryTabs() {
    const categoryTabData = [
      {
        icon: "all",
        text: "All",
        attribute: "all",
      },
      {
        icon: "clothing",
        text: "Clothing",
        attribute: "clothing",
      },
      {
        icon: "home",
        text: "Home & Office",
        attribute: "home-and-office",
      },
      {
        icon: "gadgets",
        text: "Toys & Gadgets",
        attribute: "toys-and-gadgets",
      },
    ];

    const entry = document.querySelector(`.${ID}-banner`);
    const element = categoryTabs(categoryTabData);

    insertAfterElement(entry, element);
  })(categoryTabs);

  (function renderProductGrid() {
    const entry = document.querySelector(`.${ID}-category-tabs`);
    const element = productGrid();

    insertAfterElement(entry, element);
  })();

  const state = new RefiningLogic(getProductData());

  (function handleCategoryTabState() {
    const categoryTabElements = document.querySelectorAll(
      `.${ID}-category-tab button`
    );

    categoryTabElements.forEach((tab) => {
      tab.addEventListener("click", () => {
        state.setActiveCategory(tab.getAttribute("data-category"));
      });
    });
  })();

  (function renderFilterBanner() {
    const filterData = Array.from(
      new Set(
        [
          ...document
            .querySelector(`.${ID}-product-grid`)
            .querySelectorAll(":scope > li"),
        ].reduce((prev, curr) => {
          return [...prev, curr.getAttribute("data-filter")];
        }, [])
      )
    );

    const entry = document.querySelector(`.${ID}-category-tabs`);
    const element = filters(
      filterData,
      (e) => state.setSortMethod(e.target.value),
      (e) => state.setCategoryFilters(e.target.value)
    );

    insertAfterElement(entry, element);
  })();

  (function removeOldContent() {
    document.querySelector(".review-fans")?.remove();
    document.querySelector(".brands-bar-container")?.remove();
    document.querySelector(".breadcrumbs")?.remove();
    document.querySelector(".see-more-wrapper")?.remove();
    document.querySelector(".brand-banner-image")?.remove();
    document.querySelector(".brand-anchor-links")?.remove();
    document.querySelector(".brand-bottom-wrapper")?.remove();
    document.querySelector(".refine-products-overlay")?.remove();
    document.getElementById("brand-mobile-logo")?.remove();
    document.getElementById("brand-sticky-bar")?.remove();
    document.getElementById("refine-products-button")?.remove();
    document.getElementById("refine-products-nav")?.remove();

    /**
     * This element must remain in the DOM as it has a script
     * watching it. Every time the user scrolls, it logs
     * errors to the console if it doesn't exist on the page.
     */
    const productSections = document.querySelector(".brand-list-wrapper");
    productSections.innerHTML = "";
    productSections.style.display = "none";
  })();
};
