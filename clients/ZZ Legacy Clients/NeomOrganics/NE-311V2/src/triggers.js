/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

function isReturningUser() {
	return new Promise((resolve, reject) => {
		window.ga((tracker) => {
			let clientId = tracker.get("clientId");

			// For testing purposes
			// if (document.cookie.match(/ne311-force/)) {
			clientId = "1000253931.1613825795";
			// }

			fetch("https://ab-test-sandbox.userconversion.com/neom-guid-checker/app.php?guid=" + clientId)
				.then((response) => response.json())
				.then((result) => {
					if (result && result.length > 0) {
						resolve(true);
					} else {
						resolve(false);
					}
				})
				.catch((e) => reject(e));
		});
	});
}

pollerLite(
	[
		() => {
			return !!window.ga && !!window.ga.loaded;
		},
	],
	() => {
		isReturningUser().then((r) => {
			if (r && !ieChecks) {
				pollerLite(["body", () => isReturningUser()], activate);
			}
		});
	}
);
