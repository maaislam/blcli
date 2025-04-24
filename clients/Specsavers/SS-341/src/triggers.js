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
      "form.webform-client-form div.form-item",
      ".sib-text-single-column.sib-colour-scheme--plain",
      () =>
        window.location.pathname.includes(
          "/home-eye-tests/request-a-free-home-visit"
        ),
    ],
    activate
  );
}
