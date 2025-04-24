/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import AddToBag from "./addToBag";
export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	if (window.usabilla_live) {
		window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
	}

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

	const productData = [
		{
			imgURL: "https://boots.scene7.com/is/image/Boots/10291526?wid=500&hei=500&op_sharpen=1",
			productName: "Soltan Clear & Cool Protect Suncare Mist SPF30 200ml",
			productPrice: "£7.00",
			productLink:
				"https://www.boots.com/soltan-clear-and-cool-protect-suncare-mist-spf30-200ml-10291526",
			variantId: "10291526",
			sku: "2495517",
		},
		{
			imgURL: "https://boots.scene7.com/is/image/Boots/10210770?wid=500&hei=500&op_sharpen=1",
			productName: "Bondi Sands Everyday Gradual Tanning Milk 375ml",
			productPrice: "£12.99",
			productLink:
				"https://www.boots.com/bondi-sands-everyday-gradual-tanning-milk-375ml-10210770",
			variantId: "10210770",
			sku: "1798890",
		},
		{
			imgURL: "https://boots.scene7.com/is/image/Boots/10306562?wid=500&hei=500&op_sharpen=1",
			productName:
				"La Roche-Posay Anthelios UVMUNE 400 Invisible Fluid SPF50 50ML",
			productPrice: "£15.92",
			productLink:
				"https://www.boots.com/la-roche-posay-anthelios-uvmune-400-invisible-fluid-spf50-50ml-10306562",
			variantId: "10306562",
			sku: "2638595",
		},
		{
			imgURL: "https://boots.scene7.com/is/image/Boots/10172560?wid=500&hei=500&op_sharpen=1",
			productName:
				"Boots Hayfever & Allergy Relief 10mg Tablets (30 Tablets)",
			productPrice: "£5.49",
			productLink:
				"https://www.boots.com/boots-pharmaceuticals-hayfever-and-allergy-relief-10mg-tablets-30-days-supply-one-a-day-10172560",
			variantId: "10172560",
			sku: "1469783",
		},
		{
			imgURL: "https://boots.scene7.com/is/image/Boots/10187977?wid=500&hei=500&op_sharpen=1",
			productName:
				"Ambre Solaire Ultra-Hydrating Shea Butter Sun Protection Cream SPF50+ 200ml",
			productPrice: "£5.00",
			productLink:
				"https://www.boots.com/ambre-solaire-ultra-hydrating-sun-cream-spf50-plus-200ml-10187977",
			variantId: "10187977",
			sku: "1636107",
		},
		{
			imgURL: "https://boots.scene7.com/is/image/Boots/10024248?wid=500&hei=500&op_sharpen=1",
			productName:
				"Beconase Hayfever Relief for Adults Nasal Spray - 100 Sprays",
			productPrice: "£6.80",
			productLink:
				"https://www.boots.com/beconase-hayfever-relief-nasal-spray-for-adults-100-sprays-10024248",
			variantId: "10024248",
			sku: "8313",
		},
		{
			imgURL: "https://boots.scene7.com/is/image/Boots/10283567?wid=500&hei=500&op_sharpen=1",
			productName:
				"Soltan Kids Once 8hr Protect & Play Lotion SPF50+ 200ml",
			productPrice: "£10.00",
			productLink:
				"https://www.boots.com/soltan-kids-once-8hr-play-lotion-spf50-plus-200ml-10283567",
			variantId: "10283567",
			sku: "2423455",
		},
		{
			imgURL: "https://boots.scene7.com/is/image/Boots/10190807?wid=500&hei=500&op_sharpen=1",
			productName: "Boots Hayfever Relief 2% w/v Eye Drops - 10ml",
			productPrice: "£4.55",
			productLink:
				"https://www.boots.com/boots-pharmaceuticals-hayfever-relief-w-v-eye-drops-10ml-10190807",
			variantId: "10190807",
			sku: "1651551",
		},
	];

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	// const targetUrls = [
	// 	"https://www.boots.com/sale",
	// 	"https://www.boots.com/all-clearance",
	// 	"https://www.boots.com/baby-child/mothercare-clothing/mothercare-sale",
	// 	"https://www.boots.com/beauty/makeup/face",
	// 	"https://www.boots.com/beauty/makeup/lips",
	// 	"https://www.boots.com/beauty/makeup/eyes",
	// 	"https://www.boots.com/all-perfume",
	// 	"https://www.boots.com/fragrance/aftershave/mens-aftershave",
	// 	"https://www.boots.com/health-pharmacy/vitaminsandsupplements/multivitamins",
	// 	"https://www.boots.com/toiletries/hair/shampoo",
	// ];

	pollerLite([".product_listing_container .plp_gridView_redesign ul"], () => {
		const newProductsElement = document.createElement("li");
		newProductsElement.classList.add(`${ID}-plp-bundles`);
		newProductsElement.style.width = "100%";
		let items = "";

		productData.forEach((product) => {
			items += `
				<div class="swiper-slide product_card">
					<div class="product-image">
						<a href="${product.productLink}">
							<img src="${product.imgURL}" alt="${product.productName}" />
						</a>
					</div>
					<div class="product-details">
						<div class="product-title">
							<a href="${product.productLink}" title="${product.productName}">${product.productName}</a>
						</div>
						<div class="product-price">
							<span class="current-price">${product.productPrice}</span>
						</div>
						<button class="add-to-basket" data-model="${product.variantId}" data-name="${product.productName}" data-object="${product.sku}">Add to basket</button>
					</div>
				</div>
			`;
		});

		const newProductsElementHTML = `
					<div class="col-12 products-container">
						<h3>Shop Our Summer Essentials</h3>
						<div class="swiper-container">
							<div class="swiper-wrapper product_list">
								${items}
							</div>
							<div class="swiper-button-prev"></div>
							<div class="swiper-button-next"></div>
						</div> 
					</div>
				`;
		newProductsElement.insertAdjacentHTML(
			"beforeend",
			newProductsElementHTML
		);
		const productList = document.querySelectorAll(
			".product_listing_container .plp_gridView_redesign ul li"
		);
		if (productList.length > 0) {
			let className = "odd";
			productList.forEach((product) => {
				product.classList.add(className);
				className = className === "odd" ? "even" : "odd";
			});

			if (window.innerWidth < 1024) {
				if (productList.length > 3) {
					productList[3].insertAdjacentElement(
						"afterend",
						newProductsElement
					);
				} else {
					productList[productList.length - 1].insertAdjacentElement(
						"afterend",
						newProductsElement
					);
				}
			} else if (window.innerWidth < 1288) {
				if (productList.length > 5) {
					productList[5].insertAdjacentElement(
						"afterend",
						newProductsElement
					);
				} else {
					productList[productList.length - 1].insertAdjacentElement(
						"afterend",
						newProductsElement
					);
				}
			} else {
				if (productList.length > 7) {
					productList[7].insertAdjacentElement(
						"afterend",
						newProductsElement
					);
				} else {
					productList[productList.length - 1].insertAdjacentElement(
						"afterend",
						newProductsElement
					);
				}
			}
		}
		window.addEventListener("resize", () => {
			const newElement = document.querySelector(`.${ID}-plp-bundles`);
			const productList = document.querySelectorAll(
				`.product_listing_container .plp_gridView_redesign ul li:not(.${ID}-plp-bundles)`
			);
			if (productList.length > 0) {
				if (window.innerWidth < 1024) {
					if (productList.length > 3) {
						productList[3].insertAdjacentElement(
							"afterend",
							newElement
						);
					} else {
						productList[
							productList.length - 1
						].insertAdjacentElement("afterend", newElement);
					}
				} else if (window.innerWidth < 1288) {
					if (productList.length > 5) {
						productList[5].insertAdjacentElement(
							"afterend",
							newElement
						);
					} else {
						productList[
							productList.length - 1
						].insertAdjacentElement("afterend", newElement);
					}
				} else {
					if (productList.length > 7) {
						console.log(productList[7]);
						productList[7].insertAdjacentElement(
							"afterend",
							newElement
						);
					} else {
						productList[
							productList.length - 1
						].insertAdjacentElement("afterend", newElement);
					}
				}
			}
		});

		pollerLite([`.${ID}-plp-bundles`], () => {
			const allAnchorTags = document.querySelectorAll(
				`.${ID}-plp-bundles .product_card`
			);
			allAnchorTags.forEach((anchor) => {
				const title = anchor
					.querySelector(".product-title a")
					.innerText.trim();
				anchor.addEventListener("click", (e) => {
					const target = e.target;
					if (target.closest("a")) {
						fireEvent(
							`Click - User clicked a product on the recommendations: ${title}`
						);
					}
				});
			});

			const allATBButtons = document.querySelectorAll(
				`.${ID}-plp-bundles .product_card button.add-to-basket`
			);
			allATBButtons.forEach((button) => {
				const model = button.getAttribute("data-model");
				const name = button.getAttribute("data-name");
				const object = button.getAttribute("data-object");
				const addToBag = new AddToBag(
					object,
					parseInt(object, 10) - 1,
					model,
					name
				);
				button.addEventListener("click", (e) => {
					e.preventDefault();
					addToBag.add();
					fireEvent(
						`Click - User clicked add to basket from the recommendations`
					);
				});
			});
		});
		var scriptElement = document.createElement("script");
		// Set the source URL of the script
		scriptElement.setAttribute(
			"src",
			"https://blcro.fra1.digitaloceanspaces.com/KG-234/swiper-bundle.min.js"
		);
		// Append the script element to the document's head
		document.head.appendChild(scriptElement);
		// Handle the script load event
		scriptElement.addEventListener("load", function () {
			// Script has finished loading and executing
			console.log("Script loaded and executed");
			const swiper = new Swiper(
				`.${ID}-plp-bundles .products-container .swiper-container`,
				{
					slidesPerView: 5,
					loop: false,
					//slidesPerGroup: 1,
					spaceBetween: 10,
					//centerInsufficientSlides: true,

					navigation: {
						nextEl: `.${ID}-plp-bundles .swiper-container .swiper-button-next`,
						prevEl: `.${ID}-plp-bundles .swiper-container .swiper-button-prev`,
					},
					breakpoints: {
						320: {
							slidesPerView: "1.5",
							//slidesPerGroup: 1,
							spaceBetween: 10,
						},
						540: {
							slidesPerView: "2",
							//slidesPerGroup: 2,
							spaceBetween: 10,
						},
						600: {
							slidesPerView: "2",
							//slidesPerGroup: 3,
							spaceBetween: 10,
						},
						992: {
							slidesPerView: "3",
							//slidesPerGroup: 4,
							spaceBetween: 10,
						},
						1200: {
							slidesPerView: "5",
							//slidesPerGroup: 4,
							spaceBetween: 10,
						},
					},
				}
			);

			window.addEventListener("resize", () => {
				swiper.update();
			});
		});
	});
};
