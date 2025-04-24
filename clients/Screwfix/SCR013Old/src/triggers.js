/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import { bootsInfoFinder } from "./lib/helpers/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

// const {ID} = shared;
// window[`${ID}-$$bootLists`] = boots;

const urls = bootsInfoFinder(`URL`, false);
if (!ieChecks && urls && urls.length > 0 && urls.findIndex((url) => window.location.href.includes(url)) > -1) {
  pollerLite(["body", `.pr__product .row.pr__prices .pr__qty`], activate);
}
