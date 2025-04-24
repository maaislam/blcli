/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

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

  const productsItems = document.querySelectorAll(
    "li.clc-List_Item:not(.clc-List_Item-promotion)"
  );

  productsItems.forEach((item) => makeItemChanges(item));

  function makeItemChanges(el) {
    (function createCtaContainer() {
      const ctaContainer = document.createElement("div");
      ctaContainer.classList.add(`${ID}-cta-container`);
      el.querySelector(".prd-CardSimple_Body").append(ctaContainer);
    })();

    (function addViewDetailsButton() {
      if (VARIATION == 1) {
        const viewDetailsCta = document.createElement("a");
        viewDetailsCta.classList.add(
          `${ID}-view-details-cta`,
          "prd-CardSimple_Button",
          "prd-CardSimple_Button-stroke"
        );
        viewDetailsCta.textContent = "View Details";
        viewDetailsCta.href = el.querySelector(".prd-CardSimple_FauxLink").href;
        el.querySelector(`.${ID}-cta-container`).append(viewDetailsCta);

        viewDetailsCta.addEventListener("click", () => {
          fireEvent("View Details Click");
        });
      }
    })();

    el.querySelector(".prd-CardSimple_FauxLink").remove();

    (function restyleBasketCta() {
      const addToCartCta = el.querySelector(
        "form.prd-CardSimple_Form, .prd-CardSimple_Actions"
      );

      if (VARIATION == 1) {
        addToCartCta
          ?.querySelector("button[data-add-to-cart]")
          ?.classList.remove("prd-CardSimple_Button-stroke");
        addToCartCta
          ?.querySelector("button[data-add-to-cart]")
          ?.classList.add("btn-Secondary");
      }

      if (addToCartCta) {
        el.querySelector(`.${ID}-cta-container`).append(addToCartCta);
        addToCartCta.addEventListener("click", () => {
          fireEvent("Add to Cart Click");
        });
      }
    })();

    function addBenefits(benefits) {
      const benefitsList = document.createElement("ul");
      benefitsList.classList.add(`${ID}-benefits-list`);

      benefits.forEach(() => {
        const benefitItem = document.createElement("li");
        benefitItem.classList.add(`${ID}-benefit-item`);
        benefitItem.textContent = "Benefit";
        benefitsList.append(benefitItem);
      });

      el.querySelector(".prd-CardSimple_Content").append(benefitsList);
    }

    addBenefits([...Array(3)]);
  }

  const productList = document.querySelector(
    ".clc-List_Items.clc-List_Items-full"
  );

  if (productList) {
    new MutationObserver((m) => {
      if (m[0].addedNodes.length > 0) {
        m[0].addedNodes.forEach((node) => {
          if (
            node.classList.contains("clc-List_Item") &&
            !node.classList.contains("clc-List_Item-promotion")
          ) {
            makeItemChanges(node);
          }
        });
      }
    }).observe(productList, { childList: true });
  }
};
