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
import sd_774_var_1 from "./variations/variation_1";

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
  pollerLite(
    [".ToplinksGroup .search #txtSearch", ".ui-autocomplete", ".dvSearch .TextBoxClear", ".ToplinksGroup #mobSearchContainer #mobileSearchTriggerBtn"],
    () => {
      // Search Opened
      let isSearchClosed = true;
      const searchInput = document.querySelector(".ToplinksGroup .search #txtSearch");
      searchInput.addEventListener("click", function (e) {
        let isAutoComplete = document.querySelector(".ui-autocomplete")?.style.display === "block" ? true : false;
        if (this === document.activeElement && isAutoComplete) {
          fireEvent("Search Opened");
          isSearchClosed = false;
        }
      });
      // Search Completed
      searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter" && searchInput.value !== "") {
          fireEvent("Search Completed");
        }
      });
      document.querySelector(".ui-autocomplete")?.addEventListener("click", (e) => {
        const target = e.target;
        if (target.matches("a") && searchInput.value !== "") {
          fireEvent("Search Completed");
        }
      });
      // Search Closed
      document.addEventListener("click", (e) => {
        if (searchInput !== document.activeElement && !isSearchClosed) {
          fireEvent("Search Closed");
          isSearchClosed = true;
        }
      });
    }
  );
  // -----------------------------
  // If control, bail out from here
  // -----------------------------

  if (shared.VARIATION == "control") {
    return;
  } else if (VARIATION === "1") {
    sd_774_var_1();
  }

  // Write experiment code here
  // ...
  // pollerLite(["#txtSearch", ".dvSearch span.TextBoxClear"], () => {
  // 	const currentClear = document.querySelector(
  // 		".dvSearch span.TextBoxClear"
  // 	);
  // 	const currentClose = document.querySelector(
  // 		".ToplinksGroup #mobSearchContainer #mobileSearchTriggerBtn"
  // 	);
  // 	const input = document.querySelector(".dvSearch #txtSearch");

  // 	const newClose = document.createElement("span");
  // 	newClose.classList.add(`${ID}-search-closure`);

  // 	newClose.addEventListener("click", callBack, false);
  // 	newClose.addEventListener("touchend", callBack, false);

  // 	function callBack(e) {
  // 		currentClose?.click();
  // 		currentClear?.click();
  // 	}

  // 	currentClear?.insertAdjacentElement("beforebegin", newClose);

  // 	input?.addEventListener("focus", (e) => {
  // 		newClose.classList.add("active");
  // 	});
  // 	input?.addEventListener("blur", (e) => {
  // 		newClose.classList.remove("active");
  // 	});
  // });
};
