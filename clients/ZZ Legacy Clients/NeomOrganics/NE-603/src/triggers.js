/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

const validPaths = [
	"/collections/gift-collections",
	"/collections/ultimate-gifts",
	"/collections/christmas",
	"/collections/home",
	"/collections/bath-body",
	"/collections/skincare",
	"/collections/scent-to-sleep",
	"/collections/scent-to-de-stress",
	"/collections/scent-to-make-you-happy",
	"/collections/scent-to-boost-your-energy",
	"/collections/the-wellbeing-pod",
	"/collections/candles",
	"/collections/essential-oil-blends",
];

if (!ieChecks) {
	pollerLite(
		[
			"body",
			() => !!document.querySelectorAll("#MainContent .columns .column"),
			() => validPaths.includes(location.pathname),
		],
		activate
	);
}
