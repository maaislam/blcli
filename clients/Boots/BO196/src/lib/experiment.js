/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

export default () => {
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

  const hasVariants =
    document.getElementById("productHasVariants").value === "true";

  const productID = document.getElementById("product_ID").value;
  const productTitle = document.getElementById(
    "estore_product_title"
  ).innerText;
  const productPrice = document.getElementById("PDP_productPrice").innerText;
  const baseAddToBasket = document.getElementById("add2CartBtn");
  const quantityField = document.getElementById(`quantity_${productID}`);

  let selectedVariant;

  const root = document.createElement("div");
  root.classList.add(`${ID}-root`);
  root.innerHTML = /* HTML */ `
    <div class="${ID}-container ${hasVariants ? "has-variants" : ""}">
      <div class="${ID}-product-info ${hasVariants ? "has-variants" : ""}">
        <h2 class="${ID}-product-info-title" data-product-title>
          ${productTitle}
        </h2>
        <span class="${ID}-product-info-price" data-product-price>
          ${productPrice}
        </span>
      </div>
      ${hasVariants
        ? /* HTML */ `
            <div class="${ID}-product-variants" data-product-variants>
              <div class="display"></div>
              <ul></ul>
            </div>
          `
        : ""}
      <div
        class="${ID}-basket-actions ${hasVariants ? "has-variants" : ""}"
        data-basket-actions
      >
        <div class="${ID}-basket-actions-quantity" data-basket-quantity>
          <button data-basket-subtract>-</button>
          <div data-basket-quantity-field></div>
          <button data-basket-add>+</button>
          <p class="${ID}-basket-quantity-message">in your basket</p>
        </div>
        <button
          class="${ID}-add-to-basket ${hasVariants && !selectedVariant
            ? `${ID}-disabled`
            : ""}"
          data-add-to-basket
        >
          Add to basket
        </button>
        <p class="${ID}-basket-max-quantity-message" data-quantity-message>
          Maximum quantity reached
        </p>
      </div>
    </div>
  `;

  const rootAddToBasket = root.querySelector("[data-add-to-basket]");
  rootAddToBasket.addEventListener("click", () => baseAddToBasket.click());

  const foundVariants = [];

  if (hasVariants) {
    const variants = document.querySelectorAll(
      "#sizeComboButton_dropdown > ul > li"
    );

    variants.forEach((variant) => foundVariants.push(variant.cloneNode(true)));
  }

  if (hasVariants && foundVariants.length > 0) {
    const variantContainer = root.querySelector("[data-product-variants]");
    const variantDropdown = variantContainer.querySelector(":scope > ul");

    foundVariants.forEach((variant) => {
      const variantItemLi = document.createElement("li");
      const variantItemButton = document.createElement("button");

      variantDropdown.append(variantItemLi);
      variantItemLi.append(variantItemButton);
      variantItemButton.append(variant);
    });

    const currentVariantContainer = document.querySelector(
      ".sizeComboButton_container"
    );

    const cloneVariants = root.querySelectorAll(
      "[data-product-variants] > ul > li"
    );

    const checkVariant = (value) => {
      cloneVariants.forEach((variant) => {
        const variantValue = variant.querySelector(".tooltip").innerText;

        if (variantValue === value) {
          variant.classList.add("active");
          variant.scrollIntoView({ behavior: "smooth" });
        } else {
          variant.classList.remove("active");
        }
      });
    };

    new MutationObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.addedNodes.length !== 0) {
          selectedVariant = entry.target.innerText;
          rootAddToBasket.classList.remove(`${ID}-disabled`);

          checkVariant(selectedVariant);
        }
      });
    }).observe(currentVariantContainer, { childList: true, subtree: true });

    const list = variantContainer.querySelector("ul");
    const listItems = list.querySelectorAll("li > button    ");
    const display = variantContainer.querySelector(".display");

    display.append(cloneVariants[0]);

    display.addEventListener("click", () => {
      list.classList.toggle("open");
      display.classList.toggle("open");
      list.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.addEventListener(
      "click",
      (e) => {
        if (
          list.classList.contains("open") &&
          !variantContainer.contains(e.target)
        ) {
          list.classList.remove("open");
          display.classList.remove("open");
        }
      },
      true
    );

    listItems.forEach((item) => {
      item.addEventListener("click", () => {
        const clone = item.cloneNode(true);
        display.innerHTML = "";
        display.append(clone);
        list.classList.remove("open");
        display.classList.remove("open");
      });
    });
  }

  const baseBasketActions = document.getElementById(
    `shopperActionsRedesign${productID}`
  );
  const baseIncreaseQuantity = document.getElementById("increseQty");
  const baseReduceQuantity = document.getElementById("desreseQty");
  const rootIncreaseQuantity = root.querySelector("[data-basket-add]");
  const rootReduceQuantity = root.querySelector("[data-basket-subtract]");

  const basketActionsContainer = root.querySelector(
    "[data-basket-quantity-field]"
  );

  const refreshQuantity = () => {
    const el = basketActionsContainer.querySelector(`#quantity_${productID}`);

    if (el) el.remove();

    basketActionsContainer.appendChild(quantityField.cloneNode(true));
  };

  baseIncreaseQuantity.addEventListener("click", () => refreshQuantity());
  baseReduceQuantity.addEventListener("click", () => refreshQuantity());

  rootIncreaseQuantity.addEventListener("click", () => {
    baseIncreaseQuantity.click();
    refreshQuantity();
  });
  rootReduceQuantity.addEventListener("click", () => {
    baseReduceQuantity.click();
    refreshQuantity();
  });

  new MutationObserver((entires) => {
    entires.forEach(() => {
      refreshQuantity();
    });
  }).observe(baseBasketActions, {
    subtree: true,
    childList: true,
    attributes: true,
  });

  const rootBasketQuantityContainer = root.querySelector(
    "[data-basket-quantity]"
  );

  const baseQuantitySection = document.getElementById(
    `quantity_section_${productID}`
  );

  new MutationObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target.style.visibility === "visible") {
        rootBasketQuantityContainer.classList.add("visible");
      } else {
        rootBasketQuantityContainer.classList.remove("visible");
      }
    });
  }).observe(baseQuantitySection, { attributes: true });

  const baseQuantityMessage = document.getElementById("quantity_msg");
  const rootQuantityMessage = root.querySelector("[data-quantity-message]");

  new MutationObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target.style.visibility === "visible") {
        rootQuantityMessage.classList.add("visible");
      } else {
        rootQuantityMessage.classList.remove("visible");
      }
    });
  }).observe(baseQuantityMessage, { attributes: true });

  document.body.appendChild(root);

  if (VARIATION === "2") {
    root.classList.add(`${ID}-hidden`);

    let scrollProgress =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;

    window.addEventListener("scroll", () => {
      scrollProgress =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
    });

    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          !entry.isIntersecting &&
          scrollProgress > baseAddToBasket.getBoundingClientRect().top
        ) {
          root.classList.remove(`${ID}-hidden`);
        } else {
          root.classList.add(`${ID}-hidden`);
        }
      });
    }).observe(baseAddToBasket);
  }

  if (VARIATION === "3") {
    root.classList.add(`${ID}-hidden`);

    let scrollProgress =
      window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;

    window.addEventListener("scroll", () => {
      scrollProgress =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;
    });

    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          !entry.isIntersecting &&
          scrollProgress > baseAddToBasket.getBoundingClientRect().top
        ) {
          root.classList.remove(`${ID}-hidden`);
        } else {
          root.classList.add(`${ID}-hidden`);
        }
      });
    }).observe(baseAddToBasket);
  }

  pollerLite(["#openChat"], () => {
    const chat = document.getElementById("openChat");

    new MutationObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.attributeName === "style") {
          entry.target.style.bottom = `${root.scrollHeight + 25}px`;
        }
      });
    }).observe(chat, { attributes: true });

    new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        chat.style.bottom = `${entry.contentRect.height + 25}px`;
      });
    }).observe(root, { box: "border-box" });
  });

  // Tracking
  rootAddToBasket.addEventListener("click", () =>
    fireEvent("Sticky add to basket button clicked")
  );
};
