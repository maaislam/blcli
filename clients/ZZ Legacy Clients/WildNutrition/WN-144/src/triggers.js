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
      "ul .clc-List_Item:nth-child(2)",
      "ul .clc-List_Item:nth-child(3)",
      () => window.location.pathname.includes("/collections/"),
    ],
    activate
  );
}
