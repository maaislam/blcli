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

	const productTagNames = [
		// { name: "2 for 1 from £69", sku: "32524581" },
		{ name: "2 for 1 from £69", sku: "25670097" },
		{ name: "2 for 1 from £69", sku: "30827370" },
		{ name: "2 for 1 from £69", sku: "30516137" },
		{ name: "2 for 1 from £69", sku: "30398177" },
		{ name: "2 for 1 from £69", sku: "30768833" },
		{ name: "2 for 1 from £69", sku: "30734920" },
		{ name: "2 for 1 from £69", sku: "30766709" },
		{ name: "2 for 1 from £69", sku: "32745641" },
		{ name: "2 for 1 from £69", sku: "25670097" },
		{ name: "2 for 1 from £69", sku: "30516137" },
		{ name: "2 for 1 from £69", sku: "30801257" },
		{ name: "2 for 1 from £69", sku: "30830189" },
		{ name: "2 for 1 from £69", sku: "32261448" },
		{ name: "2 for 1 from £69", sku: "30801226" },
		{ name: "2 for 1 from £69", sku: "3080115" },
		{ name: "2 for 1 from £69", sku: "30881099" },
		{ name: "2 for 1 from £69", sku: "32258219" },
		{ name: "Glasses from £15", sku: "30880627" },
		{ name: "Glasses from £15", sku: "30880597" },
		{ name: "Glasses from £15", sku: "30880634" },
		{ name: "Glasses from £15", sku: "30880580" },
		{ name: "Glasses from £15", sku: "32365849" },
		{ name: "Glasses from £15", sku: "30880610" },
	];

	pollerLite(
		[
			`.ss-homepage section.divider-below[data-module="product-cards"] .product-wrapper .product-carousel .flickity-slider .carousel-cell`,
		],
		() => {
			const slides = document.querySelectorAll(
				`.ss-homepage section.divider-below[data-module="product-cards"] .product-wrapper .product-carousel .flickity-slider .carousel-cell`
			);
			if (slides.length > 0) {
				slides.forEach((slide) => {
					const anchorTag = slide.querySelector("a");
					if (anchorTag) {
						let sku = anchorTag
							.getAttribute("href")
							.split("sku=")[1];
						const productTag = productTagNames.find(
							(p) => p.sku == sku
						);

						if (productTag) {
							const tag = document.createElement("span");
							tag.className = "product-tag";
							tag.innerText = productTag.name;
							anchorTag.appendChild(tag);
						}

						anchorTag.addEventListener("click", (e) => {
							const name = slide
								.querySelector("span.product-name")
								?.textContent.trim();
							fireEvent(
								`Product Clicked sku: ${sku} name: ${name}`
							);
						});
						anchorTag
							.querySelector("img")
							.addEventListener("click", (e) => {
								const name = slide
									.querySelector("span.product-name")
									?.textContent.trim();
								fireEvent(
									`Product Clicked sku: ${sku} name: ${name}`
								);
							});
						anchorTag
							.querySelector(".product-details")
							.addEventListener("click", (e) => {
								const name = slide
									.querySelector("span.product-name")
									?.textContent.trim();
								fireEvent(
									`Product Clicked sku: ${sku} name: ${name}`
								);
							});
					}
				});
			}

			const activeSlides = document.querySelectorAll(
				`.ss-homepage section.divider-below[data-module="product-cards"] .product-wrapper .product-carousel .flickity-slider .carousel-cell.is-selected`
			);
			if (activeSlides.length > 0) {
				activeSlides.forEach((slide) => {
					const name = slide
						.querySelector("span.product-name")
						?.textContent.trim();
					const productTag = slide.querySelector("span.product-tag");
					if (productTag) {
						fireEvent(
							`Product Tags in view ${name} - ${productTag.textContent.trim()}`
						);
					}
				});
			}

			pollerLite([() => window.jQuery], () => {
				var flkty = $(
					`.ss-homepage section.divider-below[data-module="product-cards"] .product-wrapper .product-carousel`
				);

				let sliderInstance = Flickity.data(flkty[0]);
				sliderInstance.resize();

				flkty.on("change.flickity", function (index) {
					const activeSlides = document.querySelectorAll(
						`.ss-homepage section.divider-below[data-module="product-cards"] .product-wrapper .product-carousel .flickity-slider .carousel-cell.is-selected`
					);
					if (activeSlides.length > 0) {
						activeSlides.forEach((slide) => {
							const name = slide
								.querySelector("span.product-name")
								?.textContent.trim();
							const productTag =
								slide.querySelector("span.product-tag");
							if (productTag) {
								fireEvent(
									`Product Tags in view ${name} - ${productTag.textContent.trim()}`
								);
							}
						});
					}
				});
			});
		}
	);
};
