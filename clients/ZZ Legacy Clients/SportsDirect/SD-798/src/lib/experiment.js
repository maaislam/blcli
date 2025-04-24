/* eslint-disable no-undef */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	var isPLP = pageMeta_PageType === "Browse" ? true : false;
	var isPDP = pageMeta_PageType === "ProductDetail" ? true : false;

	if (isPLP) {
		document.body.addEventListener("click", (e) => {
			const target = e.target;
			const isProductBoxClicked = target.closest("div.s-productthumbbox");
			if (isProductBoxClicked) {
				const isDiscounted = isProductBoxClicked.querySelector(
					".s-productsize"
				)
					? true
					: false;
				if (
					isDiscounted &&
					(target.matches("a") || target.closest("a"))
				) {
					if (VARIATION == 1) {
						fireEvent(
							"PLP - views size hidden product and proceeds to PDP"
						);
					} else {
						fireEvent(
							"PLP - views product with size and proceeds to PDP"
						);
					}
				}
			} else if (target.closest("#hotspotModal")) {
				var isDiscounted = target
					.closest("#hotspotModal")
					.querySelector("#hsRefPrice");
				var isSizeSelected = false;
				var items = document.querySelectorAll("#hotspotModal select");
				if (items.length < 1) {
					isSizeSelected = true;
				} else {
					for (let index = 0; index < items.length; index++) {
						if (items[index].value != "") {
							isSizeSelected = true;
						} else {
							isSizeSelected = false;
							break;
						}
					}
				}
			}
		});
	}

	if (isPDP) {
		pollerLite(["#productDetails", "#aAddToBag"], () => {
			let atbButton = document.getElementById("aAddToBag");
			let allSizeButtons = document.querySelectorAll("#ulSizes li");

			atbButton.addEventListener("click", (e) => {
				let sizeSelected = false;
				if (allSizeButtons.length == 0) {
					sizeSelected = true;
				} else {
					[].slice.call(allSizeButtons).forEach((button) => {
						if (button.classList.contains("sizeVariantHighlight")) {
							sizeSelected = true;
						}
					});
				}
				if (sizeSelected == true) {
					if (VARIATION == 1) {
						fireEvent(
							"PDP - after viewing size hidden product in PLP visited to PDP and adds to bag"
						);
					} else {
						fireEvent(
							"PDP - after viewing product with size in PLP visited to PDP and adds to bag"
						);
					}
				}
			});
		});
	}
	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...
};
