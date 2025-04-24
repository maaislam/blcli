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

	if (VARIATION == "control") {
		return;
	}

	const data = {
		"/hire/c/cooling/air-conditioners": "v",
		"/hire/c/access/access-towers-and-platforms": "c",
		"/hire/c/gardening-and-landscaping/garden-shredders-and-wood-chippers": "v",
		"/hire/c/cleaning-and-floorcare/carpet-cleaners": "c",
		"/hire/c/cleaning-and-floorcare/pressure-washers": "v",
		"/hire/c/concreting-and-compaction/cutting-and-compaction": "c",
		"/hire/c/gardening-and-landscaping/lawn-care": "v",
		"/hire/c/access/ladders-and-steps": "c",
		"/hire/c/gardening-and-landscaping/": "v",
		"/hire/c/gardening-and-landscaping/hedge-and-tree-cutting": "c",
		"/hire/c/sanding-and-fixing/floor-sanders": "v",
		"/hire/c/gardening-and-landscaping/garden-clearance": "c",
		"/hire/c/breaking-and-drilling/electric-breakers": "c",
		"/hire/c/concreting-and-compaction/concrete-cement-mixers": "c",
		"/hire/c/power/generators": "v",
		"/hire/c/building-and-siteworks/excavators": "c",
		"/hire/c/powered-access/electric-scissor-lifts": "v",
		"/hire/c/sawing-and-cutting/masonry-cutting": "c",
		"/hire/c/powered-access/": "v",
		"/hire/c/sawing-and-cutting/tile-cutting": "c",
		"/hire/c/concreting-and-compaction/surface-preparation": "v",
		"/hire/c/painting-and-decorating/spray-systems": "c",
		"/hire/c/lifting-and-handling/trucks-and-trolleys": "v",
		"/hire/c/access/work-platforms": "c",
		"/hire/c/cleaning-and-floorcare/": "v",
		"/hire/c/cleaning-and-floorcare/vacuum-cleaners": "c",
		"/hire/c/sawing-and-cutting/timber-cutting": "v",
		"/hire/c/breaking-and-drilling/diamond-drills": "c",
		"/hire/c/cleaning-and-floorcare/floor-scrubbers": "v",
		"/hire/c/cooling/cooling-fans": "c",
		"/hire/c/breaking-and-drilling/": "v",
		"/hire/c/lifting-and-handling/": "c",
		"/hire/c/powered-access/electric-and-bi-energy-boom-lifts": "v",
		"/hire/c/pumping-and-drying/dryers": "c",
		"/hire/c/lifting-and-handling/material-lifts": "v",
		"/hire/c/cleaning-and-floorcare/steam-cleaners": "c",
		"/hire/c/powered-access/low-level-access": "v",
		"/hire/c/sawing-and-cutting/": "c",
		"/hire/c/breaking-and-drilling/hammer-drills": "v",
		"/hire/c/cooling/coolers": "c",
		"/hire/c/sanding-and-fixing/": "v",
		"/hire/c/sanding-and-fixing/orbital-and-belt-sanders": "c",
		"/hire/c/pumping-and-drying/pumping-and-pumps": "v",
		"/hire/c/painting-and-decorating/decorating": "c",
		"/hire/c/sawing-and-cutting/woodworking-and-joinery": "v",
		"/hire/c/breaking-and-drilling/chipping-hammers": "c",
		"/hire/c/access/trestles-stagings-and-steps": "v",
		"/hire/c/breaking-and-drilling/air-breakers": "c",
		"/hire/c/access/": "v",
		"/hire/c/building-and-siteworks/site-equipment": "c",
	};

	if (data[window.location.pathname] == "v") {
		const target = document.querySelector("div.item_spec_desc div.item_spec_details");

		const allParagraphs = target.querySelectorAll(":scope > p");

		const nonEmptyParagraphs = [...allParagraphs].filter((p) => p.textContent.trim().length > 0);

		const emptyParagraphs = [...allParagraphs].filter((p) => p.textContent.trim().length === 0);

		if (nonEmptyParagraphs.length > 0) {
			emptyParagraphs.forEach((p) => p.remove());
		}

		if (nonEmptyParagraphs.length > 1) {
			const showMoreBox = document.createElement("div");
			showMoreBox.classList.add(`${ID}-show-more-box`);
			showMoreBox.setAttribute("closed", "");

			const showMoreToggle = document.createElement("button");
			showMoreToggle.classList.add(`${ID}-show-more-toggle`);
			showMoreToggle.textContent = "read more";

			nonEmptyParagraphs.forEach((p, idx) => {
				if (idx > 0) {
					showMoreBox.append(p);
				}
			});

			target.append(showMoreBox);
			target.append(showMoreToggle);

			target.setAttribute("closed", "");

			showMoreToggle.addEventListener("click", () => {
				if (showMoreBox.hasAttribute("closed")) {
					target.removeAttribute("closed");
					showMoreBox.removeAttribute("closed");
					showMoreToggle.textContent = "read less";
					fireEvent("Click Read More CTA");
				} else {
					target.setAttribute("closed", "");
					showMoreBox.setAttribute("closed", "");
					showMoreToggle.textContent = "read more";
					fireEvent("Click Read Less CTA");
				}
			});
		}
	}
};
