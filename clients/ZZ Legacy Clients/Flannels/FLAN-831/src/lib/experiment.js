/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";
import { accordionGenerator } from "./helper/accordionGenerator";
import { rapidClickHandler } from "./helper/clickHandler/rapidClickHandler";
import { productDescClick } from "./helper/clickHandler/productDescClick";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;
export default () => {
  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...
  pollerLite([`#productDetails`, `#productImageContainer`], () => {
    // const productDetailsMainContainer = document.querySelector(`.${ID}-productDetailsMainContainer`);
    const productDetailsMainContainer = document.querySelector(`#productDetails`);
    // When a user sees the content types e.g. when a user sees Product Description
    if (VARIATION == "control") {
      const rowProductDetails = document.querySelectorAll(`div[id^="pdp-expandable-section-"], .displayAttributesActive`);
      rowProductDetails.length > 0 &&
        rowProductDetails.forEach((desc) => {
          let title = desc.querySelector("h2")?.textContent?.trim();
          if (title && title.includes("Product description")) {
            fireEvent(`User sees ${title}`);
          } else if (title && title.includes("Product specifications")) {
            fireEvent(`User sees ${title}`);
          } else if (title && title.includes("Delivery")) {
            fireEvent(`User sees ${title}`);
          } else if (title && title.includes("Returns")) {
            fireEvent(`User sees ${title}`);
          } else if (title && title.includes("Reviews")) {
            fireEvent(`User sees ${title}`);
          }
        });
    }
    if (VARIATION == 1) {
      pollerLite([`.${ID}-productDetailsMainContainer`], () => {
        productDetailsMainContainer.addEventListener("click", function (e) {
          const target = e.target;
          // When a user sees interacts with the accordion (and what accordion)
          if (target.matches(`.${ID}-accordion-toggle`) || target.closest(`.${ID}-accordion-toggle`)) {
            const button = target.matches(`.${ID}-accordion-toggle`) ? target : target.closest(`.${ID}-accordion-toggle`);
            const title = button.querySelector("h2")?.textContent?.trim();
            if (title && button.classList.contains(`${ID}-accordion-active`)) {
              // console.log(`User sees ${title}`);
              fireEvent(`User interacts with the accordion: ${title}`);
            }
          }
        });
      });
    }
    productDetailsMainContainer.addEventListener("click", function (e) {
      const target = e.target;
      // When a user clicks read more, view more, view details, read reviews hyperlinks in the PDP
      if (target.matches(`button[id^="pdp-expandable-toggle"]`) || target.closest(`button[id^="pdp-expandable-toggle"]`)) {
        const button = target.matches(`button[id^="pdp-expandable-toggle"]`) ? target : target.closest(`button[id^="pdp-expandable-toggle"]`);
        const isExpanded = eval(button.getAttribute(`aria-expanded`));
        let title = button.querySelector("span:first-child")?.textContent?.trim();
        if (button.querySelector("span#prodDescToggleButton")) title = "Read More";
        if (isExpanded && title) {
          // console.log(`User clicks ${title}`);
          fireEvent(`User clicks ${title}`);
        }
      }
      if (target.matches(`a[href="#BVRRContainer"]`) || target.closest(`a[href="#BVRRContainer"]`)) {
        const button = target.matches(`a[href="#BVRRContainer"]`) ? target : target.closest(`a[href="#BVRRContainer"]`);
        const title = button?.textContent?.trim();
        if (title) {
          // console.log(`User clicks ${title}`);
          fireEvent(`User clicks ${title}`);
        }
      }
    });
    // When a user interacts with the image carousels
    pollerLite([() => window.jQuery && window.productImageCarousel], () => {
      let alreadyregistered = [];
      window.productImageCarousel.getSwiperElement().swiperInstance.on("slideChange", function () {
        // console.log(`User changes the images`);
        fireEvent(`User changes the images`);
      });
      alreadyregistered.push($("span.ProductDetailsVariants").attr("data-selectedcolour"));
      const ddlColours = document.querySelector("#ddlColours span#spanDropdownSelectedText");
      if (ddlColours) {
        const colorOptions = document.querySelectorAll("#ddlColours li.image-dropdown-option");
        if (colorOptions.length > 0) {
          colorOptions.forEach((item) => {
            item.addEventListener("click", () => {
              let color = item?.textContent?.trim();
              fireEvent(`User changes colour${color ? ` to ${color}` : ""}`);
              // console.log(`User changes colour${color ? ` to ${color}` : ""}`);
            });
          });
          const colorObserver = new MutationObserver((mutationList, observer) => {
            fireColorChangeEvent(`${$("span.ProductDetailsVariants").attr("data-selectedcolour")}`);
          });
          colorObserver.observe(ddlColours, { attributes: true, childList: true, subtree: true });
        }
      }
      function fireColorChangeEvent(colVarId) {
        let isDeclared = alreadyregistered.includes(colVarId);
        if (!isDeclared) {
          alreadyregistered.push(colVarId);
          let currentCarousel;
          if (colVarId) {
            currentCarousel = window.productImageCarousel.getSwiperElement(colVarId);
          } else {
            currentCarousel = window.productImageCarousel.getSwiperElement().swiperInstance;
          }
          if (currentCarousel) {
            currentCarousel.on("slideChange", function () {
              // console.log(`User changes the images`);
              fireEvent(`User changes the images`);
            });
          }
        }
      }
    });
    // When a user adds a product to the bag from the pdp
    pollerLite(["#productDetails", "#aAddToBag"], () => {
      let atbButton = document.getElementById("aAddToBag");
      atbButton.addEventListener("click", (e) => {
        let sizeSelected = $("#hdnSelectedSizeName").val() !== "";
        if (sizeSelected) {
          // console.log("User adds a product to the bag");
          fireEvent("User adds a product to the bag");
        }
      });
    });
  });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == "control") {
    return;
  }

  // Write experiment code here
  // ...
  pollerLite([`#productDetails`], () => {
    let productDescription, productSpecificaitons, productDelivery, productReturns, productReviews;
    const pdpExpandableSection = document.querySelectorAll(`#productDetails div[id^="pdp-expandable-section-"]`);
    const productCode = document.querySelector(`p#lblProductCode`)?.cloneNode(true);
    let isProductSpecificaitonsAvailable = document
      .querySelector(`.displayAttributesActive .expandable-title`)
      ?.textContent?.includes("Product specifications");
    if (isProductSpecificaitonsAvailable) {
      let title = document.querySelector(`.displayAttributesActive .expandable-title`)?.textContent?.trim();
      let productDetails = document.querySelector(`.displayAttributesActive .expandable-title`)?.closest(`.displayAttributesActive`)?.cloneNode(true);
      productSpecificaitons = { title, productDetails };
    }
    pdpExpandableSection.forEach((section) => {
      let title;
      if (section.querySelector(`.expandable-title`)) {
        title = section.querySelector(`.expandable-title`)?.textContent?.trim();
        if (title.includes("Product description")) {
          productDescription = { title, productDetails: section.cloneNode(true), productCode };
        } else if (title.includes("Delivery")) {
          productDelivery = { title, productDetails: section.cloneNode(true) };
        } else if (title.includes("Returns")) {
          productReturns = { title, productDetails: section.cloneNode(true) };
        } else if (title.includes("Reviews")) {
          productReviews = { title, productDetails: section.cloneNode(true) };
        }
      }
    });
    document
      .querySelector(`#productDetails div[id^="pdp-expandable-section-1"]`)
      ?.insertAdjacentHTML("beforebegin", `<div class="${ID}-productDetailsMainContainer"></div>`);
    pollerLite([`.${ID}-productDetailsMainContainer`, () => window.jQuery], () => {
      const productDetailsMainContainer = document.querySelector(`.${ID}-productDetailsMainContainer`);
      if (productDescription) {
        const productDescriptionDOM = accordionGenerator(productDescription);
        productDetailsMainContainer.insertAdjacentHTML("beforeend", productDescriptionDOM);
      }
      if (productSpecificaitons) {
        const productSpecificaitonsDOM = accordionGenerator(productSpecificaitons);
        productDetailsMainContainer.insertAdjacentHTML("beforeend", productSpecificaitonsDOM);
      }
      if (productDelivery) {
        const productDeliveryDOM = accordionGenerator(productDelivery);
        productDetailsMainContainer.insertAdjacentHTML("beforeend", productDeliveryDOM);
      }
      if (productReturns) {
        const productReturnsDOM = accordionGenerator(productReturns);
        productDetailsMainContainer.insertAdjacentHTML("beforeend", productReturnsDOM);
      }
      if (productReviews) {
        const productReviewsDOM = accordionGenerator(productReviews);
        productDetailsMainContainer.insertAdjacentHTML("beforeend", productReviewsDOM);
      }
      $(document).ready(function () {
        $(`.${ID}-accordion-toggle`).click(function (e) {
          e.preventDefault();
          let $this = $(this);
          $this.toggleClass(`${ID}-accordion-active`);
          if ($this.next().hasClass(`${ID}-accordion-show`)) {
            $this.next().removeClass(`${ID}-accordion-show`);
            $this.next().slideUp(350);
          } else {
            // $this.parent().parent().find('li .inner').removeClass(`${ID}-accordion-show`);
            // $this.parent().parent().find('li .inner').slideUp(350);
            $this.next().toggleClass(`${ID}-accordion-show`);
            $this.next().slideToggle(350);
          }
        });
        $(`.${ID}-accordion`).on("click", function (e) {
          const target = e.target;
          if (target.matches(`button#pdp-expandable-toggle-1`) || target.closest(`button#pdp-expandable-toggle-1`)) {
            const button = target.matches(`button#pdp-expandable-toggle-1`) ? target : target.closest(`button#pdp-expandable-toggle-1`);
            const productDesc = $("#pdp-expandable-content-1");
            productDescClick(productDesc, $(button));
          }
          if (target.matches(`button#pdp-expandable-toggle-2`) || target.closest(`button#pdp-expandable-toggle-2`)) {
            const button = target.matches(`button#pdp-expandable-toggle-2`) ? target : target.closest(`button#pdp-expandable-toggle-2`);
            const productDesc = document.querySelector("#pdp-expandable-content-2");
            rapidClickHandler(productDesc, button);
          }
          if (target.matches(`button#pdp-expandable-toggle-3`) || target.closest(`button#pdp-expandable-toggle-3`)) {
            const button = target.matches(`button#pdp-expandable-toggle-3`) ? target : target.closest(`button#pdp-expandable-toggle-3`);
            const productDesc = document.querySelector("#pdp-expandable-content-3");
            rapidClickHandler(productDesc, button);
          }
        });
      });
    });
  });
};
