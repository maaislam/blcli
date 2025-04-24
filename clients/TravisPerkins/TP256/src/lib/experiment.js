/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

import { getCookie } from "../../../../../lib/utils";
import newBanner from "./components/newBanner";
import newBannerMobile from "./components/newBannnerMobile";
import clickHandler from "./handlers/clickHandler";
import { isMobile, observeDOM } from "./helpers/utils";

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1500;
const isLoggedIn = () => !!getCookie("access_token");

const init = () => {
	setup();
	// Experiment Code...
	const attactPoint = document.querySelector(
		'[data-test-id="configurable-row"]'
	);
	if (
		!isLoggedIn() ||
		window.location.pathname !== "/" ||
		sessionStorage.getItem(`${ID}__newbanner`)
	) {
		document.querySelector(`.${ID}__newbanner`)?.remove();
		attactPoint.classList.remove(`${ID}__hide`);
		return;
	}

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
	//console.log(ID);

	attactPoint.classList.add(`${ID}__hide`);
	attactPoint.insertAdjacentHTML(
		"beforebegin",
		isMobile() ? newBannerMobile(ID) : newBanner(ID)
	);
	sessionStorage.setItem(`${ID}__newbanner`, "true");
};

export default () => {
	document.body.addEventListener("click", clickHandler);

	init();

	const mutationCallback = (urlChanged) => {
		urlChanged && setTimeout(init, DOM_RENDER_DELAY);
	};

	observeDOM("#app-container", mutationCallback);
};
