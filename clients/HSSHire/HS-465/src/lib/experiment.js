/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	const target = document.querySelector(".trust-pilot-overall-wrapper");
	const entry = document.querySelector(".container.popular-tool").previousElementSibling;

	if (target && entry) {
		entry.insertAdjacentElement("beforebegin", target);
		entry.style.paddingTop = "20px";
	}
};
