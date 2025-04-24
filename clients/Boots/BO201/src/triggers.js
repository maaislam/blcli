/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const regex = new RegExp(
  "((.*boots.com)(/)(health-pharmacy|holidays|new-to-boots|beauty|fragrance|baby-child|wellness$|wellness/|toiletries|electrical|mens|mens/mens-toiletries/shaving-grooming)(/)?.*)"
);

const isPDP = !!document.querySelector(
  "#estore_productpage_template_container"
);

const isHomepage =
  window.location.pathname === "/" ||
  window.location.pathname === "/TopCategoriesDisplay" ||
  regex.test(window.location.href);

if (!ieChecks) {
  if (!getCookie("Synthetic_Testing") && (isPDP || isHomepage)) {
    pollerLite(["body"], activate);
  }
}
