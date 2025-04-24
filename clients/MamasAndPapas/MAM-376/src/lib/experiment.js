/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import checkCartItems from "./variationTwoStart";
import skuItems from "./sliderItems";

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
		const targetNode = document.querySelector(".drawer__main");
		const config = { attributes: false, childList: true, subtree: true };
		const productTitle = document.querySelector(".product-single__title");
		const productBundleSet = document.querySelector(
			".product__bundleset ul li.selected .product__bundleset-title"
		);
		let status = false;
		var isHighChairInTitle = false;
		var isHighChairInBundle = false;
		if (productTitle) {
			isHighChairInTitle =
				productTitle.innerText
					.toLocaleLowerCase()
					.indexOf("highchair") !== -1
					? true
					: false;
		}
		if (productBundleSet) {
			isHighChairInBundle =
				productBundleSet.innerText
					.toLocaleLowerCase()
					.indexOf("highchair") !== -1
					? true
					: false;
		}
		const callback = function (mutationsList, observer) {
			fetch("https://www.mamasandpapas.com/cart?view=json")
				.then((response) => response.json())
				.then((data) => {
					if (data.itemsComplete.length > 0) {
						var firstPosition = data.itemsComplete[0];
						for (const [index, value] of Object.entries(
							firstPosition
						)) {
							if (
								value.product.type == "Highchairs" ||
								isHighChairInTitle ||
								isHighChairInBundle
							) {
								fireEvent("customer has added to bag");
								status = true;
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
		return 0;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	if (VARIATION == "2") {
		checkCartItems();
	} else if (VARIATION == "1") {
		document
			.querySelector(".product-form__cart-submit")
			.addEventListener("click", function (e) {
				checkVarOneData();
			});
	}
};

const checkVarOneData = () => {
	console.log("variation 1");
	const targetNode = document.querySelector(".drawer__main");
	const config = { attributes: false, childList: true, subtree: true };
	const productTitle = document.querySelector(".product-single__title");
	const productBundleSet = document.querySelector(
		".product__bundleset ul li.selected .product__bundleset-title"
	);
	var isHighChairInTitle = false;
	var isHighChairInBundle = false;
	if (productTitle) {
		isHighChairInTitle =
			productTitle.innerText.toLocaleLowerCase().indexOf("highchair") !==
			-1
				? true
				: false;
	}
	if (productBundleSet) {
		isHighChairInBundle =
			productBundleSet.innerText
				.toLocaleLowerCase()
				.indexOf("highchair") !== -1
				? true
				: false;
	}
	const callback = function (mutationsList, observer) {
		fetch("https://www.mamasandpapas.com/cart?view=json")
			.then((response) => response.json())
			.then((data) => {
				if (data.itemsComplete.length > 0) {
					var firstPosition = data.itemsComplete[0];
					for (const [index, value] of Object.entries(
						firstPosition
					)) {
						if (
							value.product.type == "Highchairs" ||
							isHighChairInTitle ||
							isHighChairInBundle
						) {
							if (
								!document.querySelector(
									".MAM-376-parent-container"
								)
							) {
								fireEvent("customer has added to bag");
								variationOne();
							} else {
								document
									.querySelector(".MAM-376-parent-container")
									.classList.remove(`${ID}-hide-elem`);
							}
						} else {
							document.querySelector(".MAM-376-parent-container")
								? document
										.querySelector(
											".MAM-376-parent-container"
										)
										.classList.add(`${ID}-hide-elem`)
								: "";
						}
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
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
				},
			},
		],
	});
};

const addDelItem = async (data, url = "add", action = "add") => {
	var obj = {};
	if (action == "delete") {
		obj = { ...obj, ...{ id: data.id, quantity: 0 } };
	} else {
		obj = data;
	}

	const response = await fetch(`/cart/${url}.js`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(obj),
	});
	return await response.json();
};

var variationOne = () => {
	var variationOneParent = `
    <div class="${ID}-parent-container">
        <div class="${ID}-main-mssg-container">
            <div class="drawer__header">
                <span class="title">You Will Also Need</span>
            </div>
        </div>
        <div class="${ID}-main-slider-container">
        ${skuItems
			.map((item) => {
				return `
                <div class="${ID}-product-parent-container">
                    <img class="${ID}-img-container" src="${
					item.prodImg
				}"></img>
                    <div class="${ID}-product-name">${item.prodName}</div>
                    <div class="${ID}-item-price">£${item.prodPrice / 100}</div>
                    <a href="#" data-id="${
						item.prodID
					}" class="cart__checkout btn btn--solid-color ${ID}-item-btn">Add to Bag</a>
                </div>
                `;
			})
			.join("\n")}
        </div>
    </div>
    `;
	if (!document.querySelector(`.${ID}-parent-container`)) {
		document
			.querySelector(".cart__checkout.btn.btn--solid-color")
			.insertAdjacentHTML("afterend", variationOneParent);
	}

	let status = false;

	document.querySelectorAll(".MAM-376-item-btn").forEach((item) => {
		item.addEventListener("click", function (e) {
			var attr = item.getAttribute("data-id");
			const newObj = { id: attr, quantity: 1 };
			addDelItem(newObj).then((res) => {
				jQuery(function () {
					$.ajax({
						url:
							"/cart?view=json&_dc=" +
							btoa(Date.now() + Math.random()),
						success: function (data) {
							fireEvent("Upsell products added to bag");
							status = true;
							var cartData = JSON.parse(data);
							window.OsGlobals.cartFull = cartData;
							jQuery("[data-cart-quantity]").html(
								cartData.cart.item_count
							);
							if (!jQuery("body").hasClass("template-cart")) {
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
		});
	});
	document
		.querySelector(".drawer__footer .cart__checkout")
		.addEventListener("click", (e) => {
			if (status) {
				fireEvent(
					"Customer adds to bag and proceeds to view bag after clicking upsells"
				);
			} else {
				fireEvent(
					"Customer adds to bag and proceeds to view bag without clicking upsells"
				);
			}
		});
	callVarOneSlick();
	document
		.getElementById("sidebar-cart")
		.classList.add(`${ID}-variation-${VARIATION}`);
	document.querySelector(".drawer__main").style.height = `calc(100% - ${
		document.querySelector(".drawer__footer").clientHeight
	}px)`;
};
