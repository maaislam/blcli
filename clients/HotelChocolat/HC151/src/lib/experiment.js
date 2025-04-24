import { setup, fireEvent, newEvents } from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
	const { ID, VARIATION } = shared;

	newEvents.initiate = true;
    newEvents.methods = ["ga4"];
    newEvents.property = 'G-B37NQR1RWZ';

	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

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

	pollerLite(["button#add-to-cart"], () => {
		const btn = document.querySelector("button#add-to-cart");
		btn.addEventListener("click", () => {
			if (VARIATION == "control") {
				fireEvent(`User clicks to add to the bag`);
			} else {
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
				} else {
					fireEvent(
						`User clicks to add to the bag without clicking a quicklink`
					);
				}
			}
		});
	});
	pollerLite(["#QuickViewDialog"], () => {
		const btn = document.querySelector("#QuickViewDialog");
		btn.addEventListener("click", (e) => {
			if (e.target.closest("button#add-to-cart")) {
				if (VARIATION == "control") {
					fireEvent(`User clicks to add to the bag`);
				} else {
					if (
						sessionStorage.getItem(`${ID}-quicklink`) &&
						(VARIATION == 1 || VARIATION == 2)
					) {
						fireEvent(
							`User adds to bag specifically after using the quicklinks`
						);
						sessionStorage.removeItem(`${ID}-quicklink`);
						localStorage.setItem("removeSessionStorage", "dummy");
						localStorage.removeItem(
							"removeSessionStorage",
							"dummy"
						);
					} else {
						fireEvent(
							`User clicks to add to the bag without clicking a quicklink`
						);
					}
				}
			}
		});
	});
	pollerLite([".product-add-to-cart .HC129-add"], () => {
		const btn = document.querySelector(".product-add-to-cart .HC129-add");
		btn.addEventListener("click", () => {
			if (VARIATION == "control") {
				fireEvent(`User clicks to add to the bag`);
			} else {
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
				} else {
					fireEvent(
						`User clicks to add to the bag without clicking a quicklink`
					);
				}
			}
		});
	});
	pollerLite(["#search-result-items"], () => {
		fireEvent(`User sees a PLP page`);
	});
	pollerLite(["#pdpMain"], () => {
		fireEvent(`User sees a PDP page`);
	});

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

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		// wouldHaveSeen(
		// 	`#header-promo-banner`,
		// 	`User would have seen the quicklinks`
		// );
		if (location.pathname === "/uk" || location.pathname === "/uk/") {
			pollerLite(["#header-promo-banner"], () => {
				const promoBanner = document.querySelector(
					"#header-promo-banner"
				);
				let getQuickLinks;
				getQuickLinks = window.quickLinks;

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
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	if (location.pathname === "/uk" || location.pathname === "/uk/") {
		pollerLite(["#header-promo-banner"], () => {
			const promoBanner = document.querySelector("#header-promo-banner");
			let getQuickLinks;
			getQuickLinks = window.quickLinks;

			let html = `
				<div class="${ID}-quick-links">
					<div class="quick-links__container">
					${getQuickLinks
						.map(
							(link) => `
							<div class="quick-links__item">
								<a href="${link.url}" class="quick-links__link">
									${link.title}
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
							`User clicks on the ${link.textContent.trim()} quicklink`
						);
						sessionStorage.setItem(`${ID}-quicklink`, true);
					});
				});
			}
		});
	}
};
