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
import { countdown } from "./../../../../../lib/uc-lib";
// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...
	pollerLite(
		['#buttonWrapper a[data-action="checkout"]', "#divBagItems"],
		() => {
			let currSubTotal = document
				.getElementById("spanBagSubTotalValue")
				.innerText.trim();
			fireEvent(`Basket Total ${currSubTotal}`);
			const TopCheckoutButton = document.querySelector(
				`#buttonWrapperMobile a[data-action="checkout"]`
			);
			TopCheckoutButton?.addEventListener("click", () => {
				fireEvent(`Click - User clicked Continue Securely`);
				fireEvent(`Choose Next Day Delivery`);
			});
			const BottomCheckoutButton = document.querySelector(
				'#buttonWrapper a[data-action="checkout"]'
			);
			BottomCheckoutButton?.addEventListener("click", () => {
				fireEvent(`Click - User clicked Continue Securely`);
				fireEvent(`Choose Next Day Delivery`);
			});
		}
	);
	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}
	let selectedCurrency;
	let isEuro;
	const currencyTable = [
		{
			currencyCode: "GBP",
			standardDeliveryCharge: "£4.99",
			nddDeliveryCharge: "£7.99",
			cncDeliveryCharge: "£4.99",
			currencyChar: "£",
		},
		{
			currencyCode: "EUR",
			standardDeliveryCharge: "5,99 €",
			nddDeliveryCharge: "9,59 €",
			cncDeliveryCharge: "5,99 €",
			currencyChar: "€",
		},
		{
			currencyCode: "USD",
			standardDeliveryCharge: "$7.49",
			nddDeliveryCharge: "$11.99",
			cncDeliveryCharge: "$7.49",
			currencyChar: "$",
		},
	];
	const getBasketValues = () => {
		return new Promise(function (resolve) {
			pollerLite(["#divBagItems"], () => {
				let currBasket = document
					.getElementById("divBagItems")
					.getAttribute("data-basket");

				let currBasketJSON = JSON.parse(currBasket);
				selectedCurrency = currBasketJSON.currency;

				let currSubTotal = 0;

				const basketItems = document.querySelectorAll(
					"#gvBasketDetails table tbody tr"
				);
				basketItems.forEach((item) => {
					const isOutOfStock =
						item
							.querySelector("span.outofstock")
							?.innerText.trim() !== "";

					const anchorTag = item.querySelector(
						".prodDescContainer a.productTitle"
					);

					let isGiftCard, isVirginExperinceDays;

					isGiftCard = anchorTag
						? anchorTag
								.getAttribute("href")
								.includes("/voucher-gift-card")
						: false;
					isVirginExperinceDays = anchorTag
						? anchorTag
								.getAttribute("href")
								.includes("/virgin-experience-days/")
						: false;

					if (
						!isOutOfStock &&
						!isGiftCard &&
						!isVirginExperinceDays
					) {
						let price;
						if (
							item.querySelector(
								"td.itemtotalprice label.money.discount"
							)
						) {
							let isHighLightSavingsBucketed =
								document.documentElement.classList.contains(
									`FGR-148-HF-1`
								) ||
								document.documentElement.classList.contains(
									`FGR-148-HF-2`
								);
							if (!isHighLightSavingsBucketed) {
								const discountELm = item.querySelector(
									"td.itemtotalprice label.money.discount"
								);

								const totalPriceElm = item.querySelector(
									"td.itemtotalprice span.money"
								);

								let totalPrice = totalPriceElm.innerText
									.trim()
									.replaceAll(/[\s\€\£\$]/g, "");
								let discount = discountELm.innerText
									.trim()
									.replaceAll(/[\s\€\£\$]/g, "");
								if (selectedCurrency == "EUR") {
									totalPrice = totalPrice.replaceAll(".", "");
									totalPrice = parseFloat(
										totalPrice.replaceAll(",", ".")
									);
									discount = discount.replaceAll(".", "");
									discount = parseFloat(
										discount.replaceAll(",", ".")
									);
									discount = Math.abs(discount);
								} else {
									totalPrice = parseFloat(
										totalPrice.replaceAll(",", "")
									);
									discount = parseFloat(
										discount.replaceAll(",", "")
									);
									discount = Math.abs(discount);
								}

								price = parseFloat(totalPrice - discount);
							} else {
								price = item
									.querySelector(".itemtotalprice span.money")
									.innerText.trim()
									.replaceAll(/[\s\€\£\$]/g, "");

								if (selectedCurrency == "EUR") {
									price = price.replaceAll(".", "");
									price = parseFloat(
										price.replaceAll(",", ".")
									);
								} else {
									price = parseFloat(
										price.replaceAll(",", "")
									);
								}
							}
						} else {
							price = item
								.querySelector(".itemtotalprice span.money")
								.innerText.trim()
								.replaceAll(/[\s\€\£\$]/g, "");

							if (selectedCurrency == "EUR") {
								price = price.replaceAll(".", "");
								price = parseFloat(price.replaceAll(",", "."));
							} else {
								price = parseFloat(price.replaceAll(",", ""));
							}
						}
						currSubTotal += price;
					}
				});

				if (selectedCurrency == "EUR") {
					isEuro = true;
				} else {
					isEuro = false;
				}

				let currencyValues = currencyTable.filter((value) => {
					return value.currencyCode == selectedCurrency;
				});

				let newValues = {
					currSubTotal: currSubTotal.toFixed(2),
					nddDeliveryCharge: currencyValues[0].nddDeliveryCharge,
					standardDeliveryCharge:
						currencyValues[0].standardDeliveryCharge,
					currencyCode: currencyValues[0].currencyCode,
					currencyChar: currencyValues[0].currencyChar,
				};

				resolve(newValues);
			});
		});
	};

	pollerLite([".newBasketSummary .newBasketPromoCode"], () => {
		const targetDom = document.querySelector(
			".newBasketSummary .newBasketPromoCode"
		);

		let basketVals = getBasketValues();
		basketVals.then((values) => {
			if (VARIATION !== "2") {
				const nextDayDeliveryDom = `
					<div class="col-xs-12 col-sm-6 col-md-12 ${ID}-next-day-delivery">
						<h6>Need it quickly?</h6>
						<div class="${ID}-ndd-content">
							<div class="${ID}-ndd-headings">
							<div class="${ID}-primary-heading">Next Day Delivery</div>
							<div class="${ID}-ndd-charge">${values.nddDeliveryCharge}</div>
							</div>
							<p class="${ID}-ndd-countdown">Checkout in <span id="${ID}-ndd-countdown">TIMER LOADING...</span></p>
						</div>
					</div>
				`;

				const targetDate = new Date();
				targetDate.setHours(20);
				targetDate.setMinutes(0, 0, 0);

				const initCountdown = () => {
					// set up the countdown timer
					countdown({
						cutoff: targetDate,
						element: `#${ID}-ndd-countdown`,
						labels: {
							d: "days",
							h: "h",
							m: "m",
							s: "s",
						},
						zeroPrefixHours: true,
						zeroPrefixMinutes: true,
						zeroPrefixSeconds: true,
						hoursInsteadOfDays: false,
						delivery: {
							deliveryDays: null,
							excludeDays: null,
							deliveryDayElement: null,
							tomorrowLabel: false,
							showFullDate: false,
							dayLabelStyle: "long",
							monthLabelStyle: "long",
						},
					});
				};

				const initDestroyCountDown = () => {
					// Update the count down every 1 second
					var x = setInterval(function () {
						const countDownDate = new Date();
						countDownDate.setHours(20);
						countDownDate.setMinutes(0, 0, 0);
						var targetTime = countDownDate.getTime();
						// Get today's date and time
						var now = new Date().getTime();
						// Find the distance between now and the count down date
						var distance = targetTime - now;
						if (distance <= 0) {
							document
								.querySelector(`.${ID}-next-day-delivery`)
								?.remove();
							clearInterval(x);
						} else {
							if (
								!document.querySelector(
									`.${ID}-next-day-delivery`
								)
							) {
								if (
									document.querySelector(
										`.${ID}-collect-from-store`
									)
								) {
									document
										.querySelector(
											`.${ID}-collect-from-store`
										)
										.insertAdjacentHTML(
											"beforebegin",
											nextDayDeliveryDom
										);
								} else {
									targetDom.insertAdjacentHTML(
										"beforebegin",
										nextDayDeliveryDom
									);
								}
								initCountdown();
							}
						}
					}, 1000);
				};
				initDestroyCountDown();
				pollerLite([`#${ID}-ndd-countdown span`], () => {
					let hours = document.querySelector(
						`#HOF-749-ndd-countdown span.UC_cd-hours`
					);
					hours = parseInt(hours?.innerText.trim());

					let minutes = document.querySelector(
						`#HOF-749-ndd-countdown span.UC_cd-minutes`
					);

					minutes = parseInt(minutes?.innerText.trim());
					if (minutes > 30) {
						hours = hours + 1;
					}

					fireEvent(`Time left ${hours}h`);

					var isFired = false;
					const targetDom = document.querySelector(
						`.${ID}-next-day-delivery`
					);
					var position = targetDom.getBoundingClientRect();
					if (
						position.top <
							window.innerHeight - (position.height / 4) * 3 &&
						position.bottom > window.innerHeight / 2
					) {
						fireEvent(
							`Visible - Need it quickly Messaging Visible`
						);
						isFired = true;
					} else {
						document.addEventListener("scroll", (e) => {
							if (!isFired) {
								const targetDom = document.querySelector(
									`.${ID}-next-day-delivery`
								);
								var position =
									targetDom.getBoundingClientRect();

								if (
									position.top <
										window.innerHeight -
											(position.height / 4) * 3 &&
									position.bottom > window.innerHeight / 2
								) {
									fireEvent(
										`Visible - Need it quickly Messaging Visible`
									);
									isFired = true;
								}
							}
						});
					}
				});
			}
			if (VARIATION !== "1") {
				let spendDiff = (200.0 - values.currSubTotal).toFixed(2);
				let storeDom;
				if (spendDiff > 0) {
					const amount = isEuro
						? `${spendDiff} ${values.currencyChar}`
						: `${values.currencyChar}${spendDiff}`;
					storeDom = `
						<div class="col-xs-12 col-sm-6 col-md-12 ${ID}-collect-from-store">
						<h6>Prefer to pick up in store?</h6>
						<div class="${ID}-cfs-content">
							<div class="${ID}-cfs-headings">
							<div class="${ID}-primary-heading">Click & Collect</div>
							<div class="${ID}-cfs-amount">${values.standardDeliveryCharge}</div>
							</div>
							<div class="${ID}-cfs-bootom">
							<p>Spend <span>${amount}</span> more (excluding delivery)
							to get a ${
								isEuro
									? `10 ${values.currencyChar}`
									: `${values.currencyChar}10`
							} voucher to spend in-store</p>
							</div>
							<div class="${ID}-cfs-progress">
							<div class="${ID}-cfs-primary-progress"></div>
							<div class="${ID}-cfs-secondary-progress" style="width: ${
						values.currSubTotal / 2
					}%"></div>
							</div>
						</div>
					</div>
					`;
				} else {
					storeDom = `
						<div class="col-xs-12 col-sm-6 col-md-12 ${ID}-collect-from-store">
						<h6>Prefer to pick up in store?</h6>
						<div class="${ID}-cfs-content">
							<div class="${ID}-cfs-headings">
							<div class="${ID}-primary-heading">Click & Collect</div>
							<div class="${ID}-cfs-amount">${values.standardDeliveryCharge}</div>
							</div>
							<div class="${ID}-cfs-bootom">
							<p>You qualify for a complimentary 
							<span>${
								isEuro
									? `10 ${values.currencyChar}`
									: `${values.currencyChar}10`
							} voucher</span> to spend in-store!</p>
							</div>
							<div class="${ID}-cfs-progress">
							<div class="${ID}-cfs-primary-progress"></div>
							<div class="${ID}-cfs-secondary-progress" style="width: 100%"></div>
							</div>
						</div>
					</div>
					`;
				}
				setTimeout(() => {
					targetDom.insertAdjacentHTML("beforebegin", storeDom);
					pollerLite([`.${ID}-collect-from-store`], () => {
						var isFired = false;
						const targetDom = document.querySelector(
							`.${ID}-collect-from-store`
						);
						var position = targetDom.getBoundingClientRect();

						if (
							position.top <
								window.innerHeight - position.height &&
							position.bottom > window.innerHeight / 2
						) {
							fireEvent(
								`Visible - Prefer to pick up in store Messaging Visible`
							);
							isFired = true;
						} else {
							document.addEventListener("scroll", (e) => {
								if (!isFired) {
									const targetDom = document.querySelector(
										`.${ID}-collect-from-store`
									);
									var position =
										targetDom.getBoundingClientRect();
									if (
										position.top <
											window.innerHeight -
												position.height &&
										position.bottom > window.innerHeight / 2
									) {
										fireEvent(
											`Visible - Prefer to pick up in store Messaging Visible`
										);
										isFired = true;
									}
								}
							});
						}
					});
				}, 1000);
			}
		});
	});
	const config = { attributes: true, childList: true, subtree: true };
	const targetElm = document.querySelector("#TotalRow #TotalValue");
	const observer = new MutationObserver((mutationList, observer) => {
		location.reload();
	});
	observer.observe(targetElm, config);
};
