import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;
const renderSelectOptions = (options) => {
	const stickyATBContainer = document.querySelector(`.${ID}-stickyATB`);

	let priceContent = "";
	if (options.discount) {
		priceContent = `
            <p class="${ID}-left-select-box-price">${options.price}</p>
            <div class="${ID}-prev-prices">
                <span class="${ID}-was-price">${options.wasPrice}</span>
                <span class="${ID}-save-price">${options.discount}</span>
            </div>
        `;
	} else {
		priceContent = `
            <p class="${ID}-left-select-box-price">${options.wasPrice}</p>
        `;
	}
	const infoDom = `
        <div class="${ID}-left-image-container ${ID}-left-select-box-container">
           
        </div>
        <div class="${ID}-left-info-container">
           
        </div>
    `;
	stickyATBContainer
		.querySelector(`.${ID}-stickyATB-col-left`)
		?.insertAdjacentHTML("afterbegin", infoDom);

	const selectorContainer = document.createElement("div");
	selectorContainer.classList.add(`${ID}-selector-dropdown`);
	selectorContainer.addEventListener("click", (e) => {
		if (selectorContainer.classList.contains(`${ID}-dropdown-shown`)) {
			selectorContainer.classList.remove(`${ID}-dropdown-shown`);
		} else {
			selectorContainer.classList.add(`${ID}-dropdown-shown`);
		}
	});
	document.addEventListener("click", (e) => {
		if (
			e.target.closest(`.${ID}-dropdown-options`) ||
			(!e.target.matches(`.${ID}-selector-dropdown`) &&
				!e.target.closest(`.${ID}-selector-dropdown`))
		) {
			selectorContainer.classList.remove(`${ID}-dropdown-shown`);
		}
	});
	const selectedOption = document.createElement("p");
	selectedOption.classList.add(`${ID}-selected-option`);
	selectedOption.innerText = "Choose size";
	selectorContainer.append(selectedOption);
	selectorContainer.insertAdjacentHTML(
		"beforeend",
		`<svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L6.5 6.5L12 1" stroke="#2C2C2C" stroke-width="2"/>
    </svg>`
	);

	const dropDownOptionsContainer = document.createElement("div");
	dropDownOptionsContainer.classList.add(`${ID}-dropdown-options`);

	options.items.forEach((item) => {
		const option = document.createElement("div");
		option.classList.add(`${ID}-dropdown-option`);

		if (options.type === "size") {
			if (item.previousElementSibling.checked) {
				selectedOption.innerText = item.innerText.trim();
			}
			if (item.classList.contains("disabled")) {
				option.classList.add("disabled");
			}
			option.innerText = item.innerText.trim();
		} else if (options.type === "bundleset") {
			if (item.classList.contains("selected")) {
				selectedOption.innerText = item
					.querySelector(".product__bundleset-title")
					.innerText.trim();
			}
			option.innerText = item
				.querySelector(".product__bundleset-title")
				.innerText.trim();
		}
		option.addEventListener("click", (e) => {
			if (options.type === "bundleset") {
				selectedOption.innerText = item
					.querySelector(".product__bundleset-title")
					.innerText.trim();
				fireEvent(
					`User interacts in the sticky bar to change product bundle`
				);
				item.querySelector("a").click();
			} else if (options.type === "size") {
				if (!item.classList.contains("disabled")) {
					selectedOption.innerText = item.innerText.trim();
					fireEvent(
						`User interacts in the sticky bar to change product size`
					);
					item.click();
				}
			}
		});
		dropDownOptionsContainer.append(option);
	});
	selectorContainer.append(dropDownOptionsContainer);

	document
		.querySelector(`.${ID}-left-image-container`)
		?.insertAdjacentElement("afterbegin", selectorContainer);
	document
		.querySelector(`.${ID}-left-info-container`)
		?.insertAdjacentHTML("afterbegin", priceContent);
};

export default renderSelectOptions;
