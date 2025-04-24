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
	"/collections/home",
	"/collections/wellbeing-pod-luxe",
	"/collections/the-wellbeing-pod",
	"/collections/the-wellbeing-pod-mini",
	"/collections/essential-oil-blends",
	"/collections/candles",
	"/collections/reed-diffusers",
	"/collections/pillow-mist",
	"/collections/mists",
	"/collections/cosy-nights",
];

if (!ieChecks)
	pollerLite(
		[
			"body",
			"#MainContent .columns .column",
			() => !!document.querySelectorAll("#MainContent .columns .column")[2],
			() => !!document.querySelectorAll("#MainContent .columns .column")[6],
			() => validPaths.includes(location.pathname),
		],
		activate
	);
