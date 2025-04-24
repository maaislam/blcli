/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { getCookie, pollerLite } from "../../../../../lib/utils";
import {
  fireEvent,
  getCustomerLocation,
  isMobile,
  getPageSKU,
  setup,
} from "./services";
import { getBasket, getEligibility, getProduct, getStock } from "./api";
import Multistep from "./Multistep";
import { internal, external } from "./data";
import shared from "./shared";

let Steps = null;
const { ID, VARIATION } = shared;

let sku = getPageSKU();

// Internal or external door?
let data = internal.step1.skus.indexOf(sku) !== -1 ? internal : external;

const loadStep = (stepName) => {
  // Vars.
  const customerLocation = getCustomerLocation();
  const items = data[stepName].skus.map((product) => ({
    productCode: product,
    quantity: 1,
  }));

  // Load in products for other steps
  const promises = [];
  data[stepName].skus.forEach((sku) => {
    promises.push(getProduct(sku));
  });

  // Products loaded? Let's check their stock.
  Promise.allSettled(promises).then((results) => {
    // Stock requires location data.
    if (customerLocation) {
      getEligibility(items, customerLocation).then((eligibility) => {
        getStock(
          [customerLocation.collectionBranchId],
          data[stepName].skus
        ).then((stock) => {
          // Add products to the DOM
          results.forEach((result, i) => {
            if (result.value.product) {
              Steps.addProduct(
                stepName,
                result.value.product,
                eligibility[i],
                stock[i].quantity
              );
            }
          });
        });
      });
    } else {
      // Add products to the DOM
      results.forEach((result) => {
        if (result.value.product) {
          Steps.addProduct(stepName, result.value.product);
        }
      });
    }
  });
};

const loadBasket = () => {
  if (!Steps) return;

  const basketId = getCookie("travisperkins-cart");
  Steps.setBasketId(basketId);
  // Get basket and set the Multistep
  getBasket(basketId).then((response) => {
    if (response.basket && response.basket.basketEntries.length) {
      const basketSkus = response.basket.basketEntries.map(
        (entry) => entry.product.code
      );
      Steps.updateStatus(basketSkus);
    } else Steps.openStep();
  });
};

