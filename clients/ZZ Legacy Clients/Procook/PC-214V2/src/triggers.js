/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";
import shared from "../../../../core-files/shared";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

if (!ieChecks && !document.documentElement.classList.contains(shared.ID)) {
	pollerLite(
		[
			"body",
			() => {
				// prettier-ignore
				if (
					location.pathname.includes("/shop/tableware-dining/dinner-sets") ||
					location.pathname.includes("/shop/tableware-dining/all-cutlery") ||
					location.pathname.includes("/shop/tableware-dining/mugs") ||
					location.pathname.includes("/shop/tableware-dining/procook-stockholm-stoneware") ||
					location.pathname.includes("/shop/tableware-dining/stoneware") ||
					location.pathname.includes("/shop/tableware-dining/plates") ||
					location.pathname.includes("/shop/knives-scissors/knife-sets-knife-blocks") ||
					location.pathname.includes("/shop/knives-scissors/chefs-knives") ||
					location.pathname.includes("/shop/knives-scissors/knife-sets-with-blocks") ||
					location.pathname.includes("/shop/knives-scissors/damascus-67") ||
					location.pathname.includes("/shop/knives-scissors/professional-x50-micarta") ||
					location.pathname.includes("/shop/cookware/induction") ||
					location.pathname.includes("/shop/cookware/frying-pans") ||
					location.pathname.includes("/shop/cookware/saucepans") ||
					location.pathname.includes("/shop/cookware/stainless-steel") ||
					location.pathname.includes("/shop/cookware/sets")
				) {
					return true;
				}
			},
			"#filterProducts dl.vsa-list div.vsa-item",
		],
		activate
	);
}
