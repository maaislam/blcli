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
  const { ID, VARIATION } = shared;

  if (!document.documentElement.classList.contains(`${ID}`)) {
    if (
      window.location.href.indexOf("chocolate-corporate-gifts-submitted.html") >
      -1
    ) {
      pollerLite(["body", "#main", 
      () => {
        return !!window.HCallProducts && window.HCfilterList
      }
    ], () => {
        activate();
      });
    } else {
      pollerLite(["body", "#custom-form", "#main",
      () => {
        return !!window.HCallProducts && window.HCfilterList
      }
    ], () => {
        activate();
      });
    }
  }
}
