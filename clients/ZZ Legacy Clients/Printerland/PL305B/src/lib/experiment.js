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
	setup();

	fireEvent("Conditions Met");

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
	const config = { attributes: false, childList: true, subtree: true };
	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...

	pollerLite([".header__middle.view-mobile-only"], () => {
		const mobSearchBtn = document.querySelector(
			".header__middle .middle__inner .js-mob-search-btn"
		);
		if (mobSearchBtn) {
			mobSearchBtn.addEventListener("click", (e) => {
				mobSearchBtn
					.closest("header")
					?.classList.add("mobile-predictive-search");
				document.body.classList.add(`${ID}-show`);
			});
		}
		const closeBtn = document.querySelector(".mobile__menu .hamburger");
		closeBtn?.addEventListener("click", (e) => {
			mobSearchBtn
				.closest("header")
				?.classList.remove("mobile-predictive-search");
			if (
				headerTopContainer.parentNode.querySelector(
					"div.new-results-container"
				)
			) {
				headerTopContainer.parentNode
					.querySelector("div.new-results-container")
					.remove();
			}
			document.body.classList.remove(`${ID}-show`);
		});

		const searchInput = document.querySelector(
			"#search .ais-SearchBox-input"
		);
		const headerTopContainer = document.querySelector(
			"div.header-top-container"
		);

		const resultsContainer = document.querySelector("#aisSearchContainer");
		const generateNewSearchContent = (mutationsList, observer) => {
			if (resultsContainer.classList.contains("active")) {
				var searchItems =
					resultsContainer.querySelectorAll("a.ais-Cat-click");
				var content = document.createElement("div");
				content.classList.add("new-results-container");
				if (searchItems.length > 0) {
					searchItems.forEach((item) => {
						const newNode = item.cloneNode(true);
						newNode.addEventListener("click", (e) => {
							fireEvent(
								`Click - User clicked on quick link - ${item.getAttribute(
									"href"
								)}`
							);
						});
						content.append(newNode);
					});
					if (
						headerTopContainer.parentNode.querySelector(
							"div.new-results-container"
						)
					) {
						headerTopContainer.parentNode
							.querySelector("div.new-results-container")
							.remove();
					}
					headerTopContainer.parentNode.append(content);
					if (
						VARIATION == 1 &&
						document.querySelector(".al-search")
					) {
						document.querySelector(".al-search").style.top =
							headerTopContainer.parentNode.getBoundingClientRect()
								.height -
							25 +
							"px";
					}
				} else if (resultsContainer.querySelector(".ais-Hits--empty")) {
					if (
						headerTopContainer.parentNode.querySelector(
							"div.new-results-container"
						)
					) {
						headerTopContainer.parentNode
							.querySelector("div.new-results-container")
							.remove();
					}
					if (
						VARIATION == 1 &&
						document.querySelector(".al-search")
					) {
						document.querySelector(".al-search").style.top =
							headerTopContainer.parentNode.getBoundingClientRect()
								.height -
							25 +
							"px";
					}
				}
			} else {
				if (
					headerTopContainer.parentNode.querySelector(
						"div.new-results-container"
					)
				) {
					headerTopContainer.parentNode
						.querySelector("div.new-results-container")
						.remove();
				}
				if (VARIATION == 1 && document.querySelector(".al-search")) {
					document
						.querySelector(".al-search")
						.setAttribute("style", "");
				}
				headerTopContainer.parentNode.classList.remove(
					"show-searchbar-redesign"
				);
			}
		};

		const observer = new MutationObserver(generateNewSearchContent);
		searchInput?.addEventListener("click", (e) => {
			fireEvent(`Click - User clicked search bar`);
		});
		searchInput?.addEventListener("keyup", (e) => {
			if (e.target.value != "") {
				headerTopContainer.parentNode.classList.add(
					"show-searchbar-redesign"
				);
				observer.observe(resultsContainer, config);
				fireEvent(`Typed - User typed "${e.target.value}" to search`);
			} else {
				if (
					headerTopContainer.parentNode.querySelector(
						"div.new-results-container"
					)
				) {
					headerTopContainer.parentNode
						.querySelector("div.new-results-container")
						.remove();
				}
				headerTopContainer.parentNode.classList.remove(
					"show-searchbar-redesign"
				);
				if (VARIATION == 1 && document.querySelector(".al-search")) {
					document
						.querySelector(".al-search")
						.setAttribute("style", "");
				}
			}
		});
	});
};
