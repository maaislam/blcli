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

const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	if (
		(window.location.href.indexOf("/equity-release/calculator") > -1 ||
			window.location.href.indexOf("/equity-release-calculator-ppc") >
				-1) &&
		window.location.href.indexOf("/results") == -1
	) {
		pollerLite([".hero-banner__button"], () => {
			let continueButton = document.querySelector(".hero-banner__button");
			continueButton.addEventListener("click", () => {
				fireEvent(
					"Click - top calculate now button is clicked to take the user to the form",
					true
				);
			});
		});
	}

	pollerLite(["#er-calculator button[type='submit']"], () => {
		document
			.querySelector("#er-calculator button[type='submit']")
			?.addEventListener("click", (e) => {
				setTimeout(() => {
					if (
						!document.querySelector(".not-found") &&
						window.location.href.indexOf("/results") > -1
					) {
						fireEvent(
							"Interaction - user has reached the results page",
							true
						);
					}
				}, 2000);
			});
	});
	pollerLite([".submit-button-container button.submit-button"], () => {
		document
			.querySelector(".submit-button-container button.submit-button")
			?.addEventListener("click", (e) => {
				setTimeout(() => {
					if (
						!document.querySelector(".not-found") &&
						window.location.href.indexOf("/results") > -1
					) {
						fireEvent(
							"Interaction - user has reached the results page",
							true
						);
					}
				}, 2000);
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

	if (
		(window.location.href.indexOf("/equity-release/calculator") > -1 ||
			window.location.href.indexOf("/equity-release-calculator-ppc") >
				-1) &&
		window.location.href.indexOf("/results") == -1
	) {
		document.documentElement.classList.add(`${ID}-experiment-started`);

		let updatedHTML = `
    
      <div class="hero-banner__additional-subtext">
        <ul class="list list--tick">
          <li>See how much you could release</li>
          <li>​Quick, easy and secure</li>
          <li>Instant estimate, in seconds</li>
        </ul>
      </div>
    
    `;

		pollerLite(
			[
				`.hero-banner__title`,
				() => {
					return document.readyState == "complete";
				},
			],
			() => {
				let insertionPoint = document.querySelector(
					".hero-banner__title"
				);
				insertionPoint.insertAdjacentHTML("afterend", updatedHTML);
				insertionPoint
					.closest(".hero-banner__section")
					.classList.add(`${ID}-section`);
				fireEvent("Interaction - changes made to the page", true);
			}
		);
	}
};
