/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {
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
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	const TABLET_WIDTH = 768;
	const DESKTOP_WIDTH = 1087;

	const entries = {
		mobile: {
			1: document.querySelectorAll("#MainContent .columns .column")[4],
			2: document.querySelectorAll("#MainContent .columns .column")[5],
		},
		tablet: {
			1: document.querySelectorAll("#MainContent .columns .column")[6],
			2: document.querySelectorAll("#MainContent .columns .column")[8],
		},
		desktop: {
			1: document.querySelectorAll("#MainContent .columns .column")[6],
			2: document.querySelectorAll("#MainContent .columns .column")[7],
		},
	};

	function getDeviceSize() {
		if (window.innerWidth > DESKTOP_WIDTH) {
			return "desktop";
		}
		if (window.innerWidth > TABLET_WIDTH) {
			return "tablet";
		}
		return "mobile";
	}

	function insertInGrid(refEl, name, url) {
		const el = `<div class="column is-3-desktop is-4-tablet is-6-mobile ${ID}-${name}"><a href="${url}"><img src="" alt=""/></a></div>`;

		refEl.insertAdjacentHTML("beforebegin", el);

		function setImage() {
			const img = document.querySelector(`.${ID}-${name} img`);
			img.src = `https://blcro.fra1.digitaloceanspaces.com/NE-608/${
				getDeviceSize() === "mobile" ? "mobile" : "desktop"
			}-${name}.jpg`;
		}

		setImage();

		matchMedia(`(max-width: ${DESKTOP_WIDTH}px)`).addListener(setImage);

		// Tracking
		const link = document.querySelector(`.${ID}-${name} a`);
		link.addEventListener("click", () => fireEvent(`Clicked`));
	}

	function insertBlock(name, url) {
		function injectElement() {
			if (document.querySelector(`.${ID}-${name}`)) {
				document.querySelector(`.${ID}-${name}`).remove();
			}

			const el = `<div class="column is-6-desktop is-12-tablet is-12-mobile ${ID}-${name}"><a href="${url}"><img src="https://blcro.fra1.digitaloceanspaces.com/NE-608/block.jpg" alt=""/></a></div>`;

			entries[getDeviceSize()][VARIATION].insertAdjacentHTML("beforebegin", el);

			// Tracking
			const link = document.querySelector(`.${ID}-${name} a`);
			link.addEventListener("click", () => fireEvent(`Clicked`));
		}

		injectElement();
		matchMedia(`(max-width: ${DESKTOP_WIDTH}px)`).addListener(injectElement);
		matchMedia(`(max-width: ${TABLET_WIDTH}px)`).addListener(injectElement);
	}

	if (VARIATION == "1") {
		insertBlock("cracker", "/pages/build-a-cracker");
	} else {
		insertInGrid(
			entries[getDeviceSize()][VARIATION],
			"cracker",
			"/pages/build-a-cracker"
		);
	}
};
