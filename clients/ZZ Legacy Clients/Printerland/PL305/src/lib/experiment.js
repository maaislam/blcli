/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { poller, pollerLite } from "../../../../../lib/utils";

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

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
	document.body.classList.add(`${ID}`);
	const config = { attributes: false, childList: true, subtree: true };

	pollerLite(["header", "#search .ais-SearchBox-input"], () => {
		const searchInput = document.querySelector(
			"#search .ais-SearchBox-input"
		);
		const headerTopContainer = document.querySelector(
			"div.header-top-container"
		);
		headerTopContainer.parentNode.classList.add("searchbar-redesign");

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
						headerTopContainer.querySelector(
							"div.new-results-container"
						)
					) {
						headerTopContainer
							.querySelector("div.new-results-container")
							.remove();
					}
					headerTopContainer.append(content);
				} else if (resultsContainer.querySelector(".ais-Hits--empty")) {
					if (
						headerTopContainer.querySelector(
							"div.new-results-container"
						)
					) {
						headerTopContainer
							.querySelector("div.new-results-container")
							.remove();
					}
				}
			} else {
				if (
					headerTopContainer.querySelector(
						"div.new-results-container"
					)
				) {
					headerTopContainer
						.querySelector("div.new-results-container")
						.remove();
				}
				headerTopContainer.parentNode.classList.remove(
					"show-searchbar-redesign"
				);
				if (document.querySelector("button.predictive-search-reset")) {
					document
						.querySelector("button.predictive-search-reset")
						.remove();
				}
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

				if (!document.querySelector("button.predictive-search-reset")) {
					const reserBtn = document.querySelector(
						"#search button.ais-SearchBox-reset"
					);
					const newResetBtn = reserBtn.cloneNode(true);
					newResetBtn.classList.remove("ais-SearchBox-reset");
					newResetBtn.classList.add("predictive-search-reset");
					newResetBtn.addEventListener("click", (e) => {
						reserBtn.click();
					});
					headerTopContainer.parentNode.append(newResetBtn);
				}
				fireEvent(`Typed - User typed "${e.target.value}" to search`);
			} else {
				if (
					headerTopContainer.querySelector(
						"div.new-results-container"
					)
				) {
					headerTopContainer
						.querySelector("div.new-results-container")
						.remove();
				}
				headerTopContainer.parentNode.classList.remove(
					"show-searchbar-redesign"
				);
				if (document.querySelector("button.predictive-search-reset")) {
					document
						.querySelector("button.predictive-search-reset")
						.remove();
				}
			}
		});
	});
};
