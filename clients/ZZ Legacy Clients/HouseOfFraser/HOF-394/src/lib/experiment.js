/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, pollerLite } from "../../../../../lib/utils";
import { fetchBrands } from "./fetchBrands";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;

export default () => {
	setup();
	fireEvent("Conditions Met");

	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...
	document.querySelector("input#txtSearch").addEventListener("input", (e) => {
		fireEvent(`Click - user interacts with Search`);
	});

	const isPLP = () => {
		return document.querySelector("#productlistcontainer #navlist");
	};

	if (isPLP()) {
		fireEvent(
			`User reaches PLP - ${window.location.pathname} -- from variation=${VARIATION}`
		);
	}

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	document.querySelector("body").classList.add(`${ID}__body`);
	document.querySelector(`.header-overlay`).classList.add(`${ID}__overlay`);
	document
		.querySelector(`.${ID}__body .col-md-4.hidden-xs.hidden-sm.headerLeft`)
		.classList.add("dvSearchCss");
	var isSafari =
		navigator.vendor &&
		navigator.vendor.indexOf("Apple") > -1 &&
		navigator.userAgent &&
		navigator.userAgent.indexOf("CriOS") == -1 &&
		navigator.userAgent.indexOf("FxiOS") == -1;
	const searchInput = document.getElementById("txtSearch");

	if (searchInput) {
		searchInput.classList.add("txtSearchCss");
		//let placeHolder = searchInput.getAttribute("placeholder");
		searchInput.addEventListener("focus", (e) => {
			//searchInput.setAttribute("placeholder", "")
			document.body.classList.add("searchFocusBody");
		});
		searchInput.addEventListener("blur", (e) => {
			//searchInput.setAttribute("placeholder", placeHolder.trim());
			var scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;
			var main = document.querySelector("#BodyWrap");
			if (scrollTop > 1 && main) {
				main.classList.remove("menu-search-hidden");
				main.classList.add("headerFix");
				main.classList.add("menu-search-shown");
			}
			document.body.classList.remove("searchFocusBody");
		});
	}
	document.getElementById("cmdSearch").classList.add("cmdSearchCss");

	pollerLite(["#topMenu", "#logoContainer", ".MenuSearchContainer"], () => {
		const firstMenu = document.querySelector(
			"#topMenu .RootGroup li.root:first-child"
		);
		const lastMenu = document.querySelector(
			"#topMenu .RootGroup li.root:last-child"
		);
		const logo = document.querySelector("#logoContainer .LogoWrap a");
		const MenuSearchContainer = document.querySelector(
			".MenuSearchContainer"
		);
		let leftPad =
			(firstMenu.getBoundingClientRect().width - 72) / 2 +
			firstMenu.getBoundingClientRect().x;
		let rightPad =
			(lastMenu.getBoundingClientRect().width - 66) / 2 +
			firstMenu.getBoundingClientRect().x;
		if (isSafari) {
			leftPad = leftPad - 100;
		}
		if (window.innerWidth > 1920) {
			leftPad = leftPad - (window.innerWidth - 1920) / 2;
			rightPad = rightPad - (window.innerWidth - 1920) / 2;
		}
		logo.style.paddingLeft = leftPad + "px";
		MenuSearchContainer.style.paddingRight = rightPad + "px";
	});

	pollerLite(["#ui-id-1"], () => {
		const autoComplete = document.getElementById("ui-id-1");
		autoComplete.classList.add("uiIdCss");
		const config = { attributes: false, childList: true, subtree: true };
		let linkInsertionPoint;
		fetchBrands().then((data) => {
			let brandData = data;
			if (brandData.length > 0) {
				linkInsertionPoint = document.createElement("div");
				linkInsertionPoint.classList.add(`${ID}-suggestedItems`);

				linkInsertionPoint.insertAdjacentHTML(
					"beforeend",
					`<div class="${ID}-suggeted-separator"></div>`
				);
				linkInsertionPoint.insertAdjacentHTML(
					"beforeend",
					`<h3 class="${ID}-suggeted-title">SUGGESTED FOR YOU</h3>`
				);
				let linkContainer = document.createElement("div");
				linkContainer.classList.add(`${ID}-link-container`);
				[].slice.call(brandData).forEach((item) => {
					let linkURL = item[0].toLowerCase();
					linkURL = linkURL.replaceAll(" ", "-");
					let linkHTML = `<a href="/brand/${linkURL}">${item[0]}</a>`;
					linkContainer.insertAdjacentHTML("beforeend", linkHTML);
				});
				linkInsertionPoint.appendChild(linkContainer);

				autoComplete.appendChild(linkInsertionPoint);
			}
			const conatiner = document.querySelector(
				`.${ID}__body .col-md-4.hidden-xs.hidden-sm.headerLeft .dvSearch`
			);
			conatiner.appendChild(autoComplete);
			const callback = function (mutationsList, observer) {
				observer.disconnect();
				autoComplete.appendChild(linkInsertionPoint);
				conatiner.appendChild(autoComplete);
				observer.observe(autoComplete, config);
			};

			const observer = new MutationObserver(callback);
			observer.observe(autoComplete, config);
		});
	});

	window.addEventListener("resize", (e) => {
		var menu1 = document.querySelector(
			"#topMenu .RootGroup li.root:first-child"
		);
		var menu2 = document.querySelector(
			"#topMenu .RootGroup li.root:last-child"
		);
		const logo = document.querySelector("#logoContainer .LogoWrap a");
		const MenuSearchContainer = document.querySelector(
			".MenuSearchContainer"
		);
		let leftPad =
			(menu1.getBoundingClientRect().width - 72) / 2 +
			menu1.getBoundingClientRect().x;
		let rightPad =
			(menu2.getBoundingClientRect().width - 66) / 2 +
			menu1.getBoundingClientRect().x;
		if (isSafari) {
			leftPad = leftPad - 100;
		}
		if (window.innerWidth > 1920) {
			leftPad = leftPad - (window.innerWidth - 1920) / 2;
			rightPad = rightPad - (window.innerWidth - 1920) / 2;
		}
		logo.style.paddingLeft = leftPad + "px";
		MenuSearchContainer.style.paddingRight = rightPad + "px";
	});

	document
		.querySelector(".ToplinksGroup .search .dvSearch")
		.addEventListener("click", (e) => {
			e.stopPropagation();
			if (
				!e.target.matches("a#cmdSearch") &&
				!e.target.closest("a#cmdSearch")
			) {
				document.querySelector("#txtSearch").focus();
			}
		});
	// window.onscroll = () => {
	// 	top = document.body.scrollTop;
	// 	console.log(top);
	// };
};
