/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getPageData, fireEvent } from "./services";
import {
	pollerLite,
	events,
	logMessage,
	observer,
} from "../../../../../lib/utils";
import settings from "./shared";

const { ID, VARIATION } = settings;
// window.categoryTilesIds = [
// 	"#s-e8a5e90e-94af-4667-a249-f59a4fda02cf",
// 	"#s-e8a5e90e-94af-4667-a249-f59a4fda02cf",
// ];
// window.topBannerID = "#s-30083876-65cd-4d76-a125-49e56daab0d2";
// window.HeroProducts = [
// 	{
// 		sku: "4126l7500",
// 		url: "https://www.mamasandpapas.com/products/baby-snug-and-activity-tray-4126l7500/",
// 		prodName: "Snug Floor Seat with Activity Tray - Pebble Grey",
// 		shortName: "Snug Floor Seat",
// 	},
// 	{
// 		sku: "7599wc100",
// 		url: "https://www.mamasandpapas.com/products/sit-play-wish-upon-a-cloud-7599wc100/",
// 		prodName: "Sit & Play Baby Floor Seat - Wish Upon A Cloud",
// 		shortName: "Sit & Play Baby Floor Seat",
// 	},
// 	{
// 		sku: "599382200",
// 		url: "https://www.mamasandpapas.com/products/flip-xt2-fossil-grey-6pc-essential-kit-599382200/",
// 		prodName:
// 			"Flip XT² 6 Piece Pushchair Travel Essentials Bundle - Fossil Grey",
// 		shortName: "Flip XT² Pushchair Bundle",
// 	},
// 	{
// 		sku: "115246801",
// 		url: "https://www.mamasandpapas.com/products/snax-adjustable-highchair-removable-tray-insert-grey-spot-115246801/",
// 		prodName:
// 			"Snax Adjustable Highchair with Removable Tray Insert - Grey Spot",
// 		shortName: "Snax Adjustable Highchair",
// 	},
// 	{
// 		sku: "115290900",
// 		url: "https://www.mamasandpapas.com/products/snax-highchair-alphabet-floral-115290900/",
// 		prodName: "Snax Highchair - Alphabet Floral",
// 		shortName: "Snax Highchair",
// 	},
// 	{
// 		sku: "4126l7400",
// 		url: "https://www.mamasandpapas.com/products/baby-snug-and-activity-tray-4126l7400/",
// 		prodName: "Snug Floor Seat with Activity Tray - Blossom",
// 		shortName: "Snug Floor Seat",
// 	},
// 	{
// 		sku: "1152l4300",
// 		url: "https://www.mamasandpapas.com/products/snax-highchair-1152l4300/",
// 		prodName: "Snax Highchair - Terrazzo",
// 		shortName: "Snax Highchair",
// 	},
// 	{
// 		sku: "9868l7600",
// 		url: "https://www.mamasandpapas.com/products/baby-bug-and-activity-tray-9868l7600/",
// 		prodName:
// 			"Bug 3-in-1 Floor & Booster Seat with Activity Tray - Eucalyptus",
// 		shortName: "Bug 3-in-1 Floor & Booster Seat",
// 	},
// 	{
// 		sku: "ctpe02w00",
// 		url: "https://www.mamasandpapas.com/products/petite-compact-cot-for-baby-to-18-months-white-ctpe02w00/",
// 		prodName: "Petite Cot - Pure White",
// 		shortName: "Petite Cot",
// 	},
// 	{
// 		sku: "959925300",
// 		url: "https://www.mamasandpapas.com/products/airo-stroller-uk-959925300/",
// 		prodName: "Airo Pushchair - Black",
// 		shortName: "Airo Pushchair",
// 	},
// 	{
// 		sku: "5573l7000",
// 		url: "https://www.mamasandpapas.com/products/cruise-buggy-5573l7000/",
// 		prodName: "Cruise Buggy - Melba",
// 		shortName: "Cruise Buggy",
// 	},
// 	{
// 		sku: "759436301",
// 		url: "https://www.mamasandpapas.com/products/playmat-and-gym-dream-upon-a-cloud-759436301/",
// 		prodName: "Playmat & Gym - Dream Upon a Cloud",
// 		shortName: "Playmat & Gym",
// 	},
// ];
export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);
	fireEvent("Conditions Met");
	pollerLite([window.categoryTilesIds[0]], () => {
		const links = document.querySelectorAll(
			`${window.categoryTilesIds[0]} a`
		);
		links.forEach((link) => {
			link.addEventListener("click", () => {
				fireEvent("Click - User clicks on the category tiles");
			});
		});
	});
	pollerLite([window.categoryTilesIds[1]], () => {
		const links = document.querySelectorAll(
			`${window.categoryTilesIds[1]} a`
		);
		links.forEach((link) => {
			link.addEventListener("click", () => {
				fireEvent("Click - User clicks on the category tiles");
			});
		});
	});

	if (VARIATION === "control") {
		if (dataLayerData.page.template === "index") {
			pollerLite([window.topBannerID], () => {
				let isFired = false;
				window.addEventListener("scroll", () => {
					if (!isFired) {
						const targetDom = document
							.querySelector(window.topBannerID)
							.closest(".shg-box-vertical-align-wrapper");

						if (targetDom) {
							var position = targetDom.getBoundingClientRect();
							if (
								position.bottom <
									window.innerHeight / 2 + 150 &&
								position.bottom > window.innerHeight / 2 - 150
							) {
								fireEvent(
									"User would have seen the experiment above the category tiles"
								);
								isFired = true;
							}
						}
					}
				});
			});
			pollerLite(
				[
					"#MainContent .page-width .shogun-root .shg-box-vertical-align-wrapper",
				],
				() => {
					let isFired = false;
					window.addEventListener("scroll", () => {
						if (!isFired) {
							const targetDom = document.querySelector(
								"#MainContent .page-width .shogun-root .shg-box-vertical-align-wrapper"
							);

							if (targetDom) {
								var position =
									targetDom.getBoundingClientRect();
								if (
									position.bottom <
										window.innerHeight / 2 + 150 &&
									position.bottom >
										window.innerHeight / 2 - 150
								) {
									fireEvent(
										"User would have seen the experiment above the newsletter sign up"
									);
									isFired = true;
								}
							}
						}
					});
				}
			);
		} else if (dataLayerData.page.template === "product") {
			pollerLite(["button.product-form__cart-submit"], () => {
				const submit = document.querySelector(
					"button.product-form__cart-submit"
				);

				submit.addEventListener("click", (e) => {
					fireEvent("PDP - Adds a product to the bag");
				});
			});
		}
		return;
	}

	// transfers sessionStorage from one tab to another
	var sessionStorage_transfer = function (event) {
		if (!event) {
			event = window.event;
		} // ie suq
		if (!event.newValue) return; // do nothing if no value to work with
		if (event.key == "getSessionStorage") {
			// another tab asked for the sessionStorage -> send it
			localStorage.setItem(
				"shareSessionStorage",
				sessionStorage.getItem(`${ID}-recentlyViewedClicked`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
			}
			sessionStorage.setItem(`${ID}-recentlyViewedClicked`, data);
		}
	}; // listen for changes to localStorage
	if (window.addEventListener) {
		window.addEventListener("storage", sessionStorage_transfer, false);
	} else {
		window.attachEvent("onstorage", sessionStorage_transfer);
	} // Ask other tabs for session storage (this is ONLY to trigger event)
	if (!sessionStorage.getItem(`${ID}-recentlyViewedClicked`)) {
		localStorage.setItem("getSessionStorage", `dummy`);
		localStorage.removeItem("getSessionStorage", `dummy`);
	}

	if (dataLayerData.page.template === "index") {
		if (VARIATION == "1") {
			pollerLite([window.topBannerID], () => {
				createSimilarityCarousel();
				console.log("Similarity carousel created");
			});
		} else if (VARIATION == "2") {
			pollerLite(
				[
					"#MainContent .page-width .shogun-root .shg-box-vertical-align-wrapper",
				],
				() => {
					createSimilarityCarousel();
				}
			);
		}
	}

	// COMMON TRACKINGS
	if (dataLayerData.page.template === "index") {
		// Home Page
		pollerLite([`.${ID}-recently-viewd-wrapper`], () => {
			let isFired = false;
			window.addEventListener("scroll", () => {
				if (!isFired) {
					const targetDom = document.querySelector(
						`.${ID}-recently-viewd-wrapper .recently-viewd-items-wrapper`
					);

					if (targetDom) {
						var position = targetDom.getBoundingClientRect();
						if (
							position.top < window.innerHeight / 2 + 150 &&
							position.top > window.innerHeight / 2 - 150
						) {
							fireEvent(
								"User sees the recently viewed experience"
							);
							isFired = true;
						}
					}
				}
			});
		});
		pollerLite([`.${ID}-recently-viewd-wrapper .hero-product-card`], () => {
			let isFired = false;
			window.addEventListener("scroll", () => {
				if (!isFired) {
					const targetDom = document.querySelector(
						`.${ID}-recently-viewd-wrapper .hero-product-card`
					);

					if (targetDom) {
						var position = targetDom.getBoundingClientRect();
						if (
							position.top < window.innerHeight / 2 + 150 &&
							position.top > window.innerHeight / 2 - 150
						) {
							const index = parseInt(
								targetDom.getAttribute("data-index")
							);
							const heroProductData = window.HeroProducts[index];
							fireEvent(
								`User sees the hero product - ${JSON.stringify(
									heroProductData
								)}`
							);
							isFired = true;
						}
					}
				}
			});
		});

		pollerLite([`.${ID}-recently-viewd-wrapper .hero-product-card`], () => {
			const heroProdLink = document.querySelector(
				`.${ID}-recently-viewd-wrapper .hero-product-card a.hero-product-link`
			);
			heroProdLink?.addEventListener("click", () => {
				fireEvent("Click - User clicks on the hero CTA");
			});
		});
		pollerLite(
			[
				`.${ID}-recently-viewd-wrapper .home-recently-viewd-content .recently-viewed-card`,
			],
			() => {
				const recentlyViwedProdLink = document.querySelector(
					`.${ID}-recently-viewd-wrapper .home-recently-viewd-content`
				);

				recentlyViwedProdLink.addEventListener("click", (e) => {
					const target = e.target;
					if (target.closest("a")) {
						fireEvent(
							"Click - User clicks on the recently viewed product card"
						);
						sessionStorage.setItem(
							`${ID}-recentlyViewedClicked`,
							JSON.stringify(
								target.closest("a").getAttribute("data-sku")
							)
						);
					} else if (target.matches("a")) {
						fireEvent(
							"Click - User clicks on the recently viewed product card"
						);
						sessionStorage.setItem(
							`${ID}-recentlyViewedClicked`,
							JSON.stringify(
								target.matches("a").getAttribute("data-sku")
							)
						);
					}
				});
			}
		);
	} else if (dataLayerData.page.template === "product") {
		pollerLite(["button.product-form__cart-submit"], () => {
			const submit = document.querySelector(
				"button.product-form__cart-submit"
			);

			submit.addEventListener("click", (e) => {
				if (sessionStorage.getItem(`${ID}-recentlyViewedClicked`)) {
					if (
						JSON.parse(
							sessionStorage.getItem(
								`${ID}-recentlyViewedClicked`
							)
						).toLowerCase() ==
						dataLayerData.product.sku.toLowerCase()
					) {
						fireEvent(
							"User adds to bag after clicking on the recently viewed"
						);
					}
					sessionStorage.removeItem(`${ID}-recentlyViewedClicked`);
				}
			});
		});
	}
};

