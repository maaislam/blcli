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
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;

const addTracking = () => {
	if (window.location.href.indexOf("/results") == -1) {
		pollerLite([".hero-banner__button"], () => {
			let continueButton = document.querySelector(".hero-banner__button");
			continueButton.addEventListener("click", () => {
				fireEvent(`Click - User clicks the calculate now CTA`, true);
			});
		});
	}
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
					fireEvent("Click - User clicks the calculate button", true);
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

						pollerLite([`.results-card--eligibility-check`], () => {
							const eligibilityCheck = document.querySelector(
								`.results-card--eligibility-check .results-card__btn`
							);
							console.log("here", eligibilityCheck);
							eligibilityCheck.addEventListener("click", () => {
								setTimeout(() => {
									if (
										location.pathname.includes(
											"/eligibility"
										)
									) {
										fireEvent(
											`User sees the eligibility page after seeing the results page`,
											true
										);
									}
								}, 1000);
							});
						});
						pollerLite([`.results-card--eligibility`], () => {
							const eligibilityCheck = document.querySelector(
								`.results-card--eligibility .results-card__btn`
							);
							console.log("here", eligibilityCheck);
							eligibilityCheck.addEventListener("click", () => {
								setTimeout(() => {
									if (
										location.pathname.includes(
											"/eligibility"
										)
									) {
										fireEvent(
											`User sees the eligibility page after seeing the results page`,
											true
										);
									}
								}, 1000);
							});
						});

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

	pollerLite([`input.form__field`], () => {
		document.querySelectorAll("input.form__field").forEach((ele) =>
			ele.addEventListener("click", (e) => {
				fireEvent(`Click - User clicks the form field: ${e.target.id}`);
			})
		);
	});
};

export default () => {
	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	// newEvents.property = "314969911";
	setup();
	console.log('Innnn')

	fireEvent("Conditions Met");
	// Needed for attribution to Adobe Dynamics - do not remove
	document.documentElement.classList.add(
		`experimentation-${
			VARIATION == "control" ? `control` : `variant-${VARIATION}`
		}`
	);

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	if (
		(window.location.href.indexOf(
			"https://www.keyadvice.co.uk/equity-release/calculator"
		) > -1 ||
			window.location.href.indexOf(
				"https://www.keyadvice.co.uk/campaigns/equity-release-calculator-ppc"
			) > -1 ||
			window.location.href.indexOf(
				"https://www.keyadvice.co.uk/campaigns/equity-release-calculator-fb"
			) > -1) &&
		VARIATION == "control"
	) {
		fireEvent("Redirect - user is redirected to the calculator page", true);
		let data;

		if (location.href.includes("?")) {
			data =  location.href.split("?")[1];
		}

		window.location.href =
		data ? `https://www.keyadvice.co.uk/campaigns/calculator?${data}` : `https://www.keyadvice.co.uk/campaigns/calculator`;
	}

	addTracking();
};
