import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";
import { headerSearchModify } from "./assets";
export default () => {
	const { ID, VARIATION } = shared;
	setup();
	fireEvent("Conditions Met");
	console.log(`%c${ID}-${VARIATION}`, `font-size: 30px; color: green;`);
	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...
	// -----------------------------
	// If control, bail out from here
	// -----------------------------
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
				sessionStorage.getItem(`${ID}-productClicked`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
				sessionStorage.setItem(
					`${ID}-productClicked`,
					JSON.stringify(data)
				);
			}
		} else if (event.key == `${ID}-removeSession`) {
			sessionStorage.removeItem(`${ID}-productClicked`);
		}
	}; // listen for changes to localStorage
	if (window.addEventListener) {
		window.addEventListener("storage", sessionStorage_transfer, false);
	} else {
		window.attachEvent("onstorage", sessionStorage_transfer);
	} // Ask other tabs for session storage (this is ONLY to trigger event)
	if (!sessionStorage.getItem(`${ID}-productClicked`)) {
		localStorage.setItem("getSessionStorage", `${ID}`);
		localStorage.removeItem("getSessionStorage", `${ID}`);
	}
	// goals
	pollerLite([`#header-search`, `#header-search input[type=text]`], () => {
		const mainSearchContainer = document.querySelector(`#header-search`);
		// open search
		let searchOpenFlag = false;
		const inputField = document.querySelector(
			"#header-search input[type=text]"
		);
		const observer = new MutationObserver((mutationList) => {
			mutationList.forEach((mutation) => {
				let allHitBtn =
					mutation.target.querySelectorAll(`.hitgroup a.hit`);
				allHitBtn.length > 0 &&
					allHitBtn.forEach((btn) => {
						//
						let btnText = btn.textContent.trim();
						btn.innerHTML = btnText;
					});
				switch (mutation.type) {
					case "attributes":
						let node = mutation.target;
						if (
							node?.nodeName == "DIV" &&
							node.getAttribute("id") == "search-suggestions"
						) {
							//
							if (
								node.classList.contains(`active`) &&
								inputField.value != ""
							) {
								if (!searchOpenFlag) {
									//
									fireEvent(`User clicks to open search`);
									searchOpenFlag = true;
								}
							} else {
								searchOpenFlag = false;
							}
						}
						// }
						break;
				}
			});
		});
		observer.observe(mainSearchContainer, {
			attributes: true,
			childList: true,
			subtree: true,
		});
		// clicks on product card
		mainSearchContainer.addEventListener("click", (e) => {
			//
			if (
				e.target.matches("a.product-suggestion-link") ||
				e.target.closest("a.product-suggestion-link")
			) {
				//
				fireEvent(`User clicks on the product card`);
				let target = e.target.matches("a.product-suggestion-link")
					? e.target
					: e.target.closest("a.product-suggestion-link");
				let productInfo = JSON.stringify({
					name: target
						.querySelector(`span.product-name.link-element`)
						.textContent.trim(),
					href: target.href,
					price: target
						.querySelector(`span.product-price.link-element`)
						.textContent.trim(),
				});
				//
				sessionStorage.setItem(`${ID}-productClicked`, productInfo);
			}
			if (e.target.matches(`a[class$="hit"]`)) {
				//
				fireEvent(`User clicks on the links: ${e.target.href}`);
			}
			if (
				e.target.matches(`#search-suggestion-wrapper > a.button`) ||
				e.target.closest(`#search-suggestion-wrapper > a.button`)
			) {
				//
				fireEvent(`User clicks to view all results`);
			}
		});
	});
	pollerLite(
		[
			`#pdpMain`,
			`#add-to-cart`,
			() => sessionStorage.getItem(`${ID}-productClicked`) != null,
		],
		() => {
			//
			//
			if (
				sessionStorage.getItem(`${ID}-productClicked`) != null ||
				sessionStorage.getItem(`${ID}-productClicked`) != "null"
			) {
				//
				const addToBagButton = document.querySelector(
					"#pdpMain #add-to-cart"
				);
				let productClicked;
				addToBagButton.addEventListener("click", (e) => {
					//
					let data;
					pollerLite(
						[
							() => {
								const dataLayerItems = Array.from(dataLayer);
								dataLayerItems.forEach((item) => {
									//
									if (item.event === "addToBag") {
										data = item;
									}
								});
								return data;
							},
						],
						() => {
							productClicked = JSON.parse(
								sessionStorage.getItem(`${ID}-productClicked`)
							);
							if (productClicked && data)
								if (
									data.re_product_url === productClicked.href
								) {
									//
									fireEvent(
										`User adds to bag after user search`
									);
									sessionStorage.removeItem(
										`${ID}-productClicked`
									);
									//
									//
								}
						}
					);
				});
				// only for velvetiser
				let sessionStorageKey;
				pollerLite(
					[
						`#page_heading`,
						() => {
							const sessionStorageKeys =
								Object.keys(sessionStorage);
							const index = sessionStorageKeys.findIndex((ele) =>
								ele.includes("-productsAdded")
							);
							sessionStorageKey =
								index >= 0 ? sessionStorageKeys[index] : false;
							return sessionStorageKey;
						},
						() => {
							if (
								sessionStorage.getItem(
									`${ID}-productClicked`
								) != null ||
								sessionStorage.getItem(
									`${ID}-productClicked`
								) != "null"
							) {
								return true;
							}
						},
					],
					() => {
						if (sessionStorage.getItem(sessionStorageKey) != null) {
							//
							const velvetiserName = document
								.querySelector(
									`#pdpMain #page_heading h1[itemprop="name"]`
								)
								?.textContent.trim();
							const velvetiserStorage = JSON.parse(
								sessionStorage.getItem(sessionStorageKey)
							);
							let isVelvetiser;
							Array.from(velvetiserStorage).forEach((item) => {
								if (
									item.productName
										?.toLowerCase()
										?.includes("the velvetiser") &&
									velvetiserName
										?.toLowerCase()
										.includes("the velvetiser")
								) {
									isVelvetiser = true;
								}
							});
							//
							const url = location.href;
							//
							if (
								isVelvetiser &&
								(sessionStorage.getItem(
									`${ID}-productClicked`
								) != null ||
									sessionStorage.getItem(
										`${ID}-productClicked`
									) != "null")
							) {
								productClicked = JSON.parse(
									sessionStorage.getItem(
										`${ID}-productClicked`
									)
								);
								//
								//
								if (url.includes(productClicked.href)) {
									//
									fireEvent(
										`User adds to bag after user search`
									);
									sessionStorage.removeItem(
										`${ID}-productClicked`
									);
									localStorage.setItem(
										`${ID}-removeSession`,
										true
									);
									localStorage.removeItem(
										`${ID}-removeSession`
									);
									// sessionStorage.removeItem(sessionStorageKey);
								}
							}
						}
					}
				);
			}
		}
	);
	if (VARIATION == "control") {
		return;
	}
	pollerLite([`#header-search`], () => {
		const mainSearchContainer = document.querySelector(`#header-search`);
		const observer = new MutationObserver((mutationList, observer) => {
			mutationList.forEach((mutation) => {
				switch (mutation.type) {
					case "childList":
						// if (mutation.target.getAttribute("id") == "search-suggestions") {
						//
						let node = Array.from(mutation.addedNodes).filter(
							(node) =>
								node?.nodeName == "DIV" &&
								node.getAttribute("id") ==
									"search-suggestion-wrapper"
						);
						if (node.length > 0) headerSearchModify(node[0]);
						// }
						break;
				}
			});
		});
		observer.observe(mainSearchContainer, {
			attributes: true,
			childList: true,
			subtree: true,
		});
	});
	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
};
