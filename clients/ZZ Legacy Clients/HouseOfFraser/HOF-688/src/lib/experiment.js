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
	pollerLite([".newBasketSummary #buttonWrapper"], () => {
		const TopCheckoutButton = document.querySelector(
			`#buttonWrapperMobile a[data-action="checkout"]`
		);
		TopCheckoutButton?.addEventListener("click", () => {
			fireEvent(`Click - User clicked Continue Securely CTA`);
		});
		const BottomCheckoutButton = document.querySelector(
			'#buttonWrapper a[data-action="checkout"]'
		);
		BottomCheckoutButton?.addEventListener("click", () => {
			fireEvent(`Click - User clicked Continue Securely CTA`);
		});
	});

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		pollerLite([".newBasketSummary #buttonWrapper"], () => {
			fireEvent(`Visible - Security Info Visible (would be)`);
		});
		return;
	}
	pollerLite([".newBasketSummary #buttonWrapper"], () => {
		document
			.querySelector(".newBasketSummary #buttonWrapper")
			?.insertAdjacentHTML(
				"afterend",
				`<div class="${ID}-wrapper"><img
				src="/images/marketing/dy-assets/hof-payment-icons-2022-2.svg"
				alt="logos of mastercard, visa, maestro, american express, paypal and apple pay"
			/></div>`
			);
		fireEvent(`Visible - Security Info Visible`);
	});
	// Write experiment code here
	// ...
};
