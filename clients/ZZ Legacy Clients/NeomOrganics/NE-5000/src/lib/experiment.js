/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
	setup,
	fireEvent,
	newEvents,
} from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	newEvents.property = "G-56NT7JG9ZC";
	setup();
	console.log("NE-5000");
	fireEvent("Checking NE-5000 GA-4 Event");
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
};
