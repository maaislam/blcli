/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import shared from "../../../../core-files/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const checkCategory = () => {
  if (
    window.digitalData.page.category.primaryCategory === "Watches" ||
    window.digitalData.page.category.subCategory1 === "Watch Buyer's Guide" ||
    window.location.href.includes("watch")
  )
    return true;
};

if (!ieChecks) {
  if (!document.documentElement.classList.contains(`${shared.ID}`)) {
    pollerLite(["body", () => checkCategory()], activate);
  }
}
