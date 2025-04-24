/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import {
	setup,
	fireEvent,
	newEvents,
} from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	setup();

	logMessage(ID + " Variation: " + VARIATION);

	fireEvent("Conditions Met");
	// Needed for attribution to Adobe Dynamics - do not remove
	document.documentElement.classList.add(
		`experimentation-${
			VARIATION == "control" ? `control` : `variant-${VARIATION}`
		}`
	);
	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(";");
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == " ") c = c.substring(1);
			if (c.indexOf(name) != -1)
				return c.substring(name.length, c.length);
		}
		return "";
	}

	const closeIcon = `<svg class="close-icon" width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M5.50001 6.40253L1.62084 10.2817C1.4757 10.4268 1.29098 10.4994 1.06667 10.4994C0.842369 10.4994 0.657647 10.4268 0.512508 10.2817C0.367369 10.1366 0.2948 9.95184 0.2948 9.72753C0.2948 9.50323 0.367369 9.3185 0.512508 9.17336L4.39168 5.2942L0.512508 1.41503C0.367369 1.26989 0.2948 1.08517 0.2948 0.860864C0.2948 0.636559 0.367369 0.451836 0.512508 0.306697C0.657647 0.161558 0.842369 0.0889893 1.06667 0.0889893C1.29098 0.0889893 1.4757 0.161558 1.62084 0.306697L5.50001 4.18586L9.37918 0.306697C9.52431 0.161558 9.70904 0.0889893 9.93334 0.0889893C10.1576 0.0889893 10.3424 0.161558 10.4875 0.306697C10.6326 0.451836 10.7052 0.636559 10.7052 0.860864C10.7052 1.08517 10.6326 1.26989 10.4875 1.41503L6.60834 5.2942L10.4875 9.17336C10.6326 9.3185 10.7052 9.50323 10.7052 9.72753C10.7052 9.95184 10.6326 10.1366 10.4875 10.2817C10.3424 10.4268 10.1576 10.4994 9.93334 10.4994C9.70904 10.4994 9.52431 10.4268 9.37918 10.2817L5.50001 6.40253Z" fill="#032240"/>
	</svg>
	`;
	const menuIcon = `<svg class="menu-icon" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M3.5 14.9371H17M3.5 9.79422H17M3.5 4.65137H17" stroke="#032240" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>`;

	pollerLite([".main-header section.top-bar"], () => {
		let isFired = false;
		const topBar = document.querySelector(".main-header section.top-bar");
		topBar.addEventListener("touchstart", () => {
			if (!isFired) {
				fireEvent("Click - User clicks on the opening times");
				isFired = true;
			}
		});
	});

	pollerLite([".navigation__wrapper button.navigation__mobile"], () => {
		const mobileMenuButton = document.querySelector(
			".navigation__wrapper button.navigation__mobile"
		);
		if (VARIATION == "1") {
			mobileMenuButton.insertAdjacentHTML(
				"beforeend",
				`<span class="mobile-menu__text">Menu</span>`
			);
		}

		// mobileMenuButton.addEventListener("click", () => {
		// 	const mobileMenuText = document.querySelector(".mobile-menu__text");
		// });

		let isOpen = false;
		const mobileMenuText = document.querySelector(".mobile-menu__text");
		const mobileMenuButtonObserver = new MutationObserver((mutations) => {
			if (VARIATION == "1") {
				if (
					mobileMenuButton.classList.contains(
						"navigation__mobile--is-open"
					)
				) {
					mobileMenuText.textContent = "Close";
				} else {
					mobileMenuText.textContent = "Menu";
				}
			}
			if (
				mobileMenuButton.classList.contains(
					"navigation__mobile--is-open"
				)
			) {
				fireEvent("Click - User clicks to open the menu");
				isOpen = true;
			} else if (
				!mobileMenuButton.classList.contains(
					"navigation__mobile--is-open"
				) &&
				isOpen
			) {
				fireEvent("Click - User clicks to close the menu");
				isOpen = false;
			}
		});
		mobileMenuButtonObserver.observe(mobileMenuButton, {
			attributes: true,
			subtree: false,
			childList: false,
			attributeFilter: ["class"],
		});
	});

	pollerLite(["nav ul.navigation__list"], () => {
		const navigationList = document.querySelector(
			"nav ul.navigation__list"
		);
		navigationList.addEventListener("click", (e) => {
			const target = e.target;
			if (target.closest("a") && target.closest(".navigation__lists")) {
				fireEvent("Click - User clicks on a menu item");
				document.cookie = "navUsed=true; path=/";
			}
		});
	});

	pollerLite(["#er-calculator button[type='submit']"], () => {
		document
			.querySelector("#er-calculator button[type='submit']")
			?.addEventListener("click", (e) => {
				setTimeout(() => {
					if (
						!document.querySelector(".not-found") &&
						window.location.href.indexOf("/results") > -1
					) {
						if (getCookie("navUsed") == "true") {
							if (
								document.querySelector(
									".breadcrumb__text.breadcrumb__text--current"
								)
							) {
								fireEvent(
									`User completes the ${document
										.querySelector(
											".breadcrumb__text.breadcrumb__text--current"
										)
										.textContent.trim()} form`
								);
							} else {
								fireEvent(
									`User completes the equity release form`
								);
							}
						}
					}
				}, 3000);
			});
	});

	pollerLite([".enquiry-page"], () => {
		const enqueryFormSubmitCTA = document.querySelector(
			".enquiry-page .enquriy__form form a.submit-button"
		);
		if (enqueryFormSubmitCTA) {
			enqueryFormSubmitCTA.addEventListener("click", (e) => {
				if (getCookie("navUsed") == "true") {
					setTimeout(() => {
						if (!document.querySelector(".input-error--show")) {
							const domFinderInterbal = setInterval(() => {
								if (
									!document.querySelector(
										".enquiry-page .enquriy__form"
									)
								) {
									fireEvent(
										`User submits ${document
											.querySelector(
												".breadcrumb__text.breadcrumb__text--current"
											)
											.textContent.trim()} form`
									);
									clearInterval(domFinderInterbal);
								}
							}, 500);
						}
					}, 500);
				}
			});
		}
	});
	pollerLite([".mortgage-calculator__form"], () => {
		const enqueryFormSubmitCTA = document.querySelector(
			".mortgage-calculator__form form a.submit-button"
		);
		if (enqueryFormSubmitCTA) {
			enqueryFormSubmitCTA.addEventListener("click", (e) => {
				if (getCookie("navUsed") == "true") {
					setTimeout(() => {
						if (!document.querySelector(".input-error--show")) {
							const domFinderInterbal = setInterval(() => {
								if (
									!document.querySelector(
										".mortgage-calculator__form"
									)
								) {
									fireEvent(
										`User submits ${document
											.querySelector(
												".breadcrumb__text.breadcrumb__text--current"
											)
											.textContent.trim()} form`
									);
									clearInterval(domFinderInterbal);
								}
							}, 500);
						}
					}, 500);
				}
			});
		}
	});

	if (location.pathname == "/mortgages") {
		pollerLite([`a[href="#ll-mortgage-finder"]`], () => {
			const heroContent = document.querySelector(
				`a[href="#ll-mortgage-finder"]`
			);

			heroContent.addEventListener("click", (e) => {
				if (getCookie("navUsed") == "true") {
					fireEvent(
						"Click - User clicks to start the mortgage finder"
					);
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
	pollerLite([".navigation__wrapper button.navigation__mobile"], () => {
		const mobileMenuButton = document.querySelector(
			".navigation__wrapper button.navigation__mobile"
		);
		mobileMenuButton.insertAdjacentHTML("afterbegin", menuIcon);
		mobileMenuButton.insertAdjacentHTML("afterbegin", closeIcon);
	});
};
