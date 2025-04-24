/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import getProductsBySKU from "./getProductsInfo";
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
	pollerLite([".drawer__main", ".product-form__cart-submit"], () => {
		const targetNode = document.querySelector(".drawer__main");
		const config = { attributes: false, childList: true, subtree: true };
		const productTitle = document.querySelector(".product-single__title");
		let status = false;
		const callback = function (mutationsList, observer) {
			fetch("https://www.mamasandpapas.com/cart?view=json")
				.then((response) => response.json())
				.then((data) => {
					var isFound = false;
					if (data.itemsComplete.length > 0) {
						for (let i = 0; i < data.itemsComplete.length; i++) {
							for (const [index, value] of Object.entries(
								data.itemsComplete[i]
							)) {
								if (
									value.product.title ===
									productTitle.innerText.trim()
								) {
									isFound = true;
									const eventData = {
										action: "Add to Bag",
										AddedFrom: "Default PDP page",
										ProductTitle: value.product.title,
										price: value.product.price / 100,
									};
									fireEvent(`${JSON.stringify(eventData)}`);
									status = true;
								}
							}
							if (isFound) {
								break;
							}
						}
					}
				});
		};
		const observer = new MutationObserver(callback);

		document
			.querySelector(".product-form__cart-submit")
			.addEventListener("click", function (e) {
				observer.observe(targetNode, config);
			});
		document
			.querySelector(".drawer__footer .cart__checkout")
			.addEventListener("click", (e) => {
				if (status) {
					fireEvent("Customer adds to bag and proceeds to view bag");
				}
			});
	});
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
	getProductsBySKU();
	var variationOne = (cartItems) => {
		var skuItems = JSON.parse(sessionStorage.getItem(`${ID}-skuItems`));
		// var filteredSkuItems = [];
		// var carouselItem;
		// var shouldFilter = false;
		// if (shouldFilter) {
		// 	for (let index = 0; index < skuItems.length; index++) {
		// 		var shouldAdd = false;
		// 		if (cartItems.length > 0) {
		// 			for (let j = 0; j < cartItems.length; j++) {
		// 				var shouldbreak = false;
		// 				for (const [k, value] of Object.entries(cartItems[j])) {
		// 					if (
		// 						value.product.variants[0].sku ===
		// 						skuItems[index].sku
		// 					) {
		// 						cartItems.splice(j, 1);
		// 						shouldAdd = false;
		// 						shouldbreak = true;
		// 					} else {
		// 						shouldAdd = true;
		// 					}
		// 				}
		// 				if (shouldbreak) {
		// 					break;
		// 				}
		// 			}
		// 		} else {
		// 			shouldAdd = true;
		// 		}
		// 		if (shouldAdd) {
		// 			filteredSkuItems.push(skuItems[index]);
		// 		}
		// 	}
		// 	carouselItem = filteredSkuItems;
		// } else {
		// 	carouselItem = skuItems;
		// }
		var variationOneParent = `
		<div class="${ID}-parent-container">
			<div class="${ID}-main-mssg-container">
				<div class="drawer__header">
					<span class="title">Add a furry friend</span>
				</div>
			</div>
			<div class="${ID}-main-slider-container">
			${skuItems
				.map((item) => {
					let price = (Number(item.prodPrice) * 100) / 100;
					if (price.toString().includes(".")) {
						price = parseFloat(price).toFixed(2);
					}

					return `
					<div class="${ID}-product-parent-container">
						<img class="${ID}-img-container" src="${item.prodImg}"></img>
						<div class="${ID}-product-name">${item.prodName}</div>
						<div class="${ID}-item-price">£${price}</div>
						<a href="#" data-id="${item.prodID}" class="btn ${ID}-item-btn">Add to Bag</a>
					</div>
					`;
				})
				.join("\n")}
			</div>
		</div>
		`;
		if (!document.querySelector(`.${ID}-parent-container`)) {
			document
				.querySelector(".drawer__footer .cart__checkout-info")
				.insertAdjacentHTML("beforebegin", variationOneParent);
			if (!document.body.classList.contains(`${ID}-shown-carousel`)) {
				document.body.classList.add(`${ID}-shown-carousel`);
			}
		}

		let status = false;

		document.querySelectorAll(`.${ID}-item-btn`).forEach((item) => {
			item.addEventListener("click", function (e) {
				var attr = item.getAttribute("data-id");
				const newObj = { id: attr, quantity: 1 };
				var obj = {};
				const url = "add";
				const action = "add";
				if (action == "delete") {
					obj = { ...obj, ...{ id: newObj.id, quantity: 0 } };
				} else {
					obj = newObj;
				}

				fetch(`/cart/${url}.js`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(obj),
				})
					.then((response) => response.json())
					.then((res) => {
						jQuery(function () {
							$.ajax({
								url:
									"/cart?view=json&_dc=" +
									btoa(Date.now() + Math.random()),
								success: function (data) {
									const parentContainer = item.closest(
										`.${ID}-product-parent-container`
									);
									const title = parentContainer
										?.querySelector(`.${ID}-product-name`)
										?.innerText.trim();
									const price = parentContainer
										?.querySelector(`.${ID}-item-price`)
										?.innerText.trim();
									const eventData = {
										action: "Add to Bag",
										AddedFrom:
											"Recommended soft toy carousel",
										ProductTitle: title,
										price: price,
									};
									fireEvent(`${JSON.stringify(eventData)}`);
									status = true;
									var cartData = JSON.parse(data);
									window.OsGlobals.cartFull = cartData;
									jQuery("[data-cart-quantity]").html(
										cartData.cart.item_count
									);
									if (
										!jQuery("body").hasClass(
											"template-cart"
										)
									) {
										jQuery("[data-cart-itemlist]").empty();
										mpRenderCartHtml(cartData);
										mpUpdateCartDiscountRule(cartData);
									}
									mpUpdateCartFooter(cartData);
									updateDataLayerDataCart(cartData);
									checkCartId(cartData);
								},
							});

							if (!jQuery("body").hasClass("template-cart")) {
								jQuery("#sidebar-cart .drawer__content").append(
									"<div class='cart-message'></div>"
								);
							} else {
								jQuery(".site-header__wrapper").append(
									"<div class='cart-message'></div>"
								);
							}
						});
					});
				// addDelItem(newObj).then((res) => {
				// 	jQuery(function () {
				// 		$.ajax({
				// 			url:
				// 				"/cart?view=json&_dc=" +
				// 				btoa(Date.now() + Math.random()),
				// 			success: function (data) {
				// 				const parentContainer = item.closest(
				// 					`.${ID}-product-parent-container`
				// 				);
				// 				const title = parentContainer
				// 					?.querySelector(`.${ID}-product-name`)
				// 					?.innerText.trim();
				// 				const price = parentContainer
				// 					?.querySelector(`.${ID}-item-price`)
				// 					?.innerText.trim();
				// 				const eventData = {
				// 					action: "Add to Bag",
				// 					AddedFrom: "Recommended soft toy carousel",
				// 					ProductTitle: title,
				// 					price: price,
				// 				};
				// 				fireEvent(`${JSON.stringify(eventData)}`);
				// 				status = true;
				// 				var cartData = JSON.parse(data);
				// 				window.OsGlobals.cartFull = cartData;
				// 				jQuery("[data-cart-quantity]").html(
				// 					cartData.cart.item_count
				// 				);
				// 				if (!jQuery("body").hasClass("template-cart")) {
				// 					jQuery("[data-cart-itemlist]").empty();
				// 					mpRenderCartHtml(cartData);
				// 					mpUpdateCartDiscountRule(cartData);
				// 				}
				// 				mpUpdateCartFooter(cartData);
				// 				updateDataLayerDataCart(cartData);
				// 				checkCartId(cartData);
				// 			},
				// 		});

				// 		if (!jQuery("body").hasClass("template-cart")) {
				// 			jQuery("#sidebar-cart .drawer__content").append(
				// 				"<div class='cart-message'></div>"
				// 			);
				// 		} else {
				// 			jQuery(".site-header__wrapper").append(
				// 				"<div class='cart-message'></div>"
				// 			);
				// 		}
				// 	});
				// });
			});
		});

		callVarOneSlick();
		document
			.getElementById("sidebar-cart")
			.classList.add(`${ID}-variation-${VARIATION}`);
		document.querySelector(".drawer__main").style.height = `calc(100% - ${
			document.querySelector(".drawer__footer").clientHeight
		}px)`;
		pollerLite(["#sidebar-cart .drawer__footer .cart__checkout"], () => {
			document
				.querySelector("#sidebar-cart .drawer__footer .cart__checkout")
				.addEventListener("click", (e) => {
					if (status) {
						fireEvent(
							"After adding from carousel -  proceeds to view bag"
						);
					} else {
						fireEvent(
							"Without adding from carousel -  proceeds to view bag"
						);
					}
				});
		});
	};
	const checkVarOneData = () => {
		const targetNode = document.querySelector(".drawer__main");
		const config = { attributes: false, childList: true, subtree: true };
		const productTitle = document.querySelector(".product-single__title");
		const callback = function (mutationsList, observer) {
			console.log("observed");
			fetch("https://www.mamasandpapas.com/cart?view=json")
				.then((response) => response.json())
				.then((data) => {
					var isFound = false;
					var val;
					if (data.itemsComplete.length > 0) {
						for (let i = 0; i < data.itemsComplete.length; i++) {
							for (const [index, value] of Object.entries(
								data.itemsComplete[i]
							)) {
								if (value.product.type == "Soft Toys") {
									isFound = true;
								}
							}
							if (isFound) {
								break;
							}
						}

						if (!isFound) {
							if (
								!document.querySelector(
									`.${ID}-parent-container`
								)
							) {
								// const eventData = {
								// 	action: "Add to Bag",
								// 	AddedFrom: "Default PDP page",
								// 	ProductTitle: val.product.title,
								// 	price: val.product.price / 100,
								// };
								// fireEvent(`${JSON.stringify(eventData)}`);
								variationOne(data.itemsComplete);
							} else {
								document.querySelector(
									`.${ID}-parent-container`
								)
									? document
											.querySelector(
												`.${ID}-parent-container`
											)
											.classList.remove(`${ID}-hide-elem`)
									: "";
								document.querySelector(
									".drawer__main"
								).style.height = `calc(100% - ${
									document.querySelector(".drawer__footer")
										.clientHeight
								}px)`;
								document.body.classList.add(
									`${ID}-shown-carousel`
								);
							}
						} else {
							document.querySelector(`.${ID}-parent-container`)
								? document
										.querySelector(
											`.${ID}-parent-container`
										)
										.classList.add(`${ID}-hide-elem`)
								: "";
							document.body.classList.remove(
								`${ID}-shown-carousel`
							);
							document.querySelector(
								".drawer__main"
							).style.height = ``;
						}
					}
				});
		};

		const observer = new MutationObserver(callback);
		observer.observe(targetNode, config);
	};
	const callVarOneSlick = () => {
		$(`.${ID}-main-slider-container`).slick({
			dots: false,
			infinite: true,
			speed: 300,
			arrows: true,
			slidesToShow: 2,
			slidesToScroll: 2,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						infinite: true,
						dots: false,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 375,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true,
					},
				},
			],
		});
		$(`.${ID}-main-slider-container`).on(
			"beforeChange",
			function (event, slick, currentSlide, nextSlide) {
				fireEvent(`User cycles through the soft toy carousel`);
			}
		);
		fireEvent(`Carousel of soft toys are showing in the mini-bag`);
	};
	// const addDelItem = (data, url = "add", action = "add") => {
	// 	var obj = {};
	// 	if (action == "delete") {
	// 		obj = { ...obj, ...{ id: data.id, quantity: 0 } };
	// 	} else {
	// 		obj = data;
	// 	}

	// 	fetch(`/cart/${url}.js`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(obj),
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			return data;
	// 		});
	// };

	pollerLite([".drawer__main"], () => {
		const productTitle = document.querySelector(".product-single__title");
		fetch("https://www.mamasandpapas.com/cart?view=json")
			.then((response) => response.json())
			.then((data) => {
				var isFound = false;
				if (data.itemsComplete.length > 0) {
					for (let i = 0; i < data.itemsComplete.length; i++) {
						for (const [index, value] of Object.entries(
							data.itemsComplete[i]
						)) {
							if (value.product.type == "Soft Toys") {
								isFound = true;
							}
						}
						if (isFound) {
							break;
						}
					}
					if (!isFound) {
						if (
							!document.querySelector(`.${ID}-parent-container`)
						) {
							variationOne(data.itemsComplete);
						}
					} else {
						document.querySelector(`.${ID}-parent-container`)
							? document
									.querySelector(`.${ID}-parent-container`)
									.classList.add(`${ID}-hide-elem`)
							: "";
						document.body.classList.remove(`${ID}-shown-carousel`);
						document.querySelector(
							".drawer__main"
						).style.height = ``;
					}
				}
			});
		checkVarOneData();
	});
};
