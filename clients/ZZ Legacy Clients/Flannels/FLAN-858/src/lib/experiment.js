/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup, getPageData } from "./services";
import shared from "./shared";
import settings from "./shared";
import { pollerLite } from "../../../../../lib/uc-lib";
import { events, observer, logMessage } from "../../../../../lib/utils";
import { fireEvent } from "../../../../../core-files/services";

events.analyticsReference = "_gaUAT";

export default () => {
	setup();

	fireEvent("Conditions Met");

	const { ID, VARIATION } = settings;

	logMessage("FLAN-858");

	// Goal ATB
	pollerLite(["#aAddToBag"], () => {
		let atbButton = document.getElementById("aAddToBag");

		atbButton.addEventListener("click", (e) => {
			let sizeSelected = $("#hdnSelectedSizeName").val() !== "";
			if (sizeSelected) {
				fireEvent("ATB - User adds product to Bag");
			}
		});
	});

	if (VARIATION == "control") {
		return;
	}

	let notificationHolder,
		colvarID,
		prodData,
		productID,
		productSKU,
		productTimeout;

	const getUrlParam = (name, url) => {
		if (!url) {
			url = window.location.href;
		}
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		const regexS = `[\\?#&]${name}=([^&#]*)`;
		const regex = new RegExp(regexS);
		const results = regex.exec(url);
		return results == null ? null : results[1];
	};

	const removeMessage = () => {
		// remove the element
		notificationHolder.remove();
	};

	const showSocialProof = (number) => {
		if (document.querySelector(`.${ID}-social-notification`)) {
			notificationHolder.remove();
		}

		let socialNotificationHTML = `
        <div class="${ID}-social-notification">
          <span class="${ID}--text-normal"><span class="${ID}--text-bold">${
			VARIATION == 1 || VARIATION == 2
				? `TRENDING<span class="desktop-only">:</span> <span class="mobile-only">!</span>`
				: `LIMITED AVAILABILITY`
		}</span>&nbsp;<br class="mobile-only"><span>${
			VARIATION == 1 || VARIATION == 2
				? `PURCHASED ${number} TIMES TODAY`
				: `ONLY ${number} LEFT`
		}</span>
    ${
		VARIATION == 2 || VARIATION == 4
			? `<a href="javascript:void(0)" id="${ID}-hide-notification" class="${ID}-hide-notification">
      <svg class="${ID}-close-icon" xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 13 13" fill="none">
        <path d="M1.19958 0.999878L12 11.8003" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
        <path d="M1.19958 11.8003L12 0.999878" stroke="black" stroke-width="2" stroke-miterlimit="10"/>
      </svg>
    </a>`
			: ``
	}
      </span>
        </div>
      `;

		if (VARIATION == 1 || VARIATION == 3) {
			pollerLite(["#productDetails .product-detail__price"], () => {
				let productDetailsPanel = document.querySelector(
					"#productDetails .product-detail__price"
				);
				productDetailsPanel.insertAdjacentHTML(
					"afterbegin",
					socialNotificationHTML
				);
				fireEvent("User meets threshold and sees social proof");
			});
		} else {
			pollerLite(
				[
					"#productImageContainer",
					".swiper-container.swiper-initialized",
				],
				() => {
					let imageContainer = document.querySelector(
						"#productImageContainer .productImageCarousel"
					);
					imageContainer.insertAdjacentHTML(
						"beforebegin",
						socialNotificationHTML
					);
					notificationHolder = document.querySelector(
						`.${ID}-social-notification`
					);

					let hideNotification = document.getElementById(
						`${ID}-hide-notification`
					);

					hideNotification.addEventListener("click", (e) => {
						e.preventDefault();
						e.stopPropagation();
						fireEvent(`user closes message`);
						notificationHolder.classList.add("fading");
						let removeTimeout = setTimeout(() => {
							notificationHolder.remove();
						}, 500);
					});
					pollerLite(
						[
							() =>
								document.documentElement.classList.contains(
									"FLAN-953-1"
								) ||
								document.documentElement.classList.contains(
									"FLAN-953-4"
								),
						],
						() => {
							const activeElm = document.querySelector(
								".productRollOverPanel.active .swiper-wrapper a"
							);
							const socialElement = document.querySelector(
								`.${ID}-social-notification`
							);
							if (activeElm) {
								let height =
									activeElm.getBoundingClientRect().height;
								socialElement.style.top = `${
									height -
									(socialElement.getBoundingClientRect()
										.height +
										10)
								}px`;
							}
							window.addEventListener("resize", () => {
								const activeElm = document.querySelector(
									".productRollOverPanel.active .swiper-wrapper a"
								);
								const socialElement = document.querySelector(
									`.${ID}-social-notification`
								);
								if (activeElm) {
									let height =
										activeElm.getBoundingClientRect()
											.height;
									socialElement.style.top = `${
										height -
										(socialElement.getBoundingClientRect()
											.height +
											10)
									}px`;
								}
							});
						}
					);

					clearTimeout(productTimeout);
					productTimeout = setTimeout(() => {
						notificationHolder.classList.add("fading");
						let removeTimeout = setTimeout(() => {
							notificationHolder.remove();
						}, 500);
					}, 4000);

					fireEvent("User meets threshold and sees social proof");
				}
			);
		}
	};

	const getProductDetails = (colCode) => {
		if (VARIATION == 3 || VARIATION == 4) {
			// if variation 3 or 4, check if the product is in stock
			let stockNumber = window?.DY?.feedProperties?.stock_quantity;
			window.checkingNumberOfStock = stockNumber;

			if (stockNumber > 0 && stockNumber < 10) {
				setTimeout(() => {
					showSocialProof(stockNumber);
					if (VARIATION == 3) {
						document
							.querySelector(".product-detail__price")
							?.classList.add(`${ID}--container`);
					}
				}, 2500);
			}
		} else {
			let colourCode;
			// set up the colour code
			if (colCode == null) {
				if (getUrlParam("colcode")) {
					// if there is a URL param, use that
					colourCode = getUrlParam("colcode");
				} else {
					// if not, grab colour variant ID from datalayer
					colourCode = prodData.colourVariantId;
				}
			} else {
				// if value passed, use that value
				colourCode = colCode;
			}

			let atbButton = document.querySelector("#aAddToBag > span");
			if (atbButton.innerText == "PRE-ORDER NOW") {
				events.send(
					ID,
					`${shared.ID} Variation ${shared.VARIATION}`,
					"this product is pre-order, not relevant"
				);
				return false;
			}

			colvarID = colourCode;
			productID = prodData.productSequenceNumber;
			productSKU = colvarID + "-" + productID;

			window.DY.ServerUtil.getProductsData(
				[productSKU],
				["daily"],
				"",
				true,
				function (err, res) {
					if (typeof res !== undefined || res !== null) {
						let numberOfInteractions = 0;
						numberOfInteractions =
							res[productSKU].productInterest.purchase.daily;

						logMessage(
							"product SKU: " +
								productSKU +
								" -- purchases today: " +
								res[productSKU].productInterest.purchase.daily +
								" views today: " +
								res[productSKU].productInterest.view.daily
						);
						window.checkingNumberOfInteractions =
							numberOfInteractions;

						if (numberOfInteractions > 10) {
							setTimeout(() => {
								showSocialProof(numberOfInteractions);
								if (VARIATION == 1) {
									document
										.querySelector(".product-detail__price")
										?.classList.add(`${ID}--container`);
								}
							}, 2500);
						}
					}
				}
			);
		}
	};

	// start experiment
	// run poller to wait on DataLayer & DY
	pollerLite(
		[
			() => {
				return window?.DY?.ServerUtil?.getProductsData;
			},
			() => {
				if (typeof getPageData() !== "undefined") {
					return true;
				}
			},
		],
		() => {
			prodData = getPageData();
			// initial run for when user lands on the page
			// check for dropship product

			getProductDetails();
			// event handlers to determine if the colour has been changed
			const colourButtons = document.querySelectorAll(
				"#ulColourImages > li"
			);
			[].slice.call(colourButtons).forEach((colourButton) => {
				colourButton.addEventListener(
					"click",
					(e) => {
						// grab colour variant of clicked button and re-process
						colvarID =
							e.currentTarget.getAttribute("data-colvarid");
						// events.send(ID, `${shared.ID} Variation ${shared.VARIATION}`, "colour option checked, re-calculating");
						getProductDetails(colvarID);
					},
					false
				);
			});
		}
	);
};
