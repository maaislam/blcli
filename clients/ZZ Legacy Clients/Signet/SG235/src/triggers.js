import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import shared from "../../../../core-files/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

if (!ieChecks) {
  if (!document.documentElement.classList.contains(`${shared.ID}`)) {
    if (window.location.href.indexOf("webstore/l/") > -1) {
      pollerLite(["body", ".product-card", ".products.products-display--grid", "[data-insights-object-id]"], activate);
    } else {
      pollerLite(
        [
          "body",
          ".product-gallery__main",
          () => {
            if (
              window.location.href.match(/webstore\/d\/.*(8386971|8387235|8386856|8386690|8387359|8387110|8388514|8388662|8388787|8386401|8386526|8390239|8390114|8389025|8389835|8389991|8388902|8390502|8390361|8390742|8390627).*/)
            ) {
              return true;
            }
          },
        ],
        activate
      );
    }
  }
}
