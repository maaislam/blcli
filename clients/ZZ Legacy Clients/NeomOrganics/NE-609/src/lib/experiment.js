/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	function Footer(heading, subheading, text, ctaText, ctaUrl) {
		const el = document.createElement("div");
		el.classList.add(`${ID}-root`);
		el.innerHTML = /* html */ `
		<div class="${ID}-content">
			<h2 class="${ID}-content__heading">${heading}</h2>
			<h3 class="${ID}-content__subheading">${subheading}</h3>
			<p class="${ID}-content__text">${text}</p>
			<a href="${ctaUrl}" class="${ID}-content__cta button is-black is-small is-uppercase is-lspaced has-text-weight-semibold has-margin-top-small gift-finder-start">${ctaText}</a>
		</div>
		`;

		el.querySelector(`.${ID}-content__cta`).addEventListener("click", () =>
			fireEvent("CTA clicked")
		);

		new IntersectionObserver((mutations) => {
			if (mutations.some((m) => m.isIntersecting)) {
				fireEvent("Footer in view");
			}
		}).observe(el);

		return el;
	}

	const entry = document.querySelector("main .container .columns");
	entry.insertAdjacentElement(
		"afterend",
		Footer(
			"Gift Finder",
			"Not sure what gift to give?",
			"Answer 4 questions and we'll help you find the Perfect gift with true wellbeing purpose (it only takes 2 minutes)",
			"Start now",
			"/pages/find-a-feel-good-gift"
		)
	);
};
