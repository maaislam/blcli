/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { varData } from "./data";

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");
  // console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // trackings
  const formContainer = document.querySelector(`form#search_form`);
  const inputSearchForm = formContainer?.querySelector(`input#search`);
  let hoverTimer;
  inputSearchForm.addEventListener("mouseenter", (e) => {
    hoverTimer = setTimeout(() => {
      // console.log(`User hover over the search bar`);
      fireEvent(`User hover over the search bar`);
    }, 500);
  });
  inputSearchForm.addEventListener("mouseleave", (e) => {
    clearTimeout(hoverTimer);
  });

  inputSearchForm.addEventListener(`click`, (e) => {
    // console.log(`User clicked the search bar`);
    fireEvent(`User clicked the search bar`);
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }
  const inputFieldPlaceholderEditor = () => {
    const textFieldContent = varData[VARIATION];
    if (textFieldContent && inputSearchForm) {
      inputSearchForm.setAttribute(`placeholder`, textFieldContent);
    }
  };
  inputFieldPlaceholderEditor();
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
