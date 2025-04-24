import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
	const { ID, VARIATION } = shared;

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

	if (location.href.includes("choose-your-machine?step=")) {
		pollerLite(
			[".configurator-landing .right_container button#nextStep"],
			() => {
				const targetNextStepButton = document.querySelector(
					".configurator-landing .right_container button#nextStep"
				);
				let step = window.location.href?.split("=")[1];
				let current = targetNextStepButton
					.querySelector(".next-step-btn.activeStep")
					?.getAttribute("stepbtn-id")
					.trim();
				targetNextStepButton.addEventListener("click", function (e) {
					if (step == "Addons" && current == "addons") {
						fireEvent("User adds a subscription item");
					}
					step = window.location.href?.split("=")[1];
					current = targetNextStepButton
						.querySelector(".next-step-btn.activeStep")
						?.getAttribute("stepbtn-id")
						.trim();
				});
			}
		);
	} else {
		pollerLite(
			[".HC129-topContent", ".HC129-accordionStep.HC129-colours"],
			() => {
				const tergetDom = document.querySelector(
					".HC129-topContent .HC129-accordionStep.HC129-colours"
				);
				const srcHtml = `<p class="${ID}-promo-msg">
          <span class="vip-me-icon">VIP.ME</span>
          <span class="vip-me-price">£69.95</span>
          <span class="vip-me-text"> Discount applied at checkout.</span>
        </p>`;
				tergetDom.insertAdjacentHTML("beforebegin", srcHtml);

				pollerLite(["button#add-to-cart"], () => {
					const btn = document.querySelector("button#add-to-cart");
					btn.addEventListener("click", () => {
						fireEvent("User adds a Velvetiser to the bag");
					});
				});

				pollerLite([".product-add-to-cart .HC129-add"], () => {
					const btn = document.querySelector(
						".product-add-to-cart .HC129-add"
					);
					btn.addEventListener("click", () => {
						fireEvent("User adds a Velvetiser to the bag");
					});
				});

				pollerLite(
					[".HC129-subscription .HC129-subscription__link"],
					() => {
						const btn = document.querySelector(
							".HC129-subscription .HC129-subscription__link"
						);
						btn.addEventListener("click", () => {
							fireEvent(
								"User clicks to go through to subscriptions"
							);
						});
					}
				);
			}
		);
	}
};
