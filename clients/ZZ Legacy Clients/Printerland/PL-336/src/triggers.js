/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import shared from "../../../../core-files/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

const { VARIATION } = shared;

if (!ieChecks) {
	if (VARIATION == "control") {
		pollerLite(["body", "nav.bottom__inner"], activate);
	} else {
		pollerLite(["body", "div.header__bottom_main"], activate);
	}
}
