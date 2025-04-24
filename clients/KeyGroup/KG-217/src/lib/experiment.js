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
	document.documentElement.classList.add(
		`experimentation-${
			VARIATION == "control" ? `control` : `variant-${VARIATION}`
		}`
	);
	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	document.body.addEventListener(`click`, (e) => {
		const target = e.target;

		if (target.closest(`#ConsultationForm button[type="submit"]`)) {
			fireEvent(`User makes an appointment on the results page`);
		}

		// if (target.closest(`.release-question button[type="submit"]`)) {
		// 	let value = document.querySelector(
		// 		`form input#ReleaseNeeded`
		// 	).value;
		// 	value = value.replaceAll(`£`, ``);
		// 	value = value.replaceAll(`,`, ``);
		// 	if (value.length > 4 && value.length < 10) {
		// 		fireEvent("User submits release amount from release question");
		// 	}
		// }

		// if (
		// 	target.closest(
		// 		`.release-question .form__group label.form__label--radio`
		// 	)
		// ) {
		// 	const value = target
		// 		.closest(
		// 			`.release-question .form__group label.form__label--radio`
		// 		)
		// 		.textContent.trim();
		// 	fireEvent(`User clicks on the release question CTA: "${value}"`);
		// }

		if (
			target.closest(
				`#er-calculator section.calculator section.form__controls button.btn--next[type="submit"]`
			) &&
			location.pathname.includes(`equity-release/calculator/eligibility`)
		) {
			let text = target
				.closest(
					`#er-calculator section.calculator section.form__controls button.btn--next[type="submit"]`
				)
				?.textContent.trim()
				.toLowerCase();
			if (text === "show my results") {
				fireEvent(`User completes the eligibility form"`);
			}
		}
	});
	if (VARIATION == "control") {
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
