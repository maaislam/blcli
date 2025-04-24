/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
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
  // ...

  const Button = `<a class="${ID}-button" href="https://www.wildnutrition.com/pages/quiz-1">Find Your Routine</a>`;

  document
    .querySelector(".prd-ProductContent_Rating")
    .insertAdjacentHTML("afterend", Button);

  document
    .querySelector(`.${ID}-button`)
    .addEventListener("click", () => fireEvent("CTA Clicked"));
};
