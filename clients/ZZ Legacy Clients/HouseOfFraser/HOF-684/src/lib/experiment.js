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
import stickyOrderSummery from "./components/stickyOrderSummery";
// import logoMarks from "./components/logo";
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

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		const TopCheckoutButton = document.querySelector(
			`#buttonWrapperMobile a[data-action="checkout"]`
		);
		TopCheckoutButton?.addEventListener("click", () => {
			fireEvent(`Click - User clicked top checkout Button`);
			fireEvent(`User clicked to enter checkout`);
		});
		const BottomCheckoutButton = document.querySelector(
			'#buttonWrapper a[data-action="checkout"]'
		);
		BottomCheckoutButton?.addEventListener("click", () => {
			fireEvent(`Click - User clicked bottom checkout Button`);
			fireEvent(`User clicked to enter checkout`);
		});
		return;
	}

	// Write experiment code here
	// ...
	// sticky summary DOM render
	stickyOrderSummery();

	// // Render the new logoMarks
	// document.querySelector("#BasketDiv")?.insertAdjacentHTML(
	// 	"beforeend",
	// 	`<img
	// 		src="https://blcro.fra1.digitaloceanspaces.com/HOF-688/security-assurance.png"
	// 		alt="Security Image"
	// 	/>`
	// );

	pollerLite([`.${ID}-sticky-order-sum-wrapper`], () => {
		const config = { attributes: true, childList: false, subtree: false };

		// Render the new logoMarks
		//document.querySelector("#BasketDiv")?.insertAdjacentHTML("beforeend", logoMarks);

		// Maximizing and minimizing the stickyOrderSummeryWrapper
		const stickyOrderSummeryWrapper = document.querySelector(
			`.${ID}-sticky-order-sum-wrapper`
		);
		const toggleDom = stickyOrderSummeryWrapper.querySelector(
			`.sticky-order-sum-header`
		);
		toggleDom?.addEventListener("click", (e) => {
			fireEvent(`Click - User clicked order summary`);
			if (stickyOrderSummeryWrapper.classList.contains("maximized")) {
				stickyOrderSummeryWrapper.classList.remove("maximized");
			} else {
				stickyOrderSummeryWrapper.classList.add("maximized");
			}
		});

		// Checkout functionality
		const checkoutButton = stickyOrderSummeryWrapper.querySelector(
			`.sticky-order-sum-button`
		);
		const mainCheckoutButton = document.querySelector(
			'#buttonWrapper a[data-action="checkout"]'
		);
		checkoutButton?.addEventListener("click", (e) => {
			mainCheckoutButton?.click();
			fireEvent(`User clicked to enter checkout`);
		});

		// Padding calculation and updating
		const footerWrapper = document.querySelector(`.FooterWrap`);
		footerWrapper?.setAttribute(
			"style",
			`padding-bottom:${stickyOrderSummeryWrapper.offsetHeight}px;`
		);

		const stickyOrderSummeryObserver = new MutationObserver(
			(mutationList, observer) => {
				setTimeout(() => {
					const summeryWrapper = document.querySelector(
						`.${ID}-sticky-order-sum-wrapper`
					);
					footerWrapper?.setAttribute(
						"style",
						`padding-bottom:${summeryWrapper.offsetHeight}px;`
					);
				}, 500);
			}
		);
		stickyOrderSummeryObserver.observe(stickyOrderSummeryWrapper, config);
	});
};
