/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */

import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);
// First check
if(!document.querySelector('.AT-936')) {
  if (!ieChecks) {
    if (!getCookie("Synthetic_Testing")) {
      pollerLite(["body", '#oct-basket-container'], () => {
        () => {
          // check once basket has loaded
          if(!document.querySelector('.AT-936')) {
            return true;
          }
        }
        activate();
      });
    }
  }
}

