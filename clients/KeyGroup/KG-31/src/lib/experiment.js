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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green`);
  pollerLite(["#er-calculator button[type='submit']"], () => {
    document.querySelector("#er-calculator button[type='submit']")?.addEventListener("click", (e) => {
      // console.log("clicked ..");
      setTimeout(() => {
        if (!document.querySelector(".not-found") && window.location.href.indexOf("/results") > -1) {
          // console.log(document.querySelector("#er-calculator button[type='submit']"));
          fireEvent(`User successfully submits the form`);
        }
      }, 2000);
    });
  });
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
