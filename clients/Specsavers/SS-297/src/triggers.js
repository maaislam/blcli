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
	pollerLite(
		[
			"body",
			".ss-plp-frames__container--frame",
			".ss__merchandising-tile",
			() => !document.querySelector("html").classList.contains(`${ID}`),
		],
		activate
	);
}
