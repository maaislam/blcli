/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const successRegex = /\/beauty/;
const url = window.location.href;
if (!ieChecks) {
  if (successRegex.test(url)) {
    pollerLite(["body"], activate);
  }
}
