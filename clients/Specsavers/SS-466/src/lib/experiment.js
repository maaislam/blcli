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

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

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
	pollerLite(
		[
			`.ss-homepage .sib-home section.bg-mono-light.centered[data-module="objective"]`,
		],
		() => {
			const randomInt = Math.floor(Math.random() * 3);
			const options = {
				prevNextButtons: false,
				pageDots: false,
				accessibility: true, //true by default
				autoPlay: 3000, // advance cells every 3 seconds
				cellAlign: "left",
				contain: false,
				draggable: true,
				wrapAround: true,
				initialIndex: randomInt,
				imagesLoaded: true,
				setGallerySize: false,
			};

			// get the element
			const element = document.querySelector(
				`.ss-homepage .sib-home section.bg-mono-light.centered[data-module="objective"]`
			);

			let serviceBannerDom;

			serviceBannerDom = `
                <div class="${ID}-service-banner">
                    <div class="banner-carousel_wrapper carousel">
						<div class="carousel-cell slide banner-slide">
							<div class="banner-slide-content">
								<a href="/eye-health/oct-scan" class="banner-slide-links">
									<img src="https://blcro.fra1.digitaloceanspaces.com/SS-466/eye_test.png" alt="Eye Icon" class="banner-slide-icon">
									<span class="banner-slide-title">Advanced eye tests</span>
								</a>
							</div>
						</div>
						<div class="carousel-cell slide banner-slide">
							<div class="banner-slide-content">
								<a href="/stores" class="banner-slide-links">
									<img src="https://blcro.fra1.digitaloceanspaces.com/SS-466/local_business.png" alt="Store Icon" class="banner-slide-icon">
									<span class="banner-slide-title">850 local businesses nationwide</span>
								</a>
							</div>
						</div>
						<div class="carousel-cell slide banner-slide">
							<div class="banner-slide-content">
								<a href="/home-eye-tests/eligibility" class="banner-slide-links">
									<img src="https://blcro.fra1.digitaloceanspaces.com/SS-466/home.png" alt="Home Icon" class="banner-slide-icon">
									<span class="banner-slide-title">Home eye tests</span>
								</a>
							</div>
						</div>
					</div>
                </div>
        	`;
			// element.insertAdjacentHTML("beforebegin", serviceBannerDom);
			if (!document.querySelector(`.${ID}-service-banner`)) {
				element.insertAdjacentHTML("beforebegin", serviceBannerDom);
			}
			pollerLite([`.${ID}-service-banner`], () => {
				var elem = document.querySelector(
					`.${ID}-service-banner .banner-carousel_wrapper`
				);
				var isInitiated = false;
				var slider;
				var isFlickity;
				if (window.innerWidth < 768) {
					slider = new Flickity(elem, options);
					isFlickity = true;

					if (!isInitiated) {
						const initailSlide =
							slider.cells[options.initialIndex].element;
						const offerName = initailSlide
							.querySelector(
								"a.banner-slide-links span.banner-slide-title"
							)
							.textContent.trim();
						fireEvent(
							`Carousel Initiated: In View - ${offerName} | ${
								options.initialIndex + 1
							}`,
							true
						);
						slider.on("change", function (index) {
							const currentSlide = slider.cells[index].element;
							const offerName = currentSlide
								.querySelector(
									"a.banner-slide-links span.banner-slide-title"
								)
								.textContent.trim();
							fireEvent(
								`Slide Changed: In View - ${offerName} | ${
									index + 1
								}`
							);
						});
						// slider.on("dragEnd", function (event, pointer) {
						// 	fireEvent(
						// 		`Interaction: User interacted with the carousel, Autoplay stopped`,
						// 		true
						// 	);
						// });
						slider.on("pointerUp", function (event, pointer) {
							slider.player.play();
						});
						isInitiated = true;
						slider.resize();
					}
				} else {
					if (isFlickity) {
						slider.destroy();
						isFlickity = !isFlickity;
					}
				}

				const allLinks = document.querySelectorAll(
					`.${ID}-service-banner .banner-slide a.banner-slide-links`
				);
				if (allLinks.length > 0) {
					allLinks.forEach((link, index) => {
						link.addEventListener("click", (e) => {
							const offerName = link
								.querySelector("span.banner-slide-title")
								.textContent.trim();
							fireEvent(
								`Offer Clicked: ${offerName} | ${index + 1}`
							);
						});
					});
				}

				window.addEventListener("resize", () => {
					if (window.innerWidth < 768) {
						slider = new Flickity(elem, options);
						isFlickity = true;
						if (!isInitiated) {
							const initailSlide =
								slider.cells[options.initialIndex].element;
							const offerName = initailSlide
								.querySelector(
									"a.banner-slide-links span.banner-slide-title"
								)
								.textContent.trim();
							fireEvent(
								`Carousel Initiated: In View - ${offerName} | ${
									options.initialIndex + 1
								}`,
								true
							);
							slider.on("change", function (index) {
								const currentSlide =
									slider.cells[index].element;
								const offerName = currentSlide
									.querySelector(
										"a.banner-slide-links span.banner-slide-title"
									)
									.textContent.trim();
								fireEvent(
									`Slide Changed: In View - ${offerName} | ${
										index + 1
									}`
								);
							});

							// slider.on("dragEnd", function (event, pointer) {
							// 	fireEvent(
							// 		`Interaction: User interacted with the carousel, Autoplay stopped`,
							// 		true
							// 	);
							// });
							slider.on("pointerUp", function (event, pointer) {
								slider.player.play();
							});

							isInitiated = true;
							slider.resize();
						}
					} else {
						if (isFlickity) {
							slider.destroy();
							isFlickity = !isFlickity;
							isInitiated = !isInitiated;
						}
					}
				});
			});
		}
	);
};
