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
import postcodes from "./data";

const { ID, VARIATION } = shared;

const content = {
  "product/building-materials/aggregates/bagged-aggregates/c/1500050/":
    "https://api.content.travisperkins.co.uk/site/binaries/content/gallery/2548350_desk_postcrete_sep21_banner-min.jpg",
  "product/building-materials/bricks-and-blocks/blocks/100mm-blocks/c/1500035/":
    "https://api.content.travisperkins.co.uk/site/binaries/content/gallery/2548350_desk_postcrete_sep21_banner-min.jpg",
  "product/building-materials/insulation/insulation-board/c/1500213/":
    "https://api.content.travisperkins.co.uk/site/binaries/content/gallery/2548350_desk_postcrete_sep21_banner-min.jpg",
  "product/building-materials/plaster-and-plasterboards/standard-plasterboard/c/1500221/":
    "https://api.content.travisperkins.co.uk/site/binaries/content/gallery/2548350_desk_postcrete_sep21_banner-min.jpg",
  "product/timber-and-sheet-materials/sawn-timber/treated-timber/c/1500002/":
    "https://api.content.travisperkins.co.uk/site/binaries/content/gallery/2548350_desk_postcrete_sep21_banner-min.jpg",
  "product/timber-and-sheet-materials/sheet-materials/plywood/c/1500008/":
    "https://api.content.travisperkins.co.uk/site/binaries/content/gallery/2548350_desk_postcrete_sep21_banner-min.jpg",
  "product/building-materials/bricks-and-blocks/engineering-bricks/c/1500032/":
    "https://api.content.travisperkins.co.uk/site/binaries/content/gallery/2548350_desk_postcrete_sep21_banner-min.jpg",
};

const getPostcode = () => {
  const addr = localStorage.getItem("preselectedDeliveryAddress");
  if (!addr) return false;

  const postcode = JSON.parse(addr).postalCode;
  if (!postcode) return false;
  return postcode;
};

const postcodeMatch = () => {
  const postcode = getPostcode();
  if (!postcode) return false;
  const space = postcode.indexOf(" ");
  return postcodes.indexOf(postcode.substr(0, space).toUpperCase()) !== -1;
};

const matchPage = () => {
  const url = window.location.href;
  let matched = false;
  Object.keys(content).forEach((uri) => {
    if (url.indexOf(uri) !== -1) matched = content[uri];
  });
  return matched;
};

const isLoggedIn = () => {
  return sessionStorage.getItem("loggedIn") === "Yes";
};

const trackClicks = () => {
  const banner = document.querySelector(`.${ID}_wrapper`);

  banner.addEventListener("click", () => {
    fireEvent(`Banner click - ${window.location.href}`);
  });
};

const addBanner = (img) => {
  const banner = document.createElement("div");
  banner.classList.add(`${ID}_wrapper`);
  banner.insertAdjacentHTML(
    "afterbegin",
    `
    <a href="/login/">
      <img src="${img}" alt="Promotion banner" />
    </a>
  `
  );

  const anchor = document.querySelector('[data-test-id="branch-selector-wr"]');
  if (anchor) {
    anchor.parentElement.insertAdjacentElement("beforebegin", banner);
  }

  trackClicks();
};

const init = () => {
  // Prevent duplication, and only run when our conditions are matched.
  const componentAlreadyExists = document.querySelector(`.${ID}_wrapper`);
  const matchedBanner = matchPage();
  if (!postcodeMatch() || !matchedBanner || isLoggedIn()) {
    if (componentAlreadyExists) componentAlreadyExists.remove();
    return;
  }

  // Experiment Code...
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  if (!componentAlreadyExists) addBanner(matchedBanner);
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
    let address = false;

    const addrPlp = document.querySelector(
      '[data-test-id="address-description"]'
    );
    if (addrPlp) address = addrPlp.textContent;

    const addressChanged = () => {
      const newAddr = document.querySelector(
        '[data-test-id="address-description"]'
      );
      if (!newAddr) return false;
      if (newAddr.textContent != address) {
        address = newAddr.textContent;
        return true;
      }

      return false;
    };

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (oldHref != document.location.href || addressChanged()) {
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
};
