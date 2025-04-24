// import { keys } from "lodash";
import shared from "../../../../../../core-files/shared";

/**
 * Rebuild the main product slider
 */
const { ID } = shared;

export default class MainImageCarousel {
	constructor() {
		this.create();
		this.render();
		this.slickImages();
	}

	create() {
		const element = document.createElement("div");
		element.classList.add(`${ID}-productSlider`);
		element.innerHTML = `
            <div class="${ID}-images"></div>
            <div class="${ID}-thumbnails"></div>`;

		// get images from data object
		const allImages = document.querySelectorAll(
			".product-col-1.product-image-container #thumbnails .thumb:not(.slick-cloned) .productthumbnail"
		);

		for (let i = allImages.length - 1; i >= 0; i--) {
			const imageBlock = allImages[i];
			const imageObj = JSON.parse(imageBlock.getAttribute("data-lgimg"));
			if (imageObj) {
				const sliderImage = `<img class="${ID}-image" src="${imageObj.url}"/>`;
				element
					.querySelector(`.${ID}-images`)
					.insertAdjacentHTML(`afterbegin`, sliderImage);
				element
					.querySelector(`.${ID}-thumbnails`)
					.insertAdjacentHTML(`afterbegin`, sliderImage);
			}
		}

		this.component = element;
	}

	render() {
		const { component } = this;
		document
			.querySelector(`.${ID}-mainSlider`)
			.insertAdjacentElement("afterbegin", component);
	}

	slickImages() {
		const noOfImages = document.querySelectorAll(
			".product-col-1.product-image-container #thumbnails .thumb:not(.slick-cloned) .productthumbnail"
		).length;

		window.jQuery(`.${ID}-productSlider .${ID}-images`).slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			asNavFor: `.${ID}-productSlider .${ID}-thumbnails`,
			fade: true,
			initialSlide: 1,
		});

		window.jQuery(`.${ID}-productSlider .${ID}-thumbnails`).slick({
			slidesToShow: noOfImages,
			slidesToScroll: 1,
			arrows: false,
			asNavFor: `.${ID}-productSlider .${ID}-images`,
			dots: false,
			vertical: false,
			centerMode: true,
			centerPadding: "10px",
			focusOnSelect: true,
			draggable: false,
			initialSlide: 1,
			responsive: [
				{
					breakpoint: 5000,
					settings: {
						slidesToShow: noOfImages,
						slidesToScroll: 1,
						vertical: true,
					},
				},
				{
					breakpoint: 1024,
					settings: {
						vertical: false,
						slidesToShow: noOfImages,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: noOfImages,
						slidesToScroll: 1,
						vertical: false,
					},
				},
			],
		});

		Object.keys(window.HCcolours).forEach((item) => {
			window
				.jQuery(`.${ID}-productSlider .${ID}-images`)
				.slick(
					"slickAdd",
					`<img class="${ID}-image" attr="${window.HCcolours[item].id}" src="${window.HCcolours[item].image}" aria-hidden="false">`
				);
		});
		// // charcoal
		// window
		// 	.jQuery(`.${ID}-productSlider .${ID}-images`)
		// 	.slick(
		// 		"slickAdd",
		// 		'<img class="HC129B-image" attr="472727" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw712394ec/images/472727-new-2.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">'
		// 	);
		// // white
		// window
		// 	.jQuery(`.${ID}-productSlider .${ID}-images`)
		// 	.slick(
		// 		"slickAdd",
		// 		'<img class="HC129B-image" attr="472725" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwdc76ae1b/images/472725-new-2.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">'
		// 	);
		// // stellar white
		// window
		// 	.jQuery(`.${ID}-productSlider .${ID}-images`)
		// 	.slick(
		// 		"slickAdd",
		// 		'<img class="HC129B-image" attr="472810" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw5d322592/images/472802.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">'
		// 	);

		// // copper
		// window
		// 	.jQuery(`.${ID}-productSlider .${ID}-images`)
		// 	.slick(
		// 		"slickAdd",
		// 		'<img class="HC129B-image" attr="472809" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw6b770db5/images/472809gold.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">'
		// 	);

		// window
		// 	.jQuery(`.${ID}-productSlider .${ID}-images`)
		// 	.slick(
		// 		"slickAdd",
		// 		'<img class="HC129B-image" attr="472809" src="https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw9dc912a8/images/472809-new.jpg?sw=500&sh=500&sm=fit" aria-hidden="false">'
		// 	);
	}
}
