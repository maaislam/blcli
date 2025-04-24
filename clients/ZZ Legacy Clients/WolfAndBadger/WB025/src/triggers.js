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
      () => window.$,
      () => {
        let result = false;
        const urls = [
          "/uk/category/women/clothing/",
          "/uk/category/women/accessories/",
          "/uk/category/men/accessories/",
          "/uk/category/men/clothing/",
        ];
        urls.forEach((url) => {
          if (window.location.pathname == url) result = true;
          else if (
            window.location.pathname.indexOf(url) !== -1 &&
            localStorage.getItem("WB025") === "results"
          ) {
            result = true;
          }
        });

        return result;
      },
    ],
    activate
  );
}
