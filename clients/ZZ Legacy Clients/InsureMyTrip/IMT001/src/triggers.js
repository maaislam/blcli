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
        const isUser = document.getElementById("loginMenu");
        return !isUser;
      },
      () => window.location.href.indexOf("/buy/index.html") === -1,
      () => window.location.href.indexOf("/travel-insurance/quote/") === -1,
      () => !document.querySelector("#return-to-quote"),
    ],
    activate
  );
}