let contentHolder = "";
let mySwiper;
let strategyVariableID = "";

let currencySigns = {
	en_EU: "€",
	en_GB: "£",
	en_US: "$",
};

let styleCollect = true;

// 119926 needs to be used for only prods with instock
// if debugging, change this to a specific strategy id - default: 119926
strategyVariableID = 154744;

const createSimilarityCarousel = () => {
	let oosHTML = `

		<div class="${ID}-recently-viewd-wrapper">
			<div class="recently-viewd-holder loading">
				<div class="loading-spinner">
					<p> Loading... </p>
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="38px" height="38px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
					  <circle cx="50" cy="50" fill="none" stroke="#000000" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138"></circle>
					</svg>
				</div>
				<div class="hero-product-container">
					
				</div>
				<div class="recently-viewd-items-wrapper">
					<h2 class="may-also-like-header"> Take another look </h2>
					<div id="home-recently-viewd-content" class="home-recently-viewd-content">
					</div>
				</div>	
			</div>
		</div>

	`;

	buildRecsCarousel(oosHTML);
};

const buildRecsCarousel = (oosHTML) => {
	let usedStr = strategyVariableID;
	DYO.recommendationWidgetData(usedStr, {}, function (error, data) {
		if (data.slots.length > 5) {
			let ref;
			if (VARIATION == "1") {
				ref = document
					.querySelector(window.topBannerID)
					.closest(".shg-fw");
			} else if (VARIATION == "2") {
				ref = document.querySelector(
					"#MainContent .page-width .shogun-root .shg-box-vertical-align-wrapper"
				);
			}

			ref.insertAdjacentHTML("afterend", oosHTML);

			contentHolder = document.querySelector(
				`.${ID}-recently-viewd-wrapper`
			);

			let recsRef = contentHolder.querySelector(
				".home-recently-viewd-content"
			);

			let isHeroFound = false;
			let heroProductIndexNumber;

			for (let k = 0; k < data.slots.length; k++) {
				for (
					let index = 0;
					index < window.HeroProducts.length;
					index++
				) {
					let variantSku = data.slots[k].item.url.split("/");
					variantSku = variantSku[variantSku.length - 1];
					if (variantSku.indexOf("-") > -1) {
						variantSku = variantSku.split("-");
						variantSku = variantSku[variantSku.length - 1];
					}

					if (variantSku === window.HeroProducts[index].sku) {
						heroProductIndexNumber = k;
						isHeroFound = true;
						let heroHTML = `
							<div class="hero-product-card" data-index="${index}">
								<img src="${data.slots[k].item.image_url}" class="recs-product-image-element" alt="${data.slots[k].item.name} image">

								<h4 class="hero-product-title">
									${window.HeroProducts[index].shortName}
								</h4>
								<p class="hero-product-promo">
									${window.HeroProducts[index].prodName}
								</p>
								<a href="${window.HeroProducts[index].url}" class="hero-product-link">
									View the range
								</a>
							</div>
						`;
						contentHolder
							.querySelector(".hero-product-container")
							.insertAdjacentHTML("afterbegin", heroHTML);
						contentHolder.classList.add("hero-available");
						break;
					}
				}
				if (isHeroFound) {
					break;
				}
			}

			if (isHeroFound && heroProductIndexNumber != null) {
				data.slots.splice(heroProductIndexNumber, 1);
			} else {
				data.slots.splice(data.slots.length - 1, 1);
			}

			let defaultCurrency = "£";
			let slots = data.slots;

			[].slice.call(slots).forEach(function (slot) {
				window.DY.ServerUtil.getProductsData(
					[slot.item.sku],
					["daily"],
					"",
					true,
					function (err, res) {
						if (typeof res !== undefined || res !== null) {
							slot.item["dailyView"] =
								Object.values(
									res
								)[0].productInterest.view.daily;
							let variantSku = slot.item.url.split("/");
							variantSku = variantSku[variantSku.length - 1];
							if (variantSku.indexOf("-") > -1) {
								variantSku = variantSku.split("-");
								variantSku = variantSku[variantSku.length - 1];
							}
							slot.item["variantSku"] = variantSku;
							slot.item[
								"reviewUrl"
							] = `https://api.feefo.com/api/11/products/ratings?merchant_identifier=mamas-and-papas&product_sku=${variantSku}&review_count=true`;

							fetch(slot.item.reviewUrl)
								.then((response) => response.json())
								.then((data) => {
									if ("products" in data) {
										slot.item["reviewStars"] =
											data.products[0].rating;
									} else {
										slot.item["reviewStars"] = 0;
									}

									let nowPrice = formatPrice(slot.item.price);
									let wasPrice;
									let saveAmount;
									if (slot.item.compare_price) {
										wasPrice = formatPrice(
											slot.item.compare_price
										);
										saveAmount = parseFloat(
											parseFloat(
												slot.item.compare_price
											) - slot.item.price
										).toFixed(2);
									}

									recsRef.insertAdjacentHTML(
										"beforeend",
										`
										<div class="recently-viewed-card">
											<a href="${slot.item.url}" data-sku="${slot.item.variantSku}">
												<div class="recently-viewed-product-top-content">
														<p class="recently-viewed-link">
														<img src="${slot.item.image_url}" class="recs-product-image-element" alt="${
											slot.item.name
										} image" />
													</p>
													
													<div class="recently-viewed-product-info">
														<p class="recently-viewed-daily-view">${slot.item.dailyView} views today!</p>
														<p class="recently-viewed-info-brand">${slot.item.product_vendor}</p>
														<p class="recently-viewed-info-prodname">${slot.item.name}</p>
													</div>
													<div class="recently-viewed-product-price">
														<p class="now-price-container">
															<span class="now-price">${nowPrice}</span>
															${wasPrice ? `<span class="was-price">${wasPrice}</span>` : ""}
														</p>
														${
															wasPrice
																? `<p class="was-price-container"><span class="save-price">Save ${saveAmount}</span></p>`
																: ""
														}
													</div>
												</div>
												<div class="recently-viewed-ratings ${
													slot.item.reviewStars === 0
														? "no-reviews"
														: ""
												}">												
													<div class="recently-viewed-stars-container">
														<div class="recently-viewed-stars" title="${slot.item.reviewStars}">
															<div class="product__reviews-stars empty-stars">
																<span class="fa fa-star-o" data-feefo-star1=""></span>
																<span class="fa fa-star-o" data-feefo-star2=""></span>
																<span class="fa fa-star-o" data-feefo-star3=""></span>
																<span class="fa fa-star-o" data-feefo-star4=""></span>
																<span class="fa fa-star-o" data-feefo-star5=""></span>
															</div>
															<div class="product__reviews-stars filled-stars" style="width:calc(${
																(100 / 5) *
																parseFloat(
																	slot.item
																		.reviewStars
																)
															}% - 2px)">
																<span class="fa fa-star" data-feefo-star1=""></span>
																<span class="fa fa-star" data-feefo-star2=""></span>
																<span class="fa fa-star" data-feefo-star3=""></span>
																<span class="fa fa-star" data-feefo-star4=""></span>
																<span class="fa fa-star" data-feefo-star5=""></span>
															</div>
														</div>
														<div>(${slot.item.reviewStars})</div>
													</div>
												</div>
											</a>
										</div>
									`
									);
								});
						}
					}
				);
			});

			pollerLite(
				[
					() => {
						let recsLength = document.querySelector(
							"#home-recently-viewd-content"
						).childElementCount;
						return recsLength > 4;
					},
				],
				() => {
					document
						.querySelector(".recently-viewd-holder")
						.classList.remove("loading");
					let isSlider = false;
					if (
						document.querySelector("#home-recently-viewd-content")
					) {
						if (window.innerWidth < 768 && !isSlider) {
							$("#home-recently-viewd-content")
								.slick({
									dots: false,
									infinite: true,
									arrows: false,
									speed: 300,
									initialSlide: 0,
									slidesToShow: 2,
									slidesToScroll: 1,
									centerMode: false,
									variableWidth: false,
								})
								.on(
									"afterChange",
									function (event, slick, currentSlide) {
										const currentSlideProdName =
											slick.$slides[currentSlide]
												.querySelector(
													".recently-viewed-info-prodname"
												)
												.textContent.trim();

										fireEvent(
											`User swipes to slide and sees ${currentSlideProdName}`
										);
									}
								);
							isSlider = true;
						}
					}
					window.addEventListener("resize", () => {
						const recentlyViewedCarousel = document.querySelector(
							"#home-recently-viewd-content"
						);
						if (recentlyViewedCarousel) {
							if (window.innerWidth < 768 && !isSlider) {
								$(recentlyViewedCarousel)
									.slick({
										dots: false,
										infinite: true,
										arrows: false,
										speed: 300,
										initialSlide: 0,
										slidesToShow: 2,
										slidesToScroll: 1,
										centerMode: false,
										variableWidth: false,
									})
									.on(
										"afterChange",
										function (event, slick, currentSlide) {
											const currentSlideProdName =
												slick.$slides[currentSlide]
													.querySelector(
														".recently-viewed-info-prodname"
													)
													.textContent.trim();

											fireEvent(
												`User swipes to slide and sees ${currentSlideProdName}`
											);
										}
									);
								isSlider = true;
							} else if (window.innerWidth > 767 && isSlider) {
								$(recentlyViewedCarousel).slick("unslick");
								isSlider = false;
							}
						}
					});
				}
			);
		}
	});
};

const formatPrice = (price) => {
	let defaultCurrency = "£";

	let currencySign =
		currencySigns[DY.recommendationContext.lng] || defaultCurrency;

	if (DY.recommendationContext.lng === "en_EU") {
		price = price.replace(".", ",");
	}

	price = parseFloat(price).toFixed(2);
	price = currencySign + price;

	return price;
};
