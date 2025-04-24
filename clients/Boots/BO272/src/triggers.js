/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */

import activate from "./lib/experiment";
import { getCookie, pollerLite } from "../../../../lib/utils";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

const isPDP = !!window.location.href.match(/(\d+)[^-]*$/g);
const PDPRE = /.*(-)([\d]{7,8}(p)|[\d]{7,8}).*/;

const PDPcode = window.location.pathname.match(PDPRE)[2];

if (isPDP && PDPcode) {
	fetch(
		`https://boots-optimisation.co.uk/high-attachment-bundles/${PDPcode}/`
	)
		.then((r) => r.json())
		.then((d) => {
			if (!ieChecks && isPDP) {
				if (!getCookie("Synthetic_Testing")) {
					pollerLite(
						[
							"body",
							"#estore_productpage_template_container > .rowContainer > .row",
							"#PDP_productPrice",
							"#estore_product_title",
							"#cvosVariantId_1",
							"#cvosSkuID_1",
						],
						() => {
							activate(d);
						}
					);
				}
			}
		})
		.catch(() => {
			return;
		});
}

// fetch("https://boots-optimisation.co.uk/high-attachment-bundles/10288617/")
// 	.then((r) => r.json())
// 	.then((d) => console.log(d));
