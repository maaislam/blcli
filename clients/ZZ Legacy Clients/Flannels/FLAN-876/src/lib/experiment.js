/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";
import obsIntersection from "./observeIntersection";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	const controlReviews = document.getElementById("pdp-expandable-section-4");

	if (!controlReviews) return;
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...
	document
		.getElementById("productDetails")
		.addEventListener("click", ({ target }) => {
			const targetMatched = (desiredMatch) =>
				target.matches(desiredMatch) || target.closest(desiredMatch);

			if (targetMatched(`#WAR`)) {
				fireEvent("user cliked write a review");
			} else if (targetMatched(".product-detail__anchor-link")) {
				fireEvent("user clicked read a review");
			}
		});

	const reviewSection = document.querySelector("#BVRRSearchContainer");
	const intersectionCallback = (entry) => {
		if (entry.isIntersecting) {
			fireEvent("review section in view");
		}
	};

	obsIntersection(reviewSection, 0.1, intersectionCallback);

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		const intersectionCallback = (entry) => {
			if (entry.isIntersecting) {
				fireEvent("review section in view");
			}
		};

		obsIntersection(controlReviews, 0.1, intersectionCallback);
		return;
	}

	const productIdElem = controlReviews.querySelector(
		'[data-bv-show="rating_summary"]'
	);
	const productId = productIdElem.dataset.bvProductId;
	const anchorElem = document.querySelector(".product-detail__name");

	controlReviews.querySelector("h2").classList.add(`${ID}__hide`);
	controlReviews
		.querySelector("div:first-child")
		.classList.add(`${ID}__hide`);

	const newRatingSummary = `<div class="${ID}__rating-summary"><div data-bv-show="rating_summary" data-bv-product-id="${productId}"></div></div>`;
	anchorElem.insertAdjacentHTML("afterend", newRatingSummary);

	//hide rating number val
	pollerLite([`.${ID}__rating-summary [itemprop="ratingValue"]`], () => {
		const ratingValElem = document.querySelector(
			`.${ID}__rating-summary [itemprop="ratingValue"]`
		);
		const ratingVal = ratingValElem.innerText;
		const reviewNum = document.querySelector(
			`.${ID}__rating-summary .bv_numReviews_text`
		).innerText;

		ratingValElem.classList.add(`${ID}__hide`);

		const intersectionCallback = (entry) => {
			if (
				entry.isIntersecting &&
				!document.querySelector(`.${ID}__seen`)
			) {
				entry.target.classList.add(`${ID}__seen`);
				fireEvent("Conditions Met");
				fireEvent(
					`user views review section with rating ${ratingVal} and ${
						reviewNum.match(/\d+/)[0]
					} reviews`
				);
			}
		};
		const newReviewBlock = document.querySelector(`.${ID}__rating-summary`);

		obsIntersection(newReviewBlock, 1, intersectionCallback);
	});
	pollerLite([`button.bv_button_buttonFull`, "#BVRRSearchContainer"], () => {
		const ratingButton = document.querySelector(
			`button.bv_button_buttonFull`
		);
		ratingButton?.addEventListener("click", () => {
			document.querySelector("#BVRRSearchContainer").scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
			setTimeout(() => {
				document.querySelector("#BVRRSearchContainer").scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}, 500);
			setTimeout(() => {
				document.querySelector("#BVRRSearchContainer").scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}, 1000);
			setTimeout(() => {
				document.querySelector("#BVRRSearchContainer").scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}, 1500);
		});
	});
};
