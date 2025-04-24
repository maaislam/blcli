/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { addPoller, addEventListener, addObserver } from "./winstack";
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	pollerLite(
		[
			".main .agileCarousel.recentDeliveries",
			".main .px-0.py-13.background--paper",
			".main .pl-8.pr-8.pt-16.pb-20.background--paper.divider--container.text-center",
		],
		() => {
			let registerCTAs = document.querySelectorAll('a[href="/register"]');
			[].slice.call(registerCTAs).forEach((cta) => {
				cta.addEventListener("click", (e) => {
					fireEvent("Click - user has clicked the onward CTA");
				});
			});
		}
	);

	pollerLite(
		[
			".main .agileCarousel.recentDeliveries .agile__nav-button--prev",
			".main .agileCarousel.recentDeliveries .agile__nav-button--next",
		],
		() => {
			let agileButtonLeft = document.querySelector(
				".main .agileCarousel.recentDeliveries .agile__nav-button--prev"
			);
			let agileButtonRight = document.querySelector(
				".main .agileCarousel.recentDeliveries .agile__nav-button--next"
			);

			agileButtonLeft?.addEventListener("click", () => {
				fireEvent("Click - carousel was clicked to the left");
			});

			agileButtonRight?.addEventListener("click", () => {
				fireEvent("Click - carousel was clicked to the right");
			});
		}
	);
	pollerLite(
		[
			".main .agileCarousel.recentDeliveries",
			".main .px-0.py-13.background--paper",
		],
		() => {
			var isFired = false;
			document.addEventListener("scroll", (e) => {
				if (!isFired) {
					const targetDom = document.querySelector(
						".main .agileCarousel.recentDeliveries"
					).parentElement;
					var position = targetDom.getBoundingClientRect();
					if (
						position.top < window.innerHeight / 2 &&
						position.bottom > window.innerHeight / 2
					) {
						fireEvent(
							"Visible - Customer sees the recently delivered flowers section"
						);
						isFired = true;
					}
				}
			});
		}
	);

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...

	pollerLite(
		[
			".main .agileCarousel.recentDeliveries",
			".main .px-0.py-13.background--paper",
		],
		() => {
			let recentDeliveriesElement = document.querySelector(
				".main .agileCarousel.recentDeliveries"
			).parentElement;

			let howItWorks = document.querySelector(
				".main .px-0.py-13.background--paper"
			);

			recentDeliveriesElement.classList.add(`${ID}-element`);
			recentDeliveriesElement.classList.add(`background--paper`);

			howItWorks.insertAdjacentElement(
				"afterend",
				recentDeliveriesElement
			);

			fireEvent(
				"Visible - carousel has been moved to below the how it works."
			);
		}
	);
};
