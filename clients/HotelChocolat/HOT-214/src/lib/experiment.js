/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	const isCheckoutPage = location.pathname.includes("/checkout");
	if (!isCheckoutPage) {
		setup();
		fireEvent("Conditions Met");
	}

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

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
	if (!isCheckoutPage) {
		pollerLite(["#navigation", "#main-header"], () => {
			const navBar = document.querySelector("#navigation");
			navBar
				.querySelector(".icon.pin")
				?.closest(".mb-grid-item")
				?.classList.add("location-item");
			const mainHeader = document.querySelector("#main-header");
			mainHeader
				?.querySelector("div.hlp-centered-wrapper")
				?.classList.add("main-search-wrapper");
			const imageUrl = mainHeader.querySelector(
				".primary-logo .icon.logo-mobile"
			);

			const content = `<div class="mb-grid-item new-logo-centered">
						  <a class="white-hover" href="/uk">
							  <img alt="Logo" src="${imageUrl?.src}"/>
						  </a>
						</div>`;
			navBar
				.querySelector(".mb-grid-item.help-nav")
				?.insertAdjacentHTML("afterend", content);
			mainHeader?.insertAdjacentElement("afterbegin", navBar);

			const links = navBar.querySelectorAll("a.white-hover");
			if (links.length > 0) {
				links.forEach((item) => {
					item.addEventListener("click", () => {
						fireEvent(
							`User clicks on navigation item ${
								item.innerText.trim()
									? item.innerText.trim()
									: item.getAttribute("href")
							}`
						);
					});
				});
			}

			const toggleMenu = document.querySelector(
				"#hamburger-menu a.menu-toggle"
			);
			toggleMenu.addEventListener("touchstart", (e) => {
				fireEvent(`User clicks on navigation item menu-toggle`);
			});

			var lastScrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			let stickyMenuScrollPixelVal = 10;
			window.onscroll = function (e) {
				var st =
					window.pageYOffset || document.documentElement.scrollTop;
				let stickyMenuScrollTopOffset = document
					.querySelector("#header-search")
					?.getBoundingClientRect().bottom;
				if (st < stickyMenuScrollTopOffset) {
					document.body.classList.remove(`${ID}-search-bar-shown`);
					document.body.classList.remove(`${ID}-search-bar-hidden`);
				} else if (
					st > 10 &&
					st > lastScrollTop + stickyMenuScrollPixelVal
				) {
					document.body.classList.remove(`${ID}-search-bar-shown`);
					document.body.classList.add(`${ID}-search-bar-hidden`);
					lastScrollTop = st;
				} else if (lastScrollTop > st + stickyMenuScrollPixelVal) {
					document.body.classList.add(`${ID}-search-bar-shown`);
					document.body.classList.remove(`${ID}-search-bar-hidden`);
					lastScrollTop = st;
				}
				lastScrollTop = st <= 0 ? 0 : st;
			};
		});
	}
};
