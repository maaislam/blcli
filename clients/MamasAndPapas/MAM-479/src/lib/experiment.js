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
	pollerLite(
		[".slider.media-gallery-wrapper", ".slider.media-gallery-nav-wrapper"],
		() => {
			// On before slide change
			$(".slider.media-gallery-wrapper").on(
				"afterChange",
				function (event, slick, currentSlide) {
					fireEvent(`Used carousel - User changed carousel slide`);
				}
			);
		}
	);
	pollerLite(
		[
			".product-form__controls-group .product-form__item--submit button.product-form__cart-submit",
		],
		() => {
			const ATB = document.querySelector(
				".product-form__controls-group .product-form__item--submit button.product-form__cart-submit"
			);
			ATB?.addEventListener("click", (e) => {
				fireEvent(`User Clicked ATB`);
			});
		}
	);

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

	// Store the images in descending order
	const highChairImages = [
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/115254000_Happy_Planet_Snax_Why_Buy_Me_3.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/115254000_Happy_Planet_Snax_Why_Buy_Me_2.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/115254000_Happy_Planet_Snax_Why_Buy_Me_1.jpg",
	];
	const playmatImages = [
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/7594WC100_%20Playmat_Gym_WUAC_3.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/7594WC100_%20Playmat_Gym_WUAC_2.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/7594WC100_%20Playmat_Gym_WUAC_1.jpg",
	];

	const blossomImages = [
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7400_%20Blossom_Bug_Blossom_3.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7400_%20Blossom_Bug_Blossom_2.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7400_%20Blossom_Bug_Blossom_1.jpg",
	];
	const bluebellImages = [
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7100_%20Bluebell_Bug_Bluebell_3.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7100_%20Bluebell_Bug_Bluebell_2.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7100_%20Bluebell_Bug_Bluebell_1.jpg",
	];
	const eucalyptusImages = [
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7600_Eucalyptus_Bug_Eucalyptus_3.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7600_Eucalyptus_Bug_Eucalyptus_2.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7600_Eucalyptus_Bug_Eucalyptus_1.jpg",
	];
	const pebbleGreyImages = [
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7500_Pebble_Grey_Bug_Pebble_Grey_3.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7500_Pebble_Grey_Bug_Pebble_Grey_2.jpg",
		"https://blcro.fra1.digitaloceanspaces.com/MAM-479/9868L7500_Pebble_Grey_Bug_Pebble_Grey_1.jpg",
	];

	pollerLite(
		[
			".slider.media-gallery-wrapper.slick-initialized",
			".slider.media-gallery-nav-wrapper.slick-initialized",
		],
		() => {
			const caption = document
				.querySelector(".media-gallery .caption")
				.innerText.trim();
			const pathname = location.pathname;
			// let images;
			let data;
			// Store the replace and remove positions in descending order
			if (
				pathname.includes(
					"products/snax-highchair-happy-planet-115254000"
				)
			) {
				//images = highChairImages;
				data = {
					images: highChairImages,
					replaceItems: [6, 4, 3],
					removeItem: [7],
				};
			} else if (
				pathname.includes(
					"products/playmat-gym-wish-upon-a-cloud-7594wc100"
				)
			) {
				//images = playmatImages;
				data = {
					images: playmatImages,
					replaceItems: [6, 5, 4],
					removeItem: false,
				};
			} else if (
				pathname.includes(
					"products/baby-bug-and-activity-tray-9868l7600"
				)
			) {
				//images = eucalyptusImages;
				data = {
					images: eucalyptusImages,
					replaceItems: [11, 10, 9],
					removeItem: [12],
				};
			} else if (
				pathname.includes(
					"products/baby-bug-and-activity-tray-9868l7500"
				)
			) {
				//images = pebbleGreyImages;
				data = {
					images: pebbleGreyImages,
					replaceItems: [9, 8, 7],
					removeItem: [13, 12, 11, 10],
				};
			} else if (
				pathname.includes(
					"products/baby-bug-and-activity-tray-9868l7400"
				)
			) {
				//images = blossomImages;
				data = {
					images: blossomImages,
					replaceItems: [9, 8, 7],
					removeItem: [14, 13, 12, 11, 10],
				};
			} else if (
				pathname.includes(
					"products/baby-bug-and-activity-tray-9868l7100"
				)
			) {
				//images = bluebellImages;
				data = {
					images: bluebellImages,
					replaceItems: [10, 9, 8],
					removeItem: [13, 12, 11],
				};
			}
			// Replace Slides
			data.images.forEach((img, index) => {
				if (img) {
					const position = data.replaceItems[index] - 1;
					const slide = `<div id="FeaturedImageZoom-product-template-${index}-wrapper" class="media-gallery__image">
									<div id="FeaturedImageZoom-product-template-${index}" class="product-single__photo js-zoom-enabled product-single__photo--has-thumbnails" data-image-id="${index}" data-zoom="${img}">
										<img id="FeaturedImage-product-template-${index}" class="feature-row__image product-featured-img" tabindex="-1" alt="${caption}" style="opacity: 1;" src="${img}">
										<div class="caption">${caption}</div>
								</div>`;

					const nav = `
						<div class="media-gallery-nav__thumbnails">
							<div class="media-gallery-nav__thumbnail-wrapper">
								<img class="media-gallery-nav__thumbnail-image" data-widths="100" data-sizes="auto" alt="" src="${img}" style="opacity: 1;">
							</div>
						</div>`;
					if ($) {
						$(".slider.media-gallery-wrapper")
							.slick("getSlick")
							.slickRemove(position);
						$(".slider.media-gallery-nav-wrapper")
							.slick("getSlick")
							.slickRemove(position);

						$(".slider.media-gallery-wrapper")
							.slick("getSlick")
							.slickAdd(slide, position, true);
						$(".slider.media-gallery-nav-wrapper")
							.slick("getSlick")
							.slickAdd(nav, position, true);
					}
					$(".slider.media-gallery-wrapper").slick("refresh");
					$(".slider.media-gallery-nav-wrapper").slick("refresh");
				}
			});
			// Remove Items
			if (data.removeItem) {
				data.removeItem.forEach((position, index) => {
					if ($ && position) {
						$(".slider.media-gallery-wrapper")
							.slick("getSlick")
							.slickRemove(position - 1);
						$(".slider.media-gallery-nav-wrapper")
							.slick("getSlick")
							.slickRemove(position - 1);
					}
				});
				$(".slider.media-gallery-wrapper").slick("refresh");
				$(".slider.media-gallery-nav-wrapper").slick("refresh");
			}
			fireEvent(`Infographic visible`);
		}
	);
};
