/**
 * FLAN-393 one-size basket recommentatinons with ATB
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, logMessage, pollerLite } from "../../../../../lib/utils";
import { displayCarousel } from "./display-carousel.function";
import { getProductData } from "./get-product-data.function";

// Force set analytics reference
events.analyticsReference = "_gaUAT";

const { ID, VARIATION } = shared;

const getPageData = () => {
	let dataObject;
	for (let i = 0; i < window.dataLayer.length; i += 1) {
		const data = window.dataLayer[i];
		if (
			typeof data === "object" &&
			data.event &&
			data.event === "HOF_onLoad"
		) {
			dataObject = data;
			break;
		}
	}
	return dataObject;
};

const addEvents = () => {
	if (VARIATION == "control") {
		pollerLite(
			[
				".basketSwiperSection .swiper-slide",
				".basketSwiperSection .swiper-pagination-bullet",
			],
			() => {
				let allSwiperSlideShopNows = document.querySelectorAll(
					`.basketContainer .swiper-slide a`
				);
				[].slice.call(allSwiperSlideShopNows).forEach((link) => {
					link.addEventListener("click", (e) => {
						fireEvent(
							`Click - user has clicked shop now on the element which goes to ${e.currentTarget.href}`
						);
					});
				});

				let paginationBullets = document.querySelectorAll(
					".swiper-pagination-bullet"
				);
				[].slice.call(paginationBullets).forEach((bullet) => {
					bullet.addEventListener("click", (e) => {
						fireEvent(
							`Click - user has interacted with one of the pagination bullets: ${e.currentTarget.getAttribute(
								"aria-label"
							)}`
						);
					});
				});
			}
		);
	}

	pollerLite([".ContinueOn"], () => {
		let allContinueButtons = document.querySelectorAll(".ContinueOn");
		[].slice.call(allContinueButtons).forEach((button) => {
			button.addEventListener("click", (e) => {
				fireEvent(
					`Click - user has clicked 'Continue Securely' to go to checkout`
				);
			});
		});
	});
};

export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	fireEvent("Conditions Met");

	addEvents();

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") return;

	// Write experiment code here
	// ...
	pollerLite(
		[	'#bagQuantity',
			() => {
				if (typeof getPageData() !== "undefined") {
					return true;
				}
			},
		],
		() => {
			const pageData = getPageData();

			if (
				(document.querySelector("#bagQuantity").innerText !== "" &&
					parseInt(document.querySelector("#bagQuantity").innerText) >
						0) ||
				parseInt(pageData.transactionPurchaseQuantity) > 0
			) {
				displayCarousel();

				getProductData();
			} else {
				fireEvent("Interaction - No items in basket");
			}
		}
	);
};
