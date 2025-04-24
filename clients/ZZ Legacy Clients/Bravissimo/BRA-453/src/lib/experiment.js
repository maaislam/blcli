/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import selfSegment from "./selfSegment";
import { showBanner } from "./selfSegment";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
	//var count = localStorage.getItem("modalPopupCount");

	if (
		getCookie("modalSubmitted") == null &&
		getCookie(`${ID}-is-dismissed`) !== "true"
	) {
		setTimeout(() => {
			selfSegment(ID, fireEvent);
		}, 3000);
	}

	function getCookie(cname) {
		let name = cname + "=";
		let ca = document.cookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == " ") {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return null;
	}
	if (window.location.href.includes("/?modalReroute")) {
		pollerLite(
			[
				"main.c-page #listing-container section.c-results section.c-container div.c-container__body",
			],
			() => {
				const banner = document.querySelector(".BRA-453-banner-parent");
				if (!banner) {
					showBanner(ID);
				}

				const insertionPointDOM = document.querySelector(
					"main.c-page #listing-container section.c-results section.c-container div.c-container__body"
				);
				const insertionPointDOMObserver = new MutationObserver(
					(mutationsList, observer) => {
						const banner = document.querySelector(
							".BRA-453-banner-parent"
						);
						if (!banner) {
							showBanner(ID);
						}
					}
				);
				insertionPointDOMObserver.observe(insertionPointDOM, {
					childList: true,
					attributes: true,
					subtree: true,
				});
			}
		);
	}
};
