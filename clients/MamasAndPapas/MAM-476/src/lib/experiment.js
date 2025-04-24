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
import stickyCTARender from "./stickyCTArender";
import renderSingleProductInfo from "./renderSingleProductInfo";
import renderSelectOptions from "./renderSelectOptions";
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

	const renderStickyATB = (options) => {
		console.log(options);

		const stickyATBContainerDom = `
			<div class="${ID}-stickyATB">
				<div class="${ID}-stickyATB-col ${ID}-stickyATB-col-left">
					<div class="${ID}-stickyATB-col-inner"></div>
				</div>
				<div class="${ID}-stickyATB-col ${ID}-stickyATB-col-right"></div>
			</div>
		`;
		document.body.insertAdjacentHTML("beforeend", stickyATBContainerDom);

		//document.querySelector(`.${ID}-stickyATB`).classList.add("show");
		//const stickyATBContainer = document.querySelector(`.${ID}-stickyATB`);
		// const atbCTAText = options.atbCta
		// 	.querySelector("span[data-add-to-cart-text]")
		// 	?.innerText.trim();

		stickyCTARender(options);

		if (!options.bundleSet && !options.sizeSelector) {
			console.log("Single Product");
			renderSingleProductInfo(options);
		} else if (!options.bundleSet && options.sizeSelector) {
			const optionItems = options.sizeSelector.querySelectorAll("label");
			options["items"] = optionItems;
			options["type"] = "size";
			renderSelectOptions(options);
		} else if (options.bundleSet && !options.sizeSelector) {
			const optionItems = options.bundleSet.querySelectorAll("ul li");
			options["items"] = optionItems;
			options["type"] = "bundleset";
			renderSelectOptions(options);
		}

		window.addEventListener("scroll", () => {
			const targetDOM = document.querySelector(
				".product-single__wrapper .product-single__meta form button.product-form__cart-submit"
			);
			let offset1 = 5;
			let offset2 = 105;

			if (VARIATION == "3" || VARIATION == "4") {
				if (window.innerWidth < 768) {
					offset1 = 110;
					offset2 = 145;
				} else {
					offset1 = 165;
					offset2 = 200;
				}
			} else {
				if (window.innerWidth < 768) {
					topOffset = 175;
				}
			}
			if (
				targetDOM.getBoundingClientRect().bottom < offset1 &&
				!document
					.querySelector(`.${ID}-stickyATB`)
					.classList.contains(`showATB`)
			) {
				document.body.classList.add(`${ID}-shown`);
				document
					.querySelector(`.${ID}-stickyATB`)
					?.classList.add("showATB");
				fireEvent(`The sticky add to bag appeared to view`);
			} else if (targetDOM.getBoundingClientRect().bottom > offset2) {
				document.body.classList.remove(`${ID}-shown`);
				document
					.querySelector(`.${ID}-stickyATB`)
					?.classList.remove("showATB");
			}
		});
	};

	if (location.pathname.includes("/products/")) {
		pollerLite(
			[
				".product-single__wrapper .product-single__meta",
				".media-gallery-wrapper .slick-track .media-gallery__image:first-child img.product-featured-img[src]",
			],
			() => {
				const container = document.querySelector(
					".product-single__wrapper .product-single__meta"
				);

				const productTitle = container
					.querySelector(".product-single__title")
					?.innerText.trim();

				const price = container
					.querySelector(
						".product__price .price-item.price-item--sale"
					)
					?.innerText.trim();

				const wasPrice = container
					.querySelector(
						".product__price .price-item.price-item--regular"
					)
					?.innerText.trim();
				let discount = false;
				let discountDOM = container.querySelector(
					".product__price .price-item.price-item--save"
				);
				if (discountDOM && discountDOM.querySelector("span")) {
					discount = discountDOM.firstChild?.wholeText.trim();
				} else {
					discount = discountDOM?.innerText.trim();
				}
				const stockAndDeliveryMessage = container
					.querySelector(
						".product__stock-and-delivery .display.show span.product__delivery"
					)
					?.innerText.trim();

				const bundleSet = container.querySelector(
					".product__bundleset"
				);

				const atbCta = container.querySelector(
					"form button.product-form__cart-submit"
				);

				const productImage = document.querySelector(
					".media-gallery-wrapper .slick-track .media-gallery__image:first-child img.product-featured-img[src]"
				);

				const sizeSelector = container.querySelector(
					"form .selector-wrapper .selector"
				);

				var options = {
					productTitle: productTitle,
					price: price,
					wasPrice: wasPrice,
					discount: discount,
					stockAndDeliveryMessage: stockAndDeliveryMessage,
					bundleSet: bundleSet,
					atbCta: atbCta,
					productImage: productImage,
					sizeSelector: sizeSelector,
				};

				renderStickyATB(options);
			}
		);
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
