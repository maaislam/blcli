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

const { ID, VARIATION } = shared;
export default () => {
	// Force set analytics reference
	events.analyticsReference = window.ga ? "ga" : "_gaUAT";
	setup();

	fireEvent("Conditions Met");
	// console.log("Conditions Met");
	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...
	const populateCarousel = () => {
		let quantity = document
			.querySelector("#bagQuantity")
			.textContent.trim();

		if (parseInt(quantity) > 0) {
			DYO.recommendationWidgetData(146922, {}, function (error, data) {
				let slides = "";
				if (data.slots.length > 0) {
					data.slots.forEach((element) => {
						slides += `<div class="swiper-slide">
							  <div class="product-card">
								  <img src="${element.item.image_url}" class="recom-image" alt="${
							element.item.name
						}"/>
								  <a href="${element.item.url}" class="recom-links" data-id="${
							element.item.group_id.split("-")[0]
						}">View Product</a>
							  </div>
						  </div>`;
					});
				}

				let html = `<div class="${ID}-product-upsell-container">
						  <div class="product-upsell-title">THINGS YOU MAY ALSO LIKE</div>
						  <div class="swiper swiper-container">
							<div class="swiper-wrapper">
							  ${slides != null ? slides : ""}
							</div>
							
							<!-- If we need navigation buttons -->
							<div class="swiper-button-prev">
							</div>
							<div class="swiper-button-next">
							</div>
	
						  </div>
						</div>
						`;
				document
					.querySelector("#divBag #divButtons")
					.insertAdjacentHTML("afterend", html);

				var swiper = new Swiper(
					`.${ID}-product-upsell-container .swiper-container`,
					{
						slidesPerView: 2.35,
						spaceBetween: 15,
						navigation: {
							nextEl: ".swiper-button-next",
							prevEl: ".swiper-button-prev",
						},
					}
				);

				$("a.recom-links").on("click", function (e) {
					const itemId = $(this).attr("data-id");
					sessionStorage.setItem(`${ID}-recom-item-id`, itemId);
					fireEvent(
						`User clicks on view product CTA on upsell carousel`
					);
				});
			});
		}
	};
	const handleRemoveClick = function (e) {
		var itemId = $(this).attr("ProductVariantItem");
		fireEvent(`User removes from mini cart, variant ID: ${itemId}`);
	};
	pollerLite(["#bagQuantity"], () => {
		const bagQuantity = document.querySelector("#bagQuantity");
		let currentQuantity = bagQuantity.textContent.trim();
		currentQuantity = parseInt(currentQuantity, 10);
		// define a mutation observer
		const observer = new MutationObserver((mutationList, observer) => {
			let newQuantity = bagQuantity.textContent.trim();
			newQuantity = parseInt(newQuantity, 10);

			if (
				newQuantity > 0 &&
				!document.querySelector(`.${ID}-product-upsell-container`)
			) {
				if (VARIATION == 1) {
					populateCarousel();
					//fireEvent(`User sees the carousel in the mini-cart`);
				}
			}

			if (newQuantity > currentQuantity) {
				fireEvent(`User adds to basket, ${newQuantity} items total`);
			}
			currentQuantity = newQuantity;
			pollerLite(["#divBagItems .removeClass"], () => {
				$(".removeClass").on("click", handleRemoveClick);
			});
		});

		observer.observe(bagQuantity, { childList: true });
	});

	pollerLite(["#divBagItems", () => (window.jQuery ? true : false)], () => {
		$(".removeClass").on("click", handleRemoveClick);
	});

	pollerLite(["#BasketDiv"], () => {
		let items = document.querySelectorAll(
			"#gvBasketDetails table tbody tr"
		);
		if (items.length > 0) {
			items.forEach((row) => {
				const itemId = row.querySelector("td.size select").value;
				const removeBtn = row.querySelector(
					"td.productdesc .s-basket-remove-button a"
				);
				if (removeBtn) {
					removeBtn.setAttribute("ProductVariantItem", itemId);
				}
			});
		}

		document.querySelector("#BasketDiv").addEventListener("click", (e) => {
			const target = e.target.closest(".s-basket-remove-button a");
			if (target) {
				const itemId = target.getAttribute("ProductVariantItem");
				fireEvent(`User removes from cart, variant ID: ${itemId}`);
				// console.log(`User removes from cart, variant ID: ${itemId}`);
			}
		});
	});
	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		pollerLite(["#divBag", "#divBagItems", "#bagQuantity"], () => {
			const itemContainer = document.querySelector("#divBagItems");
			const observer = new MutationObserver((mutationList, observer) => {
				mutationList.forEach((mutation) => {
					if (mutation.attributeName === "class") {
						if (itemContainer.classList.contains("open")) {
							fireEvent(
								`User would have seen the carousel in the mini-cart`
							);
						}
					}
				});
			});
			observer.observe(itemContainer, {
				attributes: true,
			});
		});
		return;
	}

	// Write experiment code here
	// ...
	// transfers sessionStorage from one tab to another
	var sessionStorage_transfer = function (event) {
		if (!event) {
			event = window.event;
		} // ie suq
		if (!event.newValue) return; // do nothing if no value to work with
		if (event.key == "getSessionStorage") {
			// another tab asked for the sessionStorage -> send it
			localStorage.setItem(
				"shareSessionStorage",
				sessionStorage.getItem(`${ID}-recom-item-id`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
				sessionStorage.setItem(`${ID}-recom-item-id`, data);
			} else {
				sessionStorage.removeItem(`${ID}-recom-item-id`);
			}
		} else if (event.key == "removeSessionStorage") {
			sessionStorage.removeItem(`${ID}-recom-item-id`);
		}
	}; // listen for changes to localStorage
	if (window.addEventListener) {
		window.addEventListener("storage", sessionStorage_transfer, false);
	} else {
		window.attachEvent("onstorage", sessionStorage_transfer);
	} // Ask other tabs for session storage (this is ONLY to trigger event)
	if (!sessionStorage.getItem(`${ID}-recom-item-id`)) {
		localStorage.setItem("getSessionStorage", `dummy`);
		localStorage.removeItem("getSessionStorage", `dummy`);
	}

	pollerLite(
		["#divBag", "#divBagItems", "#bagQuantity", () => window.DYO],
		() => {
			populateCarousel();
			const itemContainer = document.querySelector("#divBagItems");
			const observer = new MutationObserver((mutationList, observer) => {
				mutationList.forEach((mutation) => {
					if (mutation.attributeName === "class") {
						if (itemContainer.classList.contains("open")) {
							fireEvent(
								`User sees the carousel in the mini-cart`
							);
						}
					}
				});
			});
			observer.observe(itemContainer, {
				attributes: true,
			});
		}
	);
	pollerLite(
		["#ProductStandardAddToBag #aAddToBag", () => window.dataLayerData],
		() => {
			const atbButton = document.querySelector(
				"#ProductStandardAddToBag #aAddToBag"
			);
			atbButton.addEventListener("click", (e) => {
				let sizeSelected = $("#hdnSelectedSizeName").val() !== "";
				let storedItem = sessionStorage.getItem(`${ID}-recom-item-id`);

				if (sizeSelected && storedItem) {
					if (storedItem === window.dataLayerData.productId) {
						fireEvent(
							`User adds a recommended product to the bag from their PDP`
						);

						sessionStorage.removeItem(`${ID}-recom-item-id`);
						localStorage.setItem("removeSessionStorage", "dummy");
						localStorage.removeItem(
							"removeSessionStorage",
							"dummy"
						);
					}
				}
			});
		}
	);
};
