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

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
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

	// Write experiment code here
	// ...

	pollerLite(
		[
			"#gvBasketDetails table tbody tr",
			() => {
				return document.readyState == "complete";
			},
		],
		() => {
			fireEvent("Conditions Met");
			const filledHeart = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.00023 15.244L14.8382 9.40602C16.6882 7.55602 17.3982 5.43202 16.7822 3.58202C16.2882 2.09602 15.0142 1.03002 13.4582 0.804016C11.8342 0.568016 10.2382 1.27002 8.99823 2.74802C7.76023 1.27202 6.16423 0.568016 4.53823 0.804016C2.98023 1.03002 1.70623 2.09602 1.21423 3.58202C0.600234 5.43402 1.30823 7.55602 3.15823 9.40602L9.00023 15.244ZM2.16423 3.89402C2.53823 2.76802 3.50423 1.96202 4.68423 1.79002C4.84023 1.76802 4.99423 1.75602 5.15023 1.75602C6.41423 1.75602 7.64623 2.50002 8.59023 3.85202L9.00023 4.43802L9.40823 3.85202C10.4682 2.33402 11.8922 1.58402 13.3142 1.79002C14.4962 1.96202 15.4622 2.76802 15.8342 3.89402C16.3262 5.37402 15.7042 7.12602 14.1302 8.69802L9.00023 13.832L3.86623 8.70002C2.29423 7.12602 1.67223 5.37402 2.16423 3.89402Z" fill="#E10098"/>
									<path d="M2.16423 3.89402C2.53823 2.76802 3.50423 1.96202 4.68423 1.79002C4.84023 1.76802 4.99423 1.75602 5.15023 1.75602C6.41423 1.75602 7.64623 2.50002 8.59023 3.85202L9.00023 4.43802L9.40823 3.85202C10.4682 2.33402 11.8922 1.58402 13.3142 1.79002C14.4962 1.96202 15.4622 2.76802 15.8342 3.89402C16.3262 5.37402 15.7042 7.12602 14.1302 8.69802L9.00023 13.832L3.86623 8.70002C2.29423 7.12602 1.67223 5.37402 2.16423 3.89402Z" fill="#E10098"/>
								</svg>`;

			const nonFilledHeart = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M9.00023 15.244L14.8382 9.40598C16.6882 7.55598 17.3982 5.43199 16.7822 3.58199C16.2882 2.09599 15.0142 1.02999 13.4582 0.803986C11.8342 0.567986 10.2382 1.26999 8.99823 2.74799C7.76023 1.27199 6.16423 0.567986 4.53823 0.803986C2.98023 1.02999 1.70623 2.09599 1.21423 3.58199C0.600235 5.43399 1.30823 7.55598 3.15823 9.40598L9.00023 15.244ZM2.16423 3.89399C2.53823 2.76799 3.50423 1.96199 4.68423 1.78999C4.84023 1.76799 4.99423 1.75599 5.15023 1.75599C6.41423 1.75599 7.64623 2.49999 8.59023 3.85199L9.00023 4.43798L9.40823 3.85199C10.4682 2.33399 11.8922 1.58399 13.3142 1.78999C14.4962 1.96199 15.4622 2.76799 15.8342 3.89399C16.3262 5.37399 15.7042 7.12599 14.1302 8.69799L9.00023 13.832L3.86623 8.69999C2.29423 7.12599 1.67223 5.37399 2.16423 3.89399Z" fill="#323232"/>
								</svg>`;

			const closeDom = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M5 5L16 16" stroke="black" stroke-width="0.825" stroke-miterlimit="10"/>
								<path d="M5 15.9999L15.78 5.21994" stroke="black" stroke-width="0.825" stroke-miterlimit="10"/>
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
					const basketItemsTableHead = document.querySelector(
						"#gvBasketDetails table thead tr"
					);
					basketItemsTableHead?.insertAdjacentHTML(
						"beforeend",
						`<th></th>`
					);
					basketItems.forEach((item) => {
						const mainRemove = item.querySelector(
							"td.productdesc .s-basket-remove-button a"
						);
						const sizeDom = item.querySelector("td.size select");
						const loggedOutWishlistElm = `
						<div id="${ID}-wish-dom-not-logged-in" class="${ID}-wish-dom">
							<a class="add-to-wishlist-dom" data-loginredirecturl="/Login?addto=wishlist&amp;returnurl=/cart">
								<span class="icon-heart">
									${nonFilledHeart}
								</span>
								<span class="icon-text">Wishlist</span>					
							</a>
							<div class="remove-item-dom">
								${closeDom}
							</div>
						</div>
					`;
						item.querySelector(
							"td.productdesc .prodDescContainer"
						)?.insertAdjacentHTML(
							"beforeend",
							loggedOutWishlistElm
						);
						pollerLite(
							[
								() => {
									return item.querySelector(
										`#${ID}-wish-dom-not-logged-in`
									)
										? true
										: false;
								},
							],
							() => {
								const wishIcon = item.querySelector(
									`#${ID}-wish-dom-not-logged-in .add-to-wishlist-dom`
								);

								wishIcon?.addEventListener(
									"click",
									function (e) {
										window.location = this.getAttribute(
											"data-loginredirecturl"
										);
									}
								);

								const crossButton2 = item.querySelector(
									`#${ID}-wish-dom-not-logged-in .remove-item-dom`
								);
								crossButton2?.addEventListener("click", (e) => {
									mainRemove?.click();
									fireEvent(
										"Customer removed item from basket page using “X”"
									);
								});
							}
						);

						const newCross = document.createElement("td");
						newCross.classList.add(`${ID}-remove-td`);
						newCross.insertAdjacentHTML(
							"afterbegin",
							`<div class="${ID}-remove-item-dom-new">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M5 5L16 16" stroke="black" stroke-width="0.825" stroke-miterlimit="10"/>
									<path d="M5 15.9999L15.78 5.21994" stroke="black" stroke-width="0.825" stroke-miterlimit="10"/>
								</svg>
							</div>`
						);
						item.append(newCross);

						newCross
							.querySelector(`.${ID}-remove-item-dom-new`)
							.addEventListener("click", () => {
								mainRemove?.click();
								fireEvent(
									"Customer removed item from basket page using “X”"
								);
							});
					});
					pollerLite([`.${ID}-wish-dom`, `.${ID}-remove-td`], () => {
						fireEvent("“X” and Wishlist added to the basket");
					});
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
							const basketItemsTableHead = document.querySelector(
								"#gvBasketDetails table thead tr"
							);
							basketItemsTableHead?.insertAdjacentHTML(
								"beforeend",
								`<th></th>`
							);
							basketItems.forEach((item) => {
								const mainRemove = item.querySelector(
									"td.productdesc .s-basket-remove-button a"
								);
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
								const loggedInWishListElm = `
								<div id="${ID}-wish-dom" class="${ID}-wish-dom">
									<a class="add-to-wishlist-dom ${
										IsAdded ? "added-to-wishlist" : ""
									}" data-colourvariantid="${variantId}">
										<span class="icon-heart">
											${IsAdded ? filledHeart : nonFilledHeart}
										</span>
										<span class="icon-text">${IsAdded ? "Added to wishlist" : "Wishlist"}</span>						
									</a>
									<div class="remove-item-dom">
										${closeDom}
									</div>
								</div>`;

								item.querySelector(
									"td.productdesc .prodDescContainer"
								)?.insertAdjacentHTML(
									"beforeend",
									loggedInWishListElm
								);

								pollerLite(
									[
										() => {
											return item.querySelector(
												`#${ID}-wish-dom`
											)
												? true
												: false;
										},
									],
									() => {
										const wishIcon = item.querySelector(
											`#${ID}-wish-dom .add-to-wishlist-dom`
										);
										const wishText = item.querySelector(
											`#${ID}-wish-dom span.icon-text`
										);
										sizeDom.addEventListener(
											"change",
											function (e) {
												wishIcon?.setAttribute(
													"data-colourvariantid",
													this.value
												);
											}
										);

										wishIcon?.addEventListener(
											"click",
											function (e) {
												const data = [
													{
														sizeVariantId:
															this.getAttribute(
																"data-colourvariantid"
															),
														quantity: 1,
														personalisation: [],
														isProductRec: false,
													},
												];

												fetch(`/api/wishlist/v1/add`, {
													method: "POST",
													headers: {
														"Content-Type":
															"application/json",
													},
													body: JSON.stringify(data),
												})
													.then((response) =>
														response.json()
													)
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
															).innerHTML =
																filledHeart;
															wishText.innerText =
																"Added to wishlist";
															fireEvent(
																"Customer added to Wishlist from basket page"
															);
														}
													});
											}
										);

										const crossButton = item.querySelector(
											`.${ID}-wish-dom .remove-item-dom`
										);

										crossButton?.addEventListener(
											"click",
											(e) => {
												fireEvent(
													"Customer removed item from basket page using “X”"
												);
												mainRemove?.click();
											}
										);
									}
								);
								const newCross = document.createElement("td");
								newCross.classList.add(`${ID}-remove-td`);
								newCross.insertAdjacentHTML(
									"afterbegin",
									`<div class="${ID}-remove-item-dom-new">
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M5 5L16 16" stroke="black" stroke-width="0.825" stroke-miterlimit="10"/>
											<path d="M5 15.9999L15.78 5.21994" stroke="black" stroke-width="0.825" stroke-miterlimit="10"/>
										</svg>
									</div>`
								);
								item.append(newCross);

								newCross
									.querySelector(`.${ID}-remove-item-dom-new`)
									.addEventListener("click", () => {
										fireEvent(
											"Customer removed item from basket page using “X”"
										);
										mainRemove?.click();
									});
							});

							pollerLite(
								[`.${ID}-wish-dom`, `.${ID}-remove-td`],
								() => {
									fireEvent(
										"“X” and Wishlist added to the basket"
									);
								}
							);
						}
					});
			}
		}
	);
};
