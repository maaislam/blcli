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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...
	pollerLite(["#pdpMain, button#add-to-cart"], () => {
		document
			.querySelector("#pdpMain", "button#add-to-cart")
			?.addEventListener("click", () => {
				fireEvent(`Customer added to bag`);
			});
	});

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}

	pollerLite(["#pdpMain"], () => {
		const page_heading = document.querySelector("#page_heading");

		document
			.querySelector("#pdpMain .product-col-2.product-detail")
			?.insertAdjacentElement("afterbegin", page_heading);

		pollerLite(["#pdpMain .HC088-topContent"], () => {
			document
				.querySelector("#pdpMain .HC088-topContent .HC088-right")
				?.insertAdjacentElement("afterbegin", page_heading);
		});

		pollerLite(["#pdpMain .particular-audience"], () => {
			const particular = document.querySelector(
				"#pdpMain .particular-audience"
			);
			const mobilePlace = document.querySelector(
				"#pdpMain .product-col-2 #product-content .product-add-to-cart"
			);
			const deskTopPlace = document.querySelector(
				"#pdpMain .product-col-1 .product-detail"
			);

			window.addEventListener("resize", () => {
				if (
					window.innerWidth > 767 &&
					!particular.closest(".product-col-1")
				) {
					deskTopPlace?.insertAdjacentElement(
						"beforebegin",
						particular
					);
				} else if (
					window.innerWidth <= 767 &&
					!particular.closest(".product-col-2")
				) {
					mobilePlace?.insertAdjacentElement("afterend", particular);
				}
			});
		});
	});

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
