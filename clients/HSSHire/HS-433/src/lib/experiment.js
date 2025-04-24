/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, events, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();
	events.setPropertyId("UA-345045-1");
	logMessage(ID + " Variation: " + VARIATION);

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

	pollerLite([".topIncExcvat #in-vat-form #in-vat"], () => {
		let domToRender = `<div class="arrow__box">
                        <div class="arrow__box-inner">
                          <span class="arrow__box-inner__content">We have now set <span class=font-bold-VAT>‘Include VAT’</span> as standard</span>
                          <span class="arrow__box-inner__close"></span>
                        </div>
                      </div>`;

		const isExcludeVATChecked = document.querySelector(
			".topIncExcvat #ex-vat-form #ex-vat"
		).checked;
		const isIncludeVATChecked = document.querySelector(
			".topIncExcvat #in-vat-form #in-vat"
		).checked;

		const isMobile = navigator.userAgent.match(
			/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
		);

		if (!isMobile) {
			if (
				!sessionStorage.getItem("shownMessageDesktop") ||
				!sessionStorage.getItem("closedVAT")
			) {
				if (isExcludeVATChecked && !isIncludeVATChecked) {
					document
						.querySelector('.topIncExcvat [for="switch"]')
						.click();
					fireEvent("Include VAT");
				} else if (!isExcludeVATChecked && isIncludeVATChecked) {
					setTimeout(function () {
						document
							.querySelector(".topIncExcvat")
							.insertAdjacentHTML("beforeend", domToRender),
							sessionStorage.setItem(
								"shownMessageDesktop",
								"true"
							),
							fireEvent("Popup");
					}, 1e3);
				}
			}
		} else {
			if (
				!sessionStorage.getItem("shownMessageMobile") ||
				!sessionStorage.getItem("closedVAT")
			) {
				if (isExcludeVATChecked && !isIncludeVATChecked) {
					document
						.querySelector('.topIncExcvat [for="switch"]')
						.click();
					fireEvent("Include VAT");
				} else if (!isExcludeVATChecked && isIncludeVATChecked) {
					document.addEventListener(
						"scroll",
						function e() {
							document
								.querySelector("#wrapper")
								.insertAdjacentHTML("beforeend", domToRender),
								sessionStorage.setItem(
									"shownMessageMobile",
									"true"
								),
								document.removeEventListener("scroll", e, !1),
								fireEvent("Popup");
						},
						!1
					);
				}
			}
		}

		document
			.querySelector('.topIncExcvat [for="switch"]')
			.addEventListener("click", function () {
				if (
					!document.querySelector(
						".topIncExcvat #ex-vat-form #ex-vat"
					).checked &&
					document.querySelector(".topIncExcvat #in-vat-form #in-vat")
						.checked
				) {
					if (!isMobile) {
						sessionStorage.setItem("shownMessageDesktop", "true");
					} else {
						sessionStorage.setItem("shownMessageMobile", "true");
					}
					sessionStorage.setItem("closedVAT", "false"),
						fireEvent("Ex Vat");
				}
			});
	});

	pollerLite([".arrow__box-inner__close"], () => {
		document
			.querySelector(".arrow__box-inner__close")
			.addEventListener("click", function () {
				document.querySelector(".arrow__box").remove(),
					sessionStorage.setItem("closedVAT", "false"),
					fireEvent("Closed Popup");
			});
	});
};
