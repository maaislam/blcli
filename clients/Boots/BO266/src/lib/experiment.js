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
// import product from "./upsellProduct";
// import Swiper from "swiper/swiper-bundle";
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

	const renderModal = () => {
		if (
			!document.querySelector(`.${ID}-modal_overlay`) ||
			!document.querySelector(`.${ID}-modal`)
		) {
			document.querySelector(`.${ID}-modal_overlay`)?.remove();
			document.querySelector(`.${ID}-modal`)?.remove();
			const modal = `
			<div class="${ID}-modal_overlay" id="${ID}-modal_overlay"></div>
			<div class="${ID}-modal plpRedesignOverlay" id="${ID}-modal">
				<a title="Close overlay" class="modal-close-btn" href="javascript:void(0)">x</a>
				<div class="modal-content dijitContentPane">

				</div>
			</div>
		`;

			document.body.insertAdjacentHTML("beforeend", modal);
		}
	};

	if (VARIATION === "control") {
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

				if (totalBasketValue <= 25) {
					fireEvent(`Under £25`);
					addRecsEvents();
				}
			}
		);
		return;
	}

	const checkOtherTest = () => {
		return new Promise((resolve, reject) => {
			pollerLite([".oct-basket.AT-936"], () => {
				resolve();
			});
		});
	};

	const removeEverything = () => {
		fireEvent("AT-936 ran test removed");

		if (document.querySelector(`#${ID}-root`)) {
			document.querySelector(`#${ID}-root`).remove();
			document
				.querySelector(".oct-products")
				.classList.remove("tab-hide");
			document
				.querySelector(".oct-products")
				.classList.remove("with_atb");
		}
		if (document.querySelector(`.${ID}-deliveryBanner`)) {
			document.querySelector(`.${ID}-deliveryBanner`).remove();
		}

		if (document.querySelector(`.${ID}-modal_overlay`)) {
			document.querySelector(`.${ID}-modal_overlay`).remove();
		}

		if (document.querySelector(`.${ID}-modal`)) {
			document.querySelector(`.${ID}-modal`).remove();
		}

		document.documentElement.classList.remove(`${ID}`);
		document.documentElement.classList.remove(`${ID}-${VARIATION}`);
	};

	const removeOnBasketChange = () => {
		if (document.querySelector(`#${ID}-root`)) {
			document.querySelector(`#${ID}-root`).remove();
			document
				.querySelector(".oct-products")
				.classList.remove("tab-hide");
		}
		if (document.querySelector(`.${ID}-deliveryBanner`)) {
			document.querySelector(`.${ID}-deliveryBanner`).remove();
		}
		if (document.querySelector(`.${ID}-modal_overlay`)) {
			document.querySelector(`.${ID}-modal_overlay`).remove();
		}

		if (document.querySelector(`.${ID}-modal`)) {
			document.querySelector(`.${ID}-modal`).remove();
		}
	};

	const addToBagFunctionality = (caller) => {
		// Add class which needed for CSS
		if (document.querySelector(".oct-products")) {
			if (
				!document
					.querySelector(".oct-products")
					.classList.contains("with_atb")
			) {
				document
					.querySelector(".oct-products")
					.classList.add("with_atb");
			}
		}

		const currentBasketItems = document.querySelectorAll(
			"#oct-basket .oct-product-tile"
		);

		// Get the product IDs for items currently in the basket
		const currentBasketPartNumber = [];
		currentBasketItems.forEach((item) => {
			currentBasketPartNumber.push(
				item
					.getAttribute("data-productid")
					.trim()
					.replace(".p", "")
					.replace(".P", "")
			);
		});

		const basketProducts = document.querySelectorAll(".oct-product-card");

		basketProducts.forEach((product) => {
			// Product ID
			const productSku = product
				.getAttribute("data-productid")
				.trim()
				.replace(".p", "")
				.replace(".P", "");

			// CTA where in control it says View Colours or View Details
			const cta = product.querySelector(
				`a.oct-link[data-testid="button"] .oct-button__content`
			);
			const ctaText = cta.textContent.trim().toLowerCase();

			// If product is not in basket and CTA is not View Colours (Both of this needs to be true other wise We won't make any changes)
			if (
				!currentBasketPartNumber.includes(productSku) &&
				ctaText !== "view colours"
			) {
				// If true then hide the control CTA and generate new CTA with Add to basket text and Functionality
				const cta = document.createElement("button");
				cta.classList.add("add-to-basket");
				cta.textContent = "Add to basket";
				product.classList.add("show_atb_cta");
				cta.addEventListener("click", (e) => {
					e.preventDefault();
					const parentNode = e.target.closest(".oct-product-card");

					const productSku = parentNode
						.getAttribute("data-productid")
						.trim()
						.replace(".p", "")
						.replace(".P", "");

					fetch(
						`https://optimisation-api.co.uk/product-feed?sapcode=${productSku}`
					)
						.then((res) => res.json())
						.then((data) => {
							console.log(data);
							data = data[0];
							const catentryId = data.catID;
							let entitledItemId;

							if (data.entitledItemID) {
								entitledItemId = data.entitledItemID;
							} else {
								entitledItemId = parseInt(data.catID, 10) - 1;
							}
							//const catentryId = parseInt(data.catID, 10) - 1;
							const sapCode = data.SAPCode;
							const name = data.offerName;
							const addToBag = new AddToBag(
								catentryId,
								entitledItemId,
								sapCode,
								name
							);

							addToBag.add();
							fireEvent("Add to basket clicked");
						});
				});

				product.querySelector(".oct-product-card__footer").innerHTML =
					"";
				product.querySelector(".oct-product-card__footer").append(cta);
			}

			// promotional content fetching will apply always if there is a promotional text in thee control
			const promotionalElement = product.querySelector(
				".oct-product-card__offer__container .oct-product-card__offer"
			);

			if (!promotionalElement?.getAttribute("data-id")) {
				fetch(
					`https://optimisation-api.co.uk/product-feed?sapcode=${productSku}`
				)
					.then((res) => res.json())
					.then((data) => {
						const productid = parseInt(data[0].entitledItemID);
						promotionalElement?.setAttribute("data-id", productid);
					});
			}

			promotionalElement?.addEventListener("click", (e) => {
				e.preventDefault();

				// This data id is the entitleItemId which is needed to get the promotional content, this is set in the above fetch request
				// We didn't want to fetch after the CTA click that there will be two fetch before the promotional content is shown and it takes couple of seconds to load

				const productid = promotionalElement.getAttribute("data-id");
				let url = `https://www.boots.com/displayPromotionListViewRedesign?catalogId=${window.WCParamJS?.catalogId}&storeId=${window.WCParamJS?.storeId}&langId=${window.WCParamJS?.langId}`;

				fetch(url, {
					method: "POST",
					body: `productId=${productid}&objectId=&requesttype=ajax`,
					headers: {
						"X-Requested-With": "XMLHttpRequest",
						"Content-Type": "application/x-www-form-urlencoded",
					},
				}).then((response) => {
					response.text().then((html) => {
						html = html.replaceAll("�", "£");

						const modal = document.querySelector(
							`#${ID}-modal .modal-content`
						);
						modal.innerHTML = "";
						modal.insertAdjacentHTML("afterbegin", html);
						modal.closest(`#${ID}-modal`).classList.add("open");
						document
							.querySelector(`#${ID}-modal_overlay`)
							.classList.add("open");

						const modalClose = document.querySelector(
							`#${ID}-modal .modal-close-btn`
						);
						modalClose?.addEventListener("click", (e) => {
							e.preventDefault();
							const modal = document.querySelector(
								`#${ID}-modal .modal-content`
							);
							modal.innerHTML = "";
							modal
								.closest(`#${ID}-modal`)
								.classList.remove("open");
							document
								.querySelector(`#${ID}-modal_overlay`)
								.classList.remove("open");
						});
						document
							.querySelector(`#${ID}-modal_overlay`)
							?.addEventListener("click", (e) => {
								e.preventDefault();
								const modal = document.querySelector(
									`#${ID}-modal`
								);
								modal.classList.remove("open");
								document
									.querySelector(`#${ID}-modal_overlay`)
									.classList.remove("open");
							});
					});
				});
			});
		});
	};
	let swiper_checked = false;
	const updateCTA = () => {
		if (!swiper_checked) {
			pollerLite([".oct-products-carousel .swiper-container"], () => {
				const imageCarousel = jQuery(
					".oct-products-carousel .swiper-container"
				);
				const swiper = imageCarousel[0].swiper;
				swiper.on("update", function () {
					addToBagFunctionality("Slider Updated");
				});
				swiper.on("update", function () {
					addToBagFunctionality("Slider Updated");
				});
				// swiper.on("realIndexChange", function () {
				// 	addToBagFunctionality("Slider realIndexChange");
				// });
			});
			swiper_checked = true;
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
	const updateAmounts = (
		deliveryThreshold = false,
		storeThreshold = false
	) => {
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
		const isStoreCollection = document.querySelector(
			".oct-basket-messagingRow .oct-basket-messagingRow__amount"
		)
			? document
					.querySelector(
						".oct-basket-messagingRow .oct-basket-messagingRow__amount"
					)
					.textContent.trim()
					.includes("NaN")
			: false;
		if (deliveryThreshold && deliveryThreshold && isStoreCollection) {
			const amountLeftMessage = document.querySelectorAll(
				".oct-basket-messagingRow"
			);
			amountLeftMessage.forEach((message, index) => {
				let threshold;
				if (index === 0) {
					threshold = storeThreshold;
				} else {
					threshold = deliveryThreshold;
				}
				const amountLeft = message.querySelector(
					".oct-basket-messagingRow__amount"
				);
				if (
					amountLeft &&
					amountLeft.textContent.trim().includes("NaN")
				) {
					let totalRemainder = threshold.amount - totalBasketValue;
					totalRemainder =
						totalRemainder < 0 ? 0 : totalRemainder.toFixed(2);
					let totalRemainderDisplay =
						threshold.currencySymbol + totalRemainder;
					amountLeft.textContent = totalRemainderDisplay;
				}
			});
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
				if (document.querySelector(`#${ID}-root`)) {
					document.querySelector(`#${ID}-root`).remove();
					document
						.querySelector(".oct-products")
						.classList.remove("tab-hide");
				}

				if (document.querySelector(`.${ID}-deliveryBanner`)) {
					document.querySelector(`.${ID}-deliveryBanner`).remove();
				}
				if (document.querySelector(`.${ID}-modal_overlay`)) {
					document.querySelector(`.${ID}-modal_overlay`).remove();
				}

				if (document.querySelector(`.${ID}-modal`)) {
					document.querySelector(`.${ID}-modal`).remove();
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
					renderModal();
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

					if (totalBasketValue <= 25) {
						document
							.querySelector(".oct-products")
							.classList.add("tab-hide");

						if (!document.querySelector(`.${ID}-deliveryBanner`)) {
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
						}

						if (!document.querySelector(`#${ID}-root`)) {
							/**
							 * Change title with thresholds
							 */
							const entry =
								document.querySelector(".oct-products");
							const root = document.createElement("div");
							root.id = `${ID}-root`;
							root.innerHTML = /* HTML */ `
								<div class="${ID}-title"></div>
							`;

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
									).innerHTML = `<h2>You've qualified for FREE delivery!</h2>
												<span>Proceed to checkout when ready</span>`;

									document.querySelector(
										`.${ID}-deliveryBanner .${ID}-amountLeft`
									).innerHTML = `You've qualified for FREE delivery!`;
								} else {
									document.querySelector(
										`.${ID}-title`
									).innerHTML = `<h2>You're only ${totalRemainderDisplay} away from FREE delivery!</h2>
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
							}
						}
					}

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

					resolve();
				}
			);
		});
	};

	window.addEventListener("oct-basket:updated", (e) => {
		const deliveryThreshold = e.detail.freeStandardDeliveryThreshold;
		const storeThreshold = e.detail.freeStoreCollectionThreshold;
		localStorage.setItem("currentBasketItems", e.detail.orderItems);
		updateCTA();
		removeOnBasketChange();
		addToBagFunctionality("add-to-basket:updated");
		runBasketChanges().then(() => {
			updateAmounts(deliveryThreshold, storeThreshold);
			checkEmptyBasket();
		});

		checkOtherTest().then(() => {
			removeEverything();
		});
	});

	window.addEventListener("add-to-basket:success", function (e) {
		const deliveryThreshold = { amount: 25, currencySymbol: "£" };
		const storeThreshold = { amount: 15, currencySymbol: "£" };

		removeOnBasketChange();
		addToBagFunctionality("oct-basket:success");
		runBasketChanges().then(() => {
			updateAmounts(deliveryThreshold, storeThreshold);
			checkEmptyBasket();
			checkOtherTest().then(() => {
				removeEverything();
			});
		});
	});

	const basket = document.querySelector("#oct-basket-container");
	basket.addEventListener("click", () => {
		runBasketChanges().then(() => {
			updateAmounts();
			addToBagFunctionality("oct-basket:updated");
			checkEmptyBasket();
		});

		checkOtherTest().then(() => {
			removeEverything();
		});
	});

	window.addEventListener("resize", () => {
		const basket = document.querySelector("#oct-basket .oct-overlay");
		if (basket.classList.contains("oct-overlay--visible")) {
			setTimeout(() => {
				runBasketChanges().then(() => {
					updateAmounts();
					addToBagFunctionality("oct-basket:updated");
					checkEmptyBasket();
				});
			}, 1000);
		}
	});
};
