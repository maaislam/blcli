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
		pollerLite(
			[
				"body",
				() => window.dataLayer,
				() => document.readyState === "complete",
				() => {
					const pageLoadData = Object.values(dataLayer).filter(
						(item) => {
							return item.event == "pageLoad";
						}
					);
					if (pageLoadData) {
						return pageLoadData[0].login_status === "logged_out";
					} else {
						return false;
					}
				},
			],
			() => {
				activate();
			}
		);
	}
}
