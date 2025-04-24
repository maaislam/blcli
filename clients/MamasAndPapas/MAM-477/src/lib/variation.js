import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import "core-js/stable";
import "regenerator-runtime/runtime";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;
import { pollerLite } from "../../../../../lib/utils";

const checkCartItems = () => {
	document
		.querySelector(".product-form__cart-submit")
		.addEventListener("click", function (e) {
			checkCart();
		});
};

const checkCart = () => {
	document.querySelector(".modal-overlay").classList.add("hide-default");
	document.querySelector("#sidebar-cart").classList.add("hide-default");

	document
		.querySelector("a.site-header__icon.site-header__cart")
		.addEventListener("click", (e) => {
			document
				.querySelector(".modal-overlay")
				.classList.remove("hide-default");
			document
				.querySelector("#sidebar-cart")
				.classList.remove("hide-default");
		});
	setTimeout(() => {
		const productTitle = document.querySelector(".product-single__title");

		fetch("https://www.mamasandpapas.com/cart?view=json")
			.then((response) => response.json())
			.then((data) => {
				var prodName;
				var prodPrice;
				var prodPrevPrice;
				var prodID;
				var prodIMG;
				var prodCount = data.itemsComplete.length;
				var isFound = false;
				if (data.itemsComplete.length > 0) {
					for (let i = 0; i < data.itemsComplete.length; i++) {
						for (let [index, value] of Object.entries(
							data.itemsComplete[i]
						)) {
							console.log("value-ak", value);
							if (
								value.product.title ===
								productTitle.innerText.trim()
							) {
								if (value.product.type == "Soft Toys") {
									isFound = true;
									document
										.querySelector(".modal-overlay")
										.classList.remove("is-visible");
									document
										.querySelector("body")
										.classList.remove("no-scroll");
									document
										.querySelector("body")
										.classList.add("MAM-376-no-scroll-x");
									document
										.querySelector("#sidebar-cart")
										.setAttribute("aria-hidden", true);
									prodName = value.product.title;
									prodPrice = value.product.price;
									prodPrevPrice =
										value.product.compare_at_price;
									prodID = index;
									prodIMG = value.product.featured_image;
									var valueArr = [
										{
											prodID: prodID,
											prodName: prodName,
											prodPrice: prodPrice,
											prodPrevPrice: prodPrevPrice,
											prodIMG: prodIMG,
											prodCount: prodCount,
											quantity:
												data.cart.items[i].quantity,
										},
									];
									if (
										!document.querySelector(
											`${ID}-new-modal-var-two`
										)
									) {
										fireEvent("customer has added to bag");
										variationTwo(valueArr);

										setTimeout(() => {
											const targetNode =
												document.querySelector(
													"#CartCount > span:nth-child(1)"
												);

											// Options for the observer (which mutations to observe)
											const config = {
												attributes: false,
												childList: true,
												subtree: false,
											};

											// Callback function to execute when mutations are observed
											const callback = function () {
												const countData =
													document.querySelector(
														"#PageContainer > div.MAM-376-new-modal-var-two > div.MAM-376-main-container > div.MAM-376-mini-bag-content > div.MAM-376-mini-bag-child-two > a"
													);
												if (countData) {
													var content = `View Bag (${
														document.querySelector(
															"#CartCount > span:nth-child(1)"
														).innerText
													})`;
													countData.innerText =
														content;
												}
											};

											// Create an observer instance linked to the callback function
											const observer =
												new MutationObserver(callback);

											// Start observing the target node for configured mutations
											observer.observe(
												targetNode,
												config
											);
										}, 2000);
									}
								} else {
									document
										.querySelector(".modal-overlay")
										.classList.remove("hide-default");
									document
										.querySelector("#sidebar-cart")
										.classList.remove("hide-default");
									document
										.querySelector("body")
										.classList.remove(
											"MAM-376-no-scroll-x"
										);
								}
							}
						}
						if (isFound) {
							break;
						}
					}
				} else {
					document
						.querySelector(".modal-overlay")
						.classList.remove("hide-default");
					document
						.querySelector("#sidebar-cart")
						.classList.remove("hide-default");
					document
						.querySelector("body")
						.classList.remove("MAM-376-no-scroll-x");
					if (document.querySelector(`.${ID}-new-modal-var-two`)) {
						document
							.querySelector(`${ID}-new-modal-var-two`)
							.classList.add(`${ID}-hide-elem`);
					}
				}
			});
	}, 1000);
};

