/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import shared from "./lib/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
  window.navigator.userAgent
);

if (!ieChecks) {
  pollerLite(["body", "#app-container"], () => {
    document.body.classList.add(`${shared.ID}`);

    // Detect if it's a mobile/desktop layout
    const isMobile = document.querySelector(
      '[class*="PageHeaderMobile__HeaderWrapper"]'
    );
    if (isMobile) document.body.classList.add(`${shared.ID}_mobile`);

    activate();
  });
}
