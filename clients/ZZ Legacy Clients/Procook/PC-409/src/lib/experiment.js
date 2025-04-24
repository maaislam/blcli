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

const { VARIATION } = shared;

events.analyticsReference = "ga_ua";

export default () => {
	setup();

	fireEvent("Conditions Met");

	const addToBasketButtons = document.querySelectorAll(
		".addToBasketForm button[type=submit]"
	);

	addToBasketButtons.forEach((button) =>
		button.addEventListener("click", () => fireEvent("Add to Basket Clicked"))
	);

	if (VARIATION == "control") {
		return;
	}

	const elements = document.querySelectorAll(
		"form.addToBasketForm > div > span:first-of-type:not([id]), div.product-pricing div.typical-price"
	);

	elements.forEach((element) => (element.style.display = "none"));

	elements[1].closest("form.addToBasketForm").style.alignItems = "center";
};
