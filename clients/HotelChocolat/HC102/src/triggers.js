/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import shared from "../../../../core-files/shared";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if (!ieChecks) {
  const { ID } = shared;

  if (
    (!document.documentElement.classList.contains(`${ID}`) &&
      window.location.pathname ===
        "/uk/shop/collections/products/hot-chocolate/") ||
    window.location.pathname === "/uk/shop/coffee/pods/"
  ) {
    pollerLite(["body", ".grid-tile"], () => {
      activate();
    });
  }
}
