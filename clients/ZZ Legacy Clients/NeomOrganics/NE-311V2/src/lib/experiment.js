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

	function Popup() {
		const element = document.createElement("div");
		element.classList.add(`${ID}-popup`, `${ID}-popup--closed`);
		element.innerHTML = /* html */ `
		<button class="${ID}-popup__close">
			<span class="${ID}-visually-hidden">Close</span>
		</button>
		<div class="${ID}-popup__wrapper">
			<h2 class="${ID}-popup__heading">Join the NEOM community</h2>
			<div class="${ID}-popup__heading-wrapper">
				<h3 class="${ID}-popup__discount">Get 15% Off</h2>
			</div>
			<p class="${ID}-popup__description">Wellbeing support & inspiration, exclusive offers, new product launches!</p>
			<form id="${ID}-popup__form" action="https://api.ometria.com/forms/signup" method="post">
				<input type="hidden" name="__form_id" value="7e19ea180d71376aa334b53944b8054e" />
				<input type="hidden" name="email" value="" autocomplete="off" />
				<div style="display: none !important">
					<input name="__email" type="email" value="" autocomplete="off" />
				</div>
				<input name="@account" type="hidden" value="916bddfae10fec48" />
				<input name="@subscription_status" type="hidden" value="SUBSCRIBED" />
				<div class="field">
					<label class="${ID}-visually-hidden label is-uppercase has-text-weight-normal is-lspaced" for="ContactFormEmail">Email Address</label>
					<div class="control">
						<input class="input ${ID}-popup__email-input" id="ContactFormEmail" name="ue" type="text" value="" required="" placeholder="your@email.com" />
					</div>
				</div>
				<div class="field">
					<div class="control">
						<input class="button ${ID}-popup__cta" name="submit" type="submit" value="JOIN" data-ne311-sign-up-button />
						<input name="@add_to_lists[]" type="hidden" value="8400" />
						<input name="properties.signup_source" type="hidden" value="BL ONSITE POP UP" />
					</div>
				</div>
			</form>
			<a href="" class="${ID}-popup__privacy-policy">Privacy policy</a>
		</div>
		`;

		return element;
	}

	document.body.append(Popup());

	setTimeout(() => {
		document.querySelector(`.${ID}-popup`).classList.remove(`${ID}-popup--closed`);
	}, 3000);

	function closePopup() {
		document.querySelector(`.${ID}-popup`).classList.add(`${ID}-popup--closed`);
	}

	(function handleCloseButtonClick() {
		document.querySelector(`.${ID}-popup__close`).addEventListener("click", () => closePopup());
	})();

	(function handleEmailSubmit() {
		function validateEmailInput(email) {
			var re =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

		const form = document.querySelector(`#${ID}-popup__form`);
		const submitButton = form.querySelector(`[data-ne311-sign-up-button]`);

		form.addEventListener("submit", (e) => {
			e.preventDefault();

			submitButton.setAttribute("loading", "");
			submitButton.value = "";

			const formElements = e.target.elements;
			const urlEncodedDataPairs = Object.keys(formElements).map((key) => {
				return (
					encodeURIComponent(formElements[key].name) +
					"=" +
					encodeURIComponent(formElements[key].value)
				);
			});
			const formBody = urlEncodedDataPairs.join("&").replace(/%20/g, "+");
			const emailInput = document.querySelector(`.${ID}-popup__email-input`);
			const emailValue = emailInput.value;

			if (validateEmailInput(emailValue)) {
				fetch("https://api.ometria.com/forms/signup/ajax", {
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
					},
					body: formBody,
				}).then((r) => {
					if (!r.ok) {
						fireEvent(
							"Conditions Met - Error while submitting email - user email was not submitted"
						);
						throw new Error(r);
					} else {
						fireEvent("Conditions Met - Email submitted successfully");

						setTimeout(() => {
							submitButton.removeAttribute("loading");
							submitButton.value = "Thank you!";

							setTimeout(() => {
								closePopup();
								setTimeout(() => {
									document.querySelector(`.${ID}-popup`).remove();
								}, 500);
							}, 500);
						}, 1000);
					}
				});
			} else {
				emailInput.classList.add("error");

				setTimeout(() => {
					emailInput.classList.remove("error");
				}, 3000);
			}
		});
	})();
};
