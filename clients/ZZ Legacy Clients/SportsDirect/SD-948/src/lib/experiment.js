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
import { events } from "../../../../../lib/utils";
import { fireEvent } from "../../../../../core-files/services";
import { getProductDetails } from "./helper/getProductsDetails";

events.analyticsReference = "_gaUAT";

export default () => {
	setup();
	fireEvent("Conditions Met");
	const { ID, VARIATION } = settings;

	// Goal ATB
	pollerLite(["#aAddToBag"], () => {
		const atbButton = document.querySelector("#aAddToBag");
		atbButton.addEventListener("click", (e) => {
			let sizeSelected = $("#hdnSelectedSizeName").val() !== "";
			if (sizeSelected) {
				fireEvent(`Click - User adds to bag`);
			}
		});
	});
	pollerLite(["#BVRRSearchContainer"], () => {
		var isFired = false;
		document.addEventListener("scroll", (e) => {
			if (!isFired) {
				const targetDom = document
					.querySelector(`#BVRRSearchContainer`)
					.closest("div[data-bv-show='reviews']");
				if (targetDom) {
					var position = targetDom.getBoundingClientRect();
					if (
						position.top < window.innerHeight / 2 &&
						position.bottom > window.innerHeight / 2
					) {
						fireEvent("PDP - Customer opened reviews section");
						isFired = true;
					}
				}
			}
		});
	});
	// Added just for the control
	if (shared.VARIATION == "control") {
		pollerLite(
			[
				"#productDetails",
				"#ProductStandardAddToBag #aAddToBag",
				"#productImageContainer",
			],
			() => {
				let isFired = false;
				if (!isFired) {
					const imageContainer = document.getElementById(
						"productImageContainer"
					);
					const mainAtbButton = document.querySelector(
						"#ProductStandardAddToBag #sAddToBagWrapper a#aAddToBag"
					);
					let topOff;
					//let compareOff;
					if (window.innerWidth > 767) {
						//compareOff = 130;

						topOff = mainAtbButton?.getBoundingClientRect().bottom;
					} else {
						topOff = imageContainer?.getBoundingClientRect().bottom;
					}

					if (topOff < window.innerHeight - 100 && topOff > 150) {
						fireEvent("User would have seen the Social Proof");
						isFired = true;
					}
				}

				window.addEventListener("scroll", function (e) {
					if (!isFired) {
						const imageContainer = document.getElementById(
							"productImageContainer"
						);
						const mainAtbButton = document.querySelector(
							"#ProductStandardAddToBag #sAddToBagWrapper a#aAddToBag"
						);
						let topOff;
						//let compareOff;
						if (window.innerWidth > 767) {
							topOff =
								mainAtbButton?.getBoundingClientRect().bottom;
						} else {
							topOff =
								imageContainer?.getBoundingClientRect().bottom;
						}

						if (topOff < window.innerHeight - 100 && topOff > 150) {
							fireEvent("User would have seen the Social Proof");
							isFired = true;
						}
					}
				});
			}
		);
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
