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
import product from "./upsellProduct";
import Swiper from "swiper/swiper-bundle";
import AddToBag from "./addToBag";

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	if (window.usabilla_live) {
		window.usabilla_live("trigger", `${ID} V${VARIATION} trigger`);
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	// test clash check
	const checkOtherTest = () => {
		return new Promise((resolve, reject) => {
			pollerLite([".oct-basket.AT-936"], () => {
				resolve();
			});
		});
	};

	const removeEverything = () => {
		fireEvent("AT-936 ran test removed");

		if (
			document.querySelector(`#${ID}-root .swiper-wrapper`) &&
			document.querySelector(`#${ID}-root .swiper-wrapper`).swiper
		) {
			document
				.querySelector(`#${ID}-root .swiper-wrapper`)
				.swiper.destroy();
		}

		if (document.querySelector(`#${ID}-root`)) {
			document.querySelector(`#${ID}-root`).remove();
		}
		if (document.querySelector(`.${ID}-deliveryBanner`)) {
			document.querySelector(`.${ID}-deliveryBanner`).remove();
		}

		document.documentElement.classList.remove("BO249");
		document.documentElement.classList.remove("BO249-control");
		document.documentElement.classList.remove("BO249-1");
		document.documentElement.classList.remove("BO249-2");
	};

	const removeOnBasketChange = () => {
		if (
			document.querySelector(`#${ID}-root .swiper-wrapper`) &&
			document.querySelector(`#${ID}-root .swiper-wrapper`).swiper
		) {
			document
				.querySelector(`#${ID}-root .swiper-wrapper`)
				.swiper.destroy();
		}

		if (document.querySelector(`#${ID}-root`)) {
			document.querySelector(`#${ID}-root`).remove();
		}
		if (document.querySelector(`.${ID}-deliveryBanner`)) {
			document.querySelector(`.${ID}-deliveryBanner`).remove();
		}
	};

	const addRecsEvents = () => {
		const basketProducts = document.querySelectorAll(".oct-product-card");

		if (basketProducts) {
			for (let index = 0; index < basketProducts.length; index++) {
				var element = basketProducts[index];
				element.addEventListener("click", function () {
					fireEvent("Clicked Recommendation");
				});
			}
		}
	};

	const scrollToElement = (element) => {
		document.querySelector(".oct-basket__scrollable-wrapper").scroll({
			behavior: "smooth",
			left: 0,
			top: element.getBoundingClientRect().top + window.scrollY,
		});
	};

	// Update amount remaining on basket update
	const updateAmounts = () => {
		let totalBasketValue;

		if (
			document.querySelector(
				".oct-text.oct-basket-header__descriptionEnd"
			)
		) {
			const totalBasketValueTxt = document.querySelector(
				".oct-text.oct-basket-header__descriptionEnd"
			);
			totalBasketValue = parseFloat(
				totalBasketValueTxt.textContent.replace("£", "")
			);
		} else {
			totalBasketValue = 0;
		}

		let totalRemainder = 25 - totalBasketValue;
		totalRemainder = totalRemainder < 0 ? 0 : totalRemainder.toFixed(2);
		let totalRemainderDisplay = "£" + totalRemainder;

		if (
			document.querySelector(`.${ID}-deliveryBanner .${ID}-amountLeft`) &&
			document.querySelector(`.${ID}-title`)
		) {
			if (totalBasketValue >= 25) {
				document.querySelector(`.${ID}-title`).innerHTML = `
        <h2>You've qualified for FREE delivery!</h2>
        <span>Proceed to checkout when ready</span>`;

				document.querySelector(
					`.${ID}-deliveryBanner .${ID}-amountLeft`
				).innerHTML = `You've qualified for FREE delivery!`;
			} else {
				document.querySelector(`.${ID}-title`).innerHTML = `
        <h2>You're only ${totalRemainderDisplay} away from FREE delivery!</h2>
        <span>We think you'll love these</span>`;

				document.querySelector(
					`.${ID}-deliveryBanner .${ID}-amountLeft`
				).innerHTML = `Spend <span>${totalRemainderDisplay}</span> more for FREE delivery!`;
			}
		}
	};

	// If basket is empty, remove everything
	const checkEmptyBasket = () => {
		pollerLite([".oct-basket-warning"], () => {
			const basketEmpty = document.querySelector(".oct-basket-warning");
			if (
				basketEmpty &&
				basketEmpty.textContent.indexOf("Your basket is empty") > -1
			) {
				if (
					document.querySelector(`#${ID}-root .swiper-wrapper`) &&
					document.querySelector(`#${ID}-root .swiper-wrapper`).swiper
				) {
					document
						.querySelector(`#${ID}-root .swiper-wrapper`)
						.swiper.destroy();
				}

				if (document.querySelector(`#${ID}-root`)) {
					document.querySelector(`#${ID}-root`).remove();
				}
				if (document.querySelector(`.${ID}-deliveryBanner`)) {
					document.querySelector(`.${ID}-deliveryBanner`).remove();
				}
			}
		});
	};

	// Add content and swiper
	const runBasketChanges = () => {
		return new Promise((resolve, reject) => {
			pollerLite(
				[
					".oct-basket-messagingRow",
					".oct-products",
					".oct-text.oct-basket-header__descriptionEnd",
				],
				() => {
					let totalBasketValue;

					if (
						document.querySelector(
							".oct-text.oct-basket-header__descriptionEnd"
						)
					) {
						const totalBasketValueTxt = document.querySelector(
							".oct-text.oct-basket-header__descriptionEnd"
						);
						totalBasketValue = parseFloat(
							totalBasketValueTxt.textContent.replace("£", "")
						);
					} else {
						totalBasketValue = 0;
					}

					let totalRemainder = 25 - totalBasketValue;
					totalRemainder =
						totalRemainder < 0 ? 0 : totalRemainder.toFixed(2);
					let totalRemainderDisplay = "£" + totalRemainder;
					let eventAmount = totalRemainder;
					eventAmount = ~~eventAmount;
					const deliveryAmountLeft = document
						.querySelectorAll(".oct-basket-messagingRow")[1]
						.querySelector(".oct-basket-messagingRow__description");

					/**
					 * Mobile delivery banner if not qualified
					 */
					if (VARIATION === "control") {
						if (totalBasketValue <= 25) {
							fireEvent(`Under £25`);
							addRecsEvents();
						}
					}

					if (VARIATION === "1" || VARIATION === "2") {
						if (
							!document.querySelector(`#${ID}-root`) &&
							!document.querySelector(`.${ID}-deliveryBanner`) &&
							totalBasketValue <= 25
						) {
							document
								.querySelector(".oct-products")
								.classList.add("tab-hide");

							const mobileAnchorBanner = `
              <div class="${ID}-deliveryBanner">    
                <div class="${ID}-content">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30" height="30" viewBox="0 0 200 200" role="img" class="oct-icon oct-basket-messagingRow__icon" aria-hidden="true" aria-label="" style="height: 30px; width: 30px; fill: #05054B;"><path d="M101 0c6.627 0 12 5.373 12 12v12h16c16.95 0 30.722 13.603 30.996 30.487L160 55v42h-12.313c-1.65 9.1-9.613 16-19.187 16-9.398 0-17.244-6.649-19.09-15.5H53.58C51.684 106.37 43.617 113 34 113c-9.798 0-17.986-6.881-19.68-16H1v-8h13.534C16.62 80.383 24.564 74 34 74c9.618 0 17.686 6.632 19.58 15.5h55.83c1.846-8.85 9.691-15.5 19.09-15.5 9.22 0 16.947 6.4 18.978 15H152V68h-18c-6.525 0-11.834-5.209-11.996-11.695L122 56V32h-9v24c0 6.525-5.209 11.834-11.695 11.996L101 68H12C5.511 68 .204 62.843.004 56.31L0 56V12C0 5.511 5.157.204 11.69.004L12 0zM34 82c-6.655 0-12 5.178-12 11.5S27.345 105 34 105s12-5.178 12-11.5S40.655 82 34 82zm94.5 0c-6.351 0-11.5 5.149-11.5 11.5s5.149 11.5 11.5 11.5S140 99.851 140 93.5 134.851 82 128.5 82zm1.501-49.979L130 56c0 2.142 1.684 3.891 3.8 3.995l.2.005h18v-5c0-12.367-9.76-22.455-21.999-22.979zM101 8H12.061l-.188.002C9.72 8.068 8 9.838 8 12v43.939l.002.188C8.068 58.28 9.838 60 12 60h89c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4z" transform="translate(20 44)"></path></svg>
                  <div class="${ID}-amountLeft"></div>
                  <div class="${ID}-recAnchor">View recommendations</div>
                </div>
              </div>`;

							document
								.querySelector(".oct-basket-header")
								.insertAdjacentHTML(
									"afterend",
									mobileAnchorBanner
								);

							deliveryAmountLeft.parentNode.classList.add("hide");

							const mobileAnchor = document.querySelector(
								`.${ID}-deliveryBanner`
							);
							mobileAnchor.addEventListener("click", () => {
								scrollToElement(
									document.querySelector(".oct-products")
								);
							});

							/**
							 * Change title with thresholds
							 */
							const entry =
								document.querySelector(".oct-products");
							const root = document.createElement("div");
							root.id = `${ID}-root`;
							root.innerHTML = /* HTML */ ` <div
									class="${ID}-title"
								></div>
								${VARIATION === "1"
									? `
              <div class="${ID}-carousel-container">
                <div class="swiper" id="${ID}-swiper">
                  <div class="swiper-wrapper"></div>
                </div>
              </div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>`
									: ""}`;

							entry.insertAdjacentElement("afterbegin", root);

							if (
								document.querySelector(
									`.${ID}-deliveryBanner .${ID}-amountLeft`
								) &&
								document.querySelector(`.${ID}-title`)
							) {
								if (totalBasketValue >= 25) {
									document.querySelector(
										`.${ID}-title`
									).innerHTML = `
                  <h2>You've qualified for FREE delivery!</h2>
                  <span>Proceed to checkout when ready</span>`;

									document.querySelector(
										`.${ID}-deliveryBanner .${ID}-amountLeft`
									).innerHTML = `You've qualified for FREE delivery!`;
								} else {
									document.querySelector(
										`.${ID}-title`
									).innerHTML = `
                  <h2>You're only ${totalRemainderDisplay} away from FREE delivery!</h2>
                  <span>We think you'll love these</span>`;

									document.querySelector(
										`.${ID}-deliveryBanner .${ID}-amountLeft`
									).innerHTML = `Spend <span>${totalRemainderDisplay}</span> more for FREE delivery!`;
								}

								fireEvent(
									`User is £${eventAmount} away from free delivery`
								);
								fireEvent(`Under £25`);
								addRecsEvents();

								if (VARIATION === "1") {
									const firstProductAdded =
										document.querySelector(
											".oct-basket__scrollable-wrapper .oct-product-details__sku"
										);
									// get data
									if (firstProductAdded) {
										fetch(
											`https://octopus-app-c6o8t.ondigitalocean.app/low-value-essentials/data/${firstProductAdded.textContent}/`
										)
											.then((r) => r.json())
											.then((d) => {
												fireEvent(
													"Essential data available"
												);
												document
													.querySelector(
														".oct-products"
													)
													.classList.remove(
														"no-products-show"
													);
												const data = d.Data;

												const slidesContainer =
													root.querySelector(
														`.swiper-wrapper`
													);

												data.forEach((el) => {
													if (el) {
														const slide =
															document.createElement(
																"div"
															);
														slide.classList.add(
															"swiper-slide"
														);
														slide.appendChild(
															product(
																el.product_data
																	.objectid,
																el.product_data
																	.model,
																el.product_data
																	.referenceimageurl,
																el.product_data
																	.offername,
																el.product_data.currentprice.toFixed(
																	2
																),
																el.product_data.regularprice.toFixed(
																	2
																),
																el.product_data
																	.actionurl,
																el.product_data
																	.promotionaltext
															)
														);
														slidesContainer.append(
															slide
														);
													}
												});

												new Swiper(`#${ID}-swiper`, {
													slidesPerView: 1,
													slidesPerGroup: 1,
													spaceBetween: 10,
													centerInsufficientSlides: true,
													navigation: {
														nextEl: `#${ID}-root .swiper-button-next`,
														prevEl: `#${ID}-root .swiper-button-prev`,
													},
													breakpoints: {
														320: {
															slidesPerView: 1.3,
															slidesPerGroup: 1,
															spaceBetween: 20,
														},
														540: {
															slidesPerView: 2.5,
															slidesPerGroup: 2,
															spaceBetween: 20,
														},
														760: {
															slidesPerView: 3.3,
															slidesPerGroup: 3,
															spaceBetween: 20,
														},
														1020: {
															slidesPerView: 2,
															slidesPerGroup: 2,
															spaceBetween: 20,
														},
														1280: {
															slidesPerView: 3,
															slidesPerGroup: 3,
															spaceBetween: 20,
														},
													},
												});

												// Add to bag
												const allRecs =
													document.querySelectorAll(
														`.${ID}-product`
													);
												for (
													let index = 0;
													index < allRecs.length;
													index += 1
												) {
													const element =
														allRecs[index];
													element
														.querySelector(
															`.${ID}-card-cta`
														)
														.addEventListener(
															"click",
															(e) => {
																e.preventDefault();
																const currentObjID =
																	e.target.getAttribute(
																		"objectid"
																	);
																const model =
																	e.target.getAttribute(
																		"sap"
																	);
																const currentName =
																	e.target.getAttribute(
																		"btn-name"
																	);

																fireEvent(
																	"Clicked add everyday essential upsell to bag"
																);

																const addToBag =
																	new AddToBag(
																		currentObjID,
																		parseInt(
																			currentObjID,
																			10
																		) - 1,
																		model,
																		currentName
																	);
																addToBag.add();
															}
														);
												}
											})
											.catch(() => {
												document
													.querySelector(
														".oct-products"
													)
													.classList.add(
														"no-products-show"
													);
												fireEvent("No data available");
												return;
											});
									} else {
										fireEvent("No product added to basket");
									}
								}
							}

							resolve();
						}
					}

					if (VARIATION === "control" || VARIATION === "2") {
						// get data
						if (
							document.querySelector(
								".oct-basket__scrollable-wrapper .oct-product-details__sku"
							)
						) {
							fetch(
								`https://octopus-app-c6o8t.ondigitalocean.app/low-value-essentials/data/${
									document.querySelector(
										".oct-basket__scrollable-wrapper .oct-product-details__sku"
									).textContent
								}/`
							)
								.then((r) => r.json())
								.then((d) => {
									fireEvent("Essential data available");
								})
								.catch(() => {
									fireEvent("No data available");
									return;
								});
						}
					}
				}
			);
		});
	};

	window.addEventListener("oct-basket:updated", () => {
		removeOnBasketChange();
		// console.log('change')
		runBasketChanges().then(() => {
			if (VARIATION === "1" || VARIATION === "2") {
				updateAmounts();
				checkEmptyBasket();
			}
		});

		checkOtherTest().then(() => {
			removeEverything();
		});
	});

	window.addEventListener("add-to-basket:success", function (e) {
		removeOnBasketChange();
		runBasketChanges().then(() => {
			if (VARIATION === "1" || VARIATION === "2") {
				updateAmounts();
				checkEmptyBasket();
			}

			checkOtherTest().then(() => {
				removeEverything();
			});
		});
	});

	const basket = document.querySelector("#oct-basket-container");
	basket.addEventListener("click", () => {
		runBasketChanges().then(() => {
			if (VARIATION === "1" || VARIATION === "2") {
				updateAmounts();
				checkEmptyBasket();
			}
		});

		checkOtherTest().then(() => {
			removeEverything();
		});
	});
};
