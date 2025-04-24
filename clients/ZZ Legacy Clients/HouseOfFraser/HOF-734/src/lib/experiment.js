/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup, getPageData } from "./services";
import shared from "./shared";
import settings from "./shared";
import { pollerLite } from "../../../../../lib/uc-lib";
import { events, observer, logMessage, poller } from "../../../../../lib/utils";
import { fireEvent } from "../../../../../core-files/services";
import { getProductDetails } from "./helper/getProductsDetails";
events.analyticsReference = "_gaUAT";
export default () => {
	setup();
	fireEvent("Conditions Met");
	const { ID, VARIATION } = settings;
	logMessage("HOF-734");
	// Goal ATB
	pollerLite(["#aAddToBag"], () => {
		const atbButton = document.querySelector("#aAddToBag");
		atbButton?.addEventListener("click", () => {
			let allSizeButtons = document.querySelectorAll("#ulSizes li");
			let sizeSelected = false;
			const divPersaddToBasketContainer = document.querySelector(
				"#divPersaddToBasketContainer a.ContinueWithPers:not(.hidden)"
			);
			if (divPersaddToBasketContainer) {
				sizeSelected = true;
			} else {
				if (allSizeButtons.length == 0) {
					sizeSelected = true;
				} else {
					[].slice.call(allSizeButtons).forEach((button) => {
						if (button.classList.contains("sizeVariantHighlight")) {
							sizeSelected = true;
						}
					});
				}
			}
			sizeSelected && fireEvent(`ATB - User adds to bag`);
		});
	});

	// Added just for the control
	if (shared.VARIATION == "control") {
		setTimeout(() => {
			fireEvent(`Visible (would be)`);
		}, 2500);
		return;
	}

	// start experiment
	// run poller to wait on DataLayer & DY
	pollerLite(
		[
			`.addToBasketContainer`,
			() => {
				return window?.DY?.ServerUtil?.getProductsData;
			},
			() => {
				return window.productDetailsShared;
			},
			() => {
				if (typeof getPageData() !== "undefined") {
					return true;
				}
			},
		],
		() => {
			// initial run for when user lands on the page
			// check for dropship product
			getProductDetails();
			// event handlers to determine if the colour has been changed
			const colourButtons = document.querySelectorAll(
				"#ulColourImages > li"
			);
			[].slice.call(colourButtons).forEach((colourButton) => {
				colourButton.addEventListener(
					"click",
					(e) => {
						getProductDetails();
					},
					false
				);
			});
		}
	);
};
