/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	fireEvent("Conditions Met");
	// Needed for attribution to Adobe Dynamics - do not remove
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
	let phoneNumber;
	if (location.pathname.includes("equity-release-calculator-ppc-vrnt-1")) {
		phoneNumber = "0800 953 3765";
	} else if (
		location.pathname.includes("campaigns/equity-release-calculator-ppc")
	) {
		phoneNumber = "0800 188 4831";
	}

	pollerLite(["#er-calculator button[type='submit']"], () => {
		let eventToFire;
		if (document.querySelector("#er-calculator .retrieve-quote")) {
			eventToFire = `User reached to the /results page`;
		} else {
			eventToFire = `User completes the equity release form and reached to the /results page`;
		}

		document
			.querySelector("#er-calculator button[type='submit']")
			?.addEventListener("click", (e) => {
				setTimeout(() => {
					if (
						!document.querySelector(".not-found") &&
						window.location.href.indexOf("/results") > -1
					) {
						fireEvent(eventToFire);
					}
				}, 3000);
			});
	});

	pollerLite([".kr-footer__copyright-text"], () => {
		const telephone = document.querySelector(
			".kr-footer__copyright-text a[href^='tel:']"
		);
		if (telephone) {
			telephone.href = `tel:${phoneNumber}`;
			telephone.textContent = phoneNumber;
		}

		const allNumbers = document.querySelectorAll("a[href^='tel:']");
		allNumbers.forEach((number) => {
			number.addEventListener("click", () => {
				if (number.closest(".main-header")) {
					fireEvent(
						"Click - User clicks to the telephone number from header to make a call"
					);
				} else if (number.closest("footer.kr-footer")) {
					fireEvent(
						"Click - User clicks to the telephone number from footer to make a call"
					);
				}
			});
		});
	});

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

	const dom = `<div class="${ID}-phone-number"><span>or call us on </span><a href="tel:${phoneNumber}">${phoneNumber}</a></div>`;

	pollerLite([".hero-banner__button-container a.hero-banner__button"], () => {
		document
			.querySelector(
				".hero-banner__button-container a.hero-banner__button"
			)
			.insertAdjacentHTML("afterend", dom);
		document
			.querySelector(`.${ID}-phone-number a`)
			.addEventListener("click", () => {
				fireEvent(
					"Click - User clicks to the telephone number under the CTA to make a call"
				);
			});
	});
};
