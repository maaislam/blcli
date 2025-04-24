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
				const discountedPriceContainer =
					isProductBoxClicked.querySelector(".s-producttext-price");
				const isDiscounted = discountedPriceContainer
					? discountedPriceContainer.classList.contains(
							"s-producttext-withticket"
					  )
					: false;
				if (
					isDiscounted &&
					(target.matches("a") || target.closest("a"))
				) {
					fireEvent(
						"PLP - views discounted product and proceeds to PDP"
					);
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
				if (
					isDiscounted &&
					target.getAttribute("id") == "addHotspotToBag" &&
					isSizeSelected &&
					target.closest("#hsAddToBagWrapper")
				) {
					fireEvent("PLP - views discounted product and adds to bag");
				} else if (
					isDiscounted &&
					target.classList.contains("innerHotSpotLine") &&
					isSizeSelected &&
					e.target.closest("#hsAddToBagWrapper")
				) {
					fireEvent("PLP - views discounted product and adds to bag");
				}
			}
		});
	}

	if (isPDP) {
		pollerLite(["#productDetails", "#aAddToBag"], () => {
			let atbButton = document.getElementById("aAddToBag");
			let allSizeButtons = document.querySelectorAll("#ulSizes li");

			atbButton.addEventListener("click", (e) => {
				let isDiscounted = false;
				const prevPrice = document.querySelector(
					"#productDetails #TicketPriceDiv2"
				);
				if (
					prevPrice &&
					!(prevPrice.getAttribute("style").indexOf("none") > -1)
				) {
					isDiscounted = true;
				}

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
				if (sizeSelected == true && isDiscounted) {
					fireEvent("PDP - views discounted product and adds to bag");
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
	document.body.classList.add(`${ID}`);
	// CONFIG FOR MUTATION OBSERVER
	const config = { attributes: true, childList: true, subtree: true };

	if (isPLP) {
		pollerLite(["#hotspotModal"], () => {
			var modal = document.querySelector("#hotspotModal");
			const observer = new MutationObserver((mutationsList, observer) => {
				observer.disconnect();
				if (modal.querySelector("#hsRefPrice")) {
					modal.classList.add("discounted-item");
				} else {
					modal.classList.remove("discounted-item");
				}
				observer.observe(modal, config);
			});
			observer.observe(modal, config);
		});
	}
	if (isPDP) {
		pollerLite(["#productDetails"], () => {
			const prevPrice = document.querySelector("#TicketPriceDiv2");
			if (
				prevPrice &&
				!(prevPrice.getAttribute("style").indexOf("none") > -1)
			) {
				document
					.querySelector("#productDetails")
					.classList.add(`${ID}-show-exp`);
			}
		});
	}
};