const productDetailsAccordion = () => {
  const overview = document.querySelector('[data-test-id="product-overview"]');
  const specification = document.querySelector(
    '[data-test-id="product-specifications"]'
  );
  const review = document.querySelector(
    '[data-test-id="product-review-display"]'
  );

  const oldReviewWrapper = review.parentNode.parentNode;
  const oldReviewWrapperMobile = review.parentNode;
  const arrow = `<svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.1066 9.26395L20.5812 0.789341C21.2498 0.120713 22.3339 0.120713 23.0025 0.789341C23.6711 1.45797 23.6711 2.54203 23.0025 3.21066L12.1066 14.1066L1.21066 3.21066C0.54203 2.54203 0.54203 1.45797 1.21066 0.789341C1.87929 0.120713 2.96335 0.120713 3.63198 0.789341L12.1066 9.26395Z" fill="#606F80"/>
  </svg>
`;
  const accordion = document.createElement("div");
  accordion.classList.add(`${ID}_accordion`);
  accordion.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="${ID}_accordionItem" data-item="overview">
      <div class="${ID}_accordionHeading">
        Overview
        <div class="${ID}-arrow">${arrow}</div>
      </div>
      <div class="${ID}_accordionBody">${
      overview ? overview.innerHTML : ""
    }</div>
    </div>

    <div class="${ID}_accordionItem" data-item="techspec">
      <div class="${ID}_accordionHeading">
        Technical specification
        <div class="${ID}-arrow">${arrow}</div>
      </div>
      <div class="${ID}_accordionBody">${
      specification ? specification.innerHTML : ""
    }</div>
    </div>

    <div class="${ID}_accordionItem" data-item="reviews">
      <div class="${ID}_accordionHeading">
        Reviews
        <div class="${ID}-arrow">${arrow}</div>
      </div>
      <div class="${ID}_accordionBody ${ID}_accordionReview"></div>
    </div>
  `
  );

  if (overview && accordion) {
    overview.parentNode.insertAdjacentElement("beforebegin", accordion);
  }
  if (review) {
    document
      .querySelector(`.${ID}_accordionReview`)
      .insertAdjacentElement(`afterbegin`, review);
  }

  if (overview && overview.parentNode) overview.parentNode.remove();
  if (!isMobile()) {
    if (
      specification &&
      specification.parentNode &&
      specification.parentNode.parentNode
    ) {
      specification.parentNode.parentNode.remove();
    }
    if (oldReviewWrapper) oldReviewWrapper.remove();
  } else {
    if (specification.parentNode) specification.parentNode.remove();
    if (oldReviewWrapperMobile) oldReviewWrapperMobile.remove();
  }

  const toggles = document.querySelectorAll(`.${ID}_accordionHeading`);
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      // If opening, track event
      if (!toggle.parentNode.classList.contains(`${ID}_active`)) {
        const item = toggle.parentNode.getAttribute("data-item");
        fireEvent(`Expand - PDP Accordion ${item}`);
      }
      toggle.parentNode.classList.toggle(`${ID}_active`);
    });
  });
};

const isDoorInTest = () => {
  if (!document.querySelector('[data-test-id="pdp-wrapper"]')) return false;
  // Only run on door pages.
  const newSku = getPageSKU();

  if (newSku !== sku) {
    sku = newSku;
    data = internal.step1.skus.indexOf(sku) !== -1 ? internal : external;
  }
  return data.step1.skus.indexOf(sku) !== -1;
};

const isLoggedIn = () => {
  return sessionStorage.getItem("loggedIn") === "Yes";
};

const init = () => {
  setup();
  if (isDoorInTest() && !isLoggedIn()) {
    // Experiment Code...

    // Ensure page has loaded in.
    if (!document.querySelector('[data-test-id="product-overview"]')) {
      setTimeout(init, 1000);
      return;
    }

    // Control?
    if (VARIATION === "control") {
      fireEvent("Visited - Door Bundle PDP");
      return;
    }

    // Hide increasingly
    const inc = document.querySelector(".inc_pdp_block");
    if (inc) {
      inc.classList.add(`${ID}_hidden`);
    }

    Steps = new Multistep(data);
    if (Steps) {
      loadBasket();
      loadStep("step2");
      loadStep("step3");
      loadStep("step4");

      productDetailsAccordion();
    }
  }
};

const addressChanged = (mutations) => {
  let changed = false;

  // Newly set address.
  if (mutations.addedNodes && mutations.addedNodes.length > 0) {
    mutations.addedNodes.forEach((elm) => {
      if (
        elm &&
        elm.className &&
        elm.className.indexOf &&
        elm.className.indexOf("DeliveryAndBranchSelectorsBlockPDP") !== -1
      ) {
        changed = true;
      }
    });
  }

  // Change of address.
  if (mutations.removedNodes && mutations.removedNodes.length > 0) {
    mutations.removedNodes.forEach((elm) => {
      if (
        elm &&
        elm.className &&
        elm.className.indexOf &&
        elm.className.indexOf("Popup__OverlayWrapper") !== -1
      ) {
        changed = true;
      }
    });
  }

  return changed;
};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(["#app-container"], () => {
    const appContainer = document.querySelector("#app-container");

    // ------------------------------------
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver((mutations) => {
      // Page change
      if (oldHref != document.location.href) {
        oldHref = document.location.href;

        // Prevent basket error on mobile
        if (!isDoorInTest()) {
          // If the experiment exists in the DOM, clear it (Delete)
          const multistep = document.querySelector(`.${ID}_Multistep`);
          if (multistep) multistep.remove();
        }

        setTimeout(() => {
          init();
        }, 2000);
      }

      // Main product added to basket
      if (
        document.querySelector(
          '[data-test-id="add-to-basket-popup-wrapper"] [data-test-id="product-name"]'
        )
      ) {
        fireEvent("Add to basket - Step step1");
        console.log(Steps);
        loadBasket();
      }

      // Address changed on PDP, reload page to refresh stock.
      const last = mutations.length - 1;
      if (addressChanged(mutations[last]) && isDoorInTest()) {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
