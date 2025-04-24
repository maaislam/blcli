/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import shared from "../../../../core-files/shared";
import { pollerLite } from "../../../../lib/uc-lib";
import vipme from "./lib/vipme";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const url = window.location.href;
const registration = /hotelchocolat\.com\/(uk\/)?my-account\/.*/;
if (!ieChecks) {
  const { ID, VARIATION } = shared;

  if (!document.documentElement.classList.contains(`${ID}`)) {
    pollerLite(
      [
        "body",
        () => {
          const vipMember = Object.values(window.dataLayer).filter((item) => {
            return item.customer_type === "VIP.ME member";
          });
          if (vipMember.length == 0) {
            return true;
          }
        },
      ],
      () => {
        if (registration.test(url) || (/VipMeSignUp-Show/.test(url) && localStorage.getItem(`${ID}-FromVelvetiser`) != null)) vipme();
        else {
          activate();
        }
      }
    );
  }
}
