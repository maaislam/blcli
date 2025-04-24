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
import hof_734_var_1 from "./variations/variations_1";
import hof_734_var_2 from "./variations/variations_2";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...
  pollerLite(["a#aAddToBag"], () => {
    document.querySelector("a#aAddToBag").addEventListener("click", () => {
      fireEvent("ATB");
    });
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == "control") {
    return;
  }

  var isPDP = pageMeta_PageType === "ProductDetail" ? true : false;
  if (isPDP) {
    pollerLite([".FlanProdDet .AltProdDet #productDetails .BasketWishContainer", ".FlanProdDet .AltProdDet #productImages #productImageContainer"], () => {
      if (VARIATION === "1") hof_734_var_1();
      else if (VARIATION === "2") hof_734_var_2();
    });
  }
  // Write experiment code here
  // ...
};
