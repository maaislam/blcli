/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

function replaceAttributes(el, refEl) {
	Object.keys(el.attributes).forEach((attr) => {
		const attribute = el.attributes[attr].name;
		const refAttributeList = Object.values(refEl.attributes).map((a) => a.name);

		if (refAttributeList.includes(attribute)) {
			el.setAttribute(attribute, refEl.getAttribute(attribute));
		}
	});
}

function getCorrespondingElements(elements, selector, index = 0) {
	const result = [];

	elements.forEach((el) => {
		const target = el.querySelectorAll(selector)[index];

		if (target) result.push(target);
	});

	return result;
}

const { VARIATION } = shared;

export default (fetchedForm) => {
	setup();
	fireEvent("Conditions Met");

	if (VARIATION == "control") return;

	const existingForm = document.querySelector(".prd-ProductOffers_Form");
	const subscriptionInput = document.querySelectorAll(".rc_radio.rc_radio__autodeliver")[1];

	subscriptionInput.addEventListener("click", () => {
		replaceAttributes(existingForm, fetchedForm);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".util-NoJs.util-ScreenReaderOnly.js-Product_Select.js-Product_Id"
			)
		);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".util-NoJs.util-ScreenReaderOnly.js-Product_Select.js-Product_Id option",
				0
			)
		);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".util-NoJs.util-ScreenReaderOnly.js-Product_Select.js-Product_Id option",
				1
			)
		);

		replaceAttributes(
			...getCorrespondingElements([existingForm, fetchedForm], ".recharge #rc_container > input")
		);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".recharge #rc_container > select option",
				0
			)
		);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".recharge #rc_container > select option",
				1
			)
		);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".recharge #rc_radio_options > .rc_block > label",
				0
			)
		);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".recharge #rc_radio_options > .rc_block > label",
				1
			)
		);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".recharge #rc_radio_options > .rc_block > label input",
				0
			)
		);

		replaceAttributes(
			...getCorrespondingElements(
				[existingForm, fetchedForm],
				".recharge #rc_radio_options > .rc_block > label input",
				1
			)
		);

		replaceAttributes(
			...getCorrespondingElements([existingForm, fetchedForm], "#rc_autodeliver_options label")
		);

		replaceAttributes(
			...getCorrespondingElements([existingForm, fetchedForm], "#rc_autodeliver_options select")
		);
	});
};
