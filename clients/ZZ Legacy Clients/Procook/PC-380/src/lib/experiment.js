/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events } from "../../../../../lib/utils";
import V1 from "./V1";
import { Tooltip, Info } from "./V2";

const { VARIATION } = shared;

const gaReference = window.ga_ua ? "ga_ua" : "ga";

events.analyticsReference = gaReference;

export default (
	setAccordion,
	typicalPrice,
	individualPrice,
	currentPrice,
	saving
) => {
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
		const addToBasketButtons = document.querySelectorAll(
			".addToBasketForm button[type=submit]"
		);

		addToBasketButtons.forEach((button) =>
			button.addEventListener("click", () => fireEvent("Add to Basket Clicked"))
		);
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	function getPieceCount() {
		const text = document
			.querySelector(
				".product-details .pro_product-header h2 span, .product-details .pdp-right .pdp-hero h2"
			)
			?.textContent.trim();
		return text.match(/\d+/g);
	}

	if (VARIATION == "1" || VARIATION == "3") {
		const priceContainer = document.querySelector(
			".product-details .product-pricing, .product-details .pdp-pricing"
		);
		priceContainer.querySelector(".typical-price, div").remove();
		priceContainer.querySelector(".price, div").remove();
		priceContainer.append(
			V1(typicalPrice, currentPrice, individualPrice, saving, getPieceCount())
		);
	}

	const tooltip = Tooltip(individualPrice, currentPrice, saving);
	const info = Info(individualPrice, currentPrice, saving, getPieceCount());

	function renderOnMobile() {
		const mobileContainer = document.querySelector(
			"form.addToBasketForm.pdpAddToBasket, .pdpAddToBasket"
		);
		const mobileTooltipEntry = mobileContainer.querySelector(
			":scope > div:first-child"
		);
		mobileTooltipEntry.append(tooltip);
		mobileContainer.append(info);
	}

	function renderOnDesktop() {
		const desktopContainer = document.querySelector(
			".product-details .product-pricing .price, .product-details .pdp-pricing div:nth-of-type(2)"
		);
		desktopContainer.insertAdjacentElement("afterend", tooltip);
		tooltip.insertAdjacentElement("afterend", info);
	}

	if (VARIATION == "2" || VARIATION == "4") {
		if (window.innerWidth > 992) {
			renderOnDesktop();
		} else {
			renderOnMobile();
		}

		window.addEventListener("resize", () => {
			if (window.innerWidth > 992) {
				renderOnDesktop();
			} else {
				renderOnMobile();
			}
		});
	}

	const addToBasketButtons = document.querySelectorAll(
		".addToBasketForm button[type=submit]"
	);

	addToBasketButtons.forEach((button) =>
		button.addEventListener("click", () => fireEvent("Add to Basket Clicked"))
	);
};
