/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { VARIATION, ID } = shared;

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

	const newContentContainer = /* html */ `
	<div class="${ID}-new-section shopify-section">
		<section class="marketing-panel section  is-small">
			<div class="container">
				<div class="${ID}-content columns is-multiline is-mobile is-centered"></div>
			</div>
		</section>
	</div>
	`;

	function newContentBlock(url, background) {
		return /* html */ `
		<div class="${ID}-content-block column is-6-desktop is-full-tablet is-full-mobile " data-contrast="21.0">
			<a href="${url}">
				<div class="is-flex is-flex-column height-100">        
					<div class="panel-cover-image has-bg-size-cover height-100 has-aspect-ratio-1-1 has-aspect-ratio-1-1-mobile" style="background-image:url('${background}')">
						<div class="panel-cover-content">
							<div class="marketing-panel--section is-flex is-flex-column is-reduced-horizontal is-reduced content height-100-tablet"></div>
						</div>
					</div>
				</div>
			</a>
		</div>`;
	}

	function addNewContentBlock(url, background) {
		const contentContainer = document.querySelector(`.${ID}-content`);
		contentContainer.insertAdjacentHTML(
			"beforeend",
			newContentBlock(url, background)
		);
	}

	const entry = document.querySelectorAll("main .shopify-section")[2];
	entry.insertAdjacentHTML("beforebegin", newContentContainer);

	if (VARIATION == "1") {
		addNewContentBlock(
			"https://www.neomorganics.com/products/the-great-days-good-nights-box",
			"https://blcro.fra1.digitaloceanspaces.com/NE-600/static-3.jpg"
		);
		addNewContentBlock(
			"https://www.neomorganics.com/products/the-great-days-good-nights-box",
			"https://blcro.fra1.digitaloceanspaces.com/NE-600/static-4.jpg"
		);
	} else {
		addNewContentBlock(
			"https://www.neomorganics.com/products/the-great-days-good-nights-box",
			"https://blcro.fra1.digitaloceanspaces.com/NE-600/gif-2.gif"
		);
	}

	document.querySelectorAll(`.${ID}-content-block`).forEach((block, idx) => {
		block.addEventListener("click", () => {
			fireEvent(`Clicked (${idx})`);
		});

		new IntersectionObserver((intersections) => {
			if (intersections.some((i) => i.isIntersecting)) {
				fireEvent(`In viewport (${idx})`);
			}
		}).observe(block);
	});
};
