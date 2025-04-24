/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
// import { from } from "core-js/core/array";
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { logMessage, pollerLite } from "../../../../../lib/utils";

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
	setup();

	logMessage(ID + " Variation: " + VARIATION);

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

	Array.prototype.remove = function () {
		var what,
			a = arguments,
			L = a.length,
			ax;
		while (L && this.length) {
			what = a[--L];
			while ((ax = this.indexOf(what)) !== -1) {
				this.splice(ax, 1);
			}
		}
		return this;
	};
	const printerTypesArray = [
		"paper size",
		"colour or mono",
		"technology",
		"running costs",
	];
	const printerFeaturesArray = [
		"functionality",
		"connectivity",
		"double sided",
	];
	const printerBrandsArray = ["brand"];

	const brandsObject = {
		zebra: "Zebra",
		ricoh: "Ricoh",
		oki: "OKI",
		brother: "Brother",
		canon: "Canon",
		intermec: "Intermec",
		lexmark: "Lexmark",
		kyocera: "Kyocera",
		hp: "HP",
		epson: "Epson",
		xerox: "Xerox",
	};

	let formData = {
		currentSelection: {
			PaperSize: [],
			Technology: [],
			ColourOrMono: [],
			"Low-Running-Costs": [],
			Multifunction: [],
			Connectivity: [],
			DoubleSided: [],
			Brands: [],
		},
		newSelection: "",
	};

	const generateFilterKey = (filterType) => {
		if (filterType === "Running Costs") {
			return "Low-Running-Costs";
		} else if (filterType === "Brand") {
			return "Brands";
		} else if (filterType === "Functionality") {
			return "Multifunction";
		} else if (filterType === "Colour Style") {
			return "ColourOrMono";
		} else {
			let values = filterType.split(" ");
			const generatedKey = values.map(
				(value) => value.charAt(0).toUpperCase() + value.slice(1)
			);
			return generatedKey.join("");
		}
	};
	const updateTheSelectedFilters = (filterType, filterValue) => {
		let filterKey = generateFilterKey(filterType);
		if (formData.currentSelection[filterKey].includes(filterValue)) {
			formData.currentSelection[filterKey].remove(filterValue);
		} else {
			formData.currentSelection[filterKey].push(filterValue);
		}
	};

	const getResultCount = () => {
		var request = new XMLHttpRequest();
		request.open(
			"POST",
			"/ProductFinder/GetProductsCount?productType=Printer",
			false
		); // `false` makes the request synchronous
		request.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded;charset=UTF-8"
		);
		const token = document.querySelector(
			"input[name='__RequestVerificationToken']"
		).value;
		request.setRequestHeader("requestverificationtoken", token);
		let isParamsNull = true;
		for (const [key, value] of Object.entries(formData.currentSelection)) {
			if (value.length > 0) {
				isParamsNull = false;
				break;
			}
		}
		if (isParamsNull) {
			request.send(
				new URLSearchParams({
					newSelection: formData.newSelection,
				}).toString()
			);
		} else {
			request.send(
				new URLSearchParams({
					currentSelection: JSON.stringify(formData.currentSelection),
					newSelection: formData.newSelection,
				}).toString()
			);
		}

		if (request.status === 200) {
			const response = JSON.parse(request.responseText);

			const selectedTechnology = document.querySelectorAll(
				".technology-filter_container label.filter__label.selected"
			);
			if (selectedTechnology.length > 0) {
				if (
					response.currentSelection.Technology.includes("solid ~ ink")
				) {
					response.currentSelection.Technology = [];
					selectedTechnology.forEach((element) => {
						const value = element.querySelector("input").value;
						response.currentSelection.Technology.push(value);
					});
				}
			} else {
				response.currentSelection.Technology = [];
			}
			formData.currentSelection = response.currentSelection;

			const resultCountDom = document.querySelector(
				".pl-filter-box-footer .result-count-container #pl-result-count"
			);

			let isParamsNull = true;
			for (const [key, value] of Object.entries(
				response.currentSelection
			)) {
				if (value.length > 0) {
					isParamsNull = false;
					break;
				}
			}

			if (isParamsNull) {
				resultCountDom.innerHTML = `${
					document
						.querySelector(".filter_header span.products_count")
						.textContent.trim()
						.split(" ")[0]
				}`;
			} else {
				resultCountDom.innerHTML = response.productsCount;
			}
		}
	};

	pollerLite(
		[`.category-results-container .category-result-container-banner`],
		() => {
			const productFinderBar = `<div class="PL381-product_finder_bar"><h3 class="PL381-product_finder_bar_title">
			<span>Need help looking for that perfect printer?</span>
			<img src="https://blcro.fra1.digitaloceanspaces.com/PL381%2FdownArrow.svg" class="pl_bar_title-arrow" alt="Down Arrow">
		</h3><div class="filter__wrapper">
			<div class="filter-tab-controls">
				<div class="filter-tab-control active" data-filter="printer_type" next-filter="printer_feature">
					<span>Choose Printer Types...</span>
					<img src="https://blcro.fra1.digitaloceanspaces.com/PL381%2FrightArrow.svg" class="filter-control-arrow" alt="Right Arrow">
				</div>
				<div class="filter-tab-control" data-filter="printer_feature" next-filter="printer_brands">
					<span>Choose Printer Features...</span>
					<img src="https://blcro.fra1.digitaloceanspaces.com/PL381%2FrightArrow.svg" class="filter-control-arrow" alt="Right Arrow">
				</div>
				<div class="filter-tab-control" data-filter="printer_brands">
					<span>Choose Brands...</span>
					<img src="https://blcro.fra1.digitaloceanspaces.com/PL381%2FrightArrow.svg" class="filter-control-arrow" alt="Right Arrow">
				</div>
			</div>
		<div class="tab-content-container"><div class="filter-tab-content active" id="printer_type" next-filter="printer_feature"><div class="pl-tab-content-inner">
				<h3 class="tab-heading">Choose Printer Types</h3>
				<div class="filter-options-section">
					<div class="paper_size-filter_container filter-options-items">
						<div class="filter__title"><span>Paper Size</span></div>
						<div class="filter_body">
							<ul>
								<li class="filter__item">
												<label class="filter__label " for="paper_size_filter_0">
													<input type="radio" name="paper_size_filter" id="paper_size_filter_0" value="A4">
														A4
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="paper_size_filter_1">
													<input type="radio" name="paper_size_filter" id="paper_size_filter_1" value="A3">
														A3
												</label>
											</li>
							</ul>
						</div>
					</div>
						
					<div class="colour_or_mono-filter_container filter-options-items">
						<div class="filter__title"><span>Colour Style</span></div>
						<div class="filter_body">
							<ul>
								<li class="filter__item">
												<label class="filter__label " for="colour_or_mono_filter_0">
													<input type="radio" name="colour_or_mono_filter" id="colour_or_mono_filter_0" value="Colour">
														Colour
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="colour_or_mono_filter_1">
													<input type="radio" name="colour_or_mono_filter" id="colour_or_mono_filter_1" value="Mono">
														Mono
												</label>
											</li>
							</ul>
						</div>
					</div>
						
					<div class="technology-filter_container filter-options-items">
						<div class="filter__title"><span>Technology</span></div>
						<div class="filter_body">
							<ul>
								<li class="filter__item">
												<label class="filter__label " for="technology_filter_0">
													<input type="checkbox" name="technology_filter" id="technology_filter_0" value="Laser">
														Laser
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="technology_filter_1">
													<input type="checkbox" name="technology_filter" id="technology_filter_1" value="Inkjet">
														Inkjet
												</label>
											</li>
							</ul>
						</div>
					</div>
						
					<div class="running_costs-filter_container filter-options-items">
						<div class="filter__title"><span>Running Costs</span></div>
						<div class="filter_body">
							<ul>
								<li class="filter__item">
												<label class="filter__label " for="running_costs_filter_0">
													<input type="radio" name="running_costs_filter" id="running_costs_filter_0" value="Low Running Cost">
														Low Running Cost
												</label>
											</li>
							</ul>
						</div>
					</div>
						</div>
			</div><button class="nextcta">Next</button></div><div class="filter-tab-content" id="printer_feature" next-filter="printer_brands">
			<div class="pl-tab-content-inner">
				<h3 class="tab-heading">Choose Printer Features</h3>
				<div class="filter-options-section">
					<div class="connectivity-filter_container filter-options-items">
						<div class="filter__title"><span>Connectivity</span></div>
						<div class="filter_body">
							<ul>
								<li class="filter__item">
												<label class="filter__label " for="connectivity_filter_0">
													<input type="checkbox" name="connectivity_filter" id="connectivity_filter_0" value="Airprint">
														Airprint
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="connectivity_filter_1">
													<input type="checkbox" name="connectivity_filter" id="connectivity_filter_1" value="Network">
														Network
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="connectivity_filter_2">
													<input type="checkbox" name="connectivity_filter" id="connectivity_filter_2" value="Parallel">
														Parallel
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="connectivity_filter_3">
													<input type="checkbox" name="connectivity_filter" id="connectivity_filter_3" value="USB">
														USB
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="connectivity_filter_4">
													<input type="checkbox" name="connectivity_filter" id="connectivity_filter_4" value="Wireless">
														Wireless
												</label>
											</li>
							</ul>
						</div>
					</div>
						
					<div class="functionality-filter_container filter-options-items">
						<div class="filter__title"><span>Functionality</span></div>
						<div class="filter_body">
							<ul>
								<li class="filter__item">
												<label class="filter__label " for="functionality_filter_0">
													<input type="checkbox" name="functionality_filter" id="functionality_filter_0" value="Copy">
														Copy
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="functionality_filter_1">
													<input type="checkbox" name="functionality_filter" id="functionality_filter_1" value="Fax">
														Fax
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="functionality_filter_2">
													<input type="checkbox" name="functionality_filter" id="functionality_filter_2" value="Scan">
														Scan
												</label>
											</li>
							</ul>
						</div>
					</div>
						
					<div class="double_sided-filter_container filter-options-items">
						<div class="filter__title"><span>Double Sided</span></div>
						<div class="filter_body">
							<ul>
								<li class="filter__item">
												<label class="filter__label " for="double_sided_filter_0">
													<input type="checkbox" name="double_sided_filter" id="double_sided_filter_0" value="Print">
														Print
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="double_sided_filter_1">
													<input type="checkbox" name="double_sided_filter" id="double_sided_filter_1" value="Scan">
														Scan
												</label>
											</li>
							</ul>
						</div>
					</div>
						</div>
			</div>
		<button class="nextcta">Next</button></div><div class="filter-tab-content" id="printer_brands" >
			<div class="pl-tab-content-inner">
				<h3 class="tab-heading">Choose Brands</h3>
				<div class="filter-options-section">
					<div class="brand-filter_container filter-options-items">
						<div class="filter__title"><span>Brand</span></div>
						<div class="filter_body">
							<ul>
								<li class="filter__item">
												<label class="filter__label " for="brand_filter_0">
													<input type="checkbox" name="brand_filter" id="brand_filter_0" value="Xerox">
														Xerox
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_1">
													<input type="checkbox" name="brand_filter" id="brand_filter_1" value="Kyocera">
														Kyocera
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_2">
													<input type="checkbox" name="brand_filter" id="brand_filter_2" value="HP">
														HP
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_3">
													<input type="checkbox" name="brand_filter" id="brand_filter_3" value="Epson">
														Epson
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_4">
													<input type="checkbox" name="brand_filter" id="brand_filter_4" value="OKI">
														OKI
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_5">
													<input type="checkbox" name="brand_filter" id="brand_filter_5" value="Canon">
														Canon
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_6">
													<input type="checkbox" name="brand_filter" id="brand_filter_6" value="Brother">
														Brother
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_7">
													<input type="checkbox" name="brand_filter" id="brand_filter_7" value="Lexmark">
														Lexmark
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_8">
													<input type="checkbox" name="brand_filter" id="brand_filter_8" value="Ricoh">
														Ricoh
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_9">
													<input type="checkbox" name="brand_filter" id="brand_filter_9" value="Intermec">
														Intermec
												</label>
											</li><li class="filter__item">
												<label class="filter__label " for="brand_filter_10">
													<input type="checkbox" name="brand_filter" id="brand_filter_10" value="Zebra">
														Zebra
												</label>
											</li>
							</ul>
						</div>
					</div>
						</div>
			</div>
		</div></div></div><div class="pl-filter-box-footer">
				<p class="result-count-container"><span id="pl-result-count">1033</span> results found!</p>
				<button class="search_button">Search</button>	
			</div>
			</div>`;
			// const productFinderBar = document.createElement("div");
			// productFinderBar.classList.add(`${ID}-product_finder_bar`);

			// const productFinderBarTitle = document.createElement("h3");
			// productFinderBarTitle.classList.add(
			// 	`${ID}-product_finder_bar_title`
			// );

			// productFinderBarTitle.insertAdjacentHTML(
			// 	"beforeend",
			// 	`
			// 	<span>Need help looking for that perfect printer?</span>
			// 	<img src="https://blcro.fra1.digitaloceanspaces.com/PL381%2FdownArrow.svg" class="pl_bar_title-arrow" alt="Down Arrow" />
			// `
			// );

			// productFinderBar.prepend(productFinderBarTitle);

			// const filterWrapper = document.createElement("div");
			// filterWrapper.classList.add("filter__wrapper");

			// const filterTypes = `
			// 	<div class="filter-tab-controls">
			// 		<div class="filter-tab-control active" data-filter="printer_type">
			// 			<span>Choose Printer Types...</span>
			// 			<img src="https://blcro.fra1.digitaloceanspaces.com/PL381%2FrightArrow.svg" class="filter-control-arrow" alt="Right Arrow" />
			// 		</div>
			// 		<div class="filter-tab-control" data-filter="printer_feature">
			// 			<span>Choose Printer Features...</span>
			// 			<img src="https://blcro.fra1.digitaloceanspaces.com/PL381%2FrightArrow.svg" class="filter-control-arrow" alt="Right Arrow" />
			// 		</div>
			// 		<div class="filter-tab-control" data-filter="printer_brands">
			// 			<span>Choose Brands...</span>
			// 			<img src="https://blcro.fra1.digitaloceanspaces.com/PL381%2FrightArrow.svg" class="filter-control-arrow" alt="Right Arrow" />
			// 		</div>
			// 	</div>
			// `;
			// filterWrapper.insertAdjacentHTML("beforeend", filterTypes);

			// const printerTypeTabContent = document.createElement("div");
			// printerTypeTabContent.classList.add("filter-tab-content");
			// printerTypeTabContent.classList.add("active");
			// printerTypeTabContent.setAttribute("id", "printer_type");
			// printerTypeTabContent.insertAdjacentHTML(
			// 	"beforeend",
			// 	`<div class="pl-tab-content-inner">
			// 		<h3 class="tab-heading">Choose Printer Types</h3>
			// 		<div class="filter-options-section"></div>
			// 	</div>`
			// );

			// const printerFeaturesTabContent = document.createElement("div");
			// printerFeaturesTabContent.classList.add("filter-tab-content");
			// printerFeaturesTabContent.setAttribute("id", "printer_feature");
			// printerFeaturesTabContent.insertAdjacentHTML(
			// 	"beforeend",
			// 	`
			// 	<div class="pl-tab-content-inner">
			// 		<h3 class="tab-heading">Choose Printer Features</h3>
			// 		<div class="filter-options-section"></div>
			// 	</div>
			// `
			// );

			// const printerBrandsTabContent = document.createElement("div");
			// printerBrandsTabContent.classList.add("filter-tab-content");
			// printerBrandsTabContent.setAttribute("id", "printer_brands");
			// printerBrandsTabContent.insertAdjacentHTML(
			// 	"beforeend",
			// 	`
			// 	<div class="pl-tab-content-inner">
			// 		<h3 class="tab-heading">Choose Brands</h3>
			// 		<div class="filter-options-section"></div>
			// 	</div>
			// `
			// );

			// pollerLite([".category-filters"], () => {
			// 	const filterList =
			// 		document.querySelectorAll(".filter__container");

			// 	filterList.forEach((filter) => {
			// 		const filterTitle = filter
			// 			.querySelector(".filter_title")
			// 			.textContent.trim();
			// 		const filterLowerCase = filterTitle.toLowerCase();

			// 		if (
			// 			printerTypesArray.includes(filterLowerCase) ||
			// 			printerFeaturesArray.includes(filterLowerCase) ||
			// 			printerBrandsArray.includes(filterLowerCase)
			// 		) {
			// 			let inputType;

			// 			if (printerBrandsArray.includes(filterLowerCase)) {
			// 				inputType = "checkbox";
			// 			} else {
			// 				inputType =
			// 					filter.querySelector(".filter_body ul")
			// 						.classList[0];
			// 			}

			// 			const filterName = filterTitle
			// 				.toLowerCase()
			// 				.split(" ")
			// 				.join("_");

			// 			const filterOptions =
			// 				filter.querySelectorAll("ul li a");

			// 			const filterDom = `
			// 			<div class="${filterName}-filter_container filter-options-items">
			// 				<div class="filter__title"><span>${filterTitle}</span></div>
			// 				<div class="filter_body">
			// 					<ul>
			// 						${Array.from(filterOptions)
			// 							.map((item, index) => {
			// 								let optionValue;
			// 								let isSelected = false;
			// 								let optionName;
			// 								if (
			// 									printerBrandsArray.includes(
			// 										filterLowerCase
			// 									)
			// 								) {
			// 									const filterBrand =
			// 										item.querySelector("span");
			// 									optionValue =
			// 										filterBrand?.classList[0].split(
			// 											"-"
			// 										)[2];
			// 									optionValue =
			// 										brandsObject[optionValue];
			// 									isSelected =
			// 										filterBrand?.classList.contains(
			// 											"selected"
			// 										);
			// 									optionName = optionValue;
			// 								} else {
			// 									optionValue =
			// 										item.textContent.trim();
			// 									optionName =
			// 										item.textContent.trim();
			// 									isSelected =
			// 										item.classList.contains(
			// 											"selected"
			// 										);
			// 								}

			// 								if (isSelected) {
			// 									updateTheSelectedFilters(
			// 										filterTitle,
			// 										optionValue
			// 									);
			// 								}
			// 								return `<li class="filter__item">
			// 										<label class="filter__label ${
			// 											isSelected
			// 												? "selected"
			// 												: ""
			// 										}" for="${filterName}_filter_${index}">
			// 											<input type="${inputType}" name="${filterName}_filter" id="${filterName}_filter_${index}" value="${optionValue}" ${
			// 									isSelected ? "checked" : ""
			// 								}/>
			// 												${optionName}
			// 										</label>
			// 									</li>`;
			// 							})
			// 							.join("")}
			// 					</ul>
			// 				</div>
			// 			</div>
			// 				`;
			// 			if (printerTypesArray.includes(filterLowerCase)) {
			// 				printerTypeTabContent
			// 					.querySelector(".filter-options-section")
			// 					.insertAdjacentHTML("beforeend", filterDom);
			// 			} else if (
			// 				printerFeaturesArray.includes(filterLowerCase)
			// 			) {
			// 				printerFeaturesTabContent
			// 					.querySelector(".filter-options-section")
			// 					.insertAdjacentHTML("beforeend", filterDom);
			// 			} else {
			// 				printerBrandsTabContent
			// 					.querySelector(".filter-options-section")
			// 					.insertAdjacentHTML("beforeend", filterDom);
			// 			}
			// 		}
			// 	});
			// 	printerTypeTabContent.insertAdjacentHTML(
			// 		"beforeend",
			// 		`<button class="nextcta">Next</button>`
			// 	);
			// 	printerFeaturesTabContent.insertAdjacentHTML(
			// 		"beforeend",
			// 		`<button class="nextcta">Next</button>`
			// 	);
			// 	printerBrandsTabContent.insertAdjacentHTML(
			// 		"beforeend",
			// 		`<button class="nextcta">Next</button>`
			// 	);

			// 	const tabContentContainer = document.createElement("div");
			// 	tabContentContainer.classList.add("tab-content-container");

			// 	tabContentContainer.insertAdjacentElement(
			// 		"beforeend",
			// 		printerTypeTabContent
			// 	);
			// 	tabContentContainer.insertAdjacentElement(
			// 		"beforeend",
			// 		printerFeaturesTabContent
			// 	);
			// 	tabContentContainer.insertAdjacentElement(
			// 		"beforeend",
			// 		printerBrandsTabContent
			// 	);
			// 	filterWrapper.append(tabContentContainer);
			// });
			// productFinderBar.insertAdjacentElement("beforeend", filterWrapper);
			// productFinderBar.insertAdjacentHTML(
			// 	"beforeend",
			// 	`<div class="pl-filter-box-footer">
			// 		<p class="result-count-container"><span id="pl-result-count">${
			// 			document
			// 				.querySelector(".filter_header span.products_count")
			// 				.textContent.trim()
			// 				.split(" ")[0]
			// 		}</span> results found!</p>
			// 		<button class="search_button">Search</button>
			// 	</div>
			// 	`
			// );

			const referenceDom = document.querySelector(
				`.category-results-container .category-result-container-banner #pnlSubDepartments`
			);
			const readmore = document.querySelector(
				`.category-results-container .category-result-container-banner #readMoreButton`
			);

			const referenceDomFallBack1 = document.querySelector(
				`.category-results-container .category-result-container-banner .text-center .control-bar`
			);
			const referenceDomFallBack = document.querySelector(
				`.category-results-container .category-result-container-banner .text-center`
			);

			if (referenceDom && readmore) {
				readmore.insertAdjacentHTML("afterend", productFinderBar);
			} else if (referenceDom) {
				referenceDom.insertAdjacentHTML(
					"beforebegin",
					productFinderBar
				);
			} else if (referenceDomFallBack1) {
				referenceDomFallBack1.insertAdjacentHTML(
					"beforebegin",
					productFinderBar
				);
			} else if (referenceDomFallBack) {
				referenceDomFallBack.insertAdjacentHTML(
					"beforeend",
					productFinderBar
				);
			}
			pollerLite([`.filter_header span.products_count`], () => {
				const resultCount = document
					.querySelector(".filter_header span.products_count")
					.textContent.trim()
					.split(" ")[0];
				document.querySelector(
					`.pl-filter-box-footer #pl-result-count`
				).textContent = resultCount;
			});
		}
	);

	pollerLite([`.${ID}-product_finder_bar`], () => {
		pollerLite([`.category-filter-container .current_filters`], () => {
			let selectedFilters = [];

			const allSelectedFilters = document.querySelectorAll(
				`.category-filter-container .current_filters ul li`
			);
			allSelectedFilters.forEach((filter) => {
				const filterText = filter
					.querySelector("span.filter-name")
					.textContent.trim();
				selectedFilters.push(filterText.toLowerCase());
			});

			const allFilterTabs = document.querySelectorAll(
				`.${ID}-product_finder_bar label.filter__label`
			);
			allFilterTabs.forEach((filter) => {
				let filterText = filter.querySelector("input").value;
				let filterTitle = filter
					.closest(".filter-options-items")
					.querySelector(".filter__title span")
					.textContent.trim();
				if (
					filter.closest(
						".double_sided-filter_container.filter-options-items"
					)
				) {
					filterText = "Duplex " + filterText;
				}
				if (selectedFilters.includes(filterText.toLowerCase())) {
					filter.classList.add("selected");
					updateTheSelectedFilters(filterTitle, filterText);
				}
			});
		});

		if (window.innerWidth < 992) {
			const allFilterTabs = document.querySelectorAll(
				`.${ID}-product_finder_bar .filter-tab-content`
			);
			allFilterTabs.forEach((tab) => {
				const dataId = tab.getAttribute("id");
				const tabControl = document.querySelector(
					`.filter-tab-controls div[data-filter="${dataId}"]`
				);
				tabControl.insertAdjacentElement("afterend", tab);
			});
		}

		window.addEventListener("resize", () => {
			if (
				window.innerWidth < 992 &&
				!document.querySelector(
					`.${ID}-product_finder_bar .filter-tab-controls .filter-tab-content`
				)
			) {
				const allFilterTabs = document.querySelectorAll(
					`.${ID}-product_finder_bar .filter-tab-content`
				);
				allFilterTabs.forEach((tab) => {
					const dataId = tab.getAttribute("id");
					const tabControl = document.querySelector(
						`.filter-tab-controls div[data-filter="${dataId}"]`
					);
					tabControl.insertAdjacentElement("afterend", tab);
				});
			} else if (
				window.innerWidth >= 992 &&
				!document.querySelector(
					`.${ID}-product_finder_bar .tab-content-container .filter-tab-content`
				)
			) {
				const allFilterTabs = document.querySelectorAll(
					`.${ID}-product_finder_bar .filter-tab-controls .filter-tab-content`
				);
				const tabContentContainer = productFinderBar.querySelector(
					".tab-content-container"
				);
				allFilterTabs.forEach((tab) => {
					tabContentContainer.append(tab);
				});
			}

			if (window.innerWidth > 991) {
				const tabControls = document.querySelector(
					`.${ID}-product_finder_bar .filter-tab-controls .filter-tab-control[data-filter="printer_type"]`
				);
				const tabcontents = document.querySelectorAll(
					`.${ID}-product_finder_bar .filter-tab-content.active`
				);
				if (tabcontents.length == 0) {
					tabControls.classList.add("active");
					const tabContent = document.querySelector(
						`.${ID}-product_finder_bar .filter-tab-content#printer_type`
					);
					tabContent.classList.add("active");
				}
			}
		});

		const productFinderBar = document.querySelector(
			`.${ID}-product_finder_bar`
		);
		const productFinderBarTitle = document.querySelector(
			`.${ID}-product_finder_bar h3.${ID}-product_finder_bar_title`
		);

		productFinderBarTitle.addEventListener("click", () => {
			productFinderBar.classList.toggle("active");
		});

		const tabControls = productFinderBar.querySelector(
			".filter-tab-controls"
		);
		tabControls.addEventListener("click", (e) => {
			const target = e.target;
			const cuurentTabControl = target.closest(".filter-tab-control");
			if (
				cuurentTabControl &&
				!cuurentTabControl.classList.contains("active")
			) {
				const allControls = tabControls.querySelectorAll(
					".filter-tab-control"
				);
				allControls.forEach((control) => {
					control.classList.remove("active");
				});
				cuurentTabControl.classList.add("active");

				const allTabContent = productFinderBar.querySelectorAll(
					".filter__wrapper .filter-tab-content"
				);
				allTabContent.forEach((tabContent) => {
					tabContent.classList.remove("active");
				});

				const tabContent = productFinderBar.querySelector(
					`#${cuurentTabControl.getAttribute("data-filter")}`
				);
				tabContent.classList.add("active");
			} else if (
				cuurentTabControl &&
				cuurentTabControl.classList.contains("active") &&
				window.innerWidth < 992
			) {
				cuurentTabControl.classList.remove("active");
				const tabContent = productFinderBar.querySelector(
					`#${cuurentTabControl.getAttribute("data-filter")}`
				);
				tabContent.classList.remove("active");
			}
		});

		const allNextCta = productFinderBar.querySelectorAll(".nextcta");

		allNextCta.forEach((cta) => {
			cta.addEventListener("click", (e) => {
				const currentTabContent = e.target.closest(
					".filter-tab-content"
				);

				const nextTabControl = tabControls.querySelector(
					`[data-filter="${currentTabContent.getAttribute(
						"next-filter"
					)}"]`
				);

				if (nextTabControl) {
					nextTabControl.click();
					fireEvent(`Click - User clicks on Next CTA`);
				} else {
					//productFinderBar.querySelector(".search_button").click();
				}
			});
		});
		const tabContentContainer = productFinderBar.querySelector(
			".tab-content-container"
		);
		const filterWrapper =
			productFinderBar.querySelector(".filter__wrapper");
		let preventDoubleClick = false;
		let isFilterApplied = false;
		filterWrapper.addEventListener("click", (e) => {
			if (preventDoubleClick) {
				const target = e.target;
				const currentFilterOption = target.closest(
					"label.filter__label"
				);

				if (currentFilterOption) {
					if (!isFilterApplied) {
						fireEvent(`Click - User clicks on a filter`);
						isFilterApplied = true;
					}
					const filterType = currentFilterOption
						.closest(".filter-options-items")
						?.querySelector(".filter__title span")
						?.textContent.trim();
					const newSelectionKey = generateFilterKey(filterType);

					const newSelectionValue =
						currentFilterOption.querySelector("input").value;
					const currentFilterOptionInput =
						currentFilterOption.querySelector("input");
					if (currentFilterOptionInput.type === "radio") {
						if (
							currentFilterOption.classList.contains("selected")
						) {
							const allLabels = currentFilterOption
								.closest("ul")
								.querySelectorAll("label");
							allLabels.forEach((label) => {
								label.classList.remove("selected");
							});
							currentFilterOptionInput.checked = false;
							currentFilterOptionInput.dispatchEvent(
								new Event("change", { bubbles: true })
							);
							currentFilterOption.classList.remove("selected");
							formData.newSelection = `${newSelectionKey}_${newSelectionValue}_false`;
							getResultCount();
						} else {
							const allLabels = currentFilterOption
								.closest("ul")
								.querySelectorAll("label");
							allLabels.forEach((label) => {
								label.classList.remove("selected");
							});
							currentFilterOption.classList.add("selected");
							formData.newSelection = `${newSelectionKey}_${newSelectionValue}_true`;
							getResultCount();
						}
					} else {
						if (
							currentFilterOption.classList.contains("selected")
						) {
							currentFilterOption.classList.remove("selected");
							formData.newSelection = `${newSelectionKey}_${newSelectionValue}_false`;
							getResultCount();
						} else {
							currentFilterOption.classList.add("selected");
							formData.newSelection = `${newSelectionKey}_${newSelectionValue}_true`;
							getResultCount();
						}
					}
				}
				preventDoubleClick = false;
			} else {
				preventDoubleClick = true;
			}
		});

		const searchButton = productFinderBar.querySelector(".search_button");
		searchButton.addEventListener("click", () => {
			let urlString = location.origin + "/printers";

			if (
				formData.currentSelection.Brands &&
				formData.currentSelection.Brands.length > 0
			) {
				urlString += `/${formData.currentSelection.Brands.join("-")}`;
			}
			if (
				formData.currentSelection.Technology &&
				formData.currentSelection.Technology.length > 0
			) {
				urlString += `/${formData.currentSelection.Technology.join(
					"-"
				)}`;
			}
			if (
				formData.currentSelection.ColourOrMono &&
				formData.currentSelection.ColourOrMono.length > 0
			) {
				urlString += `/${formData.currentSelection.ColourOrMono.join(
					"-"
				)}`;
			}
			if (
				formData.currentSelection.PaperSize &&
				formData.currentSelection.PaperSize.length > 0
			) {
				urlString += `/${formData.currentSelection.PaperSize.join(
					"-"
				)}`;
			}

			if (
				formData.currentSelection["Low-Running-Costs"] &&
				formData.currentSelection["Low-Running-Costs"].length > 0
			) {
				urlString += `/${formData.currentSelection[
					"Low-Running-Costs"
				].join("-")}`;
			}
			if (
				formData.currentSelection.Connectivity &&
				formData.currentSelection.Connectivity.length > 0
			) {
				urlString += `/${formData.currentSelection.Connectivity.join(
					"-"
				)}`;
			}
			if (
				formData.currentSelection.Multifunction &&
				formData.currentSelection.Multifunction.length > 0
			) {
				if (urlString.indexOf("?") > -1) {
					urlString += `&functionality=${formData.currentSelection.Multifunction.join(
						"|"
					)}`;
				} else {
					urlString += `?functionality=${formData.currentSelection.Multifunction.join(
						"|"
					)}`;
				}
			}
			if (
				formData.currentSelection.DoubleSided &&
				formData.currentSelection.DoubleSided.length > 0
			) {
				if (urlString.indexOf("?") > -1) {
					urlString += `&doublesided=${formData.currentSelection.DoubleSided.join(
						"|"
					)}`;
				} else {
					urlString += `?doublesided=${formData.currentSelection.DoubleSided.join(
						"|"
					)}`;
				}
			}
			fireEvent(`Click - User clicks on Search button`);
			location.href = urlString.toLowerCase().replaceAll(" ", "-");
		});
	});
};
