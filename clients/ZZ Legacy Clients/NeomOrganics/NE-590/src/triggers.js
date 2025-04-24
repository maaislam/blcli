/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import shared from "../../../../core-files/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const { ID } = shared;
if (!ieChecks) {
  // const successPageRegex = /register/;
  // if (successPageRegex.test(window.location.href)) {
  //   pollerLite([`body`], activate);
  // }
  const successPageRegex = /\bcheckouts\b.*\bthank_you\b/;
  if (successPageRegex.test(window.location.href)) {
    pollerLite(
      [
        "body",
        () => {
          let runExp = false;
          if (localStorage.getItem(`${ID}-opt-in`) !== null) {
            runExp = true;
          }
          return runExp;
        },
      ],
      activate
    );
  } else if (window.location.href.indexOf("/checkouts/") > -1) {
    pollerLite(
      [
        "body",
        "input#checkout_email",
        "input#checkout_buyer_accepts_marketing",
        ".checkbox__input",
        '.prefs input[name="checkout[note]"]',
        "button#continue_button",
      ],
      activate
    );
  } else if (/register/.test(window.location.href)) {
    pollerLite([`body`, `input#acceptsMarketingFalse`, `input[name="customer[accepts_marketing]"]`], activate);
  }
}
