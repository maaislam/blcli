import { setup, fireEvent } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
	const { ID, VARIATION } = shared;

	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...
	const wouldHaveSeen = (element, level) => {
		pollerLite([element], () => {
			var isFired = false;
			if (!isFired) {
				const targetDom = document.querySelector(element);
				if (targetDom) {
					var position = targetDom.getBoundingClientRect();
					if (
						position.top > 100 &&
						position.bottom < window.innerHeight - 250
					) {
						fireEvent(`${level}`);
						isFired = true;
					}
				}
			}

			document.addEventListener("scroll", (e) => {
				if (!isFired) {
					const targetDom = document.querySelector(element);

					if (targetDom) {
						var position = targetDom.getBoundingClientRect();
						if (
							position.top > 100 &&
							position.bottom < window.innerHeight - 100
						) {
							fireEvent(`${level}`);
							isFired = true;
						}
					}
				}
			});
		});
	};

	pollerLite(["form#search-form input[type='text']"], () => {
		const searchForm = document.querySelector(
			"form#search-form input[type='text']"
		);
		searchForm.addEventListener("blur", (e) => {
			fireEvent(`User uses search and typed: ${searchForm.value}`);
			// console.log(`User uses search and typed: ${searchForm.value}`);
		});
	});
	pollerLite(["#navigation"], () => {
		const searchForm = document.querySelector("#navigation");
		searchForm.addEventListener("click", (e) => {
			if (e.target.closest("a")) {
				fireEvent("User uses navigation");
			}
		});
	});

	pollerLite(["button#add-to-cart"], () => {
		const btn = document.querySelector("button#add-to-cart");
		btn.addEventListener("click", () => {
			fireEvent(`User clicks to add to the bag`);
			if (
				sessionStorage.getItem(`${ID}-quicklink`) &&
				(VARIATION == 1 || VARIATION == 2)
			) {
				fireEvent(
					`User adds to bag specifically after using the quicklinks`
				);
				sessionStorage.removeItem(`${ID}-quicklink`);
				localStorage.setItem("removeSessionStorage", "dummy");
				localStorage.removeItem("removeSessionStorage", "dummy");
			}
		});
	});
	pollerLite(["#QuickViewDialog"], () => {
		const btn = document.querySelector("#QuickViewDialog");
		btn.addEventListener("click", (e) => {
			if (e.target.closest("button#add-to-cart")) {
				fireEvent(`User clicks to add to the bag`);

				if (
					sessionStorage.getItem(`${ID}-quicklink`) &&
					(VARIATION == 1 || VARIATION == 2)
				) {
					fireEvent(
						`User adds to bag specifically after using the quicklinks`
					);
					sessionStorage.removeItem(`${ID}-quicklink`);
					localStorage.setItem("removeSessionStorage", "dummy");
					localStorage.removeItem("removeSessionStorage", "dummy");
				}
			}
		});
	});
	pollerLite([".product-add-to-cart .HC129-add"], () => {
		const btn = document.querySelector(".product-add-to-cart .HC129-add");
		btn.addEventListener("click", () => {
			fireEvent(`User clicks to add to the bag`);

			if (
				sessionStorage.getItem(`${ID}-quicklink`) &&
				(VARIATION == 1 || VARIATION == 2)
			) {
				fireEvent(
					`User adds to bag specifically after using the quicklinks`
				);
				sessionStorage.removeItem(`${ID}-quicklink`);
				localStorage.setItem("removeSessionStorage", "dummy");
				localStorage.removeItem("removeSessionStorage", "dummy");
			}
		});
	});
	pollerLite(["#search-result-items"], () => {
		fireEvent(`User sees a PLP page`);
	});
	pollerLite(["#pdpMain"], () => {
		fireEvent(`User sees a PDP page`);
	});

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		wouldHaveSeen(
			`#header-promo-banner`,
			`User would have seen the quicklinks`
		);
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	// window.quickLinks = [
	// 	{
	// 		title: "Christmas",
	// 		url: "/uk/shop/christmas/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb9f8fc70/images/263421.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// 	{
	// 		title: "Chocolate boxes",
	// 		url: "/uk/shop/christmas/gift-boxes/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw06e832b5/images/263427.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// 	{
	// 		title: "Collections",
	// 		url: "/uk/shop/christmas/gift-hampers/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwbb97780a/images/358392.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// 	{
	// 		title: "Velvetiser",
	// 		url: "/uk/shop/collections/products/the-velvetiser/",
	// 		image: "/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000",
	// 	},
	// 	{
	// 		title: "Hot Chocolate",
	// 		url: "/uk/shop/collections/products/hot-chocolate/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// 	{
	// 		title: "Alcohol",
	// 		url: "/uk/shop/collections/products/wine-chocolate/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// ];

	// window.christmasQuickLinks = [
	// 	{
	// 		title: "Christmas",
	// 		url: "/uk/shop/christmas/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb9f8fc70/images/263421.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// 	{
	// 		title: "Chocolate boxes",
	// 		url: "/uk/shop/christmas/gift-boxes/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw06e832b5/images/263427.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// 	{
	// 		title: "Stocking Fillers",
	// 		url: "/uk/shop/christmas/stocking-fillers/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc0e16d34/images/112272.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// 	{
	// 		title: "Collections",
	// 		url: "/uk/shop/christmas/gift-hampers/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwbb97780a/images/358392.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// 	{
	// 		title: "Family Gift",
	// 		url: "/uk/shop/gift-ideas/shop-by-recipient/for-families/",
	// 		image: "/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000",
	// 	},

	// 	{
	// 		title: "Alcohol",
	// 		url: "/uk/shop/collections/products/wine-chocolate/",
	// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit",
	// 	},
	// ];

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
				sessionStorage.getItem(`${ID}-quicklink`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
				sessionStorage.setItem(`${ID}-quicklink`, data);
			} else {
				sessionStorage.removeItem(`${ID}-quicklink`);
			}
		} else if (event.key == "removeSessionStorage") {
			sessionStorage.removeItem(`${ID}-quicklink`);
		}
	};

	// listen for changes to localStorage
	if (window.addEventListener) {
		window.addEventListener("storage", sessionStorage_transfer, false);
	} else {
		window.attachEvent("onstorage", sessionStorage_transfer);
	} // Ask other tabs for session storage (this is ONLY to trigger event)
	if (!sessionStorage.getItem(`${ID}-quicklink`)) {
		localStorage.setItem("getSessionStorage", `dummy`);
		localStorage.removeItem("getSessionStorage", `dummy`);
	}

	if (location.pathname === "/uk" || location.pathname === "/uk/") {
		pollerLite(["#header-promo-banner"], () => {
			const promoBanner = document.querySelector("#header-promo-banner");
			let getQuickLinks;
			if (VARIATION == 1) {
				getQuickLinks = window.quickLinks;
			} else if (VARIATION == 2) {
				getQuickLinks = window.christmasQuickLinks;
			}
			let html = `
				<div class="${ID}-quick-links">
					<div class="quick-links__container">
					${getQuickLinks
						.map(
							(link) => `
							<div class="quick-links__item">
								<a href="${link.url}" class="quick-links__link">
								<img src="${link.image}" alt="${link.title}" class="quick-links__image" />
								<p class="quick-links__text">${link.title}</p>
								</a>
							</div>
							`
						)
						.join("")}
					</div>
				</div>
				`;

			promoBanner.insertAdjacentHTML("afterend", html);
			wouldHaveSeen(`.${ID}-quick-links`, `User sees the quicklinks`);

			const quickLinks = document.querySelectorAll(
				`.${ID}-quick-links a.quick-links__link`
			);
			if (quickLinks.length > 0) {
				quickLinks.forEach((link) => {
					link.addEventListener("click", (e) => {
						fireEvent(
							`User clicks on the ${link
								.querySelector(".quick-links__text")
								?.textContent.trim()} quicklink`
						);
						sessionStorage.setItem(`${ID}-quicklink`, true);
					});
				});
			}
		});
	}
};
