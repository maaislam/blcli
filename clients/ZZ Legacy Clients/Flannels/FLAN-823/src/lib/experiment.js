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

	pollerLite(["#productDetails", "#aAddToBag"], () => {
		let atbButton = document.getElementById("aAddToBag");
		atbButton.addEventListener("click", (e) => {
			let sizeSelected = false;
			if (document.querySelector("#ulSizes")) {
				let allSizeButtons = document.querySelectorAll("#ulSizes li");
				if (allSizeButtons.length == 0) {
					sizeSelected = true;
				} else {
					[].slice.call(allSizeButtons).forEach((button) => {
						if (button.classList.contains("sizeVariantHighlight")) {
							sizeSelected = true;
						}
					});
				}
			} else if (document.querySelector("select#sizeDdl")) {
				sizeSelected =
					document.querySelector("select#sizeDdl").value !== "" &&
					document.querySelector("select#sizeDdl").value !== null &&
					document.querySelector("select#sizeDdl").value !== "0";
			} else if (!document.querySelector("#divSize select#sizeDdl")) {
				sizeSelected = true;
			}
			if (sizeSelected) {
				fireEvent("PDP - User clicks ATB");
			}
		});
	});

	pollerLite(["#divSize"], () => {
		fireEvent(`Visible - Sizes Visible`);

		if (!document.querySelector("#divSize select#sizeDdl")) {
			fireEvent(`Single sized product size auto selected`);
		} else {
			const sizeSelectInput = document.querySelector("select#sizeDdl");
			sizeSelectInput.addEventListener("change", () => {
				if (sizeSelectInput.value.trim() !== "0") {
					fireEvent(
						`Size selected and choose ${sizeSelectInput.value.trim()}`
					);
				}
			});
		}
	});

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...

	pollerLite(["#divSize #sizeDdl"], () => {
		const sizeDlWrapper = document.createElement("div");
		sizeDlWrapper.classList.add(`${ID}-size-dropdown`);
		const renderSizeDropDown = (sizeDlWrapper, isInitial) => {
			const sizeSelectInput = document.querySelector("select#sizeDdl");
			const sizeOptions = document.querySelectorAll(
				"select#sizeDdl option"
			);
			const selectedSizeDom = `
				<button class="btn btn-default dropdown-toggle none" type="button" id="btnSizeDropdown" data-toggle="dropdown" aria-expanded="true" data-value="">
					<span id="spanDropdownSelectedSizeText" class="value">${
						sizeSelectInput.value.trim() == "0"
							? "Select Size"
							: sizeSelectInput.value.trim()
					}</span>
					<span class="caret"></span>
				</button>`;

			const sizesUl = document.createElement("ul");
			sizesUl.classList.add("dropdown-menu");
			sizesUl.setAttribute(
				"aria-labelledby",
				"spanDropdownSelectedSizeText"
			);

			sizeOptions.forEach((item) => {
				const option = document.createElement("li");
				option.classList.add("size-dropdown-option");
				option.setAttribute(
					"data-value",
					`${item.getAttribute("value")}`
				);
				let val = item.getAttribute("value").trim();
				option.insertAdjacentHTML(
					"beforeend",
					`<span class="value">${
						val == "0" ? "Select Size" : val
					}</span>`
				);
				if (item.classList.contains("greyOut")) {
					option.classList.add("greyOut");
				}
				option.addEventListener("click", () => {
					sizeSelectInput.value = `${option.getAttribute(
						"data-value"
					)}`;
					let val = option.getAttribute("data-value").trim();
					document.querySelector(
						`#spanDropdownSelectedSizeText`
					).innerText = `${val == "0" ? "Select Size" : val}`;
					const event = new Event("change");
					sizeSelectInput.dispatchEvent(event);
				});
				sizesUl.append(option);
			});

			if (isInitial) {
				sizeDlWrapper.insertAdjacentHTML("beforeend", selectedSizeDom);
				sizeDlWrapper.append(sizesUl);
				document
					.querySelector("#divSize")
					.insertAdjacentElement("beforeend", sizeDlWrapper);
			} else {
				sizeDlWrapper.innerHTML = "";
				sizeDlWrapper.insertAdjacentHTML("beforeend", selectedSizeDom);
				sizeDlWrapper.append(sizesUl);
			}
		};

		renderSizeDropDown(sizeDlWrapper, true);

		const config = { attributes: true, childList: true, subtree: false };
		const dlColours = document.querySelector(
			"#ddlColours span#spanDropdownSelectedText"
		);
		if (dlColours) {
			const sizeSelectObserver = new MutationObserver(
				(mutationList, observer) => {
					renderSizeDropDown(sizeDlWrapper, false);
				}
			);
			sizeSelectObserver.observe(dlColours, config);
		}
	});
};
