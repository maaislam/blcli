/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import shared from "../../../../core-files/shared";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

if (!ieChecks) {
	const { ID, VARIATION } = shared;

	if (!document.documentElement.classList.contains(`${ID}`)) {
		pollerLite(["body", () => window.dataLayer], () => {
			const dataLayerInterval = setInterval(() => {
				const pageLoadData = Object.values(dataLayer).filter((item) => {
					return item.event == "pageLoad";
				});
				if (pageLoadData.length > 0) {
					if (
						pageLoadData[0]?.order_type.toLowerCase() !==
						"subscription"
					) {
						activate();
					}
					clearInterval(dataLayerInterval);
				}
			}, 100);
		});
	}
}
