/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { poller, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	pollerLite(["#HousePrice", ".hero-banner__button-container"], () => {
		const originalInput = document.querySelector("#HousePrice");
		const originalWrapper = originalInput.closest(".form__field-wrapper");

		const heroButton = document.querySelector(
			".hero-banner__button-container a.button"
		);

		originalInput.addEventListener("blur", (e) => {
			setTimeout(() => {
				if (
					originalWrapper.classList.contains(
						"form__field-wrapper--success"
					)
				) {
					fireEvent(`User completes property value field`);
				}
			}, 500);
		});
		heroButton.addEventListener("click", (e) => {
			fireEvent(`User clicked 'Continue to Calculator' button`);
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

	pollerLite(["#HousePrice"], () => {
		const dom = `<div class="${ID}-input-field"></div>`;
		if (!document.querySelector(`.${ID}-input-field`)) {
			document
				.querySelector(".hero-banner__section .hero-banner__content")
				?.insertAdjacentHTML("afterend", dom);
		}

		document.querySelector(
			".hero-banner__button-container a.button"
		).innerText = "Continue to calculator";
		const originalInput = document.querySelector("#HousePrice");
		const originalWrapper = originalInput.closest(".form__field-wrapper");
		originalWrapper.setAttribute("id", `${ID}-move-top`);

		const postCode = document.querySelector(
			".form__group--postcode .form__field-wrapper"
		);

		const heroButton = document.querySelector(
			".hero-banner__button-container"
		);
		const span = document.createElement("span");

		span.addEventListener("click", (e) => {
			setTimeout(() => {
				if (
					originalWrapper.classList.contains(
						"form__field-wrapper--success"
					)
				) {
					heroButton.querySelector("a.button").click();
				} else {
					originalInput.focus();
				}
			}, 500);
		});
		heroButton.append(span);
		const observer = new MutationObserver((mutationsList, observer) => {
			if (postCode.classList.contains("form__field-wrapper--error")) {
				originalWrapper.setAttribute("validation", true);
			} else {
				originalWrapper.removeAttribute("validation");
			}
		});
		observer.observe(postCode, {
			attributes: true,
			childList: false,
			subtree: false,
		});

		pollerLite(
			[
				`.${ID}-input-field`,
				() => {
					return document.readyState == "complete";
				},
			],
			() => {
				const updatePosition = () => {
					const OriginalFormWrapper = document.querySelector(
						"#er-calculator form.form"
					);

					const HeroBanner = document.querySelector(
						".hero-banner__section"
					);

					const inputNewArea = document.querySelector(
						`.${ID}-input-field`
					);
					const originalWrapper = originalInput.closest(
						".form__field-wrapper"
					);
					let topValue =
						OriginalFormWrapper.offsetTop -
						(HeroBanner.offsetTop + inputNewArea.offsetTop);

					originalWrapper.style.top = `-${topValue - 10}px`;
				};
				setTimeout(() => {
					updatePosition();
				}, 500);
				window.addEventListener("resize", () => {
					updatePosition();
				});
			}
		);
	});

	// const Formatter = new Intl.NumberFormat("en-US", {
	// 	style: "currency",
	// 	currency: "GBP",
	// 	minimumFractionDigits: 0,
	// });
	// const originalInput = document.querySelector("#HousePrice");
	// originalInput.closest(".form__field-wrapper").classList.add(`${ID}-hidden`);
	// var regex = /[\s\,\€\£\$\¥\Kč\kr\zł\Ft(A-Z)(a-z)]/g;
	// pollerLite([`.${ID}-input-field`], () => {
	// 	const container = document.querySelector(`.${ID}-input-field`);
	// 	const input = container.querySelector("input[type='tel']");
	// 	const msg = container.querySelector(".form__message");
	// 	const icon = container.querySelector(".form__field-icon");
	// 	input.addEventListener("keydown", (event) => {
	// 		const val = event.target.value;
	// 		if ((val === "£" && event.which == 8) || event.which == 46) {
	// 			event.preventDefault();
	// 		}
	// 	});

	// 	input.addEventListener("keyup", (e) => {
	// 		const val = parseInt(e.target.value.replace(regex, ""));
	// 		if (val) {
	// 			e.target.value = Formatter.format(val);
	// 			originalInput.setAttribute("value", Formatter.format(val));
	// 			// triggerEvent(originalInput, "change");
	// 		} else {
	// 			e.target.value = "£";
	// 			originalInput.setAttribute("value", "£");
	// 			// triggerEvent(originalInput, "change");
	// 		}
	// 	});
	// 	input.addEventListener("blur", (e) => {
	// 		originalInput.focus();
	// 		triggerEvent(originalInput, "change");
	// 		// triggerEvent(originalInput, "keyup");
	// 		// triggerEvent(originalInput, "input");
	// 		let val;
	// 		if (e.target.value !== "£" && e.target.value !== "") {
	// 			val = parseInt(e.target.value.replace(regex, ""));
	// 		} else {
	// 			val = "";
	// 		}
	// 		if (val === "") {
	// 			msg.innerText = `Please enter your property value`;
	// 			container.classList.add("form__field-wrapper--error");
	// 			msg.classList.add("form__message--error");
	// 			icon.classList.add("form__field-icon--error--error");
	// 		} else if (val < 70000) {
	// 			container.classList.remove("form__field-wrapper--success");
	// 			msg.classList.remove("form__message--success");
	// 			icon.classList.remove("form__field-icon--success");
	// 			msg.innerText = `Your property value must be at least £70,000`;
	// 			container.classList.add("form__field-wrapper--error");
	// 			msg.classList.add("form__message--error");
	// 			icon.classList.add("form__field-icon--error");
	// 		} else {
	// 			container.classList.remove("form__field-wrapper--error");
	// 			msg.classList.remove("form__message--error");
	// 			icon.classList.remove("form__field-icon--error--error");
	// 			container.classList.add("form__field-wrapper--success");
	// 			msg.classList.add("form__message--success");
	// 			icon.classList.add("form__field-icon--success");
	// 		}
	// 	});
	// });
};
