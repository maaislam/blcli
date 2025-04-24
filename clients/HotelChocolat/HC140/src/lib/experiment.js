import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import { autoVelvetiser } from "./helper/autoVelvetiser";
import { nextStepButton } from "./helper/nextStepButton";
import { nextStepClickHandler } from "./helper/nextStepClickHandler";
import { kitHandler } from "./helper/kitHandler";

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");
	// console.log(`%c${ID + "-" + VARIATION}`, `color: green; font-size: 30px`);
	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	pollerLite(
		[
			`#main .steps_section .steps_description`,
			`#main .configurator-container`,
			`.dynamic-content-slot`,
			`div.configurator-landing`,
			`.right_container.visible #nextStep`,
			`label[for^="sachets-"]`,
			`div[step-id="refills"] input[name="quantity"]`,
			`div[step-id="addons"] input[name="quantity"]`,
		],
		() => {
			const configuratorLanding = document.querySelector(
				`div.configurator-landing`
			);
			const targetNextStepButton = document.querySelector(
				`.right_container.visible #nextStep`
			);
			let currentSpan = targetNextStepButton
				.querySelector(`.next-step-btn.activeStep`)
				.textContent.trim();
			let step = window.location.href?.split("=")[1];
			configuratorLanding.addEventListener("click", function (e) {
				const target = e.target;
				if (
					target.matches(`.right_container.visible #nextStep`) ||
					target.closest(`.right_container.visible #nextStep`)
				) {
					if (step == "Machines") {
						step = "Colour";
						kitHandler("step-1.0");
					} else if (step == "Refills") {
						kitHandler("step-2.0");
					} else if (step == "Addons") {
						step = "Extras";
						kitHandler("step-3.0");
						setTimeout(() => {
							// console.log(`User clicks to add the product to the bag`);
							fireEvent(
								`User clicks to add the product to the bag`
							);
						}, 1000);
					}
					// console.log(`User clicks ${currentSpan} on ${step} page`);
					fireEvent(`User clicks ${currentSpan} on ${step} page`);
					currentSpan = targetNextStepButton
						.querySelector(`.next-step-btn.activeStep`)
						.textContent.trim();
					step = window.location.href?.split("=")[1];
				}
			});
		}
	);

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		pollerLite(
			[".configurator-container .options label.option[for='velvetiser']"],
			() => {
				document
					.querySelector(
						`.configurator-container .options label.option[for='velvetiser']`
					)
					.click();
			}
		);
		return;
	}
	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
	pollerLite(
		[
			`#main .steps_section .steps_description`,
			`#main .configurator-container`,
			`.dynamic-content-slot`,
			() => window.jQuery,
		],
		() => {
			fireEvent(`User sees the subscription page`);
			autoVelvetiser();
			$(document).ready(function () {
				nextStepButton();
				nextStepClickHandler();
			});
			const termsAndCondNode = document
				.querySelector(
					`.dynamic-content-slot p a[href$="terms-and-conditions.html"]`
				)
				?.closest("p")
				?.cloneNode(true);
			termsAndCondNode.style.textAlign = "center";
			const termsAndCond = document.createElement("div");
			termsAndCond.classList.add(`${ID}-Terms&Condition`);
			termsAndCond.appendChild(termsAndCondNode);
			document
				.querySelector(`#main .configurator-landing`)
				.insertAdjacentElement("beforeend", termsAndCond);
		}
	);
};
