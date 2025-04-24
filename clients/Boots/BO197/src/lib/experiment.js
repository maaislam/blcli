/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import variation1 from "./variation1";
import variation2 from "./variation2";
import variation3 from "./variation3";
import variation4 from "./variation4";
import variation5 from "./variation5";

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent("Conditions Met");

  document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem(`${ID}`) !== "Fired") {
      window.cmCreateManualLinkClickTag(
        `/${ID}?cm_sp=AdobeTarget${ID}-_-${ID} V${VARIATION}-_-fired`
      );

      sessionStorage.setItem(`${ID}`, "Fired");
    }
  });

  if (window.usabilla_live) {
    window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
  }

  if (VARIATION == "control") {
    return;
  }

  console.log(ID);

  if (VARIATION === "1" && window.location.pathname === "/") {
    variation1();
  }

  if (VARIATION === "2" && window.location.pathname === "/no7") {
    variation2();
  }

  if (
    VARIATION === "3" &&
    [
      "/no7-shop-all",
      "/beauty/makeup/face",
      "/beauty/makeup/face/foundation",
      "/new-in-beauty-skincare",
      "/no7-make-up",
      "/no7-make-up/no7-make-up-face",
      "/no7-make-up/no7-foundation-range",
      "/no7-skincare-restore-renew",
      "/no7-new",
      "/no7-skincare-anti-ageing-skincare",
    ].includes(window.location.pathname)
  ) {
    variation3();
  }

  if (
    (VARIATION === "4" && window.location.pathname === "/sitesearch") ||
    window.location.pathname === "/beauty/makeup/face/foundation"
  ) {
    variation4();
  }

  if (
    VARIATION === "5" &&
    [
      "/no7-shop-all",
      "/beauty/makeup/face",
      "/beauty/makeup/face/foundation",
      "/new-in-beauty-skincare",
      "/no7-make-up",
      "/no7-make-up/no7-make-up-face",
      "/no7-make-up/no7-foundation-range",
      "/no7-skincare-restore-renew",
      "/no7-new",
      "/no7-skincare-anti-ageing-skincare",
    ].includes(window.location.pathname)
  ) {
    variation5();
  }
};
