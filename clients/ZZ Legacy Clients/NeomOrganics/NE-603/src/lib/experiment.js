/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";
import { content, paths } from "../data";

const { VARIATION, ID } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	const DESKTOP_WIDTH = 1087;

	function getDeviceSize() {
		if (window.innerWidth > DESKTOP_WIDTH) {
			return "desktop";
		}
		return "mobile";
	}

	function getLocale() {
		switch (location.host) {
			case "www.neomorganics.com":
				return "uk";
			case "neomorganics.eu":
				return "eu";
			case "us.neomorganics.com":
				return "us";
			default:
				return "uk";
		}
	}

	function insertElement(refEl, name, url) {
		const el = `<div class="column is-3-desktop is-4-tablet is-6-mobile ${ID}-${name}"><a href="${url}"><img src="" alt=""/></a></div>`;

		refEl.insertAdjacentHTML("beforebegin", el);

		function setImage() {
			const img = document.querySelector(`.${ID}-${name} img`);
			const locale = getLocale();

			if (name === "stocking-filler") {
				img.src = `https://blcro.fra1.digitaloceanspaces.com/NE-603/${getDeviceSize()}-${name}-${locale}.jpg`;
			} else {
				img.src = `https://blcro.fra1.digitaloceanspaces.com/NE-603/${getDeviceSize()}-${name}.jpg`;
			}
		}

		setImage();

		matchMedia(`(max-width: ${DESKTOP_WIDTH}px)`).addListener(setImage);

		// Tracking
		const link = document.querySelector(`.${ID}-${name} a`);
		link.addEventListener("click", () => fireEvent(`Clicked ${name}`));
	}

	const currentPath = window.location.pathname;
	const currentContent = paths[currentPath];

	const positions = [3, 8, 19, 24];

	if (currentContent) {
		currentContent.forEach((c, idx) => {
			pollerLite(
				[
					() =>
						!!document.querySelectorAll(
							".collection-section .container .columns > div"
						)[positions[idx]],
				],
				() => {
					insertElement(
						document.querySelectorAll(
							".collection-section .container .columns > div"
						)[positions[idx]],
						c,
						content[c].url
					);
				}
			);
		});
	}
};
