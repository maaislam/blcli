/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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

	pollerLite([".kr-body-container .last-updated"], () => {
		const footer = document.querySelector(
			".kr-body-container .last-updated"
		);
		const nextStepContent = `
                            <div class="${ID}-next-step">
                              <div class="next-step__content">
                                <div class="next-step__top">
                                  <h3 class="next-step__title">What are my next steps?</h3>
                                  <p class="next-step__text">Calculate how much you could unlock</p>
                                  <a class="calculate-now-green-btn" href="/equity-release/calculator">Calculate now</a>
                                  <div class="next-step-or-divider">or</div>
                                  <p class="next-step__text">Talk to our friendly team to learn everything you’ll need to now</p>
                                  <a href="/equity-release/calculator#er-calculator" target="_self" class="call-now-button">Call now</a>
                                </div>
                                <div class="next-step__bottom">
                                  <p class="next-step-bottom__text">Other options:</p>

                                  <a href="/equity-release/calculator#er-calculator" target="_self" class="other-options-btn">
                                    <span class="button__text">Download our Brochure</span>
                                    <span class="button__icon">
                                      <svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                      </svg>
                                    </span>
                                  </a>

                                  <a href="/equity-release/calculator#er-calculator" target="_self" class="other-options-btn">
                                    <span class="button__text">Check your Eligibility</span>
                                    <span class="button__icon">
                                      <svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                      </svg>
                                    </span>
                                  </a>

                                  <a href="/equity-release/calculator#er-calculator" target="_self" class="other-options-btn">
                                    <span class="button__text">Watch our Videos</span>
                                    <span class="button__icon">
                                      <svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                      </svg>
                                    </span>
                                  </a>

                                  <a href="/equity-release/calculator#er-calculator" target="_self" class="other-options-btn">
                                    <span class="button__text">Read our Case Studies</span>
                                    <span class="button__icon">
                                      <svg width="10" height="21" viewBox="0 0 10 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                        <path d="M1.5 19.5L8 10.5L1.5 1.5" stroke="white" stroke-width="2"/>
                                      </svg>
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>
                            `;

		footer.insertAdjacentHTML("beforebegin", nextStepContent);
	});
};