const variationTwo = (valueArr) => {
	var skuItems = JSON.parse(sessionStorage.getItem(`${ID}-skuItems`));
	const newModal = document.createElement("div");
	newModal.classList.add(`${ID}-new-modal-var-two`);
	const modalContent = `
    <div class="${ID}-main-container">
        <div class="${ID}-header-container">
            <div class="${ID}-header-check-mark">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16 fa-3x"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" class=""></path></svg>
            </div>
            <div class="${ID}-header-text-add-success">Item Successfully Added To Your Bag</div>
        </div>

        <div class="${ID}-mini-bag-content">
            ${valueArr
				.map((item, index) => {
					return `
                    <div class="${ID}-mini-bag-child-one">
                        <div class="${ID}-imgTwo-container">
                            <img class="${ID}-cart-item__image" src="${
						item.prodIMG
					}" >
                        </div>
                        <div class="${ID}-prod-detail-container">
                            <div class="${ID}-child-two-prod-name">${
						item.prodName
					}</div>
                            <div class="${ID}-prod-price">£${
						item.prodPrice / 100
					}</div>
                            <div class="${ID}-prod-prev-price">${
						item.prodPrevPrice == 0
							? ""
							: "Was £" + item.prodPrevPrice / 100
					}</div>
                           
                            <div class="${ID}-prod-quantity">Quantity: ${
						item.quantity
					}</div>
                        </div>
                    </div>
                    <div class="${ID}-mini-bag-child-two">
                        <a href="/cart" class="${ID}-cart-btn-checkout cart__checkout btn btn--solid-color">View Bag ${
						item.prodCount > 0
							? `(${
									document.querySelector(
										"#CartCount > span:nth-child(1)"
									).innerText
							  })`
							: ""
					}</a>
                    </div>
                    `;
				})
				.join("\n")}
        </div>

        <div class="${ID}-mini-bag-main-carousel">
            <div class="${ID}-carousel-header">You may also need...</div>
            <div class="${ID}-carousel-content">
            ${skuItems
				.map((item) => {
					return `
                    <div class="${ID}-product-parent-container">
                        <img class="${ID}-img-container" src="${
						item.prodImg
					}"></img>
                        <div class="${ID}-product-name">${item.prodName}</div>
                        <div class="${ID}-item-price">£${
						item.prodPrice / 100
					}</div>
                        <a href="#" data-id="${
							item.prodID
						}" class="cart__checkout btn btn--solid-color ${ID}-item-btn">Add to Bag</a>
                    </div>
                    `;
				})
				.join("\n")}
            </div>
        </div>
    </div>
    <div class="${ID}-modal-overlay"></div>
    `;

	newModal.insertAdjacentHTML("afterbegin", modalContent);
	var mainPageContainer = document.querySelector("#PageContainer");
	mainPageContainer.classList.add(`${ID}-page-container-relative`);
	mainPageContainer.insertAdjacentElement("afterbegin", newModal);
	getCrossBtn();
	callSlick();

	let status = false;

	document.querySelectorAll(".MAM-376-item-btn").forEach((item) => {
		item.addEventListener("click", function (e) {
			e.preventDefault();
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
								jQuery(
									".drawer__container .cart__itemlist"
								).removeClass("hide");
								jQuery("#CartCount").removeClass("hide");
								jQuery(
									".drawer__container .cart__empty "
								).addClass("hide");
								jQuery("[data-cart-itemlist]").empty();
								mpRenderCartHtml(cartData);
								mpUpdateCartDiscountRule(cartData);
							}

							mpUpdateCartFooter(cartData);
							updateDataLayerDataCart(cartData);
							checkCartId(cartData);
							if (
								document.querySelector(".modal-overlay") &&
								!document
									.querySelector(".modal-overlay")
									.classList.contains("is-visible")
							) {
								document
									.querySelector(
										"a.site-header__icon.site-header__cart"
									)
									.click();
							}
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
	document
		.querySelector(`.${ID}-mini-bag-content .cart__checkout`)
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
	const config = { attributes: false, childList: true, subtree: false };
	const cartItem = document.querySelector(
		".drawer__container .cart__itemlist"
	);

	const cartObserver = new MutationObserver(() => {
		var heading = document.querySelector(
			`.${ID}-main-container .${ID}-mini-bag-content .${ID}-child-two-prod-name`
		);
		if (heading) {
			heading = heading.innerText.trim();
		}

		fetch("https://www.mamasandpapas.com/cart?view=json")
			.then((response) => response.json())
			.then((data) => {
				var isRemoved = true;
				if (data.itemsComplete.length > 0) {
					for (let i = 0; i < data.itemsComplete.length; i++) {
						for (let [index, value] of Object.entries(
							data.itemsComplete[i]
						)) {
							if (value.product.title === heading) {
								isRemoved = false;
								break;
							}
						}
					}
				}
				if (data.itemsComplete.length < 1 || isRemoved) {
					const header = document.querySelector(
						`.${ID}-main-container .${ID}-header-container`
					);
					const miniBag = document.querySelector(
						`.${ID}-main-container .${ID}-mini-bag-content`
					);
					const carouselHeading = document.querySelector(
						`.${ID}-mini-bag-main-carousel .${ID}-carousel-header`
					);
					if (carouselHeading) {
						carouselHeading.innerText = "You may need...";
					}
					if (header) {
						header.remove();
					}
					if (miniBag) {
						miniBag.remove();
					}
				}
			});
	});
	cartObserver.observe(cartItem, config);
};

const getCrossBtn = () => {
	const newCross = document
		.querySelector('[class="btn--close"]')
		.cloneNode(true);
	newCross.classList.add(`${ID}-custom-cross`);
	document
		.querySelector(`.${ID}-main-container`)
		.insertAdjacentElement("afterbegin", newCross);
	document
		.querySelector(".MAM-376-custom-cross")
		.addEventListener("click", function (e) {
			document
				.querySelector(".MAM-376-new-modal-var-two")
				.classList.add("hide-default");
			document.querySelector("body").classList.remove("no-scroll");
			$(`.${ID}-carousel-content`).slick("unslick");
			document
				.querySelector(".modal-overlay")
				.classList.remove("is-visible");
			document
				.querySelector("#sidebar-cart")
				.setAttribute("aria-hidden", true);
			document
				.querySelector(".modal-overlay")
				.classList.remove("hide-default");
			document
				.querySelector("#sidebar-cart")
				.classList.remove("hide-default");
		});
};

const callSlick = () => {
	$(`.${ID}-carousel-content`).slick({
		dots: false,
		infinite: true,
		speed: 300,
		arrows: true,
		slidesToShow: 6,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
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
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: true,
				},
			},
			{
				breakpoint: 361,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
				},
			},
		],
	});
};

export default checkCartItems;
