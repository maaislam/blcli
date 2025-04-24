/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite, throttle } from "../../../../../lib/uc-lib";
import { elementIsInView } from "../../../../../lib/utils";
import { postcodes } from "./data";

const { ID, VARIATION } = shared;
let bannerVisibilityTracked = false;

const matchPostcode = () => {
  // Check the postcode
  let result = false;
  const regex = /.*\d+/gm; // match until the last digit.
  let address = localStorage.getItem("preselectedDeliveryAddress");
  if (address) {
    // Retrieve visitor's postcode.
    address = JSON.parse(address);
    let postcode = address.postalCode;

    if (postcode) {
      // Is it in our postcode list?
      const postcodePart = postcode.match(regex);
      if (postcodePart && postcodePart[0]) {
        // Without the last letters in the postcode
        postcode = postcodePart[0];

        if (postcodes.indexOf(postcode) !== -1) {
          result = true;
        }
      }
    }
  }

  return result;
};

const hideBanner = () => {
  const banner = document.querySelector(`${ID}_wrapper`);
  if (banner) banner.remove();
};

const showBanner = () => {
  // Reset tracking.
  bannerVisibilityTracked = false;

  // Anchor for where to add our panel.
  const cats = document.querySelector('[data-test-id="top-category-block"]');
  if (cats) {
    const anchor = cats.parentElement;
    const banner = document.createElement("div");
    banner.classList.add(`${ID}_wrapper`);
    banner.insertAdjacentHTML(
      "afterbegin",
      `
      <a href="https://www.travisperkins.co.uk/product/gardens-and-landscaping/decking/composite-decking/composite-deck-boards/c/1597001/?brand=Travis%20Perkins">
        <picture>
          <source media="(max-width: 767px)" srcset="//sb.monetate.net/img/1/581/3586904.jpg" />
          <source media="(min-width: 768px)" srcset="//sb.monetate.net/img/1/581/3586903.jpg" />
          <img src="//sb.monetate.net/img/1/581/3586903.jpg" alt="Composite Decking" />
        </picture>
      </a>
    `
    );

    if (anchor) {
      anchor.insertAdjacentElement("beforebegin", banner);

      // Tracking
      banner.querySelector("a").addEventListener("click", () => {
        fireEvent("Banner clicked");
      });

      window.addEventListener(
        "scroll",
        throttle(() => {
          if (!bannerVisibilityTracked && elementIsInView(banner, true)) {
            fireEvent("Banner seen");
            bannerVisibilityTracked = true;
          }
        }, 100)
      );

      fireEvent("Banner added to page");
    }
  }
};

const pageMatched = () => window.location.pathname === "/";

const init = () => {
  // Only on homepage.
  if (!pageMatched()) return;

  // Prevent duplicate.
  const componentAlreadyExists = document.querySelector(`.${ID}_wrapper`);
  if (componentAlreadyExists) {
    return;
  }

  // Only if postcode matches.
  if (!matchPostcode()) return;

  // Experiment Code...
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

  showBanner();
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

  // Poll for postcode changes.
  if (pageMatched() && !localStorage.getItem("preselectedDeliveryAddress")) {
    const recheckPostcode = setInterval(() => {
      // Is it available now?
      if (localStorage.getItem("preselectedDeliveryAddress")) {
        init();
        clearInterval(recheckPostcode);
      }
    }, 2000);
  }
};
