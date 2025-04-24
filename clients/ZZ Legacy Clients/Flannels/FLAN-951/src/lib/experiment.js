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
import { scrollDepth } from "./helper/scrollDepth";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;
// console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
export default () => {
  setup();

  fireEvent("Conditions Met");

  pollerLite([`#navlist`, `#hotspotModal`, `#filterlist`, `.SortActiveFiltersInner .FilterSelectedContainer`, `.row.pagination.pagination-bottom`], () => {
    // console.log("All found!");
    const navContainer = document.querySelector(`#navlist`);
    navContainer.addEventListener("click", function (e) {
      const target = e.target;
      if (target.matches(`#navlist > li`) || target.closest(`#navlist > li`)) {
        fireEvent(`User clicks on the a product tile`);
        // console.log(`User clicks on the a product tile`);
      }
    });
    // add to bag
    document.querySelector("#hotspotModal").addEventListener("click", (e) => {
      let sizeSelected = false;
      let isSizeAvailable = document.querySelector("#ulHsSizes");
      let currSizes = document.querySelectorAll("#ulHsSizes li");
      if (isSizeAvailable) {
        for (let index = 0; index < currSizes.length; index++) {
          if (currSizes[index].classList.contains("hsVariantHighlight")) {
            sizeSelected = true;
            break;
          }
        }
      } else {
        sizeSelected = true;
      }
      if ((e.target.id == "addHotspotToBag" || e.target.closest("#addHotspotToBag")) && sizeSelected) {
        fireEvent(`user adds a product to the basket`);
        // console.log("user adds a product to the basket");
      }
    });
    // scroll
    scrollDepth();
    const filterContainer = document.querySelector(`#filterlist`);
    filterContainer.addEventListener("click", function (e) {
      const target = e.target;
      // console.log(target);
      if (target.matches(`a.FilterAnchor`) || target.closest(`a.FilterAnchor`)) {
        // Apply filter part 1
        // console.log(`User applies a filter`);
        const filterButton = target.matches(`a.FilterAnchor`) ? target : target.closest(`a.FilterAnchor`);
        const checkBox = filterButton.querySelector(`span[role="checkbox"]`);
        const filterName = checkBox.querySelector(`.FilterName`)?.textContent?.trim();
        setTimeout(() => {
          if (checkBox.getAttribute(`aria-checked`) == "true") {
            // console.log(`User applies a filter: ${filterName}`);
            fireEvent(`User applies a filter: ${filterName}`);
          } else {
            // console.log(`User removes a filter: ${filterName}`);
            fireEvent(`User removes a filter: ${filterName}`);
          }
        }, 500);
      }
      // filter click
      else {
        if (target.matches(`li.productFilter`) || target.closest(`li.productFilter`)) {
          // console.log(`User clicks the filters`);
          const productFilter = target.matches(`li.productFilter`) ? target : target.closest(`li.productFilter`);
          const productFilterName = productFilter?.querySelector(".productFilterTitle")?.textContent?.trim();
          // console.log(`User clicks the filters: ${productFilterName}`);
          fireEvent(`User clicks the filters: ${productFilterName}`);
        }
      }
    });
    // Apply filter part 2
    const filterSelectedContainer = document.querySelector(`.SortActiveFiltersInner .FilterSelectedContainer`);
    filterSelectedContainer.addEventListener("click", function (e) {
      const target = e.target;
      // console.log(target);
      if (target.matches(`li.selectedFilter`) || target.closest(`li.selectedFilter`)) {
        // console.log(`User applies a filter`);
        const appliedFilterButton = target.matches(`li.selectedFilter`) ? target : target.closest(`li.selectedFilter`);
        const filterName = appliedFilterButton?.querySelector(`span.selectedFilterLabel`)?.textContent?.trim();
        // console.log(`User removes a filter: ${filterName}`);
        fireEvent(`User removes a filter: ${filterName}`);
      } else if (target.matches(`li.inlineClearAllFilters`) || target.closest(`li.inlineClearAllFilters`)) {
        // console.log(`User clears all filter`);
        fireEvent(`User clears all filter`);
      }
    });
    // paggination
    const bottomPaginationContainer = document.querySelector(`.row.pagination.pagination-bottom`);
    // console.log(bottomPaginationContainer);
    let oldCurrentPageNumber = bottomPaginationContainer?.querySelector(`.CurrentPageNumber`)?.textContent.trim();
    const observer = new MutationObserver((mutationList) => {
      mutationList.forEach((mutation) => {
        // console.log(mutation);
        let newCurrentPageNumber = bottomPaginationContainer?.querySelector(`.CurrentPageNumber`)?.textContent.trim();
        if (newCurrentPageNumber != oldCurrentPageNumber) {
          // console.log(`User uses the pagination`);
          fireEvent(`User uses the pagination`);
        }
        oldCurrentPageNumber = newCurrentPageNumber;
      });
    });
    observer.observe(bottomPaginationContainer, { attributes: true, childList: true, subtree: true, characterData: true });
  });

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == "control") {
    return;
  }

  // Write experiment code here
  // ...
};
