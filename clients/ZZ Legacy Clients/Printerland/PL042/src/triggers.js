/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if (!ieChecks) {
  pollerLite(
    [
      "body",
      ".product_main__body", // PDPs only
      () => {
        // Don't show on accessory PDPs
        const crumb = document.querySelector(".breadcrumbs li:nth-child(2) a");

        if (crumb && crumb.href && crumb.href.indexOf("/accessories") !== -1) {
          return false;
        }
        return true;
      },
    ],
    activate
  );
}
