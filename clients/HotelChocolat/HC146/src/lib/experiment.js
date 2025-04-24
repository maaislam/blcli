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
				sessionStorage.getItem(`${ID}-navSearchUsed`)
			);
			// the other tab should now have it, so we're done with it.
			localStorage.removeItem("shareSessionStorage"); // <- could do short timeout as well.
		} else if (event.key == "shareSessionStorage") {
			// another tab sent data <- get it
			var data = JSON.parse(event.newValue);
			if (data != "" && data != null) {
				sessionStorage.setItem(`${ID}-navSearchUsed`, data);
			} else {
				sessionStorage.removeItem(`${ID}-navSearchUsed`);
			}
		} else if (event.key == "removeSessionStorage") {
			sessionStorage.removeItem(`${ID}-navSearchUsed`);
		}
	}; // listen for changes to localStorage
	if (window.addEventListener) {
		window.addEventListener("storage", sessionStorage_transfer, false);
	} else {
		window.attachEvent("onstorage", sessionStorage_transfer);
	} // Ask other tabs for session storage (this is ONLY to trigger event)
	if (!sessionStorage.getItem(`${ID}-navSearchUsed`)) {
		localStorage.setItem("getSessionStorage", `dummy`);
		localStorage.removeItem("getSessionStorage", `dummy`);
	}

	if (VARIATION == "control") {
		let isFired = false;
		if (window.pageYOffset < 50) {
			if (!isFired) {
				fireEvent("User Would have seen the changes");
				isFired = true;
			}
		}
		window.addEventListener("scroll", () => {
			if (!isFired && window.pageYOffset < 50) {
				fireEvent("User Would have seen the changes");
				isFired = true;
			}
		});
	} else {
		let isFired = false;
		if (window.pageYOffset < 50) {
			if (!isFired) {
				fireEvent("User sees the changes");
				isFired = true;
			}
		}
		window.addEventListener("scroll", () => {
			if (!isFired && window.pageYOffset < 50) {
				fireEvent("User sees the changes");
				isFired = true;
			}
		});
	}

	// pollerLite(["form#search-form input[type='text']"], () => {
	// 	const searchForm = document.querySelector(
	// 		"form#search-form input[type='text']"
	// 	);
	// 	searchForm.addEventListener("blur", (e) => {
	// 		fireEvent(`User uses search and typed: ${searchForm.value}`);
	// 		sessionStorage.setItem(`${ID}-navSearchUsed`, "Search");
	// 	});
	// });
	pollerLite(["#navigation"], () => {
		const searchForm = document.querySelector("#navigation");
		searchForm.addEventListener("click", (e) => {
			if (e.target.closest("a")) {
				fireEvent("User uses navigation");
				sessionStorage.setItem(`${ID}-navSearchUsed`, "Navigation");
			}
		});
	});
	pollerLite(["#desktop-navigation"], () => {
		const searchForm = document.querySelector("#desktop-navigation");
		searchForm.addEventListener("click", (e) => {
			if (e.target.closest("a")) {
				fireEvent("User uses navigation");
				sessionStorage.setItem(`${ID}-navSearchUsed`, "Navigation");
			}
		});
	});

	pollerLite(["#header-search"], () => {
		const searchForm = document.querySelector("#header-search form");
		searchForm.addEventListener("click", (e) => {
			fireEvent("User clicks on search");
		});
		searchForm.addEventListener("submit", (e) => {
			sessionStorage.setItem(`${ID}-navSearchUsed`, "Search");
		});
	});
	const locationIcon = `<svg class="icon pin" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M11.9999 2C7.92988 2 4.62988 5.3 4.62988 9.37C4.62988 14.11 11.9999 22 11.9999 22C11.9999 22 19.3699 14.11 19.3699 9.37C19.3699 5.3 16.0699 2 11.9999 2ZM6.02988 9.37C6.02988 6.08 8.70988 3.4 11.9999 3.4C15.2899 3.4 17.9699 6.08 17.9699 9.37C17.9699 12.3 14.2899 17.22 11.9999 19.89C9.70988 17.22 6.02988 12.3 6.02988 9.37Z" fill="black"/>
	<path d="M12.0003 5.68018C9.97031 5.68018 8.32031 7.33018 8.32031 9.36018C8.32031 11.3902 9.97031 13.0402 12.0003 13.0402C14.0303 13.0402 15.6803 11.3902 15.6803 9.36018C15.6803 7.33018 14.0303 5.68018 12.0003 5.68018ZM12.0003 11.6502C10.7403 11.6502 9.72031 10.6302 9.72031 9.37018C9.72031 8.11018 10.7403 7.08018 12.0003 7.08018C13.2603 7.08018 14.2803 8.10018 14.2803 9.36018C14.2803 10.6202 13.2603 11.6502 12.0003 11.6502Z" fill="black"/>
	</svg>`;
	pollerLite(["#stores-dropdown"], () => {
		const storesDropdown = document.querySelector("#stores-dropdown");
		if (VARIATION == "1") {
			storesDropdown.querySelector("a.menu-title svg.icon.pin")?.remove();
			storesDropdown
				.querySelector("a.menu-title")
				.insertAdjacentHTML("afterbegin", locationIcon);
		}
		storesDropdown.addEventListener("click", (e) => {
			if (e.target.closest("a.menu-title")) {
				fireEvent(`User clicks on Location Dropdown: Locations`);
			} else if (e.target.closest("a")) {
				fireEvent(
					`User clicks on Location Dropdown: ${e.target.innerText.trim()}`
				);
			}
		});
	});
	pollerLite(["#help-dropdown"], () => {
		const helpDropdown = document.querySelector("#help-dropdown");
		helpDropdown.addEventListener("click", (e) => {
			if (e.target.closest("a.menu-title")) {
				fireEvent(`User clicks on Help Dropdown: Help`);
			} else if (e.target.closest("a")) {
				fireEvent(
					`User clicks on Help Dropdown: ${e.target.innerText.trim()}`
				);
			}
		});
	});
	pollerLite(["#mini-cart"], () => {
		const miniCartDropdown = document.querySelector("#mini-cart");
		miniCartDropdown.addEventListener("click", (e) => {
			if (e.target.closest("a.menu-title")) {
				fireEvent(`User clicks on header basket icon`);
			}
		});
	});

	pollerLite(["#account-menu-signin"], () => {
		const signIn = document.querySelector("#account-menu-signin");
		signIn.addEventListener("click", (e) => {
			fireEvent(`User Clicked Sign In from My Account dropdown`);
		});
	});

	pollerLite(["#account-menu-register"], () => {
		const register = document.querySelector("#account-menu-register");
		register.addEventListener("click", (e) => {
			fireEvent(`User Clicked Register from My Account dropdown`);
		});
	});
	pollerLite(['#my-account-dropdown a[href$="/Login-Logout"]'], () => {
		const logOut = document.querySelector(
			'#my-account-dropdown a[href$="/Login-Logout"]'
		);

		logOut.addEventListener("click", (e) => {
			fireEvent(`User Clicked Log Out from My Account dropdown`);
		});
	});

	pollerLite([".primary-logo a"], () => {
		const logo = document.querySelector(".primary-logo a");
		logo.addEventListener("click", (e) => {
			fireEvent(`User Clicked on Logo`);
		});
	});

	pollerLite([`.${ID}-header-bar`], () => {
		const headerBar = document.querySelector(`.${ID}-header-bar`);
		headerBar.addEventListener("click", (e) => {
			if (e.target.closest("a")) {
				fireEvent(
					`User clicks on USP bar: ${e.target
						.closest("a")
						.querySelector("span")
						.innerText.trim()}`
				);
			}
		});
	});

	pollerLite(
		[
			"#product-detail-wrapper #product-content button#add-to-cart",
			() => window.pageContext,
		],
		() => {
			if (window.pageContext.type === "product") {
				const btn = document.querySelector("button#add-to-cart");
				btn.addEventListener("click", () => {
					if (sessionStorage.getItem(`${ID}-navSearchUsed`)) {
						fireEvent(
							`User clicks to add to the bag on PDP after using ${sessionStorage.getItem(
								`${ID}-navSearchUsed`
							)}`
						);
						sessionStorage.removeItem(`${ID}-navSearchUsed`);
						localStorage.setItem("removeSessionStorage", "dummy");
						localStorage.removeItem(
							"removeSessionStorage",
							"dummy"
						);
					}
				});
			}
		}
	);
	pollerLite(["#QuickViewDialog"], () => {
		const btn = document.querySelector("#QuickViewDialog");
		btn.addEventListener("click", (e) => {
			if (
				e.target.closest("button#add-to-cart") &&
				sessionStorage.getItem(`${ID}-navSearchUsed`)
			) {
				fireEvent(
					`User clicks to add to the bag from Quick Buy after using ${sessionStorage.getItem(
						`${ID}-navSearchUsed`
					)}`
				);
				sessionStorage.removeItem(`${ID}-navSearchUsed`);
				localStorage.setItem("removeSessionStorage", "dummy");
				localStorage.removeItem("removeSessionStorage", "dummy");
			}
		});
	});
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
	if (location.href.includes("/checkout")) {
		document.body.classList.add("checkout-page");
		pollerLite([".primary-logo"], () => {
			const logo = document.querySelectorAll(".primary-logo svg");

			const images = `<img alt="Logo" class="icon new-logo" src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fnew_hotel_chocolat.png"><img alt="Logo" class="icon logo-mobile" src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fnew_hotel_chocolat_mobile.png">`;
			logo.forEach((item, index) => {
				item.remove();
			});
			document
				.querySelector(".primary-logo a")
				.insertAdjacentHTML("afterbegin", images);
			// const logoContainer = document.querySelector(
			// 	"#navigation .primary-logo"
			// );

			// const rightContentContainer = document.querySelector(
			// 	"#navigation .header-utility-menu.rightum"
			// );
			// rightContentContainer.insertAdjacentElement(
			// 	"beforebegin",
			// 	logoContainer
			// );

			pollerLite([".header-utility-menu.rightum #mini-cart"], () => {
				const cartContainer = document.querySelector(
					".header-utility-menu.rightum #mini-cart a"
				);
				cartContainer.insertAdjacentHTML(
					"afterbegin",
					`<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fbag.svg" alt="Shopping Bag Icon" />`
				);
			});
		});
		pollerLite(["#help-dropdown"], () => {
			const helpDropdown = document.querySelector(
				"#help-dropdown a.menu-title"
			);
			const svgIcon = document.querySelector("#help-dropdown svg");
			svgIcon.remove();
			helpDropdown.insertAdjacentHTML(
				"afterbegin",
				`<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2FInformation.svg" alt="Help Icon" class="icon info"/>`
			);
		});
	} else {
		const overlay = document.createElement("div");
		overlay.classList.add(`${ID}-overlay`);
		document.body.prepend(overlay);
		overlay.addEventListener("click", () => {
			overlay.classList.remove("show-overlay");
		});
		overlay.addEventListener("touchstart", () => {
			overlay.classList.remove("show-overlay");
		});
		overlay.addEventListener("mouseenter", () => {
			overlay.classList.remove("show-overlay");
		});
		pollerLite(["#main-header"], () => {
			const headerWrapper = document.querySelector("#main-header");

			const headerNewBarDom = `
				<div class="${ID}-header-bar">
					<div class="header-bar__content">
					<div class="header-bar__item desktop-only"></div>
					<div class="header-bar__item">
						<div class="header-bar__item__Delivery">
							<div class="usp-slider-container usp_slider">
								<a href="/uk/help/delivery.html" class="header-bar__item__Delivery__link">
									<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2FDelivery-2.svg" alt="Delivery Truck Icon" />
									<span>UK delivery options</span>
									<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fright-arrow.svg" alt="Arrow Icon" />
								</a>
								<a href="/uk/about-vipme/" class="header-bar__item__Delivery__link">
									<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2FVIP-Card.svg" alt="VIP Card Icon" />
									<span>Become a VIP.ME and 15% off your order</span>
									<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fright-arrow.svg" alt="Arrow Icon" />
								</a>
								<a href="/uk/our-cocoa-manifesto.html" class="header-bar__item__Delivery__link">
								<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2FEthical-Business-2.svg" alt="CacaoIcon" />
									<span>More cacao, less sugar</span>
									<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fright-arrow.svg" alt="Arrow Icon" />
								</a>
							</div>
						</div>
					</div>
					<div class="header-bar__item desktop-only">
						<a href="/uk/chocolate-shops" class="header-bar__item__links"><span>Our stores</span></a>
						<a href="/uk/help.html" class="header-bar__item__links"><span>Help centre</span></a>
						<a href="/uk/about-vipme/" class="header-bar__item__links"><span>Join VIP.ME</span></a>
					</div>
					</div>
				</div>
			`;

			headerWrapper.insertAdjacentHTML("afterbegin", headerNewBarDom);
		});

		pollerLite([".primary-logo"], () => {
			const logo = document.querySelectorAll(".primary-logo img");
			logo.forEach((item, index) => {
				if (index === 0) {
					item.src =
						"https://blcro.fra1.digitaloceanspaces.com/HC146%2Fnew_hotel_chocolat.png";
				} else {
					item.src =
						"https://blcro.fra1.digitaloceanspaces.com/HC146%2Fnew_hotel_chocolat_mobile.png";
				}
			});

			const logoContainer = document.querySelector(
				"#navigation .primary-logo"
			);

			const rightContentContainer = document.querySelector(
				"#navigation .header-utility-menu.rightum"
			);
			rightContentContainer.insertAdjacentElement(
				"beforebegin",
				logoContainer
			);

			const searchContainer = document.querySelector("#header-search");
			searchContainer.classList.add("not-Focused");
			const searchInput = document.querySelector("#header-search input");

			// searchInput.addEventListener("blur", () => {
			// 	searchContainer.classList.add("not-Focused");
			// });

			const submitBtn = document.querySelector("#header-search button");
			submitBtn.addEventListener("click", (e) => {
				e.preventDefault();
				if (
					window.innerWidth >= 768 &&
					window.innerWidth < 960 &&
					searchContainer.classList.contains("not-Focused")
				) {
					searchContainer.classList.toggle("not-Focused");
				} else {
					submitBtn.closest("form").submit();
				}
			});
			searchInput.setAttribute("placeholder", "Search products");
			if (window.innerWidth > 767) {
				rightContentContainer.prepend(searchContainer);
			}

			window.addEventListener("resize", () => {
				const searchContainer =
					document.querySelector("#header-search");

				if (window.innerWidth > 767) {
					if (
						!searchContainer.closest(".header-utility-menu.rightum")
					) {
						rightContentContainer.prepend(searchContainer);
					}
				} else {
					if (
						searchContainer.closest(".header-utility-menu.rightum")
					) {
						document
							.querySelector("#main-header .hlp-centered-wrapper")
							.prepend(searchContainer);
					}
				}
			});

			pollerLite(
				[
					".header-utility-menu.rightum #mini-cart",
					".header-utility-menu.rightum #my-account-dropdown",
				],
				() => {
					const cartContainer = document.querySelector(
						".header-utility-menu.rightum #mini-cart a"
					);
					cartContainer.insertAdjacentHTML(
						"afterbegin",
						`<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fbag.svg" alt="Shopping Bag Icon" />`
					);
					const myAccount = document.querySelector(
						".header-utility-menu.rightum #my-account-dropdown a"
					);
					myAccount.insertAdjacentHTML(
						"afterbegin",
						`<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2FMy-Account.svg" alt="User Icon" />`
					);

					// write observer for my account dropdown
					const myAccountDropdown = document.querySelector(
						".header-utility-menu.rightum #my-account-dropdown"
					);
					const cart = document.querySelector(
						".header-utility-menu.rightum #mini-cart"
					);

					const myAccountDropdownObserver = new MutationObserver(
						(mutations) => {
							mutations.forEach((mutation) => {
								if (mutation.type === "attributes") {
									if (
										mutation.target.classList.contains(
											"hover"
										)
									) {
										overlay.classList.add("show-overlay");
										const headerHeight =
											document.querySelector(
												"#main-header"
											).offsetHeight;
										const desktopNavigationHeight =
											document.querySelector(
												"#desktop-navigation"
											).offsetHeight;
										overlay.style.top = `${
											headerHeight +
											desktopNavigationHeight
										}px`;
									} else {
										overlay.classList.remove(
											"show-overlay"
										);
									}
								}
							});
						}
					);
					myAccountDropdownObserver.observe(myAccountDropdown, {
						attributes: true,
						attributeFilter: ["class"],
						childList: false,
						subtree: false,
					});
					myAccountDropdownObserver.observe(cart, {
						attributes: true,
						attributeFilter: ["class"],
						childList: false,
						subtree: false,
					});

					const desktopNavigation = document.querySelector(
						"nav#desktop-navigation ul.main-navigation"
					);

					const desktopNavigationObserver = new MutationObserver(
						(mutations) => {
							if (
								desktopNavigation.querySelector(
									"li.top-level.hover"
								)
							) {
								overlay.classList.add("show-overlay");
								const headerHeight =
									document.querySelector(
										"#main-header"
									).offsetHeight;
								const desktopNavigationHeight =
									document.querySelector(
										"#desktop-navigation"
									).offsetHeight;
								overlay.style.top = `${
									headerHeight + desktopNavigationHeight
								}px`;
							} else {
								overlay.classList.remove("show-overlay");
							}
						}
					);
					desktopNavigationObserver.observe(desktopNavigation, {
						attributes: true,
						childList: true,
						subtree: true,
					});
				}
			);
		});

		pollerLite([() => window.jQuery, ".usp-slider-container"], () => {
			setTimeout(() => {
				const menuContainer = document.querySelector(
					`.${ID}-header-bar .usp-slider-container`
				);

				$(menuContainer).slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					autoplay: true,
				});
			}, 500);
		});

		pollerLite(["#hamburger-menu"], () => {
			const menuAnchor = document.querySelector(
				"#hamburger-menu a.menu-title"
			);
			menuAnchor.insertAdjacentHTML(
				"afterbegin",
				`<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2FMenu.svg" alt="Menu Icon" class="icon menu-icon" />`
			);

			pollerLite([() => window.jQuery], () => {
				setTimeout(() => {
					const menuContainer = document.querySelector(
						"#hamburger-menu .drop-down-options.menu-wrapper .main-navigation"
					);

					$(menuContainer).slick && $(menuContainer).slick("unslick");
					menuContainer.classList.add("slick-destroyed");
				}, 500);
				window.addEventListener("resize", () => {
					setTimeout(() => {
						const menuContainer = document.querySelector(
							"#hamburger-menu .drop-down-options.menu-wrapper .main-navigation"
						);

						$(menuContainer).slick &&
							$(menuContainer).slick("unslick");
						menuContainer.classList.add("slick-destroyed");
					}, 500);
				});
			});

			const hamBurgerMenu = document.querySelector("#hamburger-menu");
			const myAccountDropdownObserver = new MutationObserver(
				(mutations) => {
					mutations.forEach((mutation) => {
						if (mutation.type === "attributes") {
							if (mutation.target.classList.contains("hover")) {
								const headerHeight =
									document.querySelector(
										"#main-header"
									).offsetHeight;
								const desktopNavigationHeight =
									document.querySelector(
										"#desktop-navigation"
									).offsetHeight;
								overlay.style.top = `${
									headerHeight + desktopNavigationHeight
								}px`;
								overlay.classList.add("show-overlay");
							} else {
								overlay.classList.remove("show-overlay");
							}
						}
					});
				}
			);
			myAccountDropdownObserver.observe(hamBurgerMenu, {
				attributes: true,
				attributeFilter: ["class"],
				childList: false,
				subtree: false,
			});
		});

		pollerLite(["div#search-suggestions"], () => {
			const searchSuggestions = document.querySelector(
				"div#search-suggestions"
			);

			const suggestionsObserver = new MutationObserver((mutations) => {
				if (searchSuggestions.classList.contains("active")) {
					overlay.classList.add("active");
					const headerHeight =
						document.querySelector("#main-header").offsetHeight;
					const desktopNavigationHeight = document.querySelector(
						"#desktop-navigation"
					).offsetHeight;
					overlay.style.top = `${
						headerHeight + desktopNavigationHeight
					}px`;
				} else {
					overlay.classList.remove("active");
				}
			});
			suggestionsObserver.observe(searchSuggestions, {
				attributes: true,
				attributeFilter: ["class"],
				childList: false,
				subtree: false,
			});
		});

		pollerLite(["#stores-dropdown"], () => {
			const hamBurgerMenu = document.querySelector("#stores-dropdown");
			const myAccountDropdownObserver = new MutationObserver(
				(mutations) => {
					mutations.forEach((mutation) => {
						if (mutation.type === "attributes") {
							if (mutation.target.classList.contains("hover")) {
								overlay.classList.add("show-overlay");
								const headerHeight =
									document.querySelector(
										"#main-header"
									).offsetHeight;
								const desktopNavigationHeight =
									document.querySelector(
										"#desktop-navigation"
									).offsetHeight;
								overlay.style.top = `${
									headerHeight + desktopNavigationHeight
								}px`;
							} else {
								if (
									!document
										.querySelector("#hamburger-menu")
										.classList.contains("hover") &&
									!document
										.querySelector("#stores-dropdown")
										.classList.contains("hover") &&
									!document
										.querySelector("#my-account-dropdown")
										.classList.contains("hover") &&
									!document
										.querySelector("#cart-dropdown")
										.classList.contains("hover")
								) {
									overlay.classList.remove("show-overlay");
								}
							}
						}
					});
				}
			);
			myAccountDropdownObserver.observe(hamBurgerMenu, {
				attributes: true,
				attributeFilter: ["class"],
				childList: false,
				subtree: false,
			});
		});
	}
};
