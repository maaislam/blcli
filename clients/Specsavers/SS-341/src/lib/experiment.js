/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { VARIATION, ID } = shared;

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

	const pageWrapper = document.getElementById("content-wrapper");
	const form = document.querySelector("form.webform-client-form");
	const formItems = form.querySelectorAll(
		":scope > div.form-item, :scope > div#addressfield-wrapper"
	);
	pageWrapper.setAttribute("data-step", 1);
	fireEvent("Step 1");

	const steps = [
		Array.from(formItems).slice(1, 3),
		Array.from(formItems).slice(5, 11),
		Array.from(formItems).slice(12, 50),
	];

	(function wrapStepsInContainer() {
		steps.forEach((s, idx) => {
			const container = document.createElement("div");
			container.classList.add(`${ID}-step`);
			container.setAttribute("data-step", idx + 1);
			container.append(...s);
			form.prepend(container);
		});
	})();

	function setStep(value) {
		pageWrapper.setAttribute("data-step", value);
		document.querySelector("[data-current-step-display]").textContent = value;
		document.querySelector("[data-current-step-display]");

		document.querySelector(`.${ID}-current-step-counter`).scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "nearest",
		});

		const currentStepNumbers = document.querySelectorAll(`.${ID}-current-step-progress-number`);

		currentStepNumbers.forEach((n, idx) => {
			if (n.classList.contains("current")) {
				n.classList.remove("current");
			}

			if (idx + 1 == value) {
				n.classList.add("current");
			}
		});

		fireEvent(`Step ${value}`);
	}

	(function renderStartPageContainer() {
		const StartPageContainer = document.createElement("div");
		StartPageContainer.classList.add(`${ID}-start-page-container`);

		document
			.querySelector(".sib-text-single-column.sib-colour-scheme--plain")
			.insertAdjacentElement("afterend", StartPageContainer);
	})();

	const StartPageContainer = document.querySelector(`.${ID}-start-page-container`);

	// (function renderNewBanner() {
	//   const Banner = document.createElement("div");
	//   Banner.classList.add(`${ID}-banner`);
	//   Banner.innerHTML = `
	// 			<div class="${ID}-banner-content">
	// 				<h1>Request a free home eye test visit</h1>
	// 			</div>
	// 		`;

	//   StartPageContainer.insertAdjacentElement("after", Banner);
	// })();

	// (function renderNewFormStart() {
	//   const FormStart = document.createElement("div");
	//   FormStart.classList.add(`${ID}-form-start`);
	//   FormStart.innerHTML = `
	// 			<div class="${ID}-form-start-content">
	// 				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mattis commodo, sit lectus quis at tellus risus. Elementum duis dignissim.</p>
	// 			</div>
	// 			`;

	//   const StartButton = document.createElement("button");
	//   StartButton.classList.add(`${ID}-start-button`);
	//   StartButton.textContent = "Request Appointment";

	//   StartButton.addEventListener("click", () => {
	//     FormStart.parentElement.classList.add(`${ID}-hidden`);
	//     setStep();
	//   });

	//   FormStart.querySelector(":scope > div").append(StartButton);

	//   StartPageContainer.append(FormStart);
	// })();

	// (function renderNewEligibilitySteps() {
	//   const Container = document.createElement("div");
	//   Container.classList.add(`${ID}-eligibility-steps`);
	//   Container.innerHTML = `<h2>How to book your home eye test & check eligibility</h2>`;

	//   StartPageContainer.append(Container);

	//   const data = [
	//     {
	//       title: "Check if you’re eligible",
	//       text: "You’ll be eligible for a free home eye test if you qualify for a free NHS-funded eye test and are unable to leave home unaccompanied due to a physical or mental illness or disability.",
	//       cta: `<a href="https://www.specsavers.co.uk/home-eye-tests/eligibility" class="${ID}-eligibility-step-cta">Check now</a>`,
	//     },
	//     {
	//       title: "Get in touch",
	//       text: "You can choose how you would like to request your home visit. Call us directly on to arrange your appointment or fill out our form below. Once you have submitted your request online, someone will be in touch.",
	//       cta: `<a href="tel:0808 134 9669" class="${ID}-eligibility-step-cta">0808 134 9669</a>`,
	//     },
	//   ];

	//   function Step(num, title, text, cta) {
	//     const Step = document.createElement("div");
	//     Step.classList.add(`${ID}-eligibility-step`);
	//     Step.innerHTML = `
	// 				<div class="${ID}-eligibility-step-content">
	// 					<h3><span>${num}</span>${title}</h3>
	// 					<p>${text}</p>
	// 					${cta}
	// 				</div>
	// 			`;

	//     return Step;
	//   }

	//   data.forEach((d, idx) => {
	//     const step = Step(idx + 1, d.title, d.text, d.cta);
	//     Container.append(step);
	//   });
	// })();

	(function renderCurrentStepCounter() {
		const CurrentStepCounter = document.createElement("div");
		CurrentStepCounter.classList.add(`${ID}-current-step-counter`);
		CurrentStepCounter.innerHTML = `
			<div class="${ID}-current-step-progress">
				<div class="${ID}-current-step-progress-numbers">
					<span class="${ID}-current-step-progress-number current">1</span>
					<span class="${ID}-current-step-progress-number">2</span>
					<span class="${ID}-current-step-progress-number">3</span>
				</div>
				<div class="${ID}-current-step-progress-bar"></div>
			</div>
			<p>Step <span data-current-step-display>1</span> of <span>3</span></p>
		`;

		const currentStepNumbers = CurrentStepCounter.querySelectorAll(
			`.${ID}-current-step-progress-number`
		);

		currentStepNumbers.forEach((n, idx) => {
			n.addEventListener("click", () => {
				const currentStep = +pageWrapper.getAttribute("data-step");
				if (idx + 1 <= currentStep) {
					setStep(idx + 1);
					fireEvent("Gone to previous step");
				} else if (
					idx + 1 > currentStep &&
					!document.querySelector(`.${ID}-next-step-button`).classList.contains(`${ID}-disabled`)
				) {
					setStep(idx + 1);
				}
			});
		});

		StartPageContainer.insertAdjacentElement("afterend", CurrentStepCounter);
	})();

	(function renderNextStepButton() {
		const NextStepContainer = document.createElement("div");
		NextStepContainer.classList.add(`${ID}-next-step-container`);

		const NextStepButton = document.createElement("button");
		NextStepButton.classList.add(`${ID}-next-step-button`, `${ID}-disabled`);
		NextStepButton.textContent = "Next";

		NextStepButton.addEventListener("click", () => {
			if (NextStepButton.classList.contains(`${ID}-disabled`)) {
				return;
			}

			const currentStep = parseInt(pageWrapper.getAttribute("data-step"));
			const nextStep = currentStep + 1;

			if (nextStep <= steps.length) {
				setStep(nextStep);
				NextStepButton.classList.add(`${ID}-disabled`);
			}
		});

		NextStepContainer.append(NextStepButton);

		form.insertAdjacentElement("afterend", NextStepContainer);
	})();

	(function validateFormFields() {
		function checkValidation(fields) {
			const selectedInputs = [...fields].filter((f) => {
				if (
					f.querySelector("input[type='checkbox']:checked") ||
					f.querySelector("input[type='radio']:checked") ||
					(f.querySelector("input[type='text']") &&
						f.querySelector("input[type='text']").value.length > 0) ||
					(f.querySelector("textarea") && f.querySelector("textarea").value.length > 0) ||
					(f.querySelector("select") && f.querySelector("select").value.length > 0) ||
					(f.querySelector("input[type='text']") &&
						f.querySelector("input[type='text']").value.length > 0) ||
					(f.querySelector("input[type='email']") &&
						f.querySelector("input[type='email']").value.length > 0)
				) {
					return true;
				}
			});

			if (selectedInputs.length == fields.length) return true;
			return false;
		}

		function run() {
			const currentStep = +pageWrapper.getAttribute("data-step");
			const requiredFields = (() => {
				const fields = document.querySelectorAll(
					`.${ID}-step[data-step="${currentStep}"] > .form-item:not([style="display: none;"]),
					.${ID}-step[data-step="${currentStep}"] > #addressfield-wrapper :not(:scope > .form-item) .form-item:not([style="display: none;"])`
				);

				return [...fields].filter((f) => f.querySelector("span.form-required"));
			})();

			const nextButton = document.querySelector(`.${ID}-next-step-button`);

			if (checkValidation(requiredFields) == true) {
				nextButton.classList.remove(`${ID}-disabled`);
			}

			requiredFields.forEach((f) => {
				const inputs = f.querySelectorAll("input, textarea");

				inputs.forEach((i) => {
					i.addEventListener("input", () => {
						if (checkValidation(requiredFields) == true) {
							nextButton.classList.remove(`${ID}-disabled`);
						}
					});
				});
			});
		}

		run();

		new MutationObserver(() => run()).observe(pageWrapper, {
			childList: true,
			attributes: true,
		});
	})();

	(function validateSubmitButton() {
		const submitButton = document.querySelector("div.form-actions button");
		const consentCheckbox = document.querySelector(
			'input[type="checkbox"]#edit-submitted-gdpr-consent'
		);

		submitButton.textContent = "Finish request";
		submitButton.classList.add(`${ID}-disabled`);

		setInterval(() => {
			if (window.grecaptcha.getResponse().length > 0 && consentCheckbox.checked) {
				submitButton.classList.remove(`${ID}-disabled`);
			} else {
				submitButton.classList.add(`${ID}-disabled`);
			}
		}, 200);
	})();

	(function cleanupDOM() {
		// document.querySelector(".sib-banner.has-no-cta").remove();
		// StartPageContainer.nextElementSibling.nextElementSibling.nextElementSibling.remove();
		// StartPageContainer.nextElementSibling.nextElementSibling.remove();
		// document.querySelector("div.form-actions button");
	})();

	(function tracking() {
		const submit = document.querySelector("div.form-actions button");

		submit.addEventListener("click", () => {
			const conditionsText =
				document.getElementById(
					"edit-submitted-please-type-in-the-box-what-prevents-you-from-visiting-a-store-unaccompanied"
				).value.length > 0;

			const otherCommentsText =
				document.getElementById("edit-submitted-other-comments").value.length > 0;

			const sightTestDate = [
				...document.querySelectorAll(
					"#edit-submitted-if-you-know-the-date-of-your-last-eyesight-test-please-enter-the-below-day, #edit-submitted-if-you-know-the-date-of-your-last-eyesight-test-please-enter-the-below-month, #edit-submitted-if-you-know-the-date-of-your-last-eyesight-test-please-enter-the-below-year"
				),
			].every((e) => e.value !== "");

			const addressFields = [
				...document.querySelectorAll(
					"#edit-submitted-address-thoroughfare, #edit-submitted-address-locality, #edit-submitted-address-postal-code"
				),
			].every((e) => e.value !== "");

			if (conditionsText) {
				fireEvent("Conditions Text Entered");
			} else {
				fireEvent("Conditions Text Not Entered");
			}

			if (otherCommentsText) {
				fireEvent("Other Comments Text Entered");
			} else {
				fireEvent("Other Comments Text Not Entered");
			}

			if (sightTestDate) {
				fireEvent("Sight Test Date Entered");
			} else {
				fireEvent("Sight Test Date Not Entered");
			}

			if (addressFields) {
				fireEvent("Address Fields Entered");
			} else {
				fireEvent("Address Fields Not Entered");
			}

			fireEvent("Form Submitted");
		});
	})();
};
