/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

const MOBILE_BREAKPOINT = 768;

if (!ieChecks) {
	pollerLite(
		[
			"body",
			() => location.pathname === "/",
			() => innerWidth <= MOBILE_BREAKPOINT,
			() => !!document.querySelectorAll("main .shopify-section")[2],
		],
		activate
	);
}
