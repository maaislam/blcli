/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import Details from "./components/Details/Details";
import Extras from "./components/Extras/Extras";
import Grid from "./components/Grid/Grid";
import Specs from "./components/Specs/Specs";
import TonerInfo from "./components/TonerInfo/TonerInfo";

const { VARIATION, ID } = shared;

export default (data) => {
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

	function getTonerPrice() {
		const element = document.querySelector(
			".product__key_features .costper-page > span > span > span"
		);

		if (element) {
			return element.textContent
				.split("page")
				.map((s) => s.trim())
				.filter((s) => s != "");
		}
	}

	function getExtrasButtons() {
		const elements = document.querySelectorAll(".product__key_features .key__features li");

		if (elements) return [...elements];
	}

	function getSpecsButtons() {
		const elements = document.querySelectorAll(".featured__spec_link li button");

		if (elements) return [...elements];
	}

	(function hideOldKeyFeatures() {
		const elements = document.querySelectorAll("section.modal-section__container");

		for (let i = 0; i < elements.length; i += 1) {
			const title = elements[i].querySelector(".modal-section__title");

			if (title.textContent.trim() === "Key Features") {
				// Clone the element to remove event listeners
				const cloned = title.cloneNode(true);
				title.parentNode.replaceChild(cloned, title);
				cloned.classList.add(`${ID}-key-features-title`);
				elements[i].querySelector(".modal-section__body").style.display = "none";
			}
		}
	})();

	(function getRemainingData() {
		data["toner"] = getTonerPrice();
		data["extras"] = getExtrasButtons();
		data["specs"] = getSpecsButtons();
	})();

	(function renderElements() {
		const entry = document.querySelector(
			".product__main_container .container.bg-gray .modal-section__body"
		);

		if (entry) {
			const GridElement = Grid();

			entry.insertAdjacentElement("afterend", GridElement);

			(function renderTonerInfo() {
				GridElement.append(TonerInfo(data["toner"]));
			})();

			(function renderExtras() {
				GridElement.append(Extras(data["extras"]));
			})();

			(function renderDetails() {
				const detailsData = [
					{
						title: "Performance",
						items: data["performance"],
					},

					{
						title: "Technical Details",
						items: data["technical"],
					},
					{
						title: "Highlights",
						items: data["highlights"],
					},
					{
						title: "Media",
						items: data["media"],
					},
				];

				detailsData.forEach((d) => GridElement.append(Details(d)));
			})();

			(function renderSpecs() {
				GridElement.insertAdjacentElement("afterend", Specs(data["specs"]));

				const specs = document.querySelectorAll(`.${ID}-specs button`);

				specs.forEach((s) => {
					if (s.textContent.trim() === "Physical/Dimensions") {
						s.textContent = "Physical / Dimensions";
					}
				});
			})();

			(function repositionExtras() {
				const element = document.querySelector(`.${ID}-extras`);
				const mobileEntry = document.querySelector(`.${ID}-grid`);
				const desktopEntry = document.querySelector(`.${ID}-toner-info`);

				function reposition() {
					if (element) {
						if (window.innerWidth < 768) {
							mobileEntry.append(element);
						} else {
							desktopEntry.append(element);
						}
					}
				}

				reposition();

				window.addEventListener("resize", () => reposition());
			})();
		}
	})();

	(function addTrackingEvents() {
		const keyFeaturesElement = document.querySelector(`.${ID}-grid`);
		const specsButtons = document.querySelectorAll(`.${ID}-specs button`);

		if (keyFeaturesElement) {
			new IntersectionObserver(
				(i) => {
					if (i[0].isIntersecting) {
						fireEvent("Key Features in View", true);
					}
				},
				{ threshold: 0.15 }
			).observe(keyFeaturesElement);
		}

		if (specsButtons) {
			specsButtons.forEach((s) => {
				s.addEventListener("click", () => {
					const content = s.textContent.trim();
					fireEvent(`Detailed Spec Clicked (${content})`);
				});
			});
		}
	})();
};
