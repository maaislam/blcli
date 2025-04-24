/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import { events, pollerLite } from "../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

events.analyticsReference = "_gaUAT";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	events.analyticsReference = window.ga ? "ga" : "_gaUAT";
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...
	if (location.pathname.includes("/checkoutsp")) {
		var activeStep = 0;

		const checkCheckoutStepAndFireEvent = () => {
			if (
				document.querySelector(
					".sectionWrap .welcomeSection.activeSection"
				) &&
				activeStep != 1
			) {
				activeStep = 1;
			} else if (
				document.querySelector(
					".sectionWrap .deliverySection.activeSection"
				) &&
				activeStep != 2
			) {
				activeStep = 2;
			} else if (
				document.querySelector(
					".sectionWrap .paymentSection.activeSection"
				) &&
				activeStep != 3
			) {
				activeStep = 3;
				fireEvent("User reached to Payment Step of checkout");
			} else if (
				document.querySelector(
					".sectionWrap .confirmationSection.activeSection"
				) &&
				activeStep != 4
			) {
				activeStep = 4;
				fireEvent(
					"User reached to Order Confirmation Step of checkout"
				);
			}
		};

		pollerLite([".sectionWrap .activeSection"], () => {
			checkCheckoutStepAndFireEvent();
			const target = document.querySelector(".leftMain .sectionWrap");

			const Observer = new MutationObserver((mutationList, observer) => {
				checkCheckoutStepAndFireEvent();
			});
			Observer.observe(target, {
				childList: true,
				subtree: true,
				attributes: true,
			});
		});
	}
	if (location.pathname.includes("/cart")) {
		pollerLite(["#buttonWrapperMobile", "#buttonWrapper"], () => {
			const TopCheckoutButton = document.querySelector(
				`#buttonWrapperMobile a[data-action="checkout"]`
			);

			TopCheckoutButton?.addEventListener("click", () => {
				fireEvent(`Click - User clicked the continue securely CTA`);
			});

			const BottomCheckoutButton = document.querySelector(
				'#buttonWrapper a[data-action="checkout"]'
			);

			BottomCheckoutButton?.addEventListener("click", () => {
				fireEvent(`Click - User clicked the continue securely CTA`);
			});
		});

		pollerLite(["#BasketDiv"], () => {
			const basketDiv = document.querySelector("#BasketDiv");
			basketDiv?.addEventListener("click", (e) => {
				const target = e.target.closest(".s-basket-remove-button a");
				if (target) {
					fireEvent(`User removes item from cart`);
				}
			});

			const updateButton = document.querySelector(
				"#CartPanel .UpdateandAddMore .NewUpdateQuant"
			);
			updateButton?.addEventListener("click", () => {
				const tableRows = document.querySelectorAll(
					"#CartPanel #gvBasketDetails table tbody tr"
				);
				if (tableRows.length > 0) {
					for (let index = 0; index < tableRows.length; index++) {
						const element = tableRows[index];
						let quantity = element.querySelector(
							`input[type="number"].qtybox`
						).value;

						if (parseInt(quantity) === 0) {
							fireEvent(`User removes item from cart`);
							break;
						}
					}
				}
			});
		});
	}
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

	var regex = /[\s\€\£\$\¥\Kč\kr\zł\Ft(A-Z)(a-z)]/g;
	let currencies = ["ISK", "SEK", "PLN", "CZK", "HUF", "EUR"];
	let currencySign = "£";
	let isCommaUsedInCurrencyForDecimal = false;

	pollerLite(["input[name='lCurrenciesSwitcher']:checked"], () => {
		const selectedCurrency = document.querySelector(
			"input[name='lCurrenciesSwitcher']:checked"
		)?.value;
		for (let index = 0; index < currencies.length; index++) {
			if (
				selectedCurrency.indexOf(currencies[index]) > -1 ||
				selectedCurrency == currencies[index]
			) {
				isCommaUsedInCurrencyForDecimal = true;
				break;
			}
		}
	});

	const getBasketDetails = () => {
		let dataObject;
		for (let i = 0; i < window.dataLayer.length; i += 1) {
			const data = window.dataLayer[i];
			if (
				typeof data === "object" &&
				data.event &&
				data.event === "basketView"
			) {
				dataObject = data;
				break;
			}
		}
		return dataObject.basketProducts;
	};

	const getCurrencySymbol = (price) => {
		var regex = /[\s\.\,(0-9)]/g;
		return price.replaceAll(regex, "");
	};

	const getDecimalPrice = (price) => {
		let value = price.replaceAll(regex, "");

		if (isCommaUsedInCurrencyForDecimal) {
			value = value.replaceAll(".", "");
			value = parseFloat(value.replaceAll(",", "."));
		} else {
			value = parseFloat(value.replaceAll(",", ""));
		}
		return Math.abs(value);
	};

	const cartCalculation = (cartInfo) => {
		let orginalPriceTotalSum = 0;
		let finalSaving = 0;
		cartInfo.filter((info) => {
			if (info.orginalPrice > 0) {
				orginalPriceTotalSum =
					orginalPriceTotalSum + info.orginalPriceTotal;
				finalSaving +=
					Number(info.orginalPriceTotal) - Number(info.total);
			} else if (info.orginalPrice == 0) {
				orginalPriceTotalSum =
					orginalPriceTotalSum + Number(info.total);
			}
		});

		orginalPriceTotalSum = Number(orginalPriceTotalSum).toFixed(2);

		finalSaving = Number(finalSaving).toFixed(2);
		if (isCommaUsedInCurrencyForDecimal) {
			finalSaving = finalSaving.replaceAll(",", "*");
			finalSaving = finalSaving.replaceAll(".", ",");
			finalSaving = finalSaving.replaceAll("*", ".");

			orginalPriceTotalSum = orginalPriceTotalSum.replaceAll(",", "*");
			orginalPriceTotalSum = orginalPriceTotalSum.replaceAll(".", ",");
			orginalPriceTotalSum = orginalPriceTotalSum.replaceAll("*", ".");
		}
		let originalPriceToRender = isCommaUsedInCurrencyForDecimal
			? orginalPriceTotalSum + ` ${currencySign}`
			: `${currencySign}` + orginalPriceTotalSum;

		const savingsDom = `<div id="SavingsRow" class="col-xs-12 TotalSavings" data-price="${finalSaving}">
								<div class="col-xs-6">
									<span>Savings</span>
								</div>
								<div class="col-xs-6 text-right">
									<span id="TotalSavingsValue">${
										isCommaUsedInCurrencyForDecimal
											? "-" +
											  finalSaving +
											  ` ${currencySign}`
											: `-${currencySign}` + finalSaving
									}</span>
								</div>
							</div>`;
		pollerLite(["#TotalRow.TotalSumm"], () => {
			const totalRow = document.querySelector("#TotalRow.TotalSumm");
			totalRow.insertAdjacentHTML("beforebegin", savingsDom);
		});
		pollerLite(["#SubtotalRow.SubSumm div.text-right"], () => {
			const totalRow = document.querySelector(
				"#SubtotalRow.SubSumm div.text-right"
			);
			totalRow.innerText = originalPriceToRender;
		});
	};

	const populateCart = () => {
		const cartItems = document.querySelectorAll(
			"#gvBasketDetails table tbody tr"
		);

		const cartInfo = [];

		if (cartItems.length > 0) {
			cartItems.forEach((item, index) => {
				let productID,
					quantity,
					price,
					total,
					productIdIndex,
					mainPrice,
					maintotal,
					url;

				productID = item
					.querySelector("#dhypProductLink")
					.getAttribute("href");
				productIdIndex = productID.lastIndexOf("=");
				productID = Number(productID.slice(productIdIndex + 1));

				quantity = Number(
					item.querySelector(".prdQuantity .qtybox").value
				);

				mainPrice = item.querySelector(".itemprice .money").textContent;
				price = getDecimalPrice(mainPrice);

				maintotal = item.querySelector(
					".itemtotalprice .money"
				).innerText;

				total = getDecimalPrice(maintotal);

				url = item.querySelector(".prodDescContainer .productTitle");
				url = url ? url.href : "";

				item.querySelector(".productdesc").parentElement.setAttribute(
					"id",
					productID
				);

				cartInfo.push({
					id: productID,
					price: price,
					total: total,
					quantity: quantity,
					url: url,
					item: item,
				});
			});
		}

		cartInfo.forEach((item) => {
			if (item.url !== "") {
				var request = new XMLHttpRequest();
				request.open("GET", item.url, false); // `false` makes the request synchronous
				request.send(null);

				if (request.status === 200) {
					const html = request.responseText;
					var parser = new DOMParser();
					var doc = parser.parseFromString(html, "text/html");
					const originalPriceElm = doc.querySelector(
						".originalprice span"
					);
					if (originalPriceElm) {
						let value = originalPriceElm.innerText.trim();

						if (value && getDecimalPrice(value) <= 0) {
							item.orginalPrice = item.price;
							item.orginalPriceTotal = item.total;
						} else if (getDecimalPrice(value) > item.price) {
							item.orginalPrice = getDecimalPrice(value);
							item.orginalPriceTotal = Number(
								(item.orginalPrice * item.quantity).toFixed(2)
							);
						} else {
							item.orginalPrice = item.price;
							item.orginalPriceTotal = item.total;
						}
					} else {
						item.orginalPrice = item.price;
						item.orginalPriceTotal = item.total;
					}
				}
			}
		});
		const cartThead = document.querySelector(
			"#gvBasketDetails table thead th.prdQuantity"
		);
		cartThead &&
			cartThead.insertAdjacentHTML(
				"afterend",
				`<th class="itemWasPrice hidden-xs" scope="col">
					<span>Was</span>
				</th>`
			);
		cartCalculation(cartInfo);
		cartInfo.forEach((product) => {
			let priceToRender = Number(product.orginalPrice).toFixed(2);
			if (isCommaUsedInCurrencyForDecimal) {
				priceToRender = priceToRender.replaceAll(",", "*");
				priceToRender = priceToRender.replaceAll(".", ",");
				priceToRender = priceToRender.replaceAll("*", ".");
			}
			let elm = ``;

			if (product.orginalPrice === product.price) {
				elm = `<td class="itemWasPrice">
							
						</td>`;
			} else {
				elm = `<td class="itemWasPrice">
							<span class="itemWasPrice-mobile visible-xs">
								Was
							</span>
							<span class="money">
								${
									isCommaUsedInCurrencyForDecimal
										? priceToRender + ` ${currencySign}`
										: `${currencySign}` + priceToRender
								}
							</span>
						</td>`;
				product.item
					.querySelector("td.itemprice")
					?.classList.add("discounted");
			}
			if (
				product.item.querySelector(
					"td.itemtotalprice label.money.discount"
				)
			) {
				const discountELm = product.item.querySelector(
					"td.itemtotalprice label.money.discount"
				);

				const totalPriceElm = product.item.querySelector(
					"td.itemtotalprice span.money"
				);
				const totalPrice = totalPriceElm.innerText.trim();
				const totalPriceDecimal = getDecimalPrice(totalPrice);

				const discount = discountELm.innerText.trim();
				const discountTotalPrice = getDecimalPrice(discount);

				const totalPriceAfterDiscount = (
					totalPriceDecimal - discountTotalPrice
				).toFixed(2);
				totalPriceElm.innerText = `${
					isCommaUsedInCurrencyForDecimal
						? totalPriceAfterDiscount + ` ${currencySign}`
						: `${currencySign}` + totalPriceAfterDiscount
				}`;

				const itemQuantity = product.item.querySelector(
					".prdQuantity input.qtybox"
				).value;

				const discountPerItem = Number(
					(discountTotalPrice / itemQuantity).toFixed(2)
				);

				const discountPerItemToRender = `<span class="money discount-per-unit">
				${
					isCommaUsedInCurrencyForDecimal
						? -discountPerItem.toFixed(2) + ` ${currencySign}`
						: `-${currencySign}` + discountPerItem.toFixed(2)
				}
				</span>`;
				product.item
					.querySelector("td.itemprice")
					.classList.add("discounted");
				product.item
					.querySelector("td.itemprice")
					.insertAdjacentHTML("beforeend", discountPerItemToRender);
			}
			product.item
				.querySelector(".prdQuantity")
				.insertAdjacentHTML("afterend", elm);
		});

		pollerLite(["#SavingsRow", "#DiscountRow"], () => {
			const savingsRow = document.querySelector("#SavingsRow");
			const discountRow = document.querySelector("#DiscountRow");
			discountRow.insertAdjacentElement("beforeBegin", savingsRow);
		});
	};

	if (location.pathname.includes("/cart")) {
		pollerLite(["#gvBasketDetails"], () => {
			pollerLite(["#TotalRow.TotalSumm #TotalValue"], () => {
				const totalValue = document
					.querySelector("#TotalRow.TotalSumm #TotalValue")
					.textContent.trim();
				currencySign = getCurrencySymbol(totalValue);
			});

			let startExp = false;

			let productsInBasket = getBasketDetails();
			[].slice.call(productsInBasket).forEach((product) => {
				if (product.isFullPrice == false) {
					startExp = true;
				}
			});

			if (startExp == true) {
				populateCart();
			}
		});
	}
};
