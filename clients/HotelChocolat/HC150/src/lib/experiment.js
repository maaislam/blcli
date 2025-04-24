import { setup, fireEvent } from "../../../../../core-files/services";
import {
	getCookie,
	observer,
	pollerLite,
	setCookie,
} from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import {
	addVoucher,
	checkProducts,
	HideNavLinks,
	hidePromotions,
	QuickView,
	reduceDropDownPrices,
	voucherApplied,
} from "./helpers";

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...
	pollerLite(
		[
			"#product-detail-wrapper #product-content button#add-to-cart",
			() => window.pageContext,
		],
		() => {
			if (window.pageContext.type === "product") {
				const btn = document.querySelector("button#add-to-cart");
				btn.addEventListener("click", () => {
					fireEvent(`User clicks to add to the bag on PDP`);
				});
			}
		}
	);
	pollerLite(["#QuickViewDialog"], () => {
		const btn = document.querySelector("#QuickViewDialog");
		btn.addEventListener("click", (e) => {
			if (e.target.closest("button#add-to-cart")) {
				fireEvent(`User clicks to add to the bag from Quick Buy`);
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

	// if landed on special offers page
	if (
		window.location.href.indexOf("/collections/prices/special-offers/") >
			-1 &&
		document.referrer.indexOf("www.hotelchocolat.com") === -1
	) {
		setCookie("Offer landed", true);
	}

	if (!getCookie("Offer landed")) {
		document.documentElement.classList.add("running");

		// PLPs and search
		//hidePromotions();
		HideNavLinks(".third-level-items.split-columns li");

		if (window.location.href.indexOf("/uk/shop/collections/") > -1) {
			HideNavLinks(".craigscol.three a");
		}

		// PlP & Search grid
		pollerLite([".grid-tile"], () => {
			checkProducts(document.querySelectorAll(".grid-tile"));

			const allProducts = document.querySelectorAll(".grid-tile");
			if (allProducts) {
				for (let index = 0; index < allProducts.length; index += 1) {
					const element = allProducts[index];

					element
						.querySelector(".quickview")
						.addEventListener("click", () => {
							pollerLite(
								[
									`#QuickViewDialog .price-sales`,
									"#product-detail-wrapper input",
									"#pid",
								],
								() => {
									QuickView(element, ".product-sales-price");

									observer.connect(
										document.querySelector(
											"#QuickViewDialog #product-detail-wrapper"
										),
										() => {
											QuickView(
												element,
												".product-sales-price"
											);
										},
										{
											config: {
												attributes: true,
												childList: true,
												subtree: false,
											},
											throttle: 1000,
										}
									);
								}
							);
						});
				}
			}

			observer.connect(
				document.querySelector(".search-result-content"),
				() => {
					setTimeout(() => {
						checkProducts(document.querySelectorAll(".grid-tile"));
						//hidePromotions();

						const allProducts =
							document.querySelectorAll(".grid-tile");
						if (allProducts) {
							for (
								let index = 0;
								index < allProducts.length;
								index += 1
							) {
								const element = allProducts[index];

								element
									.querySelector(".quickview")
									.addEventListener("click", () => {
										pollerLite(
											[
												`#QuickViewDialog .price-sales`,
												"#product-detail-wrapper input",
												"#pid",
											],
											() => {
												QuickView(
													element,
													".product-sales-price"
												);

												observer.connect(
													document.querySelector(
														"#QuickViewDialog #product-detail-wrapper"
													),
													() => {
														QuickView(
															element,
															".product-sales-price"
														);
													},
													{
														config: {
															attributes: true,
															childList: true,
															subtree: false,
														},
														throttle: 1000,
													}
												);
											}
										);
									});
							}
						}
					}, 500);
				},
				{
					config: {
						attributes: true,
						childList: true,
						subtree: false,
					},
					throttle: 1000,
				}
			);
		});

		// Carousels
		pollerLite([".carousel-container .content-tile"], () => {
			checkProducts(
				document.querySelectorAll(".carousel-container .content-tile")
			);
		});

		// Recommendations
		pollerLite([".einstain-inited .content-tile"], () => {
			checkProducts(
				document.querySelectorAll(".einstain-inited .content-tile")
			);

			const allProducts = document.querySelectorAll(
				".einstain-inited .content-tile"
			);
			if (allProducts) {
				for (let index = 0; index < allProducts.length; index += 1) {
					const element = allProducts[index];

					element
						.querySelector(".thumb-link")
						.addEventListener("click", () => {
							pollerLite(
								[`#QuickViewDialog .price-sales`],
								() => {
									QuickView(element, ".price-sales");

									observer.connect(
										document.querySelector(
											"#QuickViewDialog #product-detail-wrapper"
										),
										() => {
											QuickView(element, ".price-sales");
										},
										{
											config: {
												attributes: true,
												childList: true,
												subtree: false,
											},
											throttle: 1000,
										}
									);
								}
							);
						});
				}
			}
		});

		pollerLite(["#carousel-recommendations"], () => {
			checkProducts(document.querySelectorAll(".recommendation-item"));
		});

		// PDP
		pollerLite(
			[
				".product-col-2.product-detail #product-content",
				"#pid",
				"#add-to-cart",
			],
			() => {
				checkProducts(
					document.querySelectorAll(
						".product-col-2.product-detail #product-content"
					)
				);
				const pdpSku = document.querySelector("#pid").value;
				reduceDropDownPrices(
					pdpSku,
					document.querySelector(`#product-content .price-sales`)
				);
				//hidePromotions();

				observer.connect(
					document.querySelector("#product-detail-wrapper"),
					() => {
						if (
							!document
								.querySelector("#product-content")
								.classList.contains("HC150-priceChanged")
						)
							checkProducts(
								document.querySelectorAll(
									".product-col-2.product-detail #product-content"
								)
							);
						const pdpSku = document.querySelector("#pid").value;
						reduceDropDownPrices(
							pdpSku,
							document.querySelector(
								`#product-content .price-sales`
							)
						);
						//hidePromotions();
					},
					{
						config: {
							attributes: true,
							childList: true,
							subtree: false,
						},
						throttle: 1000,
					}
				);
			}
		);

		// Mini basket
		pollerLite([".mini-cart-products"], () => {
			checkProducts(
				document.querySelectorAll(".mini-cart-products .li-thumbnail")
			);
		});

		observer.connect(
			document.querySelector(".minicart-total-qty"),
			() => {
				setTimeout(() => {
					checkProducts(
						document.querySelectorAll(
							".mini-cart-products .li-thumbnail"
						)
					);
				}, 500);
			},
			{
				config: { attributes: true, childList: true, subtree: false },
				throttle: 1000,
			}
		);

		// Search Result modal
		pollerLite(["#search-suggestions"], () => {
			const searchSuggestions = document.querySelector(
				"#search-suggestions"
			);
			if (searchSuggestions) {
				const searchSuggestionsObserver = new MutationObserver(
					(mutationList, observer) => {
						if (searchSuggestions.classList.contains("active")) {
							const allProducts =
								searchSuggestions.querySelectorAll(
									".product-suggestions a.product-suggestion-link"
								);
						}
					}
				);
			}
		});

		// if basket page - add voucher
		if (window.location.href.indexOf("/basket") > -1) {
			if (document.querySelector(".cart-row")) {
				addVoucher();
				voucherApplied();
			}
		}
	} else {
		return;
	}
};
