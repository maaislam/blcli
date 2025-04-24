/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	if (sessionStorage.getItem(`${ID}__variation_bucketed`) !== "true") {
		fireEvent("Conditions Met");
		//console.log("Conditions Met")
		sessionStorage.setItem(`${ID}__variation_bucketed`, "true");
	}

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	pollerLite([".category-filters"], () => {
		const filterList = document.querySelectorAll(".filter__container");
		console.log(filterList, "filterList");
		filterList.forEach((filter) => {
			const filterCategory = filter
				.querySelector(".filter_title")
				.textContent.trim();

			if (filterCategory.toLowerCase() === "brand") {
				filter.addEventListener("click", (e) => {
					if (e.target.closest("a")) {
						const filterBrand = e.target
							.closest("a")
							.querySelector("span");
						const filterName =
							filterBrand?.classList[0].split("-")[2];
						fireEvent(
							`User interacts with : ${filterCategory} - ${filterName}`
						);
					}
				});
			} else if (filterCategory.toLowerCase() === "customer review") {
				filter.addEventListener("click", (e) => {
					if (e.target.closest("a")) {
						const classes = e.target
							.closest("a")
							.querySelector("span.rating--stars").classList;
						const rating =
							classes[classes.length - 1].split("_")[1];

						fireEvent(
							`User interacts with : ${filterCategory} - ${rating}`
						);
					}
				});
			} else if (filterCategory.toLowerCase() === "price range") {
				const minPrice = filter.querySelector("select#drpMinPrice");
				const maxPrice = filter.querySelector("select#drpMaxPrice");

				minPrice.addEventListener("change", (e) => {
					const minPriceValue = parseInt(e.target.value);
					const maxPriceValue = parseInt(maxPrice.value);
					if (minPriceValue <= maxPriceValue) {
						fireEvent(
							`User interacts with : ${filterCategory} - ${minPriceValue} to ${maxPriceValue}`
						);
					}
				});
				maxPrice.addEventListener("change", (e) => {
					const minPriceValue = parseInt(minPrice.value);
					const maxPriceValue = parseInt(e.target.value);
					if (minPriceValue <= maxPriceValue) {
						fireEvent(
							`User interacts with : ${filterCategory} - ${minPriceValue} to ${maxPriceValue}`
						);
					}
				});
			} else {
				filter.addEventListener("click", (e) => {
					if (e.target.closest("a")) {
						const filterName = e.target
							.closest("a")
							.textContent.trim();
						fireEvent(
							`User interacts with : ${filterCategory} - ${filterName}`
						);
					}
				});
			}

			// In View Events

			const filterCatKey = filterCategory.toLowerCase().replace(" ", "_");
			pollerLite([() => document.readyState === "complete"], () => {
				const filterClientRect = filter.getBoundingClientRect();
				if (!sessionStorage.getItem(filterCatKey)) {
					if (
						filterClientRect.top < window.innerHeight - 150 &&
						filterClientRect.bottom > 0
					) {
						fireEvent(
							`In View - User sees : ${filterCategory} filter section`
						);
						sessionStorage.setItem(filterCatKey, "true");
					}
				}
				window.addEventListener("scroll", () => {
					const filterClientRect = filter.getBoundingClientRect();
					if (!sessionStorage.getItem(filterCatKey)) {
						if (
							filterClientRect.top < window.innerHeight - 150 &&
							filterClientRect.bottom > 0
						) {
							fireEvent(
								`In View - User sees : ${filterCategory} filter section`
							);
							sessionStorage.setItem(filterCatKey, "true");
						}
					}
				});
			});
		});
	});

	// -----------------------------
	// If control, bail out from here
	// -----------------------------

	if (VARIATION == "control") {
		return;
	}
	const anchorElem = document.querySelectorAll(".category-filters")[1];
	anchorElem.classList.add(`${ID}__filter_priorisition`);
	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
