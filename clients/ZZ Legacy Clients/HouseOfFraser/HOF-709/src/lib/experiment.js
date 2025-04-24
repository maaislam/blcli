/* eslint-disable no-undef */
/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	var isPLP = pageMeta_PageType === "Browse" ? true : false;
	var isPDP = pageMeta_PageType === "ProductDetail" ? true : false;

	var isEuro = false;
	pollerLite(
		["#divCurrencyLanguageSelector .spanCurrencyLanguageSelector"],
		() => {
			isEuro =
				document
					.querySelector(
						"#divCurrencyLanguageSelector .spanCurrencyLanguageSelector p"
					)
					?.innerText.trim()
					.indexOf("€") > -1;
		}
	);
	if (
		isPLP &&
		!document.querySelector(".BreadcrumbGroupWrapper a[href='/beauty']")
	) {
		fireEvent("Conditions Met");
		document.body.addEventListener("click", (e) => {
			const target = e.target;
			const isProductBoxClicked = target.closest("div.s-productthumbbox");
			if (isProductBoxClicked) {
				const discountedPriceContainer =
					isProductBoxClicked.querySelector(".s-producttext-price");
				const isDiscounted = discountedPriceContainer
					? discountedPriceContainer.querySelector(
							".RefandPrice .s-smalltext"
					  )
					: false;
				if (
					isDiscounted &&
					(target.matches("a") || target.closest("a"))
				) {
					let currentPrice = discountedPriceContainer
						.querySelector(".s-largered span.curprice")
						?.innerText.trim();

					currentPrice = currentPrice.replaceAll(/[\s\€\£\$]/g, "");

					let prevPrice = discountedPriceContainer
						.querySelector(".RefandPrice span.s-smalltext")
						?.innerText.trim();
					prevPrice = prevPrice.replaceAll(/[\s\€\£\$]/g, "");

					if (isEuro) {
						currentPrice = currentPrice.replaceAll(".", "");
						prevPrice = prevPrice.replaceAll(".", "");
						prevPrice = parseFloat(prevPrice.replaceAll(",", "."));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", ".")
						);
					} else {
						prevPrice = parseFloat(prevPrice.replaceAll(",", ""));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", "")
						);
					}
					let dif;
					if (prevPrice !== 0) {
						dif =
							100 *
							Math.abs((currentPrice - prevPrice) / prevPrice);
						if (VARIATION == 2) {
							dif = parseInt(dif / 5) * 5;
						}
					}
					if (dif >= 20.0) {
						fireEvent(
							`PLP - Customer views ${Math.floor(
								dif
							)}% discounted product and proceeds to PDP`
						);
					}
				}
			} else if (target.closest("#hotspotModal")) {
				var isDiscounted = target
					.closest("#hotspotModal")
					.querySelector("#hsRefPrice");
				var isSizeSelected = false;
				var items = document.querySelectorAll("#hotspotModal select");
				if (items.length < 1) {
					isSizeSelected = true;
				} else {
					for (let index = 0; index < items.length; index++) {
						if (items[index].value != "") {
							isSizeSelected = true;
						} else {
							isSizeSelected = false;
							break;
						}
					}
				}
				if (
					isDiscounted &&
					target.getAttribute("id") == "addHotspotToBag" &&
					isSizeSelected &&
					target.closest("#hsAddToBagWrapper")
				) {
					let currentPrice = target
						.closest("#hotspotModal")
						.querySelector("#hsPrice")
						?.innerText.trim();

					currentPrice = currentPrice.replaceAll(/[\s\€\£\$]/g, "");

					let prevPrice = target
						.closest("#hotspotModal")
						.querySelector("#hsRefPrice")
						?.innerText.trim();
					prevPrice = prevPrice.replaceAll(/[\s\€\£\$]/g, "");

					if (isEuro) {
						currentPrice = currentPrice.replaceAll(".", "");
						prevPrice = prevPrice.replaceAll(".", "");
						prevPrice = parseFloat(prevPrice.replaceAll(",", "."));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", ".")
						);
					} else {
						prevPrice = parseFloat(prevPrice.replaceAll(",", ""));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", "")
						);
					}
					let dif;
					if (prevPrice !== 0) {
						dif =
							100 *
							Math.abs((currentPrice - prevPrice) / prevPrice);
						if (VARIATION == 2) {
							dif = parseInt(dif / 5) * 5;
						}
					}
					if (dif >= 20.0) {
						fireEvent(
							`PLP - Customer views ${Math.floor(
								dif
							)}% discounted product and adds to bag from quick view`
						);
					}
				} else if (
					isDiscounted &&
					target.classList.contains("innerHotSpotLine") &&
					isSizeSelected &&
					e.target.closest("#hsAddToBagWrapper")
				) {
					let currentPrice = target
						.closest("#hotspotModal")
						.querySelector("#hsPrice")
						?.innerText.trim();

					currentPrice = currentPrice.replaceAll(/[\s\€\£\$]/g, "");

					let prevPrice = target
						.closest("#hotspotModal")
						.querySelector("#hsRefPrice")
						?.innerText.trim();
					prevPrice = prevPrice.replaceAll(/[\s\€\£\$]/g, "");
					if (isEuro) {
						currentPrice = currentPrice.replaceAll(".", "");
						prevPrice = prevPrice.replaceAll(".", "");
						prevPrice = parseFloat(prevPrice.replaceAll(",", "."));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", ".")
						);
					} else {
						prevPrice = parseFloat(prevPrice.replaceAll(",", ""));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", "")
						);
					}
					let dif;
					if (prevPrice !== 0) {
						dif =
							100 *
							Math.abs((currentPrice - prevPrice) / prevPrice);
						if (VARIATION == 2) {
							dif = parseInt(dif / 5) * 5;
						}
					}
					if (dif >= 20.0) {
						fireEvent(
							`PLP - Customer views ${Math.floor(
								dif
							)}% discounted product and adds to bag from quick view`
						);
					}
				}
			}
		});
	}

	if (isPDP) {
		pollerLite(
			[
				"#productDetails",
				"#aAddToBag",
				() => {
					return !document.querySelector(
						".BreadcrumbGroupWrapper a[href='/beauty']"
					);
				},
			],
			() => {
				fireEvent("Conditions Met");
				let atbButton =
					document.querySelector(
						"#spanAddToBagWrapper #aPrePersAddToBag"
					) || document.querySelector("#sAddToBagWrapper #aAddToBag");
				let allSizeButtons = document.querySelectorAll("#ulSizes li");

				const fireEvents = () => {
					let isDiscounted = false;
					const prevPrice = document.querySelector(
						"#productDetails #TicketPriceDiv2"
					);
					if (
						prevPrice &&
						!(prevPrice.getAttribute("style").indexOf("none") > -1)
					) {
						isDiscounted = true;
					}

					let sizeSelected = false;
					const divPersaddToBasketContainer = document.querySelector(
						"#divPersaddToBasketContainer a.ContinueWithPers:not(.hidden)"
					);
					if (divPersaddToBasketContainer) {
						sizeSelected = true;
					} else {
						if (allSizeButtons.length == 0) {
							sizeSelected = true;
						} else {
							[].slice.call(allSizeButtons).forEach((button) => {
								if (
									button.classList.contains(
										"sizeVariantHighlight"
									)
								) {
									sizeSelected = true;
								}
							});
						}
					}

					if (sizeSelected == true && isDiscounted) {
						let currentPrice = document
							.querySelector("#productDetails #lblSellingPrice")
							?.innerText.trim();

						currentPrice = currentPrice.replaceAll(
							/[\s\€\£\$]/g,
							""
						);

						let prevPrice = document
							.querySelector(
								"#productDetails #TicketPriceDiv2 span"
							)
							?.innerText.trim();
						prevPrice = prevPrice.replaceAll(/[\s\€\£\$]/g, "");

						if (isEuro) {
							currentPrice = currentPrice.replaceAll(".", "");
							prevPrice = prevPrice.replaceAll(".", "");
							prevPrice = parseFloat(
								prevPrice.replaceAll(",", ".")
							);
							currentPrice = parseFloat(
								currentPrice.replaceAll(",", ".")
							);
						} else {
							prevPrice = parseFloat(
								prevPrice.replaceAll(",", "")
							);
							currentPrice = parseFloat(
								currentPrice.replaceAll(",", "")
							);
						}
						let dif;
						if (prevPrice !== 0) {
							dif =
								100 *
								Math.abs(
									(currentPrice - prevPrice) / prevPrice
								);
							if (VARIATION == 2) {
								dif = parseInt(dif / 5) * 5;
							}
						}
						if (dif >= 20.0) {
							fireEvent(
								`PDP - Customer views ${Math.floor(
									dif
								)}% discounted product and adds to bag`
							);
						}
					}
				};

				atbButton.addEventListener("click", (e) => {
					fireEvents();
				});

				document.body.addEventListener("click", (e) => {
					if (
						(e.target.closest("#spanAddToBagWrapper") &&
							e.target.closest(
								"a.ContinueWithPers:not(.hidden)"
							)) ||
						e.target.matches("a.ContinueWithPers:not(.hidden)")
					) {
						fireEvents();
					}
				});
			}
		);
	}
	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...
	// CONFIG FOR MUTATION OBSERVER
	const config = { childList: true, subtree: true };

	const showPercentageDifference = () => {
		const products = document.querySelectorAll(
			"#productlistcontainer ul#navlist li"
		);
		if (products.length > 0) {
			products.forEach((product) => {
				const discountedPriceContainer = product.querySelector(
					".s-producttext-price"
				);
				const isDiscounted = discountedPriceContainer
					? discountedPriceContainer.querySelector(
							".RefandPrice .s-smalltext"
					  )
					: false;
				if (isDiscounted) {
					let currentPrice = discountedPriceContainer
						.querySelector(".s-largered span.curprice")
						?.innerText.trim();

					currentPrice = currentPrice.replaceAll(/[\s\€\£\$]/g, "");

					let prevPrice = discountedPriceContainer
						.querySelector(".RefandPrice span.s-smalltext")
						?.innerText.trim();

					prevPrice = prevPrice.replaceAll(/[\s\€\£\$]/g, "");
					if (isEuro) {
						currentPrice = currentPrice.replaceAll(".", "");
						prevPrice = prevPrice.replaceAll(".", "");
						prevPrice = parseFloat(prevPrice.replaceAll(",", "."));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", ".")
						);
					} else {
						prevPrice = parseFloat(prevPrice.replaceAll(",", ""));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", "")
						);
					}

					let dif;
					if (prevPrice !== 0) {
						dif =
							100 *
							Math.abs((currentPrice - prevPrice) / prevPrice);
						if (VARIATION == 2) {
							dif = parseInt(dif / 5) * 5;
						}
					}
					if (dif >= 20.0) {
						const discountPercentageDom = `<div class="${ID}-discount-percentage">
							<span>${Math.floor(dif)}% off</span>
						</div>`;
						if (
							!discountedPriceContainer.querySelector(
								`.${ID}-discount-percentage`
							)
						) {
							discountedPriceContainer
								.querySelector(".RefandPrice")
								?.insertAdjacentHTML(
									"beforeend",
									discountPercentageDom
								);
						}
					}
				}
			});
		}
	};

	if (
		isPLP &&
		!document.querySelector(".BreadcrumbGroupWrapper a[href='/beauty']")
	) {
		pollerLite(["#productlistcontainer"], () => {
			//showPercentageDifference();
			var productListContainer = document.querySelector(
				"#productlistcontainer"
			);
			//let oldHref = document.location.href;
			let status = false;
			let oldHref = "";
			const observer = new MutationObserver((mutationsList, observer) => {
				observer.disconnect();
				if (status && oldHref != document.location.href) {
					oldHref = document.location.href;
					showPercentageDifference();
				} else {
					status = true;
					showPercentageDifference();
				}
				observer.observe(productListContainer, config);
			});
			observer.observe(productListContainer, config);
		});
		pollerLite(["#hotspotModal"], () => {
			var modal = document.querySelector("#hotspotModal");
			const observer = new MutationObserver((mutationsList, observer) => {
				observer.disconnect();
				if (modal.querySelector("#hsRefPrice")) {
					modal.classList.add("discounted-item");
					let currentPrice = modal
						.querySelector("#hsPrice")
						?.innerText.trim();

					currentPrice = currentPrice.replaceAll(/[\s\€\£\$]/g, "");

					let prevPrice = modal
						.querySelector("#hsRefPrice")
						?.innerText.trim();
					prevPrice = prevPrice.replaceAll(/[\s\€\£\$]/g, "");
					if (isEuro) {
						currentPrice = currentPrice.replaceAll(".", "");
						prevPrice = prevPrice.replaceAll(".", "");
						prevPrice = parseFloat(prevPrice.replaceAll(",", "."));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", ".")
						);
					} else {
						prevPrice = parseFloat(prevPrice.replaceAll(",", ""));
						currentPrice = parseFloat(
							currentPrice.replaceAll(",", "")
						);
					}
					let dif;
					if (prevPrice !== 0) {
						dif =
							100 *
							Math.abs((currentPrice - prevPrice) / prevPrice);
						if (VARIATION == 2) {
							dif = parseInt(dif / 5) * 5;
						}
					}
					if (dif >= 20.0) {
						const discountPercentageDom = `<div class="${ID}-discount-percentage-modal">
							${Math.floor(dif)}% off
						</div>`;
						if (
							!modal.querySelector(
								`#hsPriceWrapper .${ID}-discount-percentage-modal`
							)
						) {
							modal
								.querySelector("#hsPriceWrapper")
								?.insertAdjacentHTML(
									"beforeend",
									discountPercentageDom
								);
						} else {
							modal.querySelector(
								`#hsPriceWrapper .${ID}-discount-percentage-modal`
							).innerText = `${Math.floor(dif)}% off`;
						}
					} else {
						modal
							.querySelector(
								`#hsPriceWrapper .${ID}-discount-percentage-modal`
							)
							?.remove();
					}
				} else {
					modal.classList.remove("discounted-item");
					if (
						modal.querySelector(
							`#hsPriceWrapper .${ID}-discount-percentage-modal`
						)
					) {
						modal
							.querySelector(
								`#hsPriceWrapper .${ID}-discount-percentage-modal`
							)
							.remove();
					}
				}
				observer.observe(modal, config);
			});
			observer.observe(modal, config);
		});
		if (VARIATION == "2") {
			fireEvent(
				`A reduction in % is shown and rounded down to the nearest 5%. e.g. 29% becomes 25% `
			);
		} else if (VARIATION == "1") {
			fireEvent(
				`A reduction in % is shown to the user when a sale price is 20% or greater.`
			);
		}
	}

	if (isPDP) {
		pollerLite(
			[
				"#productDetails #lblSellingPrice",
				() => {
					return document.readyState == "complete";
				},
				() => {
					return !document.querySelector(
						".BreadcrumbGroupWrapper a[href='/beauty']"
					);
				},
			],
			() => {
				var pdpPriceRating = document.querySelector(
					"#productDetails .pdpPriceRating"
				);

				const percentageDiscound = () => {
					const prevPrice =
						pdpPriceRating?.querySelector("#TicketPriceDiv2");
					if (
						prevPrice &&
						!(prevPrice.getAttribute("style").indexOf("none") > -1)
					) {
						let currentPrice = pdpPriceRating
							.querySelector("#productDetails #lblSellingPrice")
							?.innerText.trim();

						currentPrice = currentPrice.replaceAll(
							/[\s\€\£\$]/g,
							""
						);

						let prevPrice = pdpPriceRating
							.querySelector(
								"#productDetails #TicketPriceDiv2 span"
							)
							?.innerText.trim();
						prevPrice = prevPrice.replaceAll(/[\s\€\£\$]/g, "");

						if (isEuro) {
							currentPrice = currentPrice.replaceAll(".", "");
							prevPrice = prevPrice.replaceAll(".", "");
							prevPrice = parseFloat(
								prevPrice.replaceAll(",", ".")
							);
							currentPrice = parseFloat(
								currentPrice.replaceAll(",", ".")
							);
						} else {
							prevPrice = parseFloat(
								prevPrice.replaceAll(",", "")
							);
							currentPrice = parseFloat(
								currentPrice.replaceAll(",", "")
							);
						}
						let dif;
						if (prevPrice !== 0) {
							dif =
								100 *
								Math.abs(
									(currentPrice - prevPrice) / prevPrice
								);
							if (VARIATION == 2) {
								dif = parseInt(dif / 5) * 5;
							}
						}
						if (dif >= 20.0) {
							const discountPercentageDom = `<span class="${ID}-discount-percentage-pdp">
							${Math.floor(dif)}% off
							</span>`;
							if (
								!pdpPriceRating.querySelector(
									`.${ID}-discount-percentage-pdp`
								)
							) {
								pdpPriceRating
									.querySelector(
										"#productDetails #TicketPriceDiv2"
									)
									?.insertAdjacentHTML(
										"beforeend",
										discountPercentageDom
									);
							} else {
								pdpPriceRating.querySelector(
									`.${ID}-discount-percentage-pdp`
								).innerText = `${Math.floor(dif)}% off`;
							}
						} else {
							pdpPriceRating
								.querySelector(`.${ID}-discount-percentage-pdp`)
								?.remove();
						}
					} else {
						pdpPriceRating
							.querySelector(`.${ID}-discount-percentage-pdp`)
							?.remove();
					}
				};
				percentageDiscound();
				const observer = new MutationObserver(
					(mutationsList, observer) => {
						observer.disconnect();
						percentageDiscound();
						observer.observe(pdpPriceRating, config);
					}
				);
				observer.observe(pdpPriceRating, config);
				if (VARIATION == "2") {
					fireEvent(
						`A reduction in % is shown and rounded down to the nearest 5%. e.g. 29% becomes 25% `
					);
				} else if (VARIATION == "1") {
					fireEvent(
						`A reduction in % is shown to the user when a sale price is 20% or greater.`
					);
				}
			}
		);
	}
};
