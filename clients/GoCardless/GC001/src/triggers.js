/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { essentialPanels } from "./lib/dom";

const url = window.location.href;
if (
  url.indexOf("break-the-cycle") > -1 ||
  url.indexOf("briser-la-spirale") > -1 ||
  url.indexOf("take-the-bite-out-of-failed-payments") > -1 ||
  url.indexOf("protegez-vous-des-echecs-de-paiement") > -1 ||
  url.indexOf("zahlungserfolg-ohne-drama") > -1
) {
  pollerLite(essentialPanels, activate);
}

pollerLite(["body"], () => {
  // for observer
  let oldHref = document.location.href;
  const bodyList = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (oldHref != document.location.href) {
        oldHref = document.location.href;
        document.body.classList.remove("GC001");
        const textBlock = document.querySelector(".GC001-heading");
        const imageEl = document.querySelector(".GC001-image");
        const videoEL = document.querySelector(".GC001-videoOverlay");
        const videoBg = document.querySelector(".GC001-videoBox");

        if (textBlock) {
          textBlock.remove();
        }
        if (imageEl) {
          imageEl.remove();
        }
        if (videoEL) {
          videoEL.remove();
        }
        if (videoBg) {
          videoBg.remove();
        }

        const url = window.location.href;

        if (
          url.indexOf("break-the-cycle") > -1 ||
          url.indexOf("briser-la-spirale") > -1 ||
          url.indexOf("take-the-bite-out-of-failed-payments") > -1 ||
          url.indexOf("protegez-vous-des-echecs-de-paiement") > -1 ||
          url.indexOf("zahlungserfolg-ohne-drama") > -1
        ) {
          pollerLite(essentialPanels, activate);
        }
      }
    });
  });
  const config = {
    childList: true,
    subtree: true,
  };

  observer.observe(bodyList, config);
});
