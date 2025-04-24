/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { clickHandler } from "./handler/clickHandler";
import { conditionsMet, isNonStickyFilterFound } from "./handler/filterDOMFinder";
import { inputHandler } from "./handler/inputHandler";

import { observeDOM, obsIntersection } from "./utils";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  // Goals -->
  const body = document.body;
  body.addEventListener("click", ({ target }) => {
    clickHandler(target);
  });
  body.addEventListener("input", ({ target }) => {
    inputHandler(target);
  });
  // Conditions Met
  conditionsMet();
  window.addEventListener("scroll", function () {
    conditionsMet();
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    // fireEvent("Conditions Met");
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const init = () => {
    const filterContainer = document.querySelector(".sticky-left");
    const mobileFilter = document.querySelector("header .filters-mobile");
    mobileFilter.classList.remove(`${ID}__sticky-filter`);
    // Intersection Observer
    const intersectionCallback = (entry) => {
      // console.log(entry);
      if (!entry.rootBounds) return;
      mobileFilter.closest(`.x__hidden`)?.classList.remove(`x__hidden`);
      if (entry.boundingClientRect.bottom > 0) {
        mobileFilter.classList.remove(`${ID}__sticky-filter`);
      } else {
        mobileFilter.classList.add(`${ID}__sticky-filter`);
      }
    };
    obsIntersection(filterContainer, 0, intersectionCallback);
  };
  init();

  // Mutation Observer
  const mutationCallback = ({ addedNodes }) => {
    if (addedNodes.length > 0) {
      init();
    }
  };

  observeDOM("main", mutationCallback);

  const stickyFilterObserverCallback = () => {
    const stickyFilter = document.querySelector(`.${ID}__sticky-filter`);
    if (document.querySelector(`#site-navigation`)?.classList.contains(`open`)) {
      stickyFilter?.classList.add(`x__hidden`);
    } else if (!document.querySelector(`#site-navigation`)?.classList.contains(`open`)) {
      setTimeout(() => {
        if (!isNonStickyFilterFound(document.querySelector(".sticky-left"))) {
          // console.log("from if", stickyFilter);
          stickyFilter.closest(`.x__hidden`)?.classList.remove(`x__hidden`);
        } else {
          !stickyFilter?.classList.contains(`x__hidden`) && stickyFilter?.classList.add(`x__hidden`);
          // console.log("from else", stickyFilter);
        }
      }, 100);
    }
  };
  observeDOM(`#site-navigation`, stickyFilterObserverCallback, { attributes: true, childList: true, subtree: true });
};
