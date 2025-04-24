import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import shared from "../../../../core-files/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  if (!document.documentElement.classList.contains(`${shared.ID}`)) {
    if (window.location.href.indexOf("webstore/l/") > -1) {
      pollerLite(["body", ".product-card", ".products.products-display--grid", "[data-insights-object-id]",
    () => {
      if(window.products) {
        return true;
      }
    }], activate);
    } else {
      pollerLite(
        [
          "body",
          ".product-gallery__main",
          () => {
            if(window.products) {
              return true;
            }
          },
          () => {
            const skusRegex = new RegExp('.*(webstore)\/d\/.*(' + (window.products.includedSKUS.join("|") + ').*'));

            if (window.location.href.match(skusRegex)) {
              return true;
            }
          },
        ],
        activate
      );
    }
  }
}