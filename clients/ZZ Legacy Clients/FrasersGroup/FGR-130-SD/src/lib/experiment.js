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
	events.analyticsReference = window.ga ? "ga" : "_gaUAT";
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	const fireContentInView = (target, msg) => {
		let isFired = false;
		if (!isFired) {
			let topOff = target?.getBoundingClientRect();
			let compareOff = 130;
			if (
				topOff.top >= compareOff &&
				topOff.bottom <= window.innerHeight
			) {
				fireEvent(msg);
				isFired = true;
			}
		}
		window.addEventListener("scroll", function (e) {
			if (!isFired) {
				let topOff = target?.getBoundingClientRect();
				let compareOff = 130;
				if (
					topOff.top >= compareOff &&
					topOff.bottom <= window.innerHeight
				) {
					fireEvent(msg);
					isFired = true;
				}
			}
		});
	};

	if (location.pathname.includes("/checkoutsp")) {
		var activeStep = 0;

		const checkCheckoutStepAndFireEvent = () => {
			if (
				document.querySelector(
					".sectionWrap .welcomeSection.activeSection"
				) &&
				activeStep != 1
			) {
				activeStep = 1;
			} else if (
				document.querySelector(
					".sectionWrap .deliverySection.activeSection"
				) &&
				activeStep != 2
			) {
				activeStep = 2;
			} else if (
				document.querySelector(
					".sectionWrap .paymentSection.activeSection"
				) &&
				activeStep != 3
			) {
				activeStep = 3;
				fireEvent("User reached to Payment Step of checkout");
			} else if (
				document.querySelector(
					".sectionWrap .confirmationSection.activeSection"
				) &&
				activeStep != 4
			) {
				activeStep = 4;
				fireEvent(
					"User reached to Order Confirmation Step of checkout"
				);
			}
		};

		pollerLite([".sectionWrap .activeSection"], () => {
			checkCheckoutStepAndFireEvent();
			const target = document.querySelector(".leftMain .sectionWrap");

			const Observer = new MutationObserver((mutationList, observer) => {
				checkCheckoutStepAndFireEvent();
			});
			Observer.observe(target, {
				childList: true,
				subtree: true,
				attributes: true,
			});
		});
	}
	if (location.pathname.includes("/cart")) {
		pollerLite(["#buttonWrapperMobile", "#buttonWrapper"], () => {
			const TopCheckoutButton = document.querySelector(
				`#buttonWrapperMobile a[data-action="checkout"]`
			);

			TopCheckoutButton?.addEventListener("click", () => {
				fireEvent(`Click - User clicked first checkout CTA`);
			});

			const BottomCheckoutButton = document.querySelector(
				'#buttonWrapper a[data-action="checkout"]'
			);

			BottomCheckoutButton?.addEventListener("click", () => {
				fireEvent(`Click - User clicked second checkout CTA`);
			});

			fireContentInView(
				TopCheckoutButton,
				"User Sees the first Checkout CTA"
			);
			fireContentInView(
				BottomCheckoutButton,
				"User Sees the second Checkout CTA"
			);
		});

		pollerLite(["#BasketDiv"], () => {
			const basketDiv = document.querySelector("#BasketDiv");
			basketDiv?.addEventListener("click", (e) => {
				const target = e.target.closest(".s-basket-remove-button a");
				if (target) {
					fireEvent(`User removes item from cart`);
				}
			});

			const updateButton = document.querySelector(
				"#CartPanel .UpdateandAddMore .NewUpdateQuant"
			);
			updateButton?.addEventListener("click", () => {
				const tableRows = document.querySelectorAll(
					"#CartPanel #gvBasketDetails table tbody tr"
				);
				if (tableRows.length > 0) {
					for (let index = 0; index < tableRows.length; index++) {
						const element = tableRows[index];
						let quantity = element.querySelector(
							`input[type="number"].qtybox`
						).value;

						if (parseInt(quantity) === 0) {
							fireEvent(`User removes item from cart`);
							break;
						}
					}
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
	if (location.pathname.includes("/cart")) {
		pollerLite(["#buttonWrapperMobile", "#buttonWrapper"], () => {
			const TopCheckoutButton = document.querySelector(
				`#buttonWrapperMobile a[data-action="checkout"]`
			);
			TopCheckoutButton.querySelector("span").innerText =
				"Continue to Checkout";

			const BottomCheckoutButton = document.querySelector(
				'#buttonWrapper a[data-action="checkout"]'
			);
			BottomCheckoutButton.querySelector("span").innerText =
				"Continue to Checkout";
		});
	}
};
