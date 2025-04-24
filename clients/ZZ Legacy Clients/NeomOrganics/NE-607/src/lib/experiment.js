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
import PromoCode from "./promo";

const { VARIATION, ID } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	function getLocale() {
		switch (location.host) {
			case "www.neomorganics.com":
				return "uk";
			case "neomorganics.eu":
				return "eu";
			case "us.neomorganics.com":
				return "us";
			default:
				return "uk";
		}
	}

	const locale = getLocale();

	const deliveryContent = {
		uk: "Spend <strong>£40</strong> to get <strong>FREE STANDARD</strong> delivery.",
		eu: "Spend <strong>€60</strong> to get <strong>FREE STANDARD</strong> delivery.",
		us: "<strong>FREE US</strong> shipping on all orders.",
	};

	const root = document.createElement("div");

	new PromoCode(root, "GOGOGO");

	root.insertAdjacentHTML(
		"beforeend",
		/* html */ `
		<div class="${ID}-delivery">
			<ul>
				<li>${deliveryContent[locale]}</li>
			</ul>
		</div>`
	);

	if (location.pathname === "/cart") {
		pollerLite(
			[
				"form[action='/cart'] .cart-items",
				".black-friday-promo-code",
				".black-friday-promo-button",
			],
			() => {
				const entry = document.querySelector(
					"form[action='/cart'] .cart-items"
				);
				entry.insertAdjacentElement("afterbegin", root);

				const promoCodeContainer = document.querySelector(`.${ID}-promo-code`);
				promoCodeContainer.classList.add("responsive");
			}
		);
	} else {
		pollerLite(
			[".mini-cart-items", ".mini-cart-footer .is-total span[rv-html]"],
			() => {
				const entry = document.querySelector(".mini-cart-items");
				entry.insertAdjacentElement("afterbegin", root);
			}
		);
	}
};
