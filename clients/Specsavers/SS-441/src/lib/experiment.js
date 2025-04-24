/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import v1 from "./v1";
import v2 from "./v2";

const { VARIATION } = shared;

export default () => {
	setup();
	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	if (VARIATION == "1") {
		v1();
	} else if (VARIATION == "2") {
		v2();
	}
};
