import {
	setup,
	fireEvent,
	newEvents,
} from "../../../../../core-files/services";
import { pollerLite } from "./../../../../../lib/utils";
import shared from "../../../../../core-files/shared";

export default () => {
	const { ID, VARIATION } = shared;

	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	newEvents.property = "G-B37NQR1RWZ";

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

	pollerLite(["form#search-form input[type='text']"], () => {
		const searchForm = document.querySelector(
			"form#search-form input[type='text']"
		);
		searchForm.addEventListener("click", () => {
			
			if(document.getElementById('hamburger-menu').classList.contains('hover')) {
				document.getElementById('hamburger-menu').classList.remove('hover');
			}
			

		});
	});
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
	<path d="M11.9999 2C7.92988 2 4.62988 5.3 4.62988 9.37C4.62988 14.11 11.9999 22 11.9999 22C11.9999 22 19.3699 14.11 19.3699 9.37C19.3699 5.3 16.0699 2 11.9999 2ZM6.02988 9.37C6.02988 6.08 8.70988 3.4 11.9999 3.4C15.2899 3.4 17.9699 6.08 17.9699 9.37C17.9699 12.3 14.2899 17.22 11.9999 19.89C9.70988 17.22 6.02988 12.3 6.02988 9.37Z" fill="white"/>
	<path d="M12.0003 5.68018C9.97031 5.68018 8.32031 7.33018 8.32031 9.36018C8.32031 11.3902 9.97031 13.0402 12.0003 13.0402C14.0303 13.0402 15.6803 11.3902 15.6803 9.36018C15.6803 7.33018 14.0303 5.68018 12.0003 5.68018ZM12.0003 11.6502C10.7403 11.6502 9.72031 10.6302 9.72031 9.37018C9.72031 8.11018 10.7403 7.08018 12.0003 7.08018C13.2603 7.08018 14.2803 8.10018 14.2803 9.36018C14.2803 10.6202 13.2603 11.6502 12.0003 11.6502Z" fill="white"/>
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

	pollerLite(['#my-account-dropdown a'], () => {
		
		let allLinks = document.querySelectorAll('#my-account-dropdown a');
		allLinks.forEach((item) => {
			let itemText = item.innerText.trim().toLowerCase();
			item.innerText = itemText;
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
	if (
		location.href.includes("/checkout") &&
		!location.href.includes("/uk/checkout/confirmation")
	) {
		document.body.classList.add("checkout-page");
		pollerLite([".primary-logo"], () => {
			const logo = document.querySelectorAll(".primary-logo svg");

			// const images = `<img alt="Logo" class="icon new-logo" src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fnew_hotel_chocolat.png"><img alt="Logo" class="icon logo-mobile" src="https://blcro.fra1.digitaloceanspaces.com/HC146/hotelChocolat.svg">`;
			const images = `<img alt="Logo" class="icon new-logo" src="https://www.hotelchocolat.com/on/demandware.static/-/Sites/default/dw3c0c5316/websiteLogo/new-logo.svg"><img alt="Logo" class="icon logo-mobile" src="https://www.hotelchocolat.com/on/demandware.static/-/Sites/default/dw45eb2702/websiteLogo/logo-mobile.svg">`;
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
							<div class="usp-slider-container usp_slider initially-hidden">
								<a href="/uk/help/delivery.html" class="header-bar__item__Delivery__link">
									<svg width="24" height="24" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.808 14.755V9.56498L19.568 2.64498H15.328V0.224976H0.807983V14.755H3.25798C3.24798 14.855 3.22798 14.955 3.22798 15.055C3.22798 16.555 4.44798 17.775 5.94798 17.775C7.44798 17.775 8.66798 16.555 8.66798 15.055C8.66798 14.955 8.64798 14.855 8.63798 14.755H15.118H15.328H15.358C15.348 14.855 15.328 14.955 15.328 15.055C15.328 16.555 16.548 17.775 18.048 17.775C19.548 17.775 20.768 16.555 20.768 15.055C20.768 14.955 20.748 14.855 20.738 14.755H23.808ZM5.94798 16.385C5.21798 16.385 4.62798 15.795 4.62798 15.065C4.62798 14.335 5.21798 13.745 5.94798 13.745C6.67798 13.745 7.26798 14.335 7.26798 15.065C7.27798 15.785 6.67798 16.385 5.94798 16.385ZM13.938 13.355H8.05798C7.55798 12.735 6.80798 12.335 5.94798 12.335C5.08798 12.335 4.33798 12.735 3.83798 13.355H2.20798V1.62498H13.938V13.355ZM16.098 13.175C16.078 13.195 16.068 13.215 16.048 13.235C16.068 13.215 16.078 13.195 16.098 13.175ZM15.748 13.635C15.738 13.645 15.738 13.655 15.728 13.665C15.738 13.655 15.738 13.645 15.748 13.635ZM18.058 16.385C17.328 16.385 16.738 15.795 16.738 15.065C16.738 14.335 17.328 13.745 18.058 13.745C18.788 13.745 19.378 14.335 19.378 15.065C19.378 15.785 18.788 16.385 18.058 16.385ZM18.058 12.335C17.488 12.335 16.958 12.515 16.518 12.815V4.04498H18.778L22.398 9.95498V13.345H20.158C19.668 12.735 18.918 12.335 18.058 12.335Z" fill="#000"/><path d="M12.238 10.0749C12.098 9.93495 11.818 9.95495 11.578 10.1149C11.528 10.1449 11.488 10.1749 11.438 10.2249C11.278 10.3849 11.218 10.5949 11.308 10.7449L11.348 10.7849C11.488 10.9249 11.758 10.9249 11.998 10.7549C12.048 10.7349 12.088 10.6949 12.138 10.6449C12.298 10.4849 12.358 10.2749 12.258 10.1249C12.248 10.1149 12.248 10.0849 12.238 10.0749Z" fill="#000"/><path d="M11.408 9.50494C11.538 9.46494 12.378 8.94494 12.298 8.52494C12.268 8.34494 12.138 8.07494 11.948 8.03494C11.878 8.03494 11.768 8.07494 11.628 8.24494C11.168 8.78494 9.89801 10.8549 7.24801 10.0049C5.98801 9.59494 5.61801 8.83494 5.32801 6.83494C4.97801 4.34494 7.29801 3.63494 8.68801 4.11494C10.078 4.59494 10.298 4.85494 10.498 4.92494C10.698 5.00494 10.898 4.92494 11.018 4.80494C11.138 4.68494 11.138 4.68494 11.098 4.42494C11.058 4.16494 11.038 3.88494 10.778 3.86494C10.518 3.84494 10.358 3.94494 8.92801 3.58494C7.49801 3.22494 6.25801 3.36494 5.02801 4.91494C3.79801 6.46494 4.31801 8.46494 4.84801 9.32494C7.11801 12.9849 11.188 9.56494 11.408 9.50494Z" fill="#000"/><path d="M9.61798 9.26494V5.18494H9.08798V6.81494H7.39798V5.18494H6.80798V9.26494H7.39798V7.42494H9.08798V9.26494H9.61798Z" fill="#000"/></svg>
									<span>UK delivery options</span>
								</a>
								<a href="/uk/about-vipme/" class="header-bar__item__Delivery__link">
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_9_351)"><path d="M14.4199 15.06V15.07C14.4299 15.07 14.4399 15.06 14.4499 15.06V15.05C14.4399 15.05 14.4299 15.05 14.4199 15.06Z" fill="#000"/><path d="M14 14.98C14.05 15 14.09 15.01 14.14 14.99C14.1 14.98 14.05 14.96 14 14.98Z" fill="#000"/><path d="M14.0601 14.8099C14.1001 14.8099 14.1301 14.8099 14.1701 14.7999C14.1301 14.7799 14.1001 14.7799 14.0601 14.8099Z" fill="#000"/><path d="M13.6599 14.83C13.6499 14.83 13.6399 14.83 13.6299 14.83V14.84C13.6399 14.84 13.6499 14.84 13.6599 14.83C13.6599 14.84 13.6599 14.83 13.6599 14.83Z" fill="#000"/><path d="M14.8999 15.04C14.8799 15.03 14.8499 15.02 14.8099 15.01C14.7999 15.01 14.7799 15 14.7699 15C14.7399 15.02 14.7199 14.99 14.6999 14.98C14.6699 14.99 14.6399 15 14.6099 15C14.5199 15 14.4199 14.98 14.3299 14.98C14.2699 14.98 14.1999 14.95 14.1399 14.98C14.1599 14.99 14.1699 15 14.1899 15C14.2899 15.01 14.3799 15 14.4799 15.01C14.5299 15.01 14.5699 15.03 14.6099 15.04C14.5799 15.06 14.5499 15.05 14.5299 15.08C14.5399 15.08 14.5399 15.09 14.5399 15.09C14.6199 15.06 14.6899 15.12 14.7699 15.1C14.7699 15.1 14.7799 15.11 14.7899 15.11C14.7999 15.11 14.8099 15.11 14.8299 15.11C14.7699 15.06 14.7699 15.06 14.7799 15.03C14.8299 15.07 14.8299 15.07 14.8999 15.04Z" fill="#000"/><path d="M13.9399 14.72C13.9199 14.72 13.8999 14.72 13.8799 14.72C13.8799 14.73 13.8799 14.73 13.8799 14.74C13.8999 14.74 13.9199 14.74 13.9399 14.74C13.9399 14.73 13.9399 14.73 13.9399 14.72Z" fill="#000"/><path d="M13.97 14.87C14.01 14.87 14.04 14.87 14.08 14.86C14.11 14.86 14.14 14.88 14.18 14.85C14.05 14.84 13.93 14.84 13.81 14.83C13.81 14.83 13.81 14.83 13.81 14.84C13.84 14.85 13.87 14.86 13.9 14.88C13.88 14.89 13.87 14.89 13.87 14.89C13.8 14.95 13.8 14.95 13.73 14.95C13.7 14.95 13.67 14.95 13.65 14.95C13.6 14.95 13.56 14.95 13.51 14.95C13.51 14.96 13.51 14.96 13.51 14.97C13.65 14.97 13.8 15.01 13.95 14.98C13.92 14.96 13.91 14.95 13.89 14.94C13.93 14.89 13.98 14.93 14.02 14.9C14 14.89 13.99 14.88 13.97 14.87Z" fill="#000"/><path d="M13.8201 14.79C13.8701 14.79 13.9301 14.8 13.9801 14.8C13.9801 14.79 13.9801 14.79 13.9801 14.78C13.9301 14.75 13.8701 14.76 13.8201 14.77C13.8201 14.78 13.8201 14.79 13.8201 14.79Z" fill="#000"/><path d="M15.3401 14.94C15.2101 14.92 15.0701 14.91 14.9401 14.9C14.9001 14.9 14.8501 14.89 14.8101 14.92C14.8101 14.93 14.8101 14.93 14.8101 14.94C14.8501 14.94 14.8801 14.93 14.9201 14.93C15.0401 14.94 15.1601 14.95 15.2801 14.96C15.3301 14.96 15.3901 14.97 15.4401 14.97C15.5401 14.98 15.6301 15 15.7301 15.01C15.7501 15.01 15.7701 15.01 15.8001 15.01C15.7601 15.01 15.7401 15 15.7101 15C15.5901 14.98 15.4601 14.96 15.3401 14.94Z" fill="#000"/><path d="M15.45 15.15C15.3 15.14 15.17 15.11 15.02 15.11C15.19 15.15 15.38 15.18 15.45 15.15Z" fill="#000"/><path d="M15.55 15.12C15.61 15.12 15.66 15.16 15.72 15.14C15.67 15.13 15.61 15.09 15.55 15.12Z" fill="#000"/><path d="M13.0901 14.73C13.0901 14.74 13.0901 14.74 13.0901 14.75C13.1301 14.75 13.1801 14.75 13.2201 14.76C13.2601 14.76 13.3101 14.76 13.3501 14.76C13.3901 14.76 13.4401 14.78 13.4801 14.76C13.4801 14.75 13.4801 14.75 13.4801 14.74C13.3501 14.74 13.2201 14.74 13.0901 14.73Z" fill="#000"/><path d="M15.2499 15.08C15.2199 15.07 15.1899 15.07 15.1499 15.08C15.1899 15.11 15.2199 15.09 15.2499 15.08Z" fill="#000"/><path d="M15.4001 15.09C15.3801 15.09 15.3601 15.09 15.3401 15.09C15.3601 15.09 15.3801 15.1 15.4001 15.1C15.4001 15.09 15.4001 15.09 15.4001 15.09Z" fill="#000"/><path d="M16.2401 15.23C16.2101 15.23 16.1801 15.23 16.1501 15.23C16.0501 15.22 15.9501 15.22 15.8601 15.21C15.8501 15.21 15.8401 15.21 15.8301 15.22V15.23C15.9901 15.25 16.1401 15.26 16.3001 15.28C16.3001 15.24 16.2701 15.23 16.2401 15.23Z" fill="#000"/><path d="M15.33 15.0899C15.33 15.0799 15.32 15.0699 15.32 15.0699C15.3 15.0699 15.27 15.0799 15.25 15.0799C15.27 15.1099 15.3 15.0799 15.33 15.0899Z" fill="#000"/><path d="M11.8799 13.94C11.9099 13.94 11.9399 13.94 11.9899 13.94C11.9199 13.91 11.9199 13.91 11.8799 13.94Z" fill="#000"/><path d="M11.6701 13.88C11.6501 13.88 11.6301 13.89 11.6101 13.89V13.91C11.6301 13.91 11.6501 13.9 11.6701 13.88C11.6701 13.89 11.6701 13.89 11.6701 13.88Z" fill="#000"/><path d="M9.91992 13.9599C9.92992 13.9599 9.93992 13.9499 9.94992 13.9499V13.9399C9.93992 13.9399 9.92992 13.9499 9.91992 13.9599C9.91992 13.9499 9.91992 13.9499 9.91992 13.9599Z" fill="#000"/><path d="M9.91011 10.63H10.4401C10.8501 10.63 11.1801 10.54 11.4201 10.37C11.6601 10.2 11.7801 9.91996 11.7801 9.54996C11.7801 9.20996 11.6701 8.93996 11.4501 8.74996C11.2301 8.55996 10.9301 8.45996 10.5301 8.45996H9.36011V12.28H9.91011V10.63ZM9.91011 8.94996H10.4101C10.6701 8.94996 10.8601 8.98996 11.0001 9.07996C11.1301 9.16996 11.2001 9.31996 11.2001 9.53996C11.2001 9.76996 11.1301 9.92996 11.0001 10.02C10.8701 10.11 10.6701 10.15 10.4101 10.15H9.91011V8.94996Z" fill="#000"/><path d="M11.6 13.95C11.62 13.95 11.63 13.94 11.65 13.94C11.65 13.93 11.65 13.93 11.65 13.92C11.62 13.93 11.61 13.94 11.6 13.95C11.59 13.95 11.59 13.95 11.6 13.95Z" fill="#000"/><path d="M11.9299 13.8899C11.9799 13.8899 12.0299 13.8899 12.0899 13.8799C12.0399 13.8799 11.9799 13.8599 11.9299 13.8899Z" fill="#000"/><path d="M12.25 13.89C12.28 13.89 12.31 13.89 12.35 13.89C12.32 13.87 12.29 13.85 12.25 13.89Z" fill="#000"/><path d="M13.09 13.9401C13.07 13.9401 13.05 13.9301 13.04 13.9301C13.04 13.9401 13.04 13.9401 13.04 13.9501C13.06 13.9501 13.08 13.9501 13.09 13.9501C13.09 13.9501 13.09 13.9501 13.09 13.9401Z" fill="#000"/><path d="M11.5299 11.7701C11.4599 11.8301 11.4299 11.9101 11.4299 12.0201C11.4299 12.1201 11.4599 12.2001 11.5299 12.2601C11.5999 12.3201 11.6799 12.3601 11.7599 12.3601C11.8499 12.3601 11.9299 12.3301 11.9999 12.2601C12.0699 12.1901 12.0999 12.1101 12.0999 12.0201C12.0999 11.9201 12.0699 11.8401 11.9999 11.7801C11.9299 11.7201 11.8499 11.6801 11.7599 11.6801C11.6799 11.6801 11.5999 11.7101 11.5299 11.7701Z" fill="#000"/><path d="M12.6799 14.93C12.6899 14.93 12.6899 14.94 12.6999 14.94C12.7099 14.94 12.7099 14.94 12.7299 14.93C12.6899 14.9 12.6899 14.9 12.6799 14.93Z" fill="#000"/><path d="M13.17 14.91C13.09 14.92 13.01 14.91 12.92 14.9C12.86 14.89 12.81 14.9 12.75 14.92C12.75 14.93 12.75 14.93 12.75 14.94C12.91 14.95 13.07 14.95 13.24 14.95C13.24 14.95 13.25 14.94 13.25 14.93C13.23 14.9 13.2 14.9 13.17 14.91Z" fill="#000"/><path d="M12.5 14.9C12.51 14.93 12.54 14.92 12.56 14.9C12.54 14.89 12.52 14.89 12.51 14.88C12.5 14.89 12.5 14.9 12.5 14.9Z" fill="#000"/><path d="M13.2701 14.83C13.2501 14.82 13.2301 14.8 13.2101 14.8C13.1201 14.8 13.0401 14.8 12.9501 14.79C12.9101 14.79 12.8901 14.81 12.8601 14.85C12.9401 14.84 13.0101 14.83 13.0901 14.82C13.0801 14.83 13.0701 14.84 13.0701 14.84C13.1401 14.85 13.2101 14.86 13.2801 14.86C13.3101 14.86 13.3501 14.85 13.3901 14.85C13.3501 14.79 13.3301 14.79 13.2701 14.83Z" fill="#000"/><path d="M9.5 13.99C9.52 13.99 9.54 13.99 9.56 13.99C9.54 13.98 9.52 13.99 9.5 13.99Z" fill="#000"/><path d="M5.21 11.16L4.05 8.46997H3.5L5.14 12.32H5.27L6.88 8.46997H6.34L5.21 11.16Z" fill="#000"/><path d="M13.29 14.94C13.34 14.96 13.39 14.97 13.45 14.96C13.4 14.93 13.34 14.92 13.29 14.94Z" fill="#000"/><path d="M8.24995 8.46997H7.69995V12.29H8.24995V8.46997Z" fill="#000"/><path d="M15.3301 14.41C15.3301 14.42 15.3301 14.42 15.3301 14.42C15.3401 14.42 15.3501 14.42 15.3601 14.42V14.41C15.3501 14.41 15.3401 14.41 15.3301 14.41Z" fill="#000"/><path d="M15.03 14.15C15.05 14.15 15.07 14.15 15.09 14.15V14.14C15.07 14.15 15.05 14.15 15.03 14.15Z" fill="#000"/><path d="M15.1899 14.15C15.1899 14.16 15.1899 14.16 15.1899 14.15C15.1999 14.16 15.2199 14.17 15.2299 14.17V14.16C15.2199 14.16 15.2099 14.16 15.1899 14.15Z" fill="#000"/><path d="M15.4299 14.19C15.4599 14.19 15.4899 14.19 15.5199 14.19C15.4899 14.16 15.4599 14.17 15.4299 14.19Z" fill="#000"/><path d="M15.04 14.38C15.05 14.38 15.07 14.38 15.08 14.38V14.37C15.07 14.37 15.05 14.37 15.04 14.37C15.04 14.38 15.04 14.38 15.04 14.38Z" fill="#000"/><path d="M14.6399 14.13C14.7199 14.13 14.7999 14.14 14.8799 14.14C14.7999 14.11 14.7199 14.11 14.6399 14.12C14.6399 14.13 14.6399 14.13 14.6399 14.13Z" fill="#000"/><path d="M14.7899 14.0701C14.7599 14.0701 14.7199 14.0601 14.6899 14.0601C14.6899 14.0701 14.6899 14.0701 14.6899 14.0801C14.7299 14.0801 14.7599 14.0801 14.7999 14.0801C14.7899 14.0801 14.7899 14.0701 14.7899 14.0701Z" fill="#000"/><path d="M15.1001 14.33C15.0901 14.33 15.0801 14.34 15.0701 14.34V14.35C15.0801 14.35 15.0901 14.34 15.1001 14.34V14.33Z" fill="#000"/><path d="M16.03 14.28C16.04 14.28 16.05 14.28 16.06 14.28C16.06 14.28 16.06 14.28 16.06 14.27C16.05 14.27 16.04 14.27 16.03 14.28C16.03 14.27 16.03 14.27 16.03 14.28Z" fill="#000"/><path d="M16.72 14.99C16.75 15 16.77 15 16.8 15.01C16.78 14.98 16.75 14.98 16.72 14.98C16.73 14.98 16.73 14.98 16.72 14.99Z" fill="#000"/><path d="M15.93 15.16C15.88 15.15 15.84 15.15 15.79 15.14C15.83 15.17 15.89 15.18 15.93 15.16Z" fill="#000"/><path d="M16.8701 15.01V15C16.8501 15 16.8301 15 16.8101 15C16.8301 15.01 16.8501 15.01 16.8701 15.01Z" fill="#000"/><path d="M15.8501 14.21C15.8501 14.21 15.8501 14.22 15.8401 14.22C15.8601 14.23 15.8701 14.24 15.8901 14.24C15.8901 14.24 15.8901 14.23 15.9001 14.23C15.8801 14.23 15.8701 14.22 15.8501 14.21Z" fill="#000"/><path d="M18.83 11.8V10.61H20.4V10.12H18.83V8.95997H20.45V8.46997H18.28V12.29H20.5V11.8H18.83Z" fill="#000"/><path d="M16.6399 15.29C16.6499 15.29 16.6599 15.29 16.6699 15.29C16.6699 15.29 16.6699 15.29 16.6699 15.28C16.6599 15.28 16.6499 15.27 16.6399 15.27C16.6399 15.28 16.6399 15.29 16.6399 15.29Z" fill="#000"/><path d="M16.05 14.4599C16.06 14.4599 16.07 14.4599 16.07 14.4599V14.4499C16.06 14.4499 16.06 14.4399 16.05 14.4399C16.05 14.4499 16.05 14.4599 16.05 14.4599Z" fill="#000"/><path d="M15.33 10.04L14.06 8.46997H13.54V12.29H14.09V9.31997L15.28 10.8H15.38L16.56 9.31997V12.29H17.11V8.46997H16.6L15.33 10.04Z" fill="#000"/><path d="M11.3101 14.8C11.3301 14.8 11.3601 14.79 11.3801 14.79C11.3601 14.79 11.3301 14.79 11.3101 14.79C11.3101 14.8 11.3101 14.8 11.3101 14.8Z" fill="#000"/><path d="M14.56 14.11C14.52 14.11 14.49 14.11 14.45 14.12C14.49 14.12 14.52 14.12 14.56 14.13V14.11Z" fill="#000"/><path d="M11.8101 14.83C11.8501 14.83 11.8801 14.83 11.9001 14.83C11.9201 14.81 11.9201 14.79 11.9301 14.79C11.9901 14.79 12.0601 14.78 12.1201 14.79C12.1701 14.8 12.2201 14.79 12.2701 14.78C12.2201 14.78 12.1801 14.77 12.1301 14.77C12.0501 14.77 11.9801 14.78 11.9001 14.78C11.8501 14.78 11.8501 14.78 11.8101 14.83Z" fill="#000"/><path d="M11.49 14.72C11.44 14.71 11.39 14.74 11.34 14.71C11.32 14.7 11.3 14.72 11.31 14.75C11.38 14.74 11.45 14.73 11.53 14.72C11.5 14.72 11.5 14.72 11.49 14.72Z" fill="#000"/><path d="M12.3501 14.7099C12.2601 14.6899 12.1801 14.6699 12.0901 14.7299C12.1801 14.7299 12.2601 14.7199 12.3501 14.7099C12.3501 14.7199 12.3501 14.7099 12.3501 14.7099Z" fill="#000"/><path d="M16.05 15.1899C16.06 15.1999 16.07 15.1999 16.08 15.1999C16.08 15.1999 16.08 15.1999 16.08 15.1899C16.06 15.1899 16.06 15.1899 16.05 15.1899Z" fill="#000"/><path d="M16.5301 15.07C16.5001 15.05 16.4701 15.03 16.4401 15.02C16.4301 15.05 16.4601 15.07 16.5301 15.07Z" fill="#000"/><path d="M16.56 14.76C16.59 14.75 16.61 14.74 16.64 14.73V14.72C16.43 14.68 16.22 14.64 16.01 14.6C16.02 14.59 16.02 14.59 16.03 14.59C16.03 14.59 16.03 14.59 16.04 14.58C15.9 14.56 15.77 14.53 15.63 14.51V14.49C15.72 14.49 15.82 14.52 15.91 14.53C16 14.55 16.1 14.56 16.19 14.56C16.17 14.55 16.15 14.55 16.13 14.54C15.97 14.51 15.81 14.46 15.65 14.45C15.63 14.45 15.61 14.44 15.6 14.43C15.58 14.4 15.56 14.42 15.54 14.43C15.53 14.43 15.52 14.46 15.51 14.47C15.5 14.47 15.48 14.45 15.46 14.46C15.44 14.46 15.41 14.48 15.39 14.48C15.33 14.48 15.27 14.48 15.2 14.48C15.15 14.48 15.11 14.47 15.06 14.48C15.02 14.49 14.97 14.49 14.93 14.48C14.86 14.45 14.79 14.46 14.71 14.46C14.65 14.47 14.61 14.45 14.54 14.41C14.7 14.37 14.84 14.41 14.97 14.4C14.94 14.38 14.91 14.36 14.88 14.35C14.85 14.34 14.81 14.35 14.78 14.35C14.78 14.33 14.79 14.32 14.79 14.3C14.74 14.3 14.69 14.31 14.66 14.34C14.62 14.35 14.6 14.28 14.55 14.32L14.54 14.31C14.53 14.27 14.51 14.28 14.48 14.29C14.46 14.29 14.44 14.29 14.42 14.29C14.4 14.29 14.38 14.28 14.37 14.29C14.34 14.31 14.33 14.26 14.3 14.27C14.28 14.27 14.25 14.28 14.23 14.28V14.27C14.2 14.26 14.17 14.25 14.13 14.26C14.11 14.26 14.09 14.29 14.07 14.3C14.04 14.28 14.01 14.24 13.96 14.25C13.95 14.28 13.92 14.3 13.89 14.28C13.89 14.27 13.89 14.25 13.89 14.23C13.86 14.23 13.83 14.23 13.8 14.23C13.78 14.23 13.76 14.24 13.75 14.24C13.67 14.25 13.59 14.2 13.52 14.26C13.52 14.26 13.51 14.26 13.5 14.26C13.46 14.26 13.43 14.26 13.39 14.26C13.38 14.26 13.36 14.25 13.34 14.25C13.39 14.24 13.42 14.23 13.46 14.22V14.21C13.4 14.21 13.34 14.22 13.28 14.21C13.15 14.19 13.01 14.19 12.88 14.18C12.69 14.17 12.5 14.16 12.31 14.16C12.21 14.16 12.12 14.15 12.02 14.16C11.69 14.17 11.36 14.18 11.03 14.19C11.02 14.19 11 14.19 11 14.19C10.96 14.13 10.97 14.19 10.96 14.2C10.86 14.21 10.77 14.22 10.67 14.22C10.73 14.18 10.81 14.2 10.88 14.17C10.83 14.15 10.8 14.14 10.76 14.16C10.73 14.18 10.7 14.18 10.65 14.17C10.69 14.14 10.73 14.12 10.77 14.12C10.9 14.11 11.03 14.1 11.15 14.09C11.35 14.08 11.55 14.06 11.76 14.05C11.9 14.04 12.05 14.04 12.19 14.04C12.36 14.04 12.54 14.04 12.71 14.04C12.82 14.04 12.94 14.04 13.05 14.05C13.09 14.05 13.13 14.06 13.17 14.06C13.3 14.07 13.43 14.07 13.56 14.08C13.75 14.09 13.94 14.11 14.14 14.12C14.17 14.12 14.2 14.12 14.23 14.12C14.2 14.11 14.17 14.1 14.15 14.1C13.93 14.08 13.7 14.07 13.48 14.06C13.42 14.06 13.35 14.05 13.29 14.05C13.16 14.04 13.04 14.04 12.91 14.04C12.69 14.03 12.47 14.03 12.25 14.02C12.18 14.02 12.1 14.04 12.03 14.01C12.02 14.01 12.01 14.01 12 14.01C11.93 14.02 11.86 14.02 11.78 14.03C11.69 14 11.61 14 11.52 14.01C11.5 14.01 11.48 14.01 11.46 14C11.45 14 11.44 13.99 11.43 13.99C11.33 14 11.24 14.01 11.14 14.01C11.06 14.02 10.97 14.01 10.89 14.02C10.8 14.04 10.71 14.04 10.61 14.04C10.56 14.04 10.51 14.06 10.45 14.03C10.51 14.02 10.55 14.02 10.6 14.01C10.6 14 10.6 14 10.59 13.98C10.7 13.98 10.8 13.97 10.89 13.97C10.9 13.98 10.9 14 10.91 14C10.95 14 10.99 14 11.03 13.99V13.98C11.01 13.98 10.99 13.97 10.97 13.97C11.17 13.94 11.37 13.94 11.57 13.9C11.55 13.89 11.53 13.89 11.51 13.89C11.41 13.9 11.31 13.9 11.21 13.91C11.02 13.92 10.83 13.93 10.65 13.94C10.42 13.96 10.18 13.97 9.94997 13.99C9.90997 13.99 9.86997 14 9.82997 14C9.74997 14 9.66997 14 9.59997 14.01C9.51997 14.02 9.43997 14.03 9.36997 14.04C9.18997 14.07 9.00997 14.08 8.83997 14.14C8.64997 14.2 8.44997 14.23 8.26997 14.33C8.21997 14.36 8.15997 14.37 8.10997 14.39C8.08997 14.4 8.06997 14.41 8.04997 14.42C8.03997 14.43 8.02997 14.45 8.02997 14.47C8.02997 14.48 8.05997 14.49 8.06997 14.49C8.10997 14.49 8.13997 14.5 8.17997 14.51C8.10997 14.54 8.04997 14.56 7.97997 14.59C7.95997 14.6 7.92997 14.62 7.92997 14.64C7.92997 14.68 7.89997 14.68 7.87997 14.7C7.85997 14.72 7.84997 14.74 7.82997 14.76C7.81997 14.78 7.80997 14.81 7.79997 14.84C7.77997 14.89 7.75997 14.94 7.75997 15C7.74997 15.05 7.76997 15.11 7.75997 15.16C7.74997 15.23 7.76997 15.27 7.81997 15.31C7.79997 15.39 7.83997 15.44 7.94997 15.5C7.93997 15.51 7.92997 15.51 7.90997 15.52C7.91997 15.53 7.91997 15.53 7.91997 15.53C7.99997 15.51 8.07997 15.5 8.14997 15.47C8.19997 15.46 8.23997 15.44 8.27997 15.42C8.32997 15.4 8.37997 15.39 8.42997 15.37C8.56997 15.32 8.70997 15.28 8.85997 15.26C8.88997 15.25 8.92997 15.25 8.95997 15.23C8.99997 15.21 9.02997 15.2 9.06997 15.23C9.07997 15.2 9.07997 15.18 9.11997 15.18C9.23997 15.17 9.35997 15.15 9.47997 15.14C9.48997 15.14 9.50997 15.14 9.51997 15.13C9.56997 15.1 9.62997 15.1 9.67997 15.09C9.80997 15.07 9.92997 15.08 10.06 15.06C10.19 15.03 10.32 15.03 10.46 15.01C10.52 15 10.58 14.98 10.64 14.98C10.71 14.98 10.79 14.95 10.86 14.99H10.87C10.92 14.98 10.98 14.98 11.03 14.97C11.13 14.96 11.22 14.94 11.32 14.93C11.58 14.92 11.84 14.91 12.1 14.91C12.17 14.91 12.24 14.91 12.31 14.92C12.35 14.92 12.36 14.93 12.4 14.9C12.38 14.9 12.36 14.9 12.34 14.9C12.28 14.9 12.22 14.89 12.16 14.89C12.11 14.89 12.07 14.88 12.02 14.88C11.97 14.88 11.93 14.88 11.88 14.89C11.81 14.9 11.74 14.89 11.67 14.89C11.66 14.89 11.64 14.88 11.63 14.87C11.61 14.86 11.59 14.86 11.57 14.87C11.56 14.88 11.55 14.89 11.55 14.9C11.5 14.9 11.46 14.89 11.42 14.89C11.38 14.9 11.34 14.93 11.29 14.9C11.16 14.91 11.03 14.91 10.9 14.92C10.81 14.93 10.72 14.96 10.63 14.95C10.55 14.94 10.47 14.96 10.38 14.97C10.34 14.97 10.31 14.97 10.26 14.97C10.27 14.95 10.28 14.94 10.28 14.94C10.33 14.95 10.37 14.91 10.42 14.9C10.46 14.89 10.5 14.88 10.54 14.87C10.55 14.87 10.55 14.86 10.58 14.85C10.54 14.84 10.51 14.84 10.49 14.84V14.83C10.64 14.81 10.78 14.8 10.93 14.78C10.88 14.77 10.83 14.78 10.79 14.78C10.74 14.78 10.7 14.79 10.65 14.79C10.61 14.79 10.56 14.78 10.52 14.77C10.53 14.76 10.53 14.76 10.54 14.76C10.64 14.74 10.74 14.73 10.84 14.75C10.86 14.75 10.87 14.75 10.89 14.75C11.02 14.74 11.15 14.72 11.27 14.71C11.27 14.71 11.27 14.71 11.28 14.71C11.37 14.72 11.46 14.71 11.55 14.7C11.6 14.69 11.65 14.69 11.71 14.68C11.69 14.67 11.68 14.66 11.66 14.65C11.72 14.65 11.77 14.64 11.83 14.64C11.88 14.64 11.94 14.63 11.99 14.65C11.92 14.65 11.85 14.66 11.78 14.66C11.78 14.67 11.78 14.67 11.78 14.68H12.25V14.67C12.23 14.67 12.21 14.67 12.19 14.66C12.29 14.63 12.38 14.64 12.47 14.66C12.45 14.67 12.43 14.67 12.41 14.68C12.41 14.68 12.41 14.68 12.41 14.69C12.49 14.69 12.57 14.69 12.65 14.7C12.65 14.7 12.65 14.7 12.65 14.69C12.61 14.68 12.56 14.68 12.52 14.67V14.66C12.63 14.66 12.74 14.66 12.86 14.66C12.86 14.69 12.87 14.71 12.9 14.71C12.98 14.71 13.06 14.71 13.14 14.71C13.12 14.7 13.1 14.7 13.08 14.69C13.11 14.69 13.14 14.69 13.17 14.69C13.17 14.7 13.17 14.7 13.17 14.7C13.16 14.7 13.14 14.71 13.13 14.71C13.23 14.74 13.39 14.75 13.47 14.72C13.45 14.71 13.43 14.71 13.41 14.7C13.44 14.69 13.47 14.69 13.5 14.7C13.62 14.71 13.74 14.73 13.86 14.73C14.08 14.74 14.3 14.76 14.52 14.78C14.53 14.78 14.54 14.79 14.55 14.79C14.68 14.8 14.8 14.81 14.93 14.81C14.98 14.81 15.02 14.84 15.06 14.84V14.85C15 14.85 14.94 14.86 14.87 14.86C14.95 14.92 15.05 14.9 15.13 14.92C15.42 14.96 15.72 14.98 16.01 15.01C16.01 15 16.01 15 16.01 14.99C15.98 14.99 15.96 14.98 15.93 14.98C15.84 14.96 15.75 14.94 15.66 14.93H15.65C15.64 14.9 15.61 14.9 15.59 14.92C15.57 14.93 15.55 14.88 15.54 14.92C15.5 14.92 15.45 14.92 15.41 14.92C15.37 14.92 15.34 14.9 15.3 14.89C15.25 14.88 15.21 14.88 15.16 14.87C15.18 14.86 15.19 14.84 15.21 14.83C15.25 14.84 15.3 14.84 15.34 14.85C15.53 14.88 15.73 14.9 15.92 14.93C15.94 14.93 15.97 14.95 15.99 14.96C16 14.96 16.01 14.97 16.01 14.97C16.06 14.95 16.11 14.98 16.15 15C16.16 15.01 16.18 15.01 16.19 15.01C16.23 15.01 16.27 15.01 16.31 15.01C16.35 15.01 16.37 15 16.37 14.96C16.42 14.97 16.46 14.98 16.51 14.99C16.5 14.98 16.49 14.97 16.49 14.97C16.45 14.95 16.16 14.9 16.12 14.9C16.11 14.9 16.08 14.9 16.08 14.89C16.06 14.84 16.01 14.86 15.98 14.82C16.13 14.84 16.28 14.86 16.43 14.88C16.43 14.86 16.42 14.84 16.4 14.82C16.44 14.82 16.48 14.82 16.51 14.83C16.54 14.83 16.58 14.86 16.62 14.82C16.61 14.78 16.58 14.77 16.56 14.76Z" fill="#000"/><path d="M12.04 14.6899C12.03 14.6899 12.01 14.6899 12 14.6899V14.6999C12.02 14.6999 12.03 14.6999 12.04 14.6899C12.04 14.6999 12.04 14.6999 12.04 14.6899Z" fill="#000"/><path d="M11.1201 14.14C11.1501 14.14 11.1901 14.13 11.2201 14.13C11.2201 14.12 11.2201 14.11 11.2201 14.1L11.2101 14.09C11.1801 14.1 11.1501 14.12 11.1201 14.14C11.1201 14.14 11.1201 14.13 11.1201 14.14Z" fill="#000"/><path d="M11.97 14.1C11.96 14.09 11.95 14.09 11.95 14.1C11.95 14.1 11.96 14.1 11.97 14.1Z" fill="#000"/><path d="M14.27 14.1C14.33 14.12 14.38 14.12 14.44 14.12C14.38 14.06 14.32 14.05 14.27 14.1Z" fill="#000"/><path d="M13.59 13.96C13.57 13.96 13.56 13.97 13.54 13.97C13.54 13.98 13.54 13.98 13.54 13.99C13.56 13.99 13.57 13.98 13.59 13.98C13.59 13.97 13.59 13.97 13.59 13.96Z" fill="#000"/><path d="M14.1701 14.01C14.1501 14.01 14.1201 14.01 14.1001 14.01C14.1001 14.02 14.1001 14.02 14.1001 14.02C14.1201 14.02 14.1501 14.02 14.1701 14.02C14.1701 14.02 14.1701 14.02 14.1701 14.01Z" fill="#000"/><path d="M11.06 14.7C11.04 14.72 11.03 14.74 11.02 14.75C11.02 14.75 11.02 14.76 11.03 14.76C11.05 14.76 11.08 14.75 11.09 14.75C11.08 14.74 11.08 14.73 11.06 14.7Z" fill="#000"/><path d="M11.18 14.79C11.14 14.79 11.1 14.8 11.06 14.8C11.04 14.8 11.02 14.81 11 14.81C10.92 14.79 10.83 14.8 10.75 14.81C10.73 14.81 10.72 14.82 10.7 14.82C10.71 14.83 10.72 14.84 10.73 14.84C10.77 14.84 10.81 14.82 10.84 14.85L10.85 14.84C10.86 14.84 10.88 14.83 10.89 14.83C10.93 14.88 10.98 14.86 11.03 14.85C11.01 14.84 10.99 14.83 10.97 14.82C11.04 14.81 11.11 14.8 11.18 14.8C11.18 14.8 11.18 14.8 11.18 14.79Z" fill="#000"/><path d="M20.53 5.4C21.41 5.4 22.13 6.12 22.13 7V17C22.13 17.88 21.41 18.6 20.53 18.6H3.46997C2.58997 18.6 1.86997 17.88 1.86997 17V7C1.86997 6.12 2.58997 5.4 3.46997 5.4H20.53ZM20.53 4H3.46997C1.80997 4 0.469971 5.34 0.469971 7V17C0.469971 18.66 1.80997 20 3.46997 20H20.53C22.19 20 23.53 18.66 23.53 17V7C23.53 5.34 22.19 4 20.53 4Z" fill="#000"/></g><defs><clipPath id="clip0_9_351"><rect width="24" height="24" fill="#000"/></clipPath></defs></svg>									
									<span>Become a VIP.ME and 15% off your order</span>
								</a>
								<a href="/uk/our-cocoa-manifesto.html" class="header-bar__item__Delivery__link">
									<svg width="24" height="24" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.2101 4.01995C19.6201 1.42995 12.6401 2.39995 7.52007 7.51995C2.40007 12.6399 1.43007 19.6199 4.02007 22.2099C4.79007 22.9799 6.21007 23.3999 7.95007 23.3999C11.1601 23.3999 15.4501 21.9699 18.7101 18.7099C23.7301 13.6899 24.4201 6.22995 22.2101 4.01995ZM15.4601 15.4599C11.2501 19.6699 7.44007 21.5499 5.75007 21.4699L21.4701 5.73995C21.5501 7.43995 19.6701 11.2399 15.4601 15.4599ZM5.65007 17.4999C6.71007 15.3999 8.52007 13.0099 10.7701 10.7699C13.0201 8.52995 15.4001 6.69995 17.5001 5.64995C18.8001 4.99995 19.7501 4.74995 20.3801 4.74995C20.4201 4.74995 20.4401 4.75995 20.4701 4.75995L4.76007 20.4799C4.73007 19.8499 4.96007 18.8699 5.65007 17.4999ZM8.51007 8.50995C11.4101 5.60995 15.0001 4.13995 17.7401 4.00995C15.2501 5.05995 12.2801 7.26995 9.78007 9.76995C7.43007 12.1199 5.52007 14.6399 4.40007 16.8599C4.25007 17.1499 4.13007 17.4299 4.01007 17.7099C4.14007 14.9799 5.61007 11.3999 8.51007 8.50995ZM17.7201 17.7199C15.1501 20.2899 11.8301 21.5699 9.18007 21.8999C11.5201 20.7599 14.1801 18.7299 16.4501 16.4499C18.7301 14.1699 20.7601 11.5199 21.9001 9.17995C21.5701 11.8299 20.2801 15.1499 17.7201 17.7199Z" fill="#000"/></svg>
									<span>More cacao, less sugar</span>
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
						// "https://blcro.fra1.digitaloceanspaces.com/HC146%2Fnew_hotel_chocolat.png";
						"https://www.hotelchocolat.com/on/demandware.static/-/Sites/default/dw3c0c5316/websiteLogo/new-logo.svg"
				} else {
					item.src =
						// "https://blcro.fra1.digitaloceanspaces.com/HC146%2Fnew_hotel_chocolat_mobile.png";
						"https://www.hotelchocolat.com/on/demandware.static/-/Sites/default/dw45eb2702/websiteLogo/logo-mobile.svg"
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
					".header-utility-menu.rightum #my-account-dropdown a",
				],
				() => {
					const cartContainer = document.querySelector(
						".header-utility-menu.rightum #mini-cart a"
					);
					cartContainer.insertAdjacentHTML(
						"afterbegin",
						// `<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2Fbag.svg" alt="Shopping Bag Icon" />`
						`<img src="https://blcro.fra1.digitaloceanspaces.com/HC146/bag-white.svg" alt="Shopping Bag Icon" />`
					);
					const myAccount = document.querySelector(
						".header-utility-menu.rightum #my-account-dropdown a"
					);
					myAccount.innerHTML = `<img src="https://blcro.fra1.digitaloceanspaces.com/HC146/account-white.svg" alt="User Icon" />`;

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

					if(window.outerWidth < 767) {
						document.body.addEventListener("click", (e) => {
							if (e.target.closest('.hover-drop-down') && !e.target.closest('.drop-down-options.menu-wrapper')) {
								if (e.target.closest('.hover-drop-down').classList.contains('hover') && e.target.closest('.hover-drop-down').id !== 'my-account-dropdown') {
									overlay.classList.remove("show-overlay");
									document.getElementById('hamburger-menu').classList.remove('hover');
								}
							}
						});
					}
					
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
		
			setTimeout(() => {
				document.querySelector(`.${ID}-header-bar .usp-slider-container`).classList.remove("initially-hidden");
			}, 1000)

		});
		if (window.innerWidth < 768) {
			pollerLite(['#header-search', '.header-utility-menu.rightum'], () => {
				document.querySelector("#main-header .hlp-centered-wrapper").classList.toggle(`${ID}-displayed`);
				document.querySelector('#main-header').classList.toggle(`${ID}-search-displayed`);

				let headerSearch = document.querySelector('.header-search').closest('.hlp-centered-wrapper');
				document.getElementById('main-header').insertAdjacentElement('beforeend', headerSearch);

					
					window.addEventListener('scroll', () => {
						setTimeout(() => {
							if (window.scrollY < 1) {
								document.querySelector("#main-header nav").classList.remove(`isStuck`);
							} else {
								if(!document.querySelector("#main-header nav").classList.contains(`isStuck`)) {
									document.querySelector("#main-header nav").classList.add(`isStuck`);
								}
								
							}
						}, 1);
						
						
					})

			});
		}

		pollerLite(["#hamburger-menu"], () => {
			const menuAnchor = document.querySelector(
				"#hamburger-menu a.menu-title"
			);
			menuAnchor.insertAdjacentHTML(
				"afterbegin",
				// `<img src="https://blcro.fra1.digitaloceanspaces.com/HC146%2FMenu.svg" alt="Menu Icon" class="icon menu-icon" />`
				`<img src="https://blcro.fra1.digitaloceanspaces.com/HC146/menuIcon-white.svg" alt="Menu Icon" class="icon menu-icon" />`
			);

			pollerLite([() => window.jQuery, 
				() => {

					if(document.querySelector("#hamburger-menu .drop-down-options.menu-wrapper .main-navigation").hasAttribute('style')) {
						return true;
					}

				}
			], () => {
				setTimeout(() => {
					const menuContainer = document.querySelector(
						"#hamburger-menu .drop-down-options.menu-wrapper .main-navigation"
					);

					let currMaxHeight = menuContainer.getAttribute("style");
					if (currMaxHeight) {
						let height = currMaxHeight.replace('max-height: ', '').replace('px;', '');
						height = parseInt(height);
						height = height - 50;
						menuContainer.setAttribute("style", `max-height: ${height}px;`);
					}

					// $(menuContainer)?.slick && $(menuContainer)?.slick("unslick");
					// menuContainer.classList.add("slick-destroyed");
				}, 500);
				window.addEventListener("resize", () => {
					setTimeout(() => {
						// const menuContainer = document.querySelector(
						// 	"#hamburger-menu .drop-down-options.menu-wrapper .main-navigation"
						// );

						// $(menuContainer).slick &&
						// 	$(menuContainer).slick("unslick");
						// menuContainer.classList.add("slick-destroyed");
					}, 500);
				});
			});

			const hamBurgerMenu = document.querySelector("#hamburger-menu");
			const myAccountDropdownObserver = new MutationObserver(
				(mutations) => {
					mutations.forEach((mutation) => {
						if (mutation.type === "attributes") {
							if (mutation.target.classList.contains("hover")) {
								const headerHeight = document.querySelector("#main-header").offsetHeight;
								const desktopNavigationHeight =	document.querySelector("#desktop-navigation").offsetHeight;
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
