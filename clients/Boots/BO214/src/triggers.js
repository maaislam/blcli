/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  if (!getCookie("Synthetic_Testing")) {
    // PLP
    pollerLite([
      `#estore_lister_template_container`,
      `#oct-basket-container`,
      `#oct-notification-sticky .oct-notification`,
      `#oct-notification-sticky .oct-notification__ctas`,
      ], activate);

      // PDP
      pollerLite([
        `#estore_productpage_template_container`,
        `#oct-basket-container`,
        `#oct-notification-sticky .oct-notification`,
        `#oct-notification-sticky .oct-notification__ctas`,
      ], activate);
  }

 
 
}
