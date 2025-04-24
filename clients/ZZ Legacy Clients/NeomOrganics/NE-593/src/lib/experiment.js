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
	const DESKTOP_WIDTH = 1087;
	const COSY_NIGHTS_PATH = "/collections/cosy-nights";
	const PRECIOUS_CANDLES_PATH = "/collections/candles";

	function getDeviceSize() {
		if (window.innerWidth > DESKTOP_WIDTH) {
			return "desktop";
		}
		return "mobile";
	}

	function getPageType() {
		switch (location.pathname) {
			case COSY_NIGHTS_PATH:
				return "cosy-nights";
			case PRECIOUS_CANDLES_PATH:
				return "candles";
			default:
				return "home-fragrance";
		}
	}

	function getImagePaths(page, idx) {
		return {
			mobile: `https://blcro.fra1.digitaloceanspaces.com/NE-593/${
				VARIATION == "1" ? page : "precious"
			}/mobile/${idx}.jpg`,
			desktop: `https://blcro.fra1.digitaloceanspaces.com/NE-593/${
				VARIATION == "1" ? page : "precious"
			}/desktop/${idx}.jpg`,
		};
	}

	function Block(images) {
		const el = document.createElement("div");

		el.classList.add(
			`${ID}-block`,
			"column",
			"is-3-desktop",
			"is-4-tablet",
			"is-6-mobile"
		);

		const url = VARIATION == "1" ? COSY_NIGHTS_PATH : PRECIOUS_CANDLES_PATH;

		el.innerHTML =
			location.pathname === COSY_NIGHTS_PATH ||
			(VARIATION == "2" && location.pathname === PRECIOUS_CANDLES_PATH)
				? /* html */ `<img src="" alt="" />`
				: /* html */ `<a href="${url}"><img src="" alt="" /></a>`;

		function setImage() {
			const img = el.querySelector("img");
			img.src = images[getDeviceSize()];
		}

		setImage();

		matchMedia(`(max-width: ${DESKTOP_WIDTH}px)`).addListener(setImage);

		return el;
	}

	const POSITION_INDICES = [2, 6];
	const columns = document.querySelectorAll("#MainContent .columns .column");

	if (columns[POSITION_INDICES[0]]) {
		setup();

		fireEvent("Conditions met");

		if (VARIATION == "control") {
			return;
		}

		const page = getPageType();

		POSITION_INDICES.forEach((posIdx, idx) => {
			const position = columns[posIdx] ? posIdx : columns.length - 1;

			columns[position].insertAdjacentElement(
				"afterend",
				Block(getImagePaths(page, idx + 1))
			);
		});

		// Tracking
		const blocks = document.querySelectorAll(`.${ID}-block`);

		blocks?.forEach((block, idx) => {
			new IntersectionObserver((intersections) => {
				if (intersections.some((i) => i.isIntersecting)) {
					fireEvent(`Block ${idx + 1} in view`, true);
				}
			}).observe(block);

			block
				.querySelector("a")
				?.addEventListener("click", () =>
					fireEvent(`Block ${idx + 1} clicked`)
				);

			if (
				location.pathname === COSY_NIGHTS_PATH ||
				location.pathname === PRECIOUS_CANDLES_PATH
			) {
				block.addEventListener("click", () =>
					fireEvent(`Block ${idx + 1} dead clicked`)
				);
			}
		});
		// Tracking end
	}
};
