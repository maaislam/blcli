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
import renderSlider from "./components/renderSlider";
// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");
	const config = {
		attributes: false,
		childList: true,
		subtree: false,
	};
	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...
	pollerLite(["#productDetails", "#aAddToBag"], () => {
		let atbButton = document.getElementById("aAddToBag");
		atbButton.addEventListener("click", (e) => {
			let sizeSelected = false;
			if (document.querySelector("#ulSizes")) {
				let allSizeButtons = document.querySelectorAll("#ulSizes li");
				if (allSizeButtons.length == 0) {
					sizeSelected = true;
				} else {
					[].slice.call(allSizeButtons).forEach((button) => {
						if (button.classList.contains("sizeVariantHighlight")) {
							sizeSelected = true;
						}
					});
				}
			} else if (document.querySelector("select#sizeDdl")) {
				sizeSelected =
					document.querySelector("select#sizeDdl").value !== "" &&
					document.querySelector("select#sizeDdl").value !== null &&
					document.querySelector("select#sizeDdl").value !== "0";
			} else if (!document.querySelector("#divSize select#sizeDdl")) {
				sizeSelected = true;
			}
			if (sizeSelected) {
				fireEvent("Click - User clicks ATB CTA");
			}
		});
	});
	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		pollerLite(
			[
				'[id^="divSwiper"].swiper-container.swiper-initialized',
				'[id^="divSwiper"].swiper-container.swiper-initialized .pinch-zoom-container img',
				() => {
					return window.productImageCarousel ? true : false;
				},
			],
			() => {
				fireEvent(`Visible - Image carousel loaded`);
				window.productImageCarousel
					.getSwiperElement()
					.swiperInstance.on("slideChange", function () {
						fireEvent(
							`Interaction - User interacted with the carousel`
						);
					});
				const ddlColours = document.querySelector(
					"#ddlColours span#spanDropdownSelectedText"
				);

				if (ddlColours) {
					const colorOptions = document.querySelectorAll(
						"#ddlColours li.image-dropdown-option"
					);
					if (colorOptions.length > 0) {
						colorOptions.forEach((item) => {
							item.addEventListener("click", () => {
								ddlColours.setAttribute(
									"data-value",
									item.getAttribute("data-value")
								);
							});
						});

						const colorObserver = new MutationObserver(
							(mutationList, observer) => {
								fireColorChangeEvent(
									`${ddlColours.getAttribute("data-value")}`
								);
							}
						);
						colorObserver.observe(ddlColours, config);
					}
				}

				function fireColorChangeEvent(colVarId) {
					let currentCarousel;
					if (colVarId) {
						currentCarousel =
							window.productImageCarousel.getSwiperElement(
								colVarId
							);
					} else {
						currentCarousel =
							window.productImageCarousel.getSwiperElement()
								.swiperInstance;
					}
					if (currentCarousel) {
						fireEvent(
							`Visible - Image carousel loaded after color change`
						);
						currentCarousel.on("slideChange", function () {
							fireEvent(
								`Interaction - User interacted with the carousel`
							);
						});
					}
				}
			}
		);
		return;
	}
	pollerLite(
		[
			'[id^="divSwiper"].swiper-container.swiper-initialized',
			'[id^="divSwiper"].swiper-container.swiper-initialized .pinch-zoom-container img',
			() => {
				return window.productImageCarousel ? true : false;
			},
		],
		() => {
			renderSlider(false);

			const ddlColours = document.querySelector(
				"#ddlColours span#spanDropdownSelectedText"
			);

			if (ddlColours) {
				const colorOptions = document.querySelectorAll(
					"#ddlColours li.image-dropdown-option"
				);
				if (colorOptions.length > 0) {
					colorOptions.forEach((item) => {
						item.addEventListener("click", () => {
							ddlColours.setAttribute(
								"data-value",
								item.getAttribute("data-value")
							);
						});
					});
					const colorObserver = new MutationObserver(
						(mutationList, observer) => {
							renderSlider(
								`${ddlColours.getAttribute("data-value")}`
							);
						}
					);
					colorObserver.observe(ddlColours, config);
				}
			}
		}
	);
};
