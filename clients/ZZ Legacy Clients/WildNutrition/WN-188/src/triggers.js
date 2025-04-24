/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

fetch(`https://www.wildnutrition.com${location.pathname}-30-off`)
	.then((res) => res.text())
	.then((html) => {
		const dom = new DOMParser().parseFromString(html, "text/html");
		const form = dom.querySelector(".prd-ProductOffers_Form");

		return form;
	})
	.then((form) => {
		if (!ieChecks) {
			pollerLite(["body", ".prd-ProductOffers_Form", ".rc_radio.rc_radio__autodeliver"], () =>
				activate(form)
			);
		}
	})
	// eslint-disable-next-line no-console
	.catch((err) => console.error(err));
