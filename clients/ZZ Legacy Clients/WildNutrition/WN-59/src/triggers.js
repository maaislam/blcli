/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

const validUrls = [
  "https://www.wildnutrition.com/products/food-grown-ksm-66-ashwagandha-plus",
  "https://www.wildnutrition.com/products/food-grown-endo-complex",
  "https://www.wildnutrition.com/products/food-grown-magnesium",
  "https://www.wildnutrition.com/products/food-grown-fertility",
  "https://www.wildnutrition.com/products/multi-strain-biotic",
  "https://www.wildnutrition.com/products/pure-strength-omega-3",
  "https://www.wildnutrition.com/products/food-grown-iron-plus",
  "https://www.wildnutrition.com/products/food-grown-b-complex-plus",
];

if (!ieChecks && validUrls.includes(window.location.href)) {
  pollerLite(
    ["body", "[data-module='product-gallery'] .prd-ProductImage_Slide-active"],
    activate,
    {
      wait: 10,
    }
  );
}
