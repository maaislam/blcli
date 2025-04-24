/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const validPaths = [
  "/revlon-pro-collection-one-step-dryer-volumiser-10235019",
  "/lumie-sunrise-alarm-10256821",
  "/cerave-sa-smoothing-cleanser-236ml-10272454",
  "/ole-henriksen-strength-trainer-peptide-boost-moisturizer-50ml-10303664",
  "/waterpik-cordless-plus-water-flosser-wp-450uk-10090171",
  "/bondi-boost-intensive-growth-spray-125ml-10267267",
  "/ole-henriksen-strength-trainer-peptide-boost-moisturizer-50ml-10303664",
  "/boots-finger-pulse-oximeter-10293867",
  "/soap-and-glory-a-printly-glorious-selection-10298228",
  "/ambre-solaire-sensitive-hydrating-face-sun-cream-mist-spf50-75ml-10225139--",
  "/slimfast-7-day-starter-kit-10229887",
  "/boots-essentials-curl-creme-250ml-10088417",
  "/woodwards-gripe-water-150ml-10006777",
  "/cur%C3%A9l-deep-moisture-spray-150ml-for-dry-sensitive-skin-10302564",
  "/ariana-grande-cloud-eau-de-parfum-50ml-10259502",
  "/night-nurse-liquid-160-ml-10032867",
  "/boots-sleapeaze-tablets-50-mg---20-tablets-10263964",
  "/nyx-professional-makeup-jumbo-eye-pencil-12g-10207815",
  "/aveeno-dermexa-emollient-cream-200ml-10246696",
];

const currentPath = window.location.pathname;

if (
  !ieChecks &&
  validPaths.includes(currentPath) &&
  document.referrer !== "https://www.boots.com/"
) {
  if (!getCookie("Synthetic_Testing")) {
    pollerLite(
      [
        "body",
        () => {
          if (document.referrer.indexOf("boots.com") <= 0) {
            return true;
          }
        },
      ],
      activate
    );
  }
}
