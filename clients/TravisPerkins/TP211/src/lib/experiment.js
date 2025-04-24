/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/uc-lib";
import { viewabilityTracker } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;
let badgeTracked = false; // Has the first badge been seen by the visitor?

const getProductBadges = (product) => {
  const badges = product.querySelectorAll('[data-test-id="badge"]');
  const hasBadges = {};
  if (badges) {
    badges.forEach((badge) => {
      if (badge.textContent.trim().toLowerCase() === "new") {
        hasBadges.new = badge;
      }
      if (badge.textContent.trim().toLowerCase() === "clearance") {
        hasBadges.clearance = badge;
      }
      if (badge.textContent.trim().toLowerCase() === "big trade deal") {
        hasBadges.bigTradeDeal = badge;
      }
    });
  }

  return hasBadges;
};

const changeProductLayout = (product) => {
  const badges = getProductBadges(product);

  // Track when clearance/trade deal badge is seen by the visitor.
  if (badges.clearance || badges.bigTradeDeal) {
    if (!badgeTracked) {
      badgeTracked = true;
      const badgeToTrack = badges.clearance
        ? badges.clearance
        : badges.bigTradeDeal;
      viewabilityTracker(
        badgeToTrack.closest('[data-test-id="product"]'),
        () => {
          fireEvent("Badge seen", true);
        },
        { allElementHasToBeInView: false, removeOnView: true }
      );
    }
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // Move name above code
  const code = product.querySelector('[data-test-id="product-card-code"]');
  let name = product.querySelector("h3");
  if (!name) {
    name = document.querySelector('div[data-test-id="product-card-title"]');
  }
  if (!name) return;

  if (code) {
    name.insertAdjacentElement("afterend", code);
    code.classList.add(`${ID}_code`);
  }

  // Move new badge
  if (badges.new) {
    name.insertAdjacentElement("beforebegin", badges.new);
  }

  // Remove big trade deal/clearance & add as new badge
  if (badges.clearance || badges.bigTradeDeal) {
    let label = "";
    if (badges.clearance) {
      label = "CLEARANCE";
      badges.clearance.classList.add(`${ID}_hidden`);
    }
    if (badges.bigTradeDeal) {
      label = "BIG<br> TRADE DEAL";
      badges.bigTradeDeal.classList.add(`${ID}_hidden`);
    }

    product.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="${ID}_badge">
        <span>${label}</span>
      </div>
    `
    );
  }
};

const init = () => {
  const componentAlreadyExists = false;

  if (componentAlreadyExists) {
    return;
  }

  // Experiment Code...
  setup();

  fireEvent("Conditions Met");

  // Loop products and adjust their layout and badges.
  const products = document.querySelectorAll('[data-test-id="product"]');
  if (products) {
    products.forEach((product) => {
      changeProductLayout(product);
    });
  }
};

export default () => {
  init();

  // Poll and re-run init
  pollerLite(["#app-container"], () => {
    const appContainer = document.querySelector("#app-container");

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    let oldHref = document.location.href;
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;

          document.body.classList.remove(`${shared.ID}`);

          setTimeout(() => {
            // -----------------------------------
            // Timeout ensures router has started to rebuild DOM container
            // and we don't fire init() too early
            // -----------------------------------
            init();
          }, 2000);
        }
      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });
};
