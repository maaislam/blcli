/**
 * NE-311 - Returning User email capture incentivisation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { observer } from "../../../../../lib/uc-lib";
import {
  clickSignupBubble,
  clickSignupBtn,
  closeEmailBox,
  updateEmailBox,
  submitEmail,
} from "./helpers";

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
  const emailBox = /* html */ `
	<div class="${ID}-email-cta__wrapper" style="display: none;">
    <div class="${ID}-email-cta__container">Sign Up</div>
  </div>
  <div class="${ID}-email-box__wrapper hide-delay">
    <div class="${ID}-close__icon"></div>
    <div class="${ID}-email-box__container">
      <div class="${ID}-email-box__main">
        <h2>Join the neom community</h2>
        <p>Amazing exclusive offers, weekly wellbeing support, and lashings of inspiration!</p>
      </div>
      <a class="${ID}-privacy-link" href="/pages/privacy-policy-cookie-information">Privacy Policy</a>
      <div class="${ID}-signup__btn">Sign Up</div>
      <div class="${ID}-email-input__wrapper">
				<div>
					<form id="${ID}-form" action="https://api.ometria.com/forms/signup" method="post">
						<input
							type="hidden"
							name="__form_id"
							value="7e19ea180d71376aa334b53944b8054e"
						/>
						<input type="hidden" name="email" value="" autocomplete="off" />
						<div style="display: none !important">
							<input name="__email" type="email" value="" autocomplete="off" />
						</div>
						<input name="@account" type="hidden" value="916bddfae10fec48" />
						<input name="@subscription_status" type="hidden" value="SUBSCRIBED" />
						<div class="field">
							<label
								class="label is-uppercase has-text-weight-normal is-lspaced"
								for="ContactFormEmail"
								>Email Address</label
							>
							<div class="control">
								<input
									class="input ${ID}-email-input__submit-input"
									id="ContactFormEmail"
									name="ue"
									type="text"
									value=""
									required=""
									placeholder="Email address"
								/>
							</div>
						</div>
						<div class="field">
							<div class="control">
								<input
									style="padding: 5px 20px"
									class="button ${ID}-form-submit"
									name="submit"
									type="submit"
									value="SIGN UP ME UP!"
									data-ne311-sign-up-button
								/>
								<input name="@add_to_lists[]" type="hidden" value="8400" />
								<input
									name="properties.signup_source"
									type="hidden"
									value="BL ONSITE POP UP"
								/>
							</div>
						</div>
					</form>
				</div>		
      </div>
    </div>
  </div>`;

  document.querySelector("body").insertAdjacentHTML("beforeend", emailBox);

  document
    .querySelector(`.${ID}-form-submit`)
    .addEventListener("click", () =>
      fireEvent("Click - Submit (email address submit)")
    );

  if (document.referrer.indexOf("www.neomorganics.com") > -1) {
    document.querySelector(`.${ID}-email-box__wrapper`).classList.add("hidden");

    document
      .querySelector(`.${ID}-email-cta__wrapper`)
      .classList.remove("scale-out-br");
    setTimeout(() => {
      document
        .querySelector(`.${ID}-email-cta__wrapper`)
        .classList.add("scale-in-br");
    }, 150);
    setTimeout(() => {
      document
        .querySelector(`.${ID}-email-cta__wrapper`)
        .removeAttribute("style");
    }, 200);

    document
      .querySelector(`.${ID}-email-box__wrapper`)
      .classList.remove("hide-delay");
  } else {
    // First visit
    document
      .querySelector(`.${ID}-email-cta__wrapper`)
      .removeAttribute("style");

    document
      .querySelector(`.${ID}-email-cta__wrapper`)
      .classList.add("scale-out-br");

    setTimeout(() => {
      if (document.querySelector(`.${ID}-email-box__wrapper.hide-delay`)) {
        document
          .querySelector(`.${ID}-email-box__wrapper`)
          .classList.add("scale-out-br");

        document
          .querySelector(`.${ID}-email-cta__wrapper`)
          .classList.remove("scale-out-br");
        setTimeout(() => {
          document
            .querySelector(`.${ID}-email-cta__wrapper`)
            .classList.add("scale-in-br");
        }, 150);

        document
          .querySelector(`.${ID}-email-box__wrapper`)
          .classList.remove("hide-delay");
      }
    }, 5000);
  }

  clickSignupBtn();
  clickSignupBubble();
  closeEmailBox();
  // Input Field click
  document
    .querySelector(`.${ID}-email-input__wrapper input`)
    .addEventListener("click", () => {
      fireEvent("Click - Focus (clicks into form field)");
    });

  submitEmail();

  if (window.location.href.indexOf("customer_posted=true") > -1) {
    // pollerLite(['.notification.has-text-primary.has-background-brand-alt-pink.isle.has-text-centered.is-flex.is-align-self-start.is-radiusless'], () => {
    document
      .querySelector(`.${ID}-email-box__wrapper`)
      .classList.remove("hide-delay");
    updateEmailBox();
    fireEvent("Conditions Met - Email submitted successfully");
    // console.log('Conditions Met - Email submitted successfully');
    // });
  } else if (
    window.location.href.indexOf(
      "contact%5Btags%5D=English+-+Footer&form_type=customer"
    ) > -1
  ) {
    fireEvent(
      "Conditions Met - Error while submitting email - user email was not submitted"
    );
    // console.log('Conditions Met - Error while submitting email - user email was not submitted');
  }

  observer.connect(
    document.querySelector(".mini-cart.has-background-white"),
    () => {
      if (
        document
          .querySelector(".mini-cart.has-background-white")
          .classList.contains("is-active")
      ) {
        document
          .querySelector(`.${ID}-email-cta__wrapper`)
          .setAttribute("style", "z-index: -1;");
      } else {
        document
          .querySelector(`.${ID}-email-cta__wrapper`)
          .removeAttribute("style");
      }
    },
    {
      throttle: 200,
      config: {
        attributes: true,
        childList: false,
        // subtree: true,
      },
    }
  );
};
