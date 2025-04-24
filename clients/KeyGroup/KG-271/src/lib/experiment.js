/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
	setup,
	fireEvent,
	newEvents,
} from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	if (
		location.pathname.includes("/campaigns/equity-release-calculator-ppc")
	) {
		pollerLite([`#er-calculator button[type='submit']`], () => {
			const calculateWrapper = document.querySelector("#er-calculator");
			let oldHref = document.location.href;
			let resultPageInterval;
			const submitForm = () => {
				let calculateButton = calculateWrapper?.querySelector(
					`button[type='submit']`
				);
				let isRetrieveQuote = false;

				const clickHandler = () => {
					clearInterval(resultPageInterval);
					if (calculateWrapper.querySelector("form.retrieve-quote")) {
						fireEvent(
							"Click - User clicks the retrieve quote button",
							true
						);
						isRetrieveQuote = true;
					} else {
						fireEvent(
							"Click - User clicks the calculate button",
							true
						);
						isRetrieveQuote = false;
					}

					resultPageInterval = setInterval(() => {
						if (
							document.querySelectorAll(
								`.form__message.form__message--error`
							).length == 0 &&
							window.location.href.indexOf("/results") > -1
						) {
							if (isRetrieveQuote) {
								fireEvent(
									`Interaction - User submits the Retrieve a quote form and reached result page`,
									true
								);
							} else {
								fireEvent(
									`Interaction - User successfully submits the equity release form`,
									true
								);
							}

							calculateButton?.removeEventListener(
								"click",
								clickHandler
							);
							clearInterval(resultPageInterval);
						}
					}, 1000);
				};
				calculateButton?.addEventListener("click", clickHandler);
			};
			submitForm();

			const observer = new MutationObserver(function (mutations) {
				mutations.forEach(function () {
					if (oldHref != document.location.href) {
						oldHref = document.location.href;
						submitForm();
					}
				});
			});
			observer.observe(calculateWrapper, {
				attributes: false,
				childList: true,
				subtree: false,
			});
		});
	}

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}

	if (
		(location.pathname ===
			"/campaigns/equity-release-calculator-ppc/calculate" ||
			location.pathname ===
				"/campaigns/equity-release-calculator-ppc/calculate/") &&
		VARIATION == "1"
	) {
		console.log("here");
		window.location.href =
			"https://www.keyadvice.co.uk/campaigns/equity-release-calculator-ppc-cd/calculate";
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
