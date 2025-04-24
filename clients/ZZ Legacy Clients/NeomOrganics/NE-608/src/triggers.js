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
	"/collections/christmas",
	"/collections/stocking-fillers",
	"/collections/gift-collections",
	"/collections/ultimate-gifts",
];

if (!ieChecks) {
	pollerLite(
		[
			"body",
			() => !!document.querySelectorAll("#MainContent .columns .column")[3],
			() => !!document.querySelectorAll("#MainContent .columns .column")[4],
			() => !!document.querySelectorAll("#MainContent .columns .column")[6],
			() => !!document.querySelectorAll("#MainContent .columns .column")[7],
			() => !!document.querySelectorAll("#MainContent .columns .column")[8],
			() => validPaths.includes(window.location.pathname),
		],
		activate
	);
}
