/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite, events } from "../../../../../lib/utils";
events.analyticsReference = window.ga ? "ga" : "_gaUAT";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...
	const isCartPage = () => location.pathname.includes("/cart");

	document.body.addEventListener("click", (e) => {
		const { target } = e;
		if (
			(target.closest(`a#ProductImageLink`) ||
				target.closest(`a#dhypProductLink`)) &&
			isCartPage()
		) {
			fireEvent(`Click - User clicked to go to PDP`);
		}
	});

	if (location.pathname.includes("/checkoutsp")) {
		var activeStep = 0;

		const checkCheckoutStepAndFireEvent = () => {
			if (
				document.querySelector(
					".sectionWrap .welcomeSection.activeSection"
				) &&
				activeStep != 1
			) {
				fireEvent("User reached to My Details Step of checkout");
				activeStep = 1;
			} else if (
				document.querySelector(
					".sectionWrap .deliverySection.activeSection"
				) &&
				activeStep != 2
			) {
				fireEvent("User reached to Delivery Step of checkout");
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
				fireEvent(`Click - user clicks to continue to checkout`);
			});

			const BottomCheckoutButton = document.querySelector(
				'#buttonWrapper a[data-action="checkout"]'
			);

			BottomCheckoutButton?.addEventListener("click", () => {
				fireEvent(`Click - user clicks to continue to checkout`);
			});
		});

		pollerLite(["#BasketDiv"], () => {
			const basketDiv = document.querySelector("#BasketDiv");
			basketDiv?.addEventListener("click", (e) => {
				const target = e.target.closest(".s-basket-remove-button a");
				if (target) {
					fireEvent(`Click - User to remove a product`);
				}
			});

			// const updateButton = document.querySelector(
			// 	"#CartPanel .UpdateandAddMore .NewUpdateQuant"
			// );
			// updateButton?.addEventListener("click", () => {
			// 	const tableRows = document.querySelectorAll(
			// 		"#CartPanel #gvBasketDetails table tbody tr"
			// 	);
			// 	if (tableRows.length > 0) {
			// 		for (let index = 0; index < tableRows.length; index++) {
			// 			const element = tableRows[index];
			// 			let quantity = element.querySelector(
			// 				`input[type="number"].qtybox`
			// 			).value;

			// 			if (parseInt(quantity) === 0) {
			// 				fireEvent(`User removes item from cart`);
			// 				break;
			// 			}
			// 		}
			// 	}
			// });
		});
	}

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		pollerLite(
			[
				"#gvBasketDetails table tbody tr",
				() => {
					return document.readyState == "complete";
				},
			],
			() => {
				fireEvent("Conditions Met");
			}
		);
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
				sessionStorage.getItem(`${ID}-saveClicked`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
				sessionStorage.setItem(`${ID}-saveClicked`, data);
			} else {
				sessionStorage.removeItem(`${ID}-saveClicked`);
			}
		} else if (event.key == "removeSessionStorage") {
			sessionStorage.removeItem(`${ID}-saveClicked`);
		}
	}; // listen for changes to localStorage
	if (window.addEventListener) {
		window.addEventListener("storage", sessionStorage_transfer, false);
	} else {
		window.attachEvent("onstorage", sessionStorage_transfer);
	} // Ask other tabs for session storage (this is ONLY to trigger event)
	if (!sessionStorage.getItem(`${ID}-saveClicked`)) {
		localStorage.setItem("getSessionStorage", `dummy`);
		localStorage.removeItem("getSessionStorage", `dummy`);
	}

	if (location.href.includes("flannels.com/login")) {
		pollerLite([`#LoginButton`], () => {
			const loginButton = document.querySelector("#LoginButton");
			loginButton?.addEventListener("click", () => {
				if (sessionStorage.getItem(`${ID}-saveClicked`)) {
					fireEvent(
						`Click - User clicks to login after clicking save for later`
					);
					sessionStorage.removeItem(`${ID}-saveClicked`);
					localStorage.setItem("removeSessionStorage", "dummy");
					localStorage.removeItem("removeSessionStorage", "dummy");
				}
			});
		});
	}
	if (location.href.includes("flannels.com/registration")) {
		pollerLite([`#RegistrationSubmit`], () => {
			const registerButton = document.querySelector(
				"#RegistrationSubmit"
			);
			registerButton?.addEventListener("click", () => {
				if (sessionStorage.getItem(`${ID}-saveClicked`)) {
					fireEvent(
						`Click - User clicks to register after clicking save for later`
					);
					sessionStorage.removeItem(`${ID}-saveClicked`);
					localStorage.setItem("removeSessionStorage", "dummy");
					localStorage.removeItem("removeSessionStorage", "dummy");
				}
			});
		});
	}
	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	// pollerLite([`#gvBasketDetails table`], () => {
	// 	const cartItems = document.querySelectorAll(
	// 		"#gvBasketDetails table tbody tr"
	// 	);

	// 	const cartInfo = [];

	// 	if (cartItems.length > 0) {
	// 		cartItems.forEach((item, index) => {
	// 			let productID, quantity, productIdIndex, url;

	// 			productID = item
	// 				.querySelector("#dhypProductLink")
	// 				.getAttribute("href");
	// 			productIdIndex = productID.lastIndexOf("=");
	// 			productID = Number(productID.slice(productIdIndex + 1));

	// 			quantity = Number(
	// 				item.querySelector(".prdQuantity .qtybox").value
	// 			);

	// 			url = item.querySelector(".prodDescContainer .productTitle");
	// 			url = url ? url.href : "";

	// 			item.querySelector(".productdesc").parentElement.setAttribute(
	// 				"id",
	// 				productID
	// 			);

	// 			cartInfo.push({
	// 				id: productID,
	// 				quantity: quantity,
	// 				url: url,
	// 				item: item,
	// 			});
	// 		});
	// 	}

	// 	cartInfo.forEach((item) => {
	// 		if (item.url !== "") {
	// 			var request = new XMLHttpRequest();
	// 			request.open("GET", item.url, false); // `false` makes the request synchronous
	// 			request.send(null);

	// 			if (request.status === 200) {
	// 				const html = request.responseText;
	// 				var parser = new DOMParser();
	// 				var doc = parser.parseFromString(html, "text/html");
	// 				let productColourVariants = doc
	// 					.querySelector("span.ProductDetailsVariants")
	// 					.getAttribute("data-variants");
	// 				productColourVariants = JSON.parse(productColourVariants);

	// 				const productTitle = doc
	// 					.querySelector("#lblProductName")
	// 					.textContent.trim();

	// 				const productBrand = doc
	// 					.querySelector("#lblProductBrand")
	// 					.textContent.trim();

	// 				item.item.querySelector("a#dhypProductLink").textContent =
	// 					productBrand;
	// 				item.item
	// 					.querySelector("a#dhypProductLink")
	// 					.insertAdjacentHTML(
	// 						"afterend",
	// 						`<p class="productTitleDesc">${productTitle}</p>`
	// 					);
	// 			}
	// 		}
	// 	});
	// });

	pollerLite(["#gvBasketDetails table tbody tr"], () => {
		fireEvent("Conditions Met");
		var quantityArray = Array(10)
			.fill()
			.map((x, i) => i);
		var regex = /[\s\€\£\$\¥\Kč\kr\zł\Ft(A-Z)(a-z)]/g;
		let currencies = ["ISK", "SEK", "PLN", "CZK", "HUF", "EUR"];
		let currencySign = "£";
		let isCommaUsedInCurrencyForDecimal = false;
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
			return value;
		};
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

		const filledHeart = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M19.4986 2.95912C17.2553 0.378192 12.1969 1.26817 11.0093 5.09507C9.86571 0.556188 4.76337 0.422691 2.52011 2.95912C0.452774 5.31756 0.980606 8.69947 2.91597 11.1914C5.42316 14.0838 8.11297 16.7983 10.972 19.3347C13.8751 16.8428 16.5955 14.1283 19.0587 11.1914C20.9941 8.65497 21.5659 5.31756 19.4986 2.95912Z" fill="#E0FD00" stroke="black"/>
		</svg>`;

		const nonFilledHeart = `<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M19.4986 2.95912C17.2553 0.378192 12.1969 1.26817 11.0093 5.09507C9.86571 0.556188 4.76337 0.422691 2.52011 2.95912C0.452774 5.31756 0.980606 8.69947 2.91597 11.1914C5.42316 14.0838 8.11297 16.7983 10.972 19.3347C13.8751 16.8428 16.5955 14.1283 19.0587 11.1914C20.9941 8.65497 21.5659 5.31756 19.4986 2.95912Z" stroke="black"/>
		</svg>`;

		const removeIcon = `<svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M11.8591 8.96826V16.9249M8.48877 8.96826V16.9249M5.11816 8.96826V16.9249M0.827881 6.48438V5.12915C0.827881 4.30072 1.49945 3.62915 2.32788 3.62915H14.6719C15.5003 3.62915 16.1719 4.30072 16.1719 5.12915V6.48438H0.827881ZM14.7854 6.4844L14.7854 17.8339C14.7854 18.6623 14.1138 19.3339 13.2854 19.3339L3.69189 19.3339C2.86347 19.3339 2.19189 18.6623 2.19189 17.8339L2.19189 6.4844L14.7854 6.4844ZM6.00781 3.62915V2.80469C6.00781 1.97626 6.67939 1.30469 7.50781 1.30469H9.46924C10.2977 1.30469 10.9692 1.97626 10.9692 2.80469V3.62915H6.00781Z" stroke="black"/>
		</svg>`;

		const isLoggedOut =
			!segmentData.userSignedIn ||
			document.querySelector(
				".MenuSearchContainer .bsheaderIcons a.login"
			);

		const basketItems = document.querySelectorAll(
			"#gvBasketDetails table tbody tr"
		);

		if (isLoggedOut) {
			if (basketItems.length > 0) {
				basketItems.forEach((item) => {
					let productID = item
						.querySelector("#dhypProductLink")
						.getAttribute("href");
					let productIdIndex = productID.lastIndexOf("=");
					productID = Number(productID.slice(productIdIndex + 1));

					let url = item.querySelector(
						".prodDescContainer .productTitle"
					);
					url = url ? url.href : "";

					item.querySelector(
						".productdesc"
					).parentElement.setAttribute("id", productID);

					if (url !== "") {
						var request = new XMLHttpRequest();
						request.open("GET", url, false); // `false` makes the request synchronous
						request.send(null);

						if (request.status === 200) {
							const html = request.responseText;
							var parser = new DOMParser();
							var doc = parser.parseFromString(html, "text/html");
							// let productColourVariants = doc
							// 	.querySelector(
							// 		"span.ProductDetailsVariants"
							// 	)
							// 	.getAttribute("data-variants");
							// productColourVariants = JSON.parse(
							// 	productColourVariants
							// );

							const productTitle = doc
								.querySelector("#lblProductName")
								.textContent.trim();

							const productBrand = doc
								.querySelector("#lblProductBrand")
								.textContent.trim();

							item.querySelector(
								"a#dhypProductLink"
							).textContent = productBrand;

							const descContainer = document.createElement("div");
							descContainer.classList.add(
								`${ID}-prodDescContainer`
							);

							const prodDeskLeft = document.createElement("div");
							prodDeskLeft.classList.add(`${ID}-prodDeskLeft`);

							const prodDeskRight = document.createElement("div");
							prodDeskRight.classList.add(`${ID}-prodDeskRight`);

							prodDeskLeft.appendChild(
								item.querySelector("a#dhypProductLink")
							);
							prodDeskLeft.insertAdjacentHTML(
								"beforeend",
								`<p class="productTitleDesc">${productTitle}</p>`
							);
							item.querySelector(
								"a#dhypProductLink"
							)?.addEventListener("click", (e) => {
								fireEvent(
									`Click - User clicks on a product tile in the basket to go to the PDP`
								);
							});
							let price = item
								.querySelector("td.itemtotalprice span.money")
								.textContent.trim();
							currencySign = getCurrencySymbol(price);
							price = getDecimalPrice(price);

							prodDeskRight.insertAdjacentHTML(
								"afterbegin",
								`<span class="money">${currencySign}${price}</span>`
							);
							descContainer.appendChild(prodDeskLeft);
							descContainer.appendChild(prodDeskRight);
							item.querySelector(".prodDescContainer").prepend(
								descContainer
							);
						}
					}

					const loggedOutWishlistElm = `
							<div id="${ID}-wish-dom-not-logged-in" class="${ID}-wish-dom">
								<a class="add-to-wishlist-dom" data-loginredirecturl="/Login?addto=wishlist&amp;returnurl=/cart">
									<span class="icon-heart">
										${nonFilledHeart}
									</span>
									${VARIATION == 2 ? `<span class="wishlist-text">Save To Wishlist</span>` : ""}			
								</a>
							</div>
						`;
					const sizeAndColour = document.createElement("div");
					sizeAndColour.classList.add("sizeAndColour");

					const size = item.querySelector(".productcolour");
					const color = item.querySelector(".productsize");
					const newSizeSelect = document.createElement("select");
					newSizeSelect.classList.add("customSize");

					const originalSizeSelect =
						item.querySelector(".size select");
					const sizeOptions = item.querySelectorAll(
						".size select option"
					);
					if (sizeOptions.length === 1) {
						newSizeSelect.setAttribute("disabled", "");
					}

					if (sizeOptions.length > 0) {
						sizeOptions.forEach((option) => {
							const newOption = document.createElement("option");
							newOption.value = option.value;
							newOption.textContent = option.textContent;
							if (option.selected) {
								newOption.setAttribute("selected", "");
							}
							if (option.disabled) {
								newOption.setAttribute("disabled", "");
							}
							newSizeSelect.appendChild(newOption);
							newSizeSelect.addEventListener(
								"change",
								function (e) {
									originalSizeSelect.value = this.value;
									originalSizeSelect.dispatchEvent(
										new Event("change")
									);
								}
							);
						});
						color
							.querySelector("span:not(.baskSizeLabel)")
							.remove();
					}

					color.appendChild(newSizeSelect);
					sizeAndColour.appendChild(size);
					sizeAndColour.appendChild(color);

					item.querySelector(
						".lowStockLevelIndicator"
					)?.insertAdjacentElement("beforebegin", sizeAndColour);
					const isStockMsg = item
						.querySelector(".lowStockLevelIndicator span")
						?.textContent.trim();
					if (isStockMsg == "" || isStockMsg == null) {
						item.querySelector(
							".lowStockLevelIndicator"
						)?.classList.add("hide");
					}
					const removeDom = item.querySelector(
						".s-basket-remove-button"
					);
					removeDom.querySelector("a").innerHTML = removeIcon;
					if (VARIATION == 2) {
						removeDom
							.querySelector("a")
							.insertAdjacentHTML(
								"beforeend",
								`<span class="deleteItemText">Remove</span>`
							);
					}
					const quantity = `
							<div class="quantityCustom">Qty: 
					
								<select class="qtyboxCustom" id="qtyboxCustom" data-quantity="" value="${
									item.querySelector("input.qtybox")?.value
								}">
									${[].slice.call(quantityArray).map((value) => {
										if (
											item.querySelector("input.qtybox")
												?.value ==
											value + 1
										) {
											return `<option value="${
												value + 1
											}" selected>${value + 1}</option>`;
										} else {
											return `<option value="${
												value + 1
											}">${value + 1}</option>`;
										}
									})}
								</select>
							
							</div>
						`;

					const quantityAndIconsRow = document.createElement("div");
					quantityAndIconsRow.classList.add("quantityAndIconsRow");

					quantityAndIconsRow.insertAdjacentHTML(
						"beforeend",
						quantity
					);
					quantityAndIconsRow.insertAdjacentHTML(
						"beforeend",
						`<div class="wishlistAndRemove">${
							VARIATION == 2
								? `<div class="wishlistAndRemoveInner">${loggedOutWishlistElm}</div>`
								: loggedOutWishlistElm
						}</div>`
					);

					let elipsis;
					if (VARIATION == 2) {
						elipsis = document.createElement("span");
						elipsis.classList.add("elipsis");
						elipsis.insertAdjacentHTML(
							"afterbegin",
							`<svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="2" cy="16" r="2" fill="black" fill-opacity="0.21"/>
								<circle cx="2" cy="9" r="2" fill="black" fill-opacity="0.21"/>
								<circle cx="2" cy="2" r="2" fill="black" fill-opacity="0.21"/>
								</svg>`
						);
						quantityAndIconsRow
							.querySelector(".wishlistAndRemove")
							?.prepend(elipsis);
						quantityAndIconsRow
							.querySelector(".wishlistAndRemoveInner")
							?.insertAdjacentElement("beforeend", removeDom);
						elipsis.addEventListener("click", function (e) {
							const wishItems =
								document.querySelectorAll(".wishlistAndRemove");
							wishItems.forEach((item) => {
								item.classList.remove("active");
							});
							if (
								!elipsis
									.closest(".wishlistAndRemove")
									.classList.contains("active")
							) {
								elipsis
									.closest(".wishlistAndRemove")
									.classList.add("active");
								fireEvent(
									`Click - User clicks to open the “save for later or remove” element`
								);
							}
						});
					} else {
						quantityAndIconsRow
							.querySelector(".wishlistAndRemove")
							?.insertAdjacentElement("beforeend", removeDom);
					}
					item.querySelector(
						"td.productdesc .prodDescContainer"
					)?.insertAdjacentElement("beforeend", quantityAndIconsRow);

					const qtyboxCustom = item.querySelector(".qtyboxCustom");
					qtyboxCustom.addEventListener("change", function (e) {
						let value = this.value;
						value = parseInt(value);
						if (value > 1) {
							item.querySelector("input.qtybox").value =
								value - 1;
							item.querySelector(
								".prdQuantity a.s-basket-plus-button"
							)?.click();
						} else {
							item.querySelector("input.qtybox").value =
								value + 1;
							item.querySelector(
								".prdQuantity a.s-basket-minus-button"
							)?.click();
						}
						//item.closest("form").submit();
					});
					// const sizeDom = item.querySelector("td.size select");
					// sizeDom.addEventListener("change", function (e) {
					// 	item.querySelector(
					// 		".productsize span:not(.baskSizeLabel)"
					// 	).textContent = this.options[this.selectedIndex].text;
					// });
					const wishIcon = item.querySelector(
						`#${ID}-wish-dom-not-logged-in .add-to-wishlist-dom`
					);

					wishIcon?.addEventListener("click", function (e) {
						fireEvent(`Click - User clicks to save for later`);
						window.location = this.getAttribute(
							"data-loginredirecturl"
						);
						sessionStorage.setItem(`${ID}-saveClicked`, true);
					});
				});
				if (VARIATION == 2) {
					document.body.addEventListener("click", function (e) {
						if (!e.target.closest(".wishlistAndRemove")) {
							const wishItems =
								document.querySelectorAll(".wishlistAndRemove");
							wishItems.forEach((item) => {
								item.classList.remove("active");
							});
						}
					});
				}
			}
		} else {
			fetch(`/accountinformation/viewwishlist`, {
				method: "GET",
			})
				.then((response) => response.text())
				.then((res) => {
					const parser = new DOMParser();
					const htmlContent = parser.parseFromString(
						res,
						"text/html"
					);
					let wishlistItems = [];
					const wishlist =
						htmlContent.querySelector("#WishListDisplay");

					if (wishlist) {
						const items = htmlContent.querySelectorAll(
							"#WishListDisplay .borderWishGroup"
						);
						if (items.length > 0) {
							items.forEach((item) => {
								const colVarId = item.querySelector(
									".WishListProductDataAndImage input:first-child"
								)?.value;
								wishlistItems.push({ variantId: colVarId });
							});
						}
					}

					if (basketItems.length > 0) {
						basketItems.forEach((item) => {
							const sizeDom =
								item.querySelector("td.size select");
							const variantId = sizeDom?.value;
							let IsAdded = false;
							if (wishlistItems.length > 0) {
								for (
									let index = 0;
									index < wishlistItems.length;
									index++
								) {
									if (
										wishlistItems[index].variantId ==
										variantId
									) {
										IsAdded = true;
										wishlistItems.splice(index);
										break;
									}
								}
							}
							let productID = item
								.querySelector("#dhypProductLink")
								.getAttribute("href");
							let productIdIndex = productID.lastIndexOf("=");
							productID = Number(
								productID.slice(productIdIndex + 1)
							);

							let url = item.querySelector(
								".prodDescContainer .productTitle"
							);
							url = url ? url.href : "";

							item.querySelector(
								".productdesc"
							).parentElement.setAttribute("id", productID);

							if (url !== "") {
								var request = new XMLHttpRequest();
								request.open("GET", url, false); // `false` makes the request synchronous
								request.send(null);

								if (request.status === 200) {
									const html = request.responseText;
									var parser = new DOMParser();
									var doc = parser.parseFromString(
										html,
										"text/html"
									);
									// let productColourVariants = doc
									// 	.querySelector(
									// 		"span.ProductDetailsVariants"
									// 	)
									// 	.getAttribute("data-variants");
									// productColourVariants = JSON.parse(
									// 	productColourVariants
									// );

									const productTitle = doc
										.querySelector("#lblProductName")
										.textContent.trim();

									const productBrand = doc
										.querySelector("#lblProductBrand")
										.textContent.trim();

									item.querySelector(
										"a#dhypProductLink"
									).textContent = productBrand;

									const descContainer =
										document.createElement("div");
									descContainer.classList.add(
										`${ID}-prodDescContainer`
									);

									const prodDeskLeft =
										document.createElement("div");
									prodDeskLeft.classList.add(
										`${ID}-prodDeskLeft`
									);

									const prodDeskRight =
										document.createElement("div");
									prodDeskRight.classList.add(
										`${ID}-prodDeskRight`
									);

									prodDeskLeft.appendChild(
										item.querySelector("a#dhypProductLink")
									);
									item.querySelector(
										"a#dhypProductLink"
									)?.addEventListener("click", (e) => {
										fireEvent(
											`Click - User clicks on a product tile in the basket to go to the PDP`
										);
									});
									prodDeskLeft.insertAdjacentHTML(
										"beforeend",
										`<p class="productTitleDesc">${productTitle}</p>`
									);

									let price = item
										.querySelector(
											"td.itemtotalprice span.money"
										)
										.textContent.trim();
									currencySign = getCurrencySymbol(price);
									price = getDecimalPrice(price);

									prodDeskRight.insertAdjacentHTML(
										"afterbegin",
										`<span class="money">${currencySign}${price}</span>`
									);
									descContainer.appendChild(prodDeskLeft);
									descContainer.appendChild(prodDeskRight);
									item.querySelector(
										".prodDescContainer"
									).prepend(descContainer);
								}
							}

							const loggedInWishListElm = `
								<div id="${ID}-wish-dom" class="${ID}-wish-dom">
									<a class="add-to-wishlist-dom ${
										IsAdded ? "added-to-wishlist" : ""
									}" data-colourvariantid="${variantId}">
										<span class="icon-heart">
											${IsAdded ? filledHeart : nonFilledHeart}
										</span>
										${
											VARIATION == 2 && IsAdded
												? `<span class="wishlist-text">Saved To Wishlist</span>`
												: `<span class="wishlist-text">Save To Wishlist</span>`
										}
									</a>
								</div>`;

							const sizeAndColour = document.createElement("div");
							sizeAndColour.classList.add("sizeAndColour");

							const size = item.querySelector(".productcolour");
							const color = item.querySelector(".productsize");

							const newSizeSelect =
								document.createElement("select");
							newSizeSelect.classList.add("customSize");
							const originalSizeSelect =
								item.querySelector(".size select");
							const sizeOptions = item.querySelectorAll(
								".size select option"
							);
							if (sizeOptions.length === 1) {
								newSizeSelect.setAttribute("disabled", "");
							}
							if (sizeOptions.length > 0) {
								sizeOptions.forEach((option) => {
									const newOption =
										document.createElement("option");
									newOption.value = option.value;
									newOption.textContent = option.textContent;
									if (option.selected) {
										newOption.setAttribute("selected", "");
									}
									if (option.disabled) {
										newOption.setAttribute("disabled", "");
									}
									newSizeSelect.appendChild(newOption);
									newSizeSelect.addEventListener(
										"change",
										function (e) {
											originalSizeSelect.value =
												this.value;
											originalSizeSelect.dispatchEvent(
												new Event("change")
											);
										}
									);
								});
								color
									.querySelector("span:not(.baskSizeLabel)")
									.remove();
							}

							color.appendChild(newSizeSelect);
							sizeAndColour.appendChild(size);
							sizeAndColour.appendChild(color);
							item.querySelector(
								".lowStockLevelIndicator"
							)?.insertAdjacentElement(
								"beforebegin",
								sizeAndColour
							);
							const isStockMsg = item
								.querySelector(".lowStockLevelIndicator span")
								?.textContent.trim();
							if (isStockMsg == "" || isStockMsg == null) {
								item.querySelector(
									".lowStockLevelIndicator"
								)?.classList.add("hide");
							}
							const removeDom = item.querySelector(
								".s-basket-remove-button"
							);

							removeDom.querySelector("a").innerHTML = removeIcon;
							if (VARIATION == 2) {
								removeDom
									.querySelector("a")
									.insertAdjacentHTML(
										"beforeend",
										`<span class="deleteItemText">Remove</span>`
									);
							}
							const currentQty =
								item.querySelector(".qtybox").value;

							const quantity = `
									<div class="quantityCustom">Qty: 
									
										<select class="qtyboxCustom" id="qtyboxCustom" data-quantity="" value="${
											item.querySelector("input.qtybox")
												?.value
										}">
											${quantityArray.map((value) => {
												if (
													item.querySelector(
														"input.qtybox"
													)?.value ==
													value + 1
												) {
													return `<option ${
														currentQty == value + 1
															? "selected"
															: ""
													} value="${value + 1}" >
						  	${value + 1}</option>`;
												} else {
													return `<option value="${
														value + 1
													}" >${value + 1}</option>`;
												}
											})}
										</select>
									
									</div>
								`;

							const quantityAndIconsRow =
								document.createElement("div");
							quantityAndIconsRow.classList.add(
								"quantityAndIconsRow"
							);

							quantityAndIconsRow.insertAdjacentHTML(
								"beforeend",
								quantity
							);
							quantityAndIconsRow.insertAdjacentHTML(
								"beforeend",
								`<div class="wishlistAndRemove">${
									VARIATION == 2
										? `<div class="wishlistAndRemoveInner">${loggedInWishListElm}</div>`
										: loggedInWishListElm
								}</div>`
							);

							let elipsis;
							if (VARIATION == 2) {
								elipsis = document.createElement("span");
								elipsis.classList.add("elipsis");
								elipsis.insertAdjacentHTML(
									"afterbegin",
									`<svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="2" cy="16" r="2" fill="black" fill-opacity="0.21"/>
										<circle cx="2" cy="9" r="2" fill="black" fill-opacity="0.21"/>
										<circle cx="2" cy="2" r="2" fill="black" fill-opacity="0.21"/>
										</svg>`
								);
								quantityAndIconsRow
									.querySelector(".wishlistAndRemove")
									?.prepend(elipsis);
								quantityAndIconsRow
									.querySelector(".wishlistAndRemoveInner")
									?.insertAdjacentElement(
										"beforeend",
										removeDom
									);
								elipsis.addEventListener("click", function (e) {
									const wishItems =
										document.querySelectorAll(
											".wishlistAndRemove"
										);
									wishItems.forEach((item) => {
										item.classList.remove("active");
									});
									if (
										!elipsis
											.closest(".wishlistAndRemove")
											.classList.contains("active")
									) {
										elipsis
											.closest(".wishlistAndRemove")
											.classList.add("active");
									}
								});
								document.body.addEventListener(
									"click",
									function (e) {
										if (
											!e.target.closest(
												".wishlistAndRemove"
											)
										) {
											const wishItems =
												document.querySelectorAll(
													".wishlistAndRemove"
												);
											wishItems.forEach((item) => {
												item.classList.remove("active");
											});
										}
									}
								);
							} else {
								quantityAndIconsRow
									.querySelector(".wishlistAndRemove")
									?.insertAdjacentElement(
										"beforeend",
										removeDom
									);
							}

							item.querySelector(
								"td.productdesc .prodDescContainer"
							)?.insertAdjacentElement(
								"beforeend",
								quantityAndIconsRow
							);

							const qtyboxCustom =
								item.querySelector(".qtyboxCustom");
							qtyboxCustom.addEventListener(
								"change",
								function (e) {
									let value = this.value;
									value = parseInt(value);
									if (value > 1) {
										item.querySelector(
											"input.qtybox"
										).value = value - 1;
										item.querySelector(
											".prdQuantity a.s-basket-plus-button"
										)?.click();
									} else {
										item.querySelector(
											"input.qtybox"
										).value = value + 1;
										item.querySelector(
											".prdQuantity a.s-basket-minus-button"
										)?.click();
									}
								}
							);

							const wishIcon = item.querySelector(
								`#${ID}-wish-dom .add-to-wishlist-dom`
							);

							sizeDom.addEventListener("change", function (e) {
								wishIcon?.setAttribute(
									"data-colourvariantid",
									this.value
								);
								// item.querySelector(
								// 	".productsize span:not(.baskSizeLabel)"
								// ).textContent =
								// 	this.options[this.selectedIndex].text;
							});

							wishIcon?.addEventListener("click", function (e) {
								fireEvent(
									`Click - User clicks to save for later`
								);
								const data = [
									{
										sizeVariantId: wishIcon.getAttribute(
											"data-colourvariantid"
										),
										quantity: wishIcon.classList.contains(
											"added-to-wishlist"
										)
											? -1
											: 1,
										personalisation: [],
										isProductRec: false,
									},
								];

								fetch(`/api/wishlist/v1/add`, {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify(data),
								})
									.then((response) => response.json())
									.then((res) => {
										if (res.quantity) {
											const wishCount =
												document.querySelector(
													"#lblWishListCount"
												);
											if (wishCount) {
												wishCount.innerText =
													res.quantity;
												wishCount.classList.remove(
													"HideWishList"
												);
											}
											wishIcon.classList.add(
												"added-to-wishlist"
											);
											wishIcon.querySelector(
												"span.icon-heart"
											).innerHTML = filledHeart;

											fireEvent(
												"Customer added to Wishlist from basket page"
											);
										}
									});
							});
						});
					}
				});
		}
	});
};
