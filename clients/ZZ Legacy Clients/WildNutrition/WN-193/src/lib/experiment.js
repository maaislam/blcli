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

	if (VARIATION == "control") {
		return;
	}

	addEventListener("copy", () => {
		const copiedVal = document.getSelection().toString();
		if (copiedVal.length > 0 && copiedVal.length <= 100) {
			fireEvent(copiedVal);
		}
	});
};
