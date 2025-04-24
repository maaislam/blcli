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
import { pollerLite, events } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	console.log('HS464')
	newEvents.initiate = true;
	newEvents.methods = ["ga4"];
	newEvents.property = "G-69ML6JH4G6";
	setup();

	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
	// -----------------------------
	// ...

	if (location.href.includes("hss.com/hire/p/")) {
		fireEvent("View - User viewed product page");
		pollerLite([`.checkout_main`], () => {
			const checkout_main = document.querySelector(`.checkout_main`);
			checkout_main.addEventListener("click", (e) => {
				if (e.target.closest("button#popUpAddToCart")) {
					fireEvent("Click - User clicked on Add to Basket");
				}
			});
		});
	}

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (VARIATION == "control") {
		if (location.pathname === "/hire" || location.pathname === "/hire/") {
			pollerLite([`#content`], () => {
				const inputBox = document.querySelector(`input#search`);
				inputBox.addEventListener("focus", () => {
					fireEvent("Click - Search Bar");
				});
			});

			pollerLite(
				[
					`#menu`,
					`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout .klevuWrap`,
				],
				() => {
					const searchResultsContainerClick = document.querySelector(
						`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout`
					);
					searchResultsContainerClick?.addEventListener(
						"click",
						(e) => {
							if (e.target.closest("a")) {
								fireEvent("Click - Search Result Clicked");
							}
						}
					);
				}
			);

			pollerLite(
				[`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout`],
				() => {
					const searchResultsContainer = document.querySelector(
						`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout`
					);
					let isShownR = false;
					const observer = new MutationObserver(
						(mutations, observer) => {
							const isShown =
								searchResultsContainer
									.getAttribute("style")
									.indexOf("none") === -1
									? true
									: false;
							if (isShown) {
								if (!isShownR) {
									fireEvent("In View - Search Results");
									isShownR = true;
								}
							} else {
								isShownR = false;
							}
						}
					);
					observer.observe(searchResultsContainer, {
						attributes: true,
						childList: false,
						subtree: false,
					});
				}
			);
		}
		return;
	}

	// -----------------------------
	// Write experiment code here
	// -----------------------------
	// ...
	if (location.pathname === "/hire" || location.pathname === "/hire/") {
		pollerLite([`#content`], () => {
			if (!document.querySelector(`.${ID}-top-banner`)) {
				const topBanner = `<div class="${ID}-top-banner">
                          	<div class="${ID}-top-banner__inner">
                              
                          	</div>

						  	<div class="${ID}-top-banner__searchBox">
								<h3>Find what you need with ease</h3>
							</div>
                      </div>`;
				const contentContainer = document.querySelector("#content");
				contentContainer.insertAdjacentHTML("afterbegin", topBanner);

				pollerLite(
					[
						"#globalMessages",
						() => document.readyState == "complete",
					],
					() => {
						const globalMessages =
							document.querySelector("#globalMessages");
						contentContainer.prepend(globalMessages);

						if (globalMessages.innerHTML.trim() !== "") {
							document
								.querySelector(`.${ID}-top-banner`)
								.classList.add("has-global-messages");
						} else {
							document
								.querySelector(`.${ID}-top-banner`)
								.classList.remove("has-global-messages");
						}
					}
				);

				const otherBanner = document.querySelector(
					`#content .${ID}-top-banner`
				);

				const searchBox = document.querySelector(
					`.siteSearch.search.search_box`
				);

				otherBanner
					.querySelector(`.${ID}-top-banner__searchBox`)
					.append(searchBox);

				pollerLite([`.container.trust-pilot-overall-wrapper`], () => {
					const trustPilotBanner = document.querySelector(
						`.container.trust-pilot-overall-wrapper`
					);
					document
						.querySelector(".first-skinny-banner")
						.insertAdjacentElement("afterend", trustPilotBanner);
				});

				pollerLite([`input#search`], () => {
					document
						.querySelector(`input#search`)
						.setAttribute("placeholder", "I’m looking to hire…");

					let counter = 0;

					const placeHolderInterval = setInterval(() => {
						if (
							document
								.querySelector(`input#search`)
								.getAttribute("placeholder")
								.trim() !== "I’m looking to hire…"
						) {
							document
								.querySelector(`input#search`)
								.setAttribute(
									"placeholder",
									"I’m looking to hire…"
								);
						}
						counter++;
						if (counter > 4) {
							clearInterval(placeHolderInterval);
						}
					}, 500);
				});

				pollerLite(
					[
						`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout`,
					],
					() => {
						const input = document.querySelector(`input#search`);
						const searchResultsContainer = document.querySelector(
							`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout`
						);
						let isShownR = false;
						const observer = new MutationObserver(
							(mutations, observer) => {
								const isShown =
									searchResultsContainer
										.getAttribute("style")
										.indexOf("none") === -1
										? true
										: false;
								if (
									isShown &&
									(input.value != null || input.value != "")
								) {
									searchBox.classList.add("focused");
									otherBanner.classList.add("active");
									if (!isShownR) {
										fireEvent("In View - Search Results");
										isShownR = true;
									}
								} else {
									searchBox.classList.remove("focused");
									otherBanner.classList.remove("active");
									isShownR = false;
								}
							}
						);
						observer.observe(searchResultsContainer, {
							attributes: true,
							childList: false,
							subtree: false,
						});
					}
				);

				const inputBox = document.querySelector(`input#search`);
				inputBox.addEventListener("focus", () => {
					fireEvent("Click - Search Bar");
					searchBox.classList.add("focused");
					otherBanner.classList.add("active");
				});

				pollerLite(
					[
						`#menu`,
						`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout .klevuWrap`,
					],
					() => {
						const searchResultsContainerClick =
							document.querySelector(
								`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout`
							);
						searchResultsContainerClick?.addEventListener(
							"click",
							(e) => {
								if (e.target.closest("a")) {
									fireEvent("Click - Search Result Clicked");
								}
							}
						);

						const suggestions = document.querySelector(
							`.klevu-fluid.klevuTarget.kuQuickSearchAutoCompleteLayout .klevuWrap`
						);
						const siteSearch = document.querySelector(
							`.${ID}-top-banner__searchBox div.siteSearch`
						);
						siteSearch.append(suggestions.parentElement);
					}
				);

				pollerLite(
					[
						`.center_block .header_right_section .top`,
						`.center_block .header_right_section .bottom`,
					],
					() => {
						const topIncExcvat = document.querySelector(
							`.center_block .header_right_section .top .topIncExcvat`
						);

						const bottomRef = document.querySelector(
							`.center_block .header_right_section .bottom .clear`
						);

						bottomRef.insertAdjacentElement(
							"beforebegin",
							topIncExcvat
						);
					}
				);

				$("div#menu ul#nav > li").removeClass("menuAction");
			}
		});
	} else if (location.pathname.includes("/hire/p") || location.pathname.includes("/hire/p/")){
		pollerLite([`#main`], () => {
			console.log('HS464 - product page')
			const html = document.querySelector(`html`);
			html.classList.remove(`${ID}`)
			html.classList.remove(`${ID}-1`)

		});
	}
};
