/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { data } from "./lib/data";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const validPaths = Object.keys(data);
const currentPath = window.location.pathname;
// console.log(validPaths);

if (!ieChecks) {
  pollerLite(["body", ".prod_list_outer", () => validPaths.includes(currentPath)], () => activate(data[currentPath]));
}
