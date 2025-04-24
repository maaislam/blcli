/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { observePageChange } from "../../../../../lib/utils";
import { isFrontPage } from "./helpers";
import { changeFrontPage, changeOtherPages } from "./pageChanges";

const { VARIATION } = shared;

export default () => {
  setup();

  fireEvent("Conditions Met");

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == "control") {
    return;
  }

  window.$(document).on("pjax:success", () => {
    if (isFrontPage()) changeFrontPage();
    else changeOtherPages();
  });

  // Front page & rest of pages have a different change applied.
  if (isFrontPage()) changeFrontPage();
  else changeOtherPages();
};
