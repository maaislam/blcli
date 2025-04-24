/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import updateFilters from "./filters";
import updateCategories from "./categories";

export default () => {
  setup();
  const { VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render  */
  const init = () => {
    setup();
    fireEvent("Conditions Met");

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if (VARIATION == "control") {
      // Track filters
      $("#BrandsSection select").change(() => {
        fireEvent("Click - brands filter");
      });

      $("#CategoriesSection .CategoryItem").click(() => {
        fireEvent("Click - category filter");
      });

      $("#AdditionalLinksSection .AdditionalLinkItem").click(() => {
        fireEvent("Click - Additional item filter");
      });

      $(".ProductListHeading .select2-choice").click(() => {
        fireEvent("Click - Sort by");
      });
      return;
    }

    // Categories
    updateCategories();

    // Filters.
    updateFilters();
  };

  // Run changes.
  init();
};
