/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */

import shared from "./shared";
import { pollerLite } from "../../../../../lib/uc-lib";
import { events } from "../../../../../lib/utils";
import { fireEvent, setup } from "../../../../../core-files/services";
import scrollDepth from "./scrollDepth";

events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);

	// Goal ATB and wishlist
	pollerLite(["#aAddToBag", "#addToWishListContainer"], () => {
		const atbButton = document.querySelector("#aAddToBag");
		const addToWishList = document.querySelector("#addToWishListContainer");

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
			sizeSelected && fireEvent(`user clicked ATB cta button`);
		});
		addToWishList?.addEventListener("click", () => {
			fireEvent(`user clicked the wishlist`);
		});
	});

	// scroll and view the review section goals
	pollerLite([`#BVRRSearchContainer`], () => {
		scrollDepth(fireEvent);
	});

	// When a user views more images
	pollerLite([`#imgProduct`], () => {
		const imgProduct = document.querySelector("#imgProduct");

		const observer = new MutationObserver((mutationList, observer) => {
			fireEvent(`user views more images`);
		});

		observer.observe(imgProduct, {
			attributeFilter: ["src"],
			childList: false,
			subtree: false,
		});
	});

	if (shared.VARIATION == "control") {
		return;
	}

	const mutliplePurchase = () => {
		document.querySelector(`.${ID}--multiple-purchase`)?.remove();

		const addToBagWrapper = document.querySelector(`#sAddToBagWrapper`);
		const existingMutliplePurchase = document.querySelector(
			`#divMultiplePurchases`
		);
		existingMutliplePurchase.querySelector("input#ProductQty").value = 1;
		!addToBagWrapper.classList.contains(`${ID}--addToBagWrapper`) &&
			addToBagWrapper.classList.add(`${ID}--addToBagWrapper`);
		const divMutliplePurchase = `<div class="${ID}--multiple-purchase">
          <label>Choose <br>Quantity</label>
          <p class="${ID}--multiple-purchase-qty">
            <button class="purchase-qtyminus qty-button" aria-hidden="true">&minus;</button>
            <input type="number" name="qty" id="${ID}--qty-input-field" min="1" max="99" maxlength="3" step="1" value="1">
            <button class="purchase-qtyplus qty-button" aria-hidden="true">&plus;</button>
          </p>	
        </div>`;

		if (VARIATION == 1) {
			addToBagWrapper.insertAdjacentHTML(
				"afterbegin",
				divMutliplePurchase
			);
		} else if (VARIATION == 2) {
			addToBagWrapper.parentNode.parentNode.insertAdjacentHTML(
				"afterbegin",
				divMutliplePurchase
			);
			pollerLite([".HOF-135-stock-message-holder"], () => {
				console.log("pollerLite");
				const node = document.querySelector(
					`.${ID}--multiple-purchase`
				);
				console.log("node", node);
				const stockMessageHolder = document.querySelector(
					".HOF-135-stock-message-holder"
				);
				if (node) {
					stockMessageHolder &&
						stockMessageHolder.parentNode.prepend(node);
				} else {
					stockMessageHolder.insertAdjacentHTML(
						"beforebegin",
						divMutliplePurchase
					);
				}
			});
		}
		pollerLite([`.${ID}--multiple-purchase`], () => {
			const multiplePurchaseDiv = document.querySelector(
				`.${ID}--multiple-purchase`
			);

			var input = multiplePurchaseDiv.querySelector(
				`#${ID}--qty-input-field`
			);
			var btnminus =
				multiplePurchaseDiv.querySelector(".purchase-qtyminus");
			var btnplus =
				multiplePurchaseDiv.querySelector(".purchase-qtyplus");

			if (
				input !== undefined &&
				btnminus !== undefined &&
				btnplus !== undefined &&
				input !== null &&
				btnminus !== null &&
				btnplus !== null
			) {
				var min = Number(input.getAttribute("min"));
				var max = Number(input.getAttribute("max"));
				var step = Number(input.getAttribute("step"));
				const changeExistingInputValue = (value) => {
					existingMutliplePurchase.querySelector(
						"input#ProductQty"
					).value = value;
					// console.log(existingMutliplePurchase.querySelector("input#ProductQty").value);
				};
				function qtyminus(e) {
					var current = Number(input.value);
					var newval = current - step;
					if (newval < min) {
						newval = min;
					} else if (newval > max) {
						newval = max;
					}
					input.value = Number(newval);
					changeExistingInputValue(input.value);
					fireEvent(`user clicks on the quantity counter: decrement`);
					e.preventDefault();
				}

				function qtyplus(e) {
					var current = Number(input.value);
					var newval = current + step;
					if (newval > max) newval = max;
					input.value = Number(newval);
					changeExistingInputValue(input.value);
					fireEvent(`user clicks on the quantity counter: increment`);
					e.preventDefault();
				}

				btnminus.addEventListener("click", qtyminus);
				btnplus.addEventListener("click", qtyplus);
				input.onchange = null;
				input.onchange = () => {
					changeExistingInputValue(input.value);
				};
			}
		});
	};

	pollerLite([`#sAddToBagWrapper`, `#divMultiplePurchases`], () => {
		mutliplePurchase();

		pollerLite(["#aAddToBag", "#addToWishListContainer"], () => {
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
							if (
								button.classList.contains(
									"sizeVariantHighlight"
								)
							) {
								sizeSelected = true;
							}
						});
					}
				}
				sizeSelected && mutliplePurchase();
			});
		});
	});
};
