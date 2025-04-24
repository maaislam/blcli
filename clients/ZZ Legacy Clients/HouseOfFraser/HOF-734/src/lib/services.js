import { events, fullStory } from "../../../../../lib/utils";
import shared from "./shared";

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
	Object.keys(data).forEach((key) => {
		shared[key] = data[key];
	});
};

/**
 * Standard experiment setup
 */
export const setup = () => {
	const { ID, VARIATION, CLIENT, LIVECODE } = shared;

	// set up events
	events.setDefaultCategory("Experimentation");
	events.setDefaultAction(CLIENT + " - " + ID);

	/** Use fullStory API to tag screen recording with experiment info */
	fullStory(ID, `Variation ${VARIATION}`);

	/** Namespace with body classes for easier CSS specificity */
	document.body.classList.add(ID);
	// if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
	document.body.classList.add(`${ID}-${VARIATION}`);
};

export const getPageData = () => {
	let dataObject;
	for (let i = 0; i < window.dataLayer.length; i += 1) {
		const data = window.dataLayer[i];
		if (
			typeof data === "object" &&
			data.event &&
			data.event === "HOF_onLoad"
		) {
			dataObject = data;
			break;
		}
	}
	return dataObject;
};
