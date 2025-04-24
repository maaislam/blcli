import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...
	pollerLite(["#pdpMain, button#add-to-cart"], () => {
		document
			.querySelector("#pdpMain button#add-to-cart")
			?.addEventListener("click", () => {
				fireEvent(`Click - Customer clicks ATB CTA`);
			});
	});

	pollerLite(["#pdpMain #check-store-stock"], () => {
		document
			.querySelector("#pdpMain #check-store-stock")
			?.addEventListener("click", () => {
				fireEvent(`Click - Customer clicks the check store CTA`);
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
	});
	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
