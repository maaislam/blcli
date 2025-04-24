/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import Swiper from "swiper/swiper-bundle";
export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	if (window.usabilla_live) {
		window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
	}

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		pollerLite([`#richRelevanceContainer`], () => {
			const items = document.querySelectorAll(
				"#richRelevanceContainer .rrPlacements .rrContainer .rrItemsContainer .rrItemContainer"
			);
			items.forEach((item) => {
				item.addEventListener("click", (e) => {
					const target = e.target;
					if (target.closest("a")) {
						const title = item
							.querySelector(".rrItemTitle")
							.innerText.trim();
						fireEvent(
							`Click - User clicked a product on the lower recommendations: ${title}`
						);
					}
				});
			});
		});
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	pollerLite([`#estore_pdp_image`, `#richRelevanceContainer`], () => {
		const referenceElement = document
			.querySelector("#estore_pdp_image")
			.closest(".row");

		const dom = `
					<div class="row ${ID}-recommendations">
						<div class="col-12 slider-container">
							<h3>Based on your browsing</h3>
							<div class="swiper-container rrContainer">
								<div class="swiper-wrapper rrItemsContainer">
									
								</div>
								<div class="swiper-button-prev"></div>
								<div class="swiper-button-next"></div>
							</div> 
						</div>
					</div>
					`;

		referenceElement.insertAdjacentHTML("afterend", dom);

		const items = document.querySelectorAll(
			"#richRelevanceContainer .rrPlacements .rrContainer .rrItemsContainer .rrItemContainer"
		);

		for (let index = 0; index < items.length; index++) {
			const item = items[index];

			item.addEventListener("click", (e) => {
				const target = e.target;
				if (target.closest("a")) {
					const title = newItem
						.querySelector(".rrItemTitle")
						.innerText.trim();
					fireEvent(
						`Click - User clicked a product on the lower recommendations: ${title}`
					);
				}
			});

			const newItem = item.cloneNode(true);

			newItem.addEventListener("click", (e) => {
				const target = e.target;
				if (target.closest("a")) {
					const title = newItem
						.querySelector(".rrItemTitle")
						.innerText.trim();
					fireEvent(
						`Click - User clicked a product on the upper recommendation carousel: ${title}`
					);
				}
			});

			newItem.classList.add("swiper-slide");
			document
				.querySelector(`.${ID}-recommendations .swiper-wrapper`)
				.insertAdjacentElement("beforeend", newItem);
		}

		const swiper = new Swiper(`.${ID}-recommendations .swiper-container`, {
			slidesPerView: 4,
			loop: false,
			//slidesPerGroup: 1,
			spaceBetween: 10,
			//centerInsufficientSlides: true,

			navigation: {
				nextEl: `.${ID}-recommendations .swiper-container .swiper-button-next`,
				prevEl: `.${ID}-recommendations .swiper-container .swiper-button-prev`,
			},
			breakpoints: {
				320: {
					slidesPerView: "1",
					//slidesPerGroup: 1,
					spaceBetween: 10,
				},
				540: {
					slidesPerView: "1",
					//slidesPerGroup: 2,
					spaceBetween: 10,
				},
				600: {
					slidesPerView: "2",
					//slidesPerGroup: 3,
					spaceBetween: 10,
				},
				992: {
					slidesPerView: "3",
					//slidesPerGroup: 4,
					spaceBetween: 10,
				},
				1200: {
					slidesPerView: "4",
					//slidesPerGroup: 4,
					spaceBetween: 10,
				},
			},
		});

		window.addEventListener("resize", () => {
			swiper.update();
		});
	});
};
