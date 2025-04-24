/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, poller, pollerLite } from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");
	const isPLP = pageMeta_PageType === "Browse" ? true : false;
	const isPDP = pageMeta_PageType === "ProductDetail" ? true : false;
	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		if (isPLP) {
			let hasReview = false;
			let ratingStar = 0;
			let reviewVolume = 0;
			pollerLite(
				[
					".s-productthumbbox .s-productthumbtext .reviews-container .bv_averageRating_component_container",
				],
				() => {
					document.body.classList.add(`${ID}-show-quickView`);
				}
			);
			document.body.addEventListener("click", (e) => {
				const target = e.target;
				if (
					target.closest(".hotspotbuy.hotspotquickbuy") ||
					target.matches(".hotspotbuy.hotspotquickbuy")
				) {
					const parent = target.closest("li");

					if (
						parent &&
						parent.querySelector(
							".s-productthumbbox .s-productthumbtext .reviews-container"
						)?.innerHTML !== ""
					) {
						hasReview = true;
						const starRatingElm = parent.querySelector(
							".s-productthumbbox .s-productthumbtext .reviews-container .bv_averageRating_component_container meta"
						);
						ratingStar = starRatingElm
							? starRatingElm.getAttribute("content").trim()
							: 0;

						const reviewCountElm = parent.querySelector(
							".s-productthumbbox .s-productthumbtext .reviews-container .bv_numReviews_component_container .bv_text"
						);
						reviewVolume = reviewCountElm
							? reviewCountElm.innerText
									.trim()
									.substring(
										1,
										reviewCountElm.innerText.trim().length -
											1
									)
							: 0;
					} else {
						hasReview = false;
					}
				}
			});

			pollerLite(["#hotspotModal"], () => {
				document
					.querySelector("#hotspotModal")
					.addEventListener("click", (e) => {
						let sizeSelected = false;
						let isSizeAvailable =
							document.querySelector("#ulHsSizes");
						let currSizes =
							document.querySelectorAll("#ulHsSizes li");
						if (isSizeAvailable) {
							for (
								let index = 0;
								index < currSizes.length;
								index++
							) {
								if (
									currSizes[index].classList.contains(
										"hsVariantHighlight"
									)
								) {
									sizeSelected = true;
									break;
								}
							}
						} else {
							sizeSelected = true;
						}

						if (
							(e.target.id == "addHotspotToBag" ||
								e.target.closest("#addHotspotToBag")) &&
							sizeSelected &&
							hasReview
						) {
							const data = {
								action: "Add to bag",
								productType: "Reviewed Product",
								AverageStarRating: ratingStar,
								volumeOfReviews: reviewVolume,
							};
							fireEvent(`PLP - ${JSON.stringify(data)}`);
							hasReview = false;
						}
					});
			});
		}

		if (isPDP) {
			pollerLite(["#productDetails", "#aAddToBag"], () => {
				let atbButton = document.getElementById("aAddToBag");

				atbButton.addEventListener("click", (e) => {
					let sizeSelected = false;
					if (document.querySelector("#ulSizes")) {
						let allSizeButtons =
							document.querySelectorAll("#ulSizes li");
						if (allSizeButtons.length == 0) {
							sizeSelected = true;
						} else {
							[].slice.call(allSizeButtons).forEach((button) => {
								if (
									button.classList.contains(
										"sizeVariantHighlight"
									)
								) {
									sizeSelected = true;
								}
							});
						}
					} else if (document.querySelector("select#sizeDdl")) {
						sizeSelected =
							document.querySelector("select#sizeDdl").value !==
								"" &&
							document.querySelector("select#sizeDdl").value !==
								null &&
							document.querySelector("select#sizeDdl").value !==
								"0";
					} else if (
						!document.querySelector("#divSize select#sizeDdl")
					) {
						sizeSelected = true;
					}
					if (
						sizeSelected &&
						(document.querySelector("#pdp-expandable-section-4") ||
							document.querySelector(
								'#main .reviews-container div[data-bv-show="reviews"]'
							))
					) {
						var ratingValue = 0;
						const ratingValueElm = document.querySelector(
							"#pdp-expandable-section-4 .rating-container .bv_avgRating_component_container[itemprop='ratingValue']"
						);
						var reviewVolume = 0;
						const reviewVolumeELM = document.querySelector(
							"#pdp-expandable-section-4 .rating-container .bv_numReviews_component_container meta[itemprop='reviewCount']"
						);
						reviewVolume = reviewVolumeELM
							? reviewVolumeELM.getAttribute("content").trim()
							: 0;

						ratingValue = ratingValueElm
							? ratingValueElm.innerText.trim()
							: document
									.querySelector(
										"#pdp-expandable-section-4 .rating-container .bv_numReviews_component_container .bv_numReviews_text"
									)
									?.innerText.trim()[1];

						const data = {
							action: "Add to bag",
							productType: "Reviewed Product",
							AverageStarRating: ratingValue,
							volumeOfReviews: reviewVolume,
						};
						fireEvent(`PDP - ${JSON.stringify(data)}`);
					}
				});

				var isFired = false;
				document.addEventListener("scroll", (e) => {
					if (!isFired) {
						const targetDom = document
							.querySelector(`#BVRRSearchContainer`)
							.closest("div[data-bv-show='reviews']");
						if (targetDom) {
							var position = targetDom.getBoundingClientRect();
							if (
								position.top < window.innerHeight / 2 &&
								position.bottom > window.innerHeight / 2
							) {
								fireEvent(
									"PDP - Customer sees reviews section"
								);
								isFired = true;
							}
						}
					}
				});
			});

			pollerLite(
				[
					"#BVRRContainer .bv-content-pagination-container button.bv-content-btn",
				],
				() => {
					const viewMore = document.querySelector(
						"#BVRRContainer .bv-content-pagination-container button.bv-content-btn"
					);
					viewMore?.addEventListener("click", () => {
						fireEvent("PDP - Interaction with load more reviews");
					});
				}
			);
		}
		return;
	}

	if (isPLP) {
		pollerLite(["#hotspotModal"], () => {
			document
				.querySelector("#hotspotModal")
				.addEventListener("click", (e) => {
					let sizeSelected = false;
					let isSizeAvailable = document.querySelector("#ulHsSizes");
					let currSizes = document.querySelectorAll("#ulHsSizes li");
					if (isSizeAvailable) {
						for (let index = 0; index < currSizes.length; index++) {
							if (
								currSizes[index].classList.contains(
									"hsVariantHighlight"
								)
							) {
								sizeSelected = true;
								break;
							}
						}
					} else {
						sizeSelected = true;
					}

					if (
						(e.target.id == "addHotspotToBag" ||
							e.target.closest("#addHotspotToBag")) &&
						sizeSelected
					) {
						fireEvent(
							"PLP - User added no review product to bag from quick view"
						);
					}
				});
		});
	}

	if (isPDP) {
		pollerLite(["#productDetails", "#aAddToBag"], () => {
			let atbButton = document.getElementById("aAddToBag");

			atbButton.addEventListener("click", (e) => {
				let sizeSelected = false;
				if (document.querySelector("#ulSizes")) {
					let allSizeButtons =
						document.querySelectorAll("#ulSizes li");
					if (allSizeButtons.length == 0) {
						sizeSelected = true;
					} else {
						[].slice.call(allSizeButtons).forEach((button) => {
							if (
								button.classList.contains(
									"sizeVariantHighlight"
								)
							) {
								sizeSelected = true;
							}
						});
					}
				} else if (document.querySelector("select#sizeDdl")) {
					sizeSelected =
						document.querySelector("select#sizeDdl").value !== "" &&
						document.querySelector("select#sizeDdl").value !==
							null &&
						document.querySelector("select#sizeDdl").value !== "0";
				} else if (!document.querySelector("#divSize select#sizeDdl")) {
					sizeSelected = true;
				}
				if (sizeSelected) {
					fireEvent("PDP - User added no review product to bag");
				}
			});
		});
	}
	// Write experiment code here
	// ...
};
