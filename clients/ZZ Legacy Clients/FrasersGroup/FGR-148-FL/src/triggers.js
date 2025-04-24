/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);
let isBasketDataAvailable = false;
const isBasketDetails = () => {
	let dataObject;
	for (let i = 0; i < window.dataLayer.length; i += 1) {
		const data = window.dataLayer[i];
		if (
			typeof data === "object" &&
			data.event &&
			data.event === "basketView"
		) {
			dataObject = data;
			if (dataObject.basketProducts) {
				isBasketDataAvailable = true;
			}
			break;
		}
	}
	return isBasketDataAvailable;
};

if (!ieChecks) {
	pollerLite(
		[
			"body",
			() => {
				return window.ga || window._gaUAT;
			},
			() => isBasketDetails(),
		],
		activate
	);
}
