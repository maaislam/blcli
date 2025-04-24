/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const validUrls = [
  "/fragrance/perfume/all-perfume",
  "/cerave",
  "/opticians/glasses/all-frames-boots-opticians",
  "/baby-child/mothercare-clothing/mothercare-baby-clothes-0-24-months",
  "/beauty/makeup/face/foundation",
  "/beauty/skincare/facial-skincare/moisturiser",
  "/the-ordinary/the-ordinary-shop-all",
  "/no7-shop-all",
  "/fragrance/aftershave/mens-aftershave",
  "/beauty/skincare/skincare-all-skincare",
];

if (!ieChecks && validUrls.includes(window.location.pathname)) {
  if (!getCookie("Synthetic_Testing")) {
    pollerLite(["body"], activate);
  }
}
