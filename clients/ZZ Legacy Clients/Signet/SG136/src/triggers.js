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
      () => {
        if (window.digitalData.page.pageInfo.pageType === "PLP") {
          return true;
        }
      },
      () => {
        if (
          window.digitalData.page.category.primaryCategory === "Watches" ||
          window.location.href.match(/.*(webstore)(\/)(l).*(engagement).*/) ||
          window.location.href.match(
            /.*(webstore)(\/)(l).*(wedding-rings).*/
          ) ||
          window.digitalData.page.category.primaryCategory === "Jewellery"
        ) {
          return true;
        }
      },
    ],
    activate
  );
}
