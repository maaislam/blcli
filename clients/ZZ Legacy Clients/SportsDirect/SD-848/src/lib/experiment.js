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

export default () => {

	events.analyticsReference = window.ga ? 'ga' : '_gaUAT';

	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...

	pollerLite(
		["header ul.summaryList", "main.ContentWrap ul.summaryList"],
		() => {
			const summaryheader = document.querySelector(
				"header .summaryheader"
			);
			summaryheader?.insertAdjacentHTML(
				"beforeend",
				`<span class="close__text">Close</span>`
			);
			summaryheader
				.querySelector("span.close__text")
				?.addEventListener("click", () => {
					summaryheader.querySelector("span.crossIcon")?.click();
				});
			fetch(`/api/basket/v1/overview/delete/null`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((res) => {
					if (res.basketProductDetails.length > 0) {
						const mobileCheckoutCartItems = Array.from(
							document.querySelectorAll(
								"header ul.summaryList li"
							)
						);
						const desktopCheckoutCartItems = Array.from(
							document.querySelectorAll(
								"main.ContentWrap ul.summaryList li"
							)
						);

						res.basketProductDetails.forEach((item) => {
							for (
								let i = mobileCheckoutCartItems.length - 1;
								i >= 0;
								i--
							) {
								const url = mobileCheckoutCartItems[i]
									.querySelector(
										".summaryListText a.summaryListBrandTitle"
									)
									?.getAttribute("href");
								if (url === item.productUrl) {
									renderDom({
										variantId: item.variantId,
										element: mobileCheckoutCartItems[i],
									});
									mobileCheckoutCartItems.splice(i);
									break;
								}
							}
							for (
								let j = desktopCheckoutCartItems.length - 1;
								j >= 0;
								j--
							) {
								const url = desktopCheckoutCartItems[j]
									.querySelector(
										".summaryListText a.summaryListBrandTitle"
									)
									?.getAttribute("href");
								if (url === item.productUrl) {
									renderDom({
										variantId: item.variantId,
										element: desktopCheckoutCartItems[j],
									});
									desktopCheckoutCartItems.splice(j);
									break;
								}
							}
						});

						if (window.innerWidth > 767) {
							fireEvent("User sees the remove option", true);
							console.log("User sees the remove option");
						} else {
							const headerSummary = document.querySelector(
								"header .CheckoutHeader .headerSummary"
							);

							if (headerSummary) {
								const headerSummaryObserver =
									new MutationObserver(
										(mutationList, observer) => {
											observer.disconnect();
											if (
												headerSummary.classList.contains(
													"basketSummaryActive"
												)
											) {
												fireEvent(
													"User sees the remove option",
													true
												);
												console.log(
													"User sees the remove option"
												);
											} else {
												headerSummaryObserver.observe(
													headerSummary,
													{
														attributes: true,
														childList: false,
														subtree: false,
													}
												);
											}
										}
									);
								headerSummaryObserver.observe(headerSummary, {
									attributes: true,
									childList: false,
									subtree: false,
								});
							}
						}
					}
				});

			const renderDom = (data) => {
				const closeIcon = `<svg width="15" height="15" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L16 16" stroke="black"/>
                            <path d="M1 16L16 1" stroke="black"/>
                          </svg>`;
				data.element
					.querySelector(".summaryListInfoPrice")
					?.insertAdjacentHTML("afterbegin", closeIcon);

				data.element
					.querySelector(".summaryListInfoPrice svg")
					?.addEventListener("click", () => {
						fetch(
							`/api/basket/v1/overview/delete/${data.variantId}`,
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
							}
						)
							.then((response) => response.json())
							.then((res) => {
								if (res) {
									fireEvent(
										"User removes an item from their bag"
									);
									console.log(
										"User removes an item from their bag"
									);
									location.reload();
								}
							});
					});
			};
		}
	);
};
