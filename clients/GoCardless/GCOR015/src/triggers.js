/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import shared from "../../../../core-files/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);
const { ID } = shared;
// import { urls } from "./lib/urls";
// window[`${ID}-$$articles`] = urls;

// console.log(`%c${ID}`, `font-size: 30px;`);
if (!ieChecks) {
  pollerLite(
    ["body", `#mainContent`, `nav[aria-labelledby="tableOfContentsHeading"]`, () => document.readyState == "complete", () => window[`${ID}-$$articles`]],
    () => {
      // console.log(`initiated`);
      activate();
    }
  );
}
