/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events, observer, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION } = shared;
let theStickyWrapper;

const startExperiment = () => {
	let newButtonWrapperHTML = `
  
    <div class="${ID}-sticky-wrapper ${ID}-hidden">

      <div class="${ID}-sticky--header">
        <div class="${ID}-sticky--headertitle">
          <h2>My Bag</h2>
        </div>
      </div>
      <div class="${ID}-sticky--button">
        
      </div>

    </div>
  
  
  `;

	if (VARIATION !== "control") {
		let insertionPoint = document.getElementById("buttonWrapperMobile");
		let insertionPosition = "beforebegin";
		if (VARIATION == 2) {
			insertionPoint = document.querySelector("#CartPanel");
			insertionPosition = "afterbegin";
		}
		insertionPoint.insertAdjacentHTML(
			insertionPosition,
			newButtonWrapperHTML
		);

		theStickyWrapper = document.querySelector(`.${ID}-sticky-wrapper`);

		let newWrapperButton = document
			.getElementById("buttonWrapperMobile")
			.querySelector("a");
		newWrapperButton.id = `${ID}-sticky--button`;
		theStickyWrapper
			.querySelector(`.${ID}-sticky--button`)
			.appendChild(newWrapperButton);

		newWrapperButton.addEventListener("click", () => {
			fireEvent(
				`Click - user has clicked on the sticky cart button to continue to checkout`,
				true
			);
		});
		document.documentElement.classList.add(`${ID}-experiment-started`);
		theStickyWrapper.classList.remove(`${ID}-hidden`);

		// get price & num items

		if (VARIATION == 1) {
			window.addEventListener(
				"scroll",
				() => {
					if (
						document
							.getElementById("BodyWrap")
							.classList.contains("menu-search-shown") ||
						window.scrollY < 50
					) {
						theStickyWrapper.classList.remove("header-hidden");
					} else if (
						document
							.getElementById("BodyWrap")
							.classList.contains("menu-search-hidden")
					) {
						theStickyWrapper.classList.add("header-hidden");
					}
				},
				100
			);
		}

		// pollerLite(['#TotalValue', '#SubtotalLabel'], () => {
		//   let theTotalPrice = document.getElementById('TotalValue').innerText;
		//   let theTotalItems = document.getElementById('SubtotalLabel').innerText;

		//   let theStickyTotalPrice = document.getElementById(`${ID}-sticky--totalbasketprice`);
		//   let theAlteredButton = document.getElementById(`${ID}-sticky--button`).querySelector('span');

		//   if (VARIATION !== "control") {
		//     theStickyTotalPrice.innerText = theTotalPrice;
		//     theAlteredButton.innerText = `Continue Securely (${theTotalItems})`;
		//   }

		//   fireEvent(`Interaction - bag was updated, sticky cart wrapper changed`, true);

		// });

		observer.connect(
			document.getElementById("TotalValue"),
			() => {
				let theTotalPrice =
					document.getElementById("TotalValue").innerText;
				let theTotalItems =
					document.getElementById("SubtotalLabel").innerText;

				let theStickyTotalPrice = document.getElementById(
					`${ID}-sticky--totalbasketprice`
				);
				let theAlteredButton = document
					.getElementById(`${ID}-sticky--button`)
					.querySelector("span");

				if (VARIATION !== "control") {
					theStickyTotalPrice.innerText = theTotalPrice;
					theAlteredButton.innerText = `Continue Securely (${theTotalItems})`;
				}
			},
			{ attributes: false, childList: true, subtree: false }
		);
	}

	fireEvent(
		`Visible - sticky cart wrapper ${
			VARIATION == "control" ? "would have been added" : "added"
		} to the page`,
		true
	);

	document.body.addEventListener("click", (e) => {
		if (e.target.closest(".ContinueOn")) {
			fireEvent(
				`Click - user has clicked on the continue shopping button`,
				true
			);
		} else if (e.target.closest('a[data-action="update"]')) {
			fireEvent(
				`Click - user has clicked on the update basket button`,
				true
			);
		} else if (
			e.target.closest(".s-basket-minus-button") ||
			e.target.closest(".s-basket-plus-button")
		) {
			fireEvent(
				`Click - user has clicked on one of the basket quantity buttons`,
				true
			);
		} else if (e.target.closest('a[data-action="remove"]')) {
			fireEvent(
				`Click - user has clicked on the remove item from basket button`,
				true
			);
		}
	});
};

export default () => {
	events.analyticsReference = window.ga ? "ga" : "_gaUAT";

	setup();

	fireEvent("Conditions Met");

	// Write experiment code here
	// ...
	startExperiment();
};
