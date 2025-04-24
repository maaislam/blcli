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

	pollerLite(["#productlistcontainer #navlist"], function () {
		var isPLP = document.querySelector("#productlistcontainer #navlist")
			? true
			: false;
		if (isPLP) {
			fireEvent(`Session visits PLP on Desktop`);
		}
	});

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		pollerLite(["#FiltersAndProductsWrapper"], function () {
			document.addEventListener("click", (e) => {
				const target = e.target;

				if (
					target.closest("#divSortOptions") &&
					(target.matches("li.ddlSortOption") ||
						target.closest("li.ddlSortOption"))
				) {
					fireEvent(`Results ranked in session`);
				}
				if (
					target.closest("#filterlist") &&
					(target.matches("div.FilterListItem") ||
						target.closest("div.FilterListItem"))
				) {
					fireEvent(`Filter successfully applied in session`);
				}
			});
		});
		return;
	}
	// Write experiment code here
	// ...

	//EVENT TRIGGERING FUNCTION
	function triggerEvent(el, type) {
		if ("createEvent" in document) {
			// modern browsers, IE9+
			var e = document.createEvent("HTMLEvents");
			e.initEvent(type, false, true);
			el.dispatchEvent(e);
		} else {
			// IE 8
			var e = document.createEventObject();
			e.eventType = type;
			el.fireEvent("on" + e.eventType, e);
		}
	}

	// CONFIG FOR MUTATION OBSERVER
	const config = { attributes: true, childList: true, subtree: true };

	// ADDING REQUIRED CLASSES
	document.body.classList.add(`${ID}`);
	const mainContent = document.querySelector(".s-maincontent-container");
	mainContent.classList.add(`${ID}-main-content`);

	pollerLite(["#lblCategoryCopy .catDesc"], () => {
		// setTimeout(() => {
		//const descContainer = document.querySelector('.catDesc');
		if (document.querySelector(".catDesc")) {
			const toggleDesc = document.createElement("span");
			toggleDesc.classList.add("toggle-cat-desk");
			document.querySelector(".catDesc").append(toggleDesc);
			toggleDesc.addEventListener("click", (e) => {
				toggleDesc.closest(".catDesc").classList.add("toggled");
			});
		}

		const deskObserver = new MutationObserver((mutationsList, observer) => {
			deskObserver.disconnect();
			if (
				document.querySelector(".catDesc") &&
				!document.querySelector(".toggle-cat-desk")
			) {
				const toggleDesc = document.createElement("span");
				toggleDesc.classList.add("toggle-cat-desk");
				document.querySelector(".catDesc").append(toggleDesc);
				toggleDesc.addEventListener("click", (e) => {
					toggleDesc.closest(".catDesc").classList.add("toggled");
				});
			}
			deskObserver.observe(
				document.querySelector("#lblCategoryCopy"),
				config
			);
		});
		deskObserver.observe(
			document.querySelector("#lblCategoryCopy"),
			config
		);
		// }, 1000)
	});

	// REMOVE THE UNNECCESSARY HR TAG
	const hr = mainContent.querySelector(`.HoF-browseInner hr`);
	hr.remove();

	// CREATE THE TOP FILTER WRAPPER DOM
	const topFilterWrapper = document.createElement("div");
	topFilterWrapper.classList.add("top-filters-wrapper");

	// CREATE THE TOP FILTER LEFT SIDE FILTER TYPE CONTAINER
	const topFilterLeft = document.createElement("div");
	topFilterLeft.classList.add("topFilterLeft");

	// CREATE THE TOP FILTER RIGHT SIDE SORTING CONTAINER
	const topFilterRight = document.createElement("div");
	topFilterRight.classList.add("topFilterRight");
	let divSortOption;
	pollerLite(["#divSortOptions"], () => {
		// FETCH THE RIGHT SIDE SORTING DOM
		divSortOption = document.querySelector("#divSortOptions");
		// divSortOption.parentNode.removeChild(divSortOption)
		topFilterRight.appendChild(divSortOption);

		// ONCLICK ON THE SORT FILTER TOGGLE REQUIRED CLASSES
		divSortOption
			.querySelector(".sortOptionsContainer")
			.addEventListener("click", (e) => {
				const elm = divSortOption.querySelector(
					".sortOptionsContainer"
				);
				if (elm.classList.contains("sortIsOpen")) {
					elm.classList.remove("sortIsOpen");
					divSortOption.classList.remove("no-border");
				} else {
					elm.classList.add("sortIsOpen");
					divSortOption.classList.add("no-border");
				}
			});

		const customSortOptions = divSortOption.querySelectorAll(
			".ddlSortOptionsContainer .ddlSortOption"
		);

		if (customSortOptions.length > 0) {
			customSortOptions.forEach((sortOption) => {
				sortOption.addEventListener("click", (e) => {
					fireEvent(`Results ranked in session`);
				});
			});
		}
		// APPEND THE SORTING DOM TO THE RIGHT SIDE OF THE TOP FILTER WRAPPER
		//topFilterRight.appendChild(divSortOption)
	});

	// FETCH THE FILTER TYPES LIST FROM THE CONTROL
	const filterList = document.querySelectorAll(
		"#filterlist li.productFilter"
	);

	//TOTAL PRODUCTS NUMBER DOM
	const totalProducts = document.querySelector(
		"#prdlistinformation span.totalProducts"
	);

	// NEW TOTAL PRODUCTS NUMBER DOM
	const newTotalproducts = `<div class="top-filters-total">Filter<span> - ${totalProducts.innerText} products</span></div>`;
	topFilterLeft.insertAdjacentHTML("afterbegin", newTotalproducts);

	const sidebarApply = document.querySelector("#mobappfltrs");
	sidebarApply.querySelector(
		"span:not(.glyphicon)"
	).innerText = `APPlY (${totalProducts.innerText.trim()})`;
	// MUTATION OBSERVER TO UPDATE THE TOTAL PRODUCTS
	const totalProductsObserver = new MutationObserver(
		(mutationsList, observer) => {
			topFilterLeft.querySelector(
				".top-filters-total span"
			).innerText = ` - ${totalProducts.innerText} products`;
			sidebarApply.querySelector(
				"span:not(.glyphicon)"
			).innerText = `APPlY (${totalProducts.innerText.trim()})`;
		}
	);
	totalProductsObserver.observe(totalProducts, config);

	// OBJECT TO STORE THE FILTER OPTIONS CONTAINERS
	const newFilters = new Object();

	// LOOP TO CREATE THE NEW FILTER TYPES AND FILTER OPTIONS DOM
	filterList.forEach((item) => {
		let title = item.querySelector("h3.productFilterTitle")
			? item.querySelector("h3.productFilterTitle").innerText
			: "";
		title = title.trim().toLowerCase();
		if (
			title === "by occasion" ||
			title === "brand" ||
			title === "style" ||
			title === "size"
		) {
			//FILTER TITLE VALUE
			const newTitle = item.querySelector("h3.productFilterTitle")
				? item.querySelector("h3.productFilterTitle").innerText
				: "";

			// EACH FILTER DROPDOWN NAV CONTAINER
			const filterSelector = document.createElement("div");
			filterSelector.classList.add("product-filter");

			// NEW FILTER TYPE ELEMENTS
			const filterNewTitle = document.createElement("div");
			filterNewTitle.classList.add("filterTitle");
			filterNewTitle.insertAdjacentHTML(
				"afterbegin",
				`<span data="${newTitle.trim().toUpperCase()}">${newTitle
					.trim()
					.toLowerCase()}</span>`
			);
			filterSelector.append(filterNewTitle);

			// FILTER LIST ANCHOR CONTAINER
			const productFilterAnchors = document.createElement("div");
			productFilterAnchors.classList.add("filter-anchor-container");

			// NEW FILTER TYPE CLICK EVENT
			filterNewTitle.addEventListener("click", (e) => {
				// REMOVE REQUIRED CLASSES FROM OTHER ACTIVE FILTER TYPES
				document.querySelectorAll(".product-filter").forEach((elm) => {
					const title = elm.querySelector(".filterTitle");
					const container = elm.querySelector(
						".filter-anchor-container"
					);
					if (
						title.innerText.trim() !==
							filterNewTitle.innerText.trim() &&
						title.classList.contains("filter-active")
					) {
						title.classList.remove("filter-active");
						container.classList.remove("filter-options-open");
						elm.classList.remove("no-border");
					}
				});

				if (!filterNewTitle.classList.contains("filter-active")) {
					filterNewTitle.classList.add("filter-active");
					productFilterAnchors.classList.add("filter-options-open");
					filterNewTitle
						.closest(".product-filter")
						.classList.add("no-border");
				} else {
					filterNewTitle.classList.remove("filter-active");
					productFilterAnchors.classList.remove(
						"filter-options-open"
					);
					filterNewTitle
						.closest(".product-filter")
						.classList.remove("no-border");
				}
			});

			// BRAND ANCHOR CONTAINER
			const brandAnchorContainer = document.createElement("div");
			brandAnchorContainer.classList.add("brand-filter-options");

			// FOR BRAND FILTER EXTRACT THE SEARCH INPUT AND SORTING DOM
			if (title === "brand") {
				const brandFilter = item.querySelector(".brandSearchSort");
				if (brandFilter) {
					const newBrandFilter = document.createElement("div");
					newBrandFilter.classList.add("brand-sort-filters");

					const brandSearch = document.createElement("div");
					brandSearch.classList.add("brandSearchFilter");
					const brandFilterInputBox = document.createElement("input");
					brandFilterInputBox.classList.add("brand-filter-input-box");
					brandSearch.append(brandFilterInputBox);
					const brandSortOtherDom = `<span id="brandSearchClear">X</span>
                                                <div id="brandSearchNotFound"></div>
                                                <span id="brandSearchIcon"></span>`;
					brandSearch.insertAdjacentHTML(
						"beforeend",
						brandSortOtherDom
					);

					const brandSOrt = document.createElement("div");
					brandSOrt.classList.add("SortQtyName");
					brandSOrt.insertAdjacentHTML(
						"beforeend",
						`<span>Sort</span>
                                                    <a id="brandSortQuantity">Quantity</a>
                                                    <span> / </span>
                                                    <a id="brandSortName">A-Z</a>`
					);
					brandSOrt.addEventListener("click", (e) => {
						if (e.target.matches("a")) {
							const id = e.target.getAttribute("id");
							if (id === "brandSortQuantity") {
								item.querySelector(
									"#aSortQuantityOnBrands"
								).click();
							} else if (id === "brandSortName") {
								item.querySelector(
									"#aSortNameOnBrands"
								).click();
							}

							const brandFilterSelectorList =
								item.querySelectorAll(
									".productFilterList .FilterListItem"
								);
							brandAnchorContainer.innerHTML = "";
							brandFilterSelectorList.forEach((option) => {
								// EACH FILTER OPTION ACHOR TAG
								const brandFilterAnchorTag =
									document.createElement("a");
								brandFilterAnchorTag.classList.add(
									"filter-anchor-tag"
								);

								// CHECK IF THE FILTER OPTION IS ALREADY SELECTED IN THE CONTROL
								const isSelectedElementFirst =
									option.querySelector(
										'a.FilterAnchor span[role="checkbox"]'
									);
								if (
									option.getAttribute("style") !== null &&
									option
										.getAttribute("style")
										.indexOf("none") > -1
								) {
									brandFilterAnchorTag.style.display = "none";
								} else {
									brandFilterAnchorTag.style.display = "flex";
								}
								if (
									isSelectedElementFirst.classList.contains(
										"SelectedFilter"
									) &&
									isSelectedElementFirst.getAttribute(
										"aria-checked"
									)
								) {
									if (
										!brandFilterAnchorTag.classList.contains(
											"selected-filter"
										)
									) {
										brandFilterAnchorTag.classList.add(
											"selected-filter"
										);
									}
								}

								// FILTER NAME CREATION AND INNERTEXT ASSIGNING
								const filterName =
									document.createElement("span");
								filterName.classList.add("filter-name");
								filterName.innerText = `${option
									.querySelector("span.FilterName")
									.innerText.trim()}`;

								// FILTER VALUE(NUMBER OF AVAILABLE PRODUCTS) CREATION AND INNERTEXT ASSIGNING
								const filterValue =
									document.createElement("span");
								filterValue.classList.add("filter-value");
								filterValue.innerText = `${option
									.querySelector("span.FilterValue")
									.innerText.trim()}`;

								// APPEND THE NAME AND VALUE TO THE MAIN ANCHOR TAG THEN ASSIGN THIS TO THE FILTER OPTIONS CONTAINER
								brandFilterAnchorTag.append(filterName);
								brandFilterAnchorTag.append(filterValue);
								brandFilterAnchorTag.addEventListener(
									"click",
									(e) => {
										option
											.querySelector("a.FilterAnchor")
											.click();
										fireEvent(
											`Filter successfully applied in session`
										);
									}
								);

								const filterValueObserver =
									new MutationObserver(
										(mutationsList, observer) => {
											const isSelectedElement =
												option.querySelector(
													'a.FilterAnchor span[role="checkbox"]'
												);
											if (
												option.getAttribute("style") !==
													null &&
												option
													.getAttribute("style")
													.indexOf("none") > -1
											) {
												brandFilterAnchorTag.style.display =
													"none";
											} else {
												brandFilterAnchorTag.style.display =
													"flex";
											}
											if (
												isSelectedElement.classList.contains(
													"SelectedFilter"
												) &&
												isSelectedElement.getAttribute(
													"aria-checked"
												)
											) {
												if (
													!brandFilterAnchorTag.classList.contains(
														"selected-filter"
													)
												) {
													brandFilterAnchorTag.classList.add(
														"selected-filter"
													);
												}
											} else {
												brandFilterAnchorTag.classList.remove(
													"selected-filter"
												);
											}
											filterValue.innerText = `${option
												.querySelector(
													"span.FilterValue"
												)
												.innerText.trim()}`;
										}
									);

								filterValueObserver.observe(option, config);
								brandAnchorContainer.append(
									brandFilterAnchorTag
								);
							});
						}
					});
					brandFilterInputBox.addEventListener("keyup", (e) => {
						const value = e.target.value;
						if (value !== "") {
							brandSearch.querySelector(
								"#brandSearchIcon"
							).style.display = "none";
							brandSearch.querySelector(
								"#brandSearchClear"
							).style.display = "block";
						} else {
							brandSearch.querySelector(
								"#brandSearchIcon"
							).style.display = "block";
							brandSearch.querySelector(
								"#brandSearchClear"
							).style.display = "none";
						}
						item.querySelector("#txtBrandSearch").value = value;
						triggerEvent(
							item.querySelector("#txtBrandSearch"),
							"keyup"
						);
					});

					brandSearch
						.querySelector("#brandSearchClear")
						.addEventListener("click", (e) => {
							brandFilterInputBox.value = "";
							triggerEvent(brandFilterInputBox, "keyup");
							e.target.style.display = "none";
							brandSearch.querySelector(
								"#brandSearchIcon"
							).style.display = "block";
						});
					newBrandFilter.append(brandSearch);
					newBrandFilter.insertAdjacentElement(
						"beforeend",
						brandSOrt
					);
					productFilterAnchors.append(newBrandFilter);
				}

				const brandObserver = new MutationObserver(
					(mutationsList, observer) => {
						const aSortN = item.querySelector("#aSortNameOnBrands");
						const aSortQ = item.querySelector(
							"#aSortQuantityOnBrands"
						);
						const divBrandNotFound =
							item.querySelector("#divBrandNotFound");

						if (aSortN && aSortN.classList.contains("active")) {
							document
								.querySelector("#brandSortName")
								.classList.add("active");
						} else {
							document
								.querySelector("#brandSortName")
								.classList.remove("active");
						}
						if (aSortQ && aSortQ.classList.contains("active")) {
							document
								.querySelector("#brandSortQuantity")
								.classList.add("active");
						} else {
							document
								.querySelector("#brandSortQuantity")
								.classList.remove("active");
						}
						const notFoundElm = document.querySelector(
							"#brandSearchNotFound"
						);
						if (
							divBrandNotFound &&
							divBrandNotFound.innerText.trim() !== ""
						) {
							notFoundElm.innerText =
								divBrandNotFound.innerText.trim();
							notFoundElm.style.paddingTop = "10px";
						} else {
							notFoundElm.innerText = "";
							notFoundElm.style.paddingTop = "0px";
						}
					}
				);
				brandObserver.observe(item, config);
			}

			//FETCH THE CURRENT FILTER LIST FOR THE FILTER TYPE
			const filterSelectorList = item.querySelectorAll(
				".productFilterList .FilterListItem"
			);

			// CREATE NEW FILTER OPTIONS FROM THE CONTROL
			filterSelectorList.forEach((option) => {
				// EACH FILTER OPTION ACHOR TAG
				const filterAnchorTag = document.createElement("a");
				filterAnchorTag.classList.add("filter-anchor-tag");

				// CHECK IF THE FILTER OPTION IS ALREADY SELECTED IN THE CONTROL
				const isSelectedElementFirst = option.querySelector(
					'a.FilterAnchor span[role="checkbox"]'
				);
				if (
					isSelectedElementFirst.classList.contains(
						"SelectedFilter"
					) &&
					isSelectedElementFirst.getAttribute("aria-checked")
				) {
					if (
						!filterAnchorTag.classList.contains("selected-filter")
					) {
						filterAnchorTag.classList.add("selected-filter");
					}
				}

				// FILTER NAME CREATION AND INNERTEXT ASSIGNING
				const filterName = document.createElement("span");
				filterName.classList.add("filter-name");
				filterName.innerText = `${option
					.querySelector("span.FilterName")
					.innerText.trim()}`;

				// FILTER VALUE(NUMBER OF AVAILABLE PRODUCTS) CREATION AND INNERTEXT ASSIGNING
				const filterValue = document.createElement("span");
				filterValue.classList.add("filter-value");
				filterValue.innerText = `${option
					.querySelector("span.FilterValue")
					.innerText.trim()}`;

				// APPEND THE NAME AND VALUE TO THE MAIN ANCHOR TAG THEN ASSIGN THIS TO THE FILTER OPTIONS CONTAINER
				filterAnchorTag.append(filterName);
				filterAnchorTag.append(filterValue);

				if (title === "brand") {
					brandAnchorContainer.append(filterAnchorTag);
				} else {
					productFilterAnchors.append(filterAnchorTag);
				}

				// ONCLICK NEW FILTER ANCHOR MAKE A CLICK ON THE ASSOCIATE CONTROL FILTER OPTION
				filterAnchorTag.addEventListener("click", (e) => {
					option.querySelector("a.FilterAnchor").click();
					fireEvent(`Filter successfully applied in session`);
				});

				// OBSERVE ANY CHANGE ON THE CONTROL FILTER OPTION VALUES AND MAKE CHANGES TO THE NEW ONE

				const filterValueObserver = new MutationObserver(
					(mutationsList, observer) => {
						const isSelectedElement = option.querySelector(
							'a.FilterAnchor span[role="checkbox"]'
						);
						if (
							option.getAttribute("style") !== null &&
							option.getAttribute("style").indexOf("none") > -1
						) {
							filterAnchorTag.style.display = "none";
						} else {
							filterAnchorTag.style.display = "flex";
						}
						if (
							isSelectedElement.classList.contains(
								"SelectedFilter"
							) &&
							isSelectedElement.getAttribute("aria-checked")
						) {
							if (
								!filterAnchorTag.classList.contains(
									"selected-filter"
								)
							) {
								filterAnchorTag.classList.add(
									"selected-filter"
								);
							}
						} else {
							filterAnchorTag.classList.remove("selected-filter");
						}
						filterValue.innerText = `${option
							.querySelector("span.FilterValue")
							.innerText.trim()}`;
					}
				);

				filterValueObserver.observe(option, config);
			});

			// APPEND THE FILTER OPTIONS TO THE DROPDOWN CONTAINER
			if (title === "brand") {
				productFilterAnchors.append(brandAnchorContainer);
				filterSelector.append(productFilterAnchors);
			} else {
				filterSelector.append(productFilterAnchors);
			}

			// STORE THE DROPDOWN CONTAINERS TO THE OBJECT
			if (title === "by occasion") {
				newFilters["occation"] = filterSelector;
			} else {
				newFilters[title] = filterSelector;
			}
		}
	});

	// APPEND THE FILTER TYPES IN THE ORDER IT NEEDED
	topFilterLeft.append(newFilters.occation);
	topFilterLeft.append(newFilters.brand);
	topFilterLeft.append(newFilters.style);
	topFilterLeft.append(newFilters.size);

	// NEW ALL FILTERS BUTTON
	const allFilters = document.createElement("div");
	allFilters.classList.add("all-filter-button");
	allFilters.innerHTML = "ALL FILTERS <span>+</span>";

	const sideBarTitle = document.createElement("h3");
	sideBarTitle.innerText = "Filter";
	var backButton, closeButton;
	const crosButton = document.createElement("span");
	crosButton.insertAdjacentHTML("beforeend", "&times;");
	const filtersConatainerMain = document.querySelector("#FilterContainer");
	const overlayelm = document.createElement("div");
	document.body.append(overlayelm);
	overlayelm.classList.add(`${ID}-overlay`);
	overlayelm.classList.add(`hidden`);
	crosButton.addEventListener("click", (e) => {
		filtersConatainerMain.classList.remove("top-filter-sidebar");
		document.body.classList.remove(`${ID}-no-scroll`);
		overlayelm.classList.add("hidden");
	});
	overlayelm.addEventListener("click", (e) => {
		crosButton.click();
		backButton.click();
	});
	sidebarApply.addEventListener("click", () => {
		crosButton.click();
		backButton.click();
		fireEvent(`Filter successfully applied in session`);
	});
	// ALL FILTERS BUTTON CLICK OPENS THE SIDEBAR
	allFilters.addEventListener("click", (e) => {
		if (!filtersConatainerMain.classList.contains("top-filter-sidebar")) {
			filtersConatainerMain.classList.add("top-filter-sidebar");
			filtersConatainerMain
				.querySelector("#FiltersHeader")
				.append(sideBarTitle);
			filtersConatainerMain
				.querySelector("#FiltersHeader")
				.append(crosButton);
			document.body.classList.add(`${ID}-no-scroll`);
			overlayelm.classList.remove("hidden");
			fireEvent(`Clicks to 'All filters`);
		}
	});
	topFilterLeft.append(allFilters);

	// APPEND THE LEFT AND RIGHT CONTENTS TO THE WRAPPER
	topFilterWrapper.append(topFilterLeft);
	topFilterWrapper.append(topFilterRight);

	// INSERT THE CREATED DOM TO THE DOCUMENT
	const filtersAndProductsWrapper = document.querySelector(
		"#FiltersAndProductsWrapper"
	);
	filtersAndProductsWrapper.parentNode.insertBefore(
		topFilterWrapper,
		filtersAndProductsWrapper
	);

	// REMOVE OR TOGGLE CLASSES WHEN CLICKED ON THE DOCUMENT
	document.body.addEventListener("click", (e) => {
		const target = e.target;
		e.stopPropagation();
		if (!target.closest("div#divSortOptions")) {
			divSortOption
				.querySelector(".sortOptionsContainer")
				.classList.remove("sortIsOpen");
			divSortOption.classList.remove("no-border");
		}

		const isParent = target.closest(".product-filter");
		const isElm = target.classList.contains("FilterAnchor");
		if (e.pointerType !== "" && !isParent && !isElm) {
			document.querySelectorAll(".product-filter").forEach((elm) => {
				const title = elm.querySelector(".filterTitle");
				const container = elm.querySelector(".filter-anchor-container");
				if (title.classList.contains("filter-active")) {
					title.classList.remove("filter-active");
					container.classList.remove("filter-options-open");
					elm.classList.remove("no-border");
				}
			});
		}

		const sidebar = target.closest(".top-filter-sidebar");
		if (sidebar) {
			if (
				target.matches("li.productFilter") ||
				target.closest("li.productFilter")
			) {
				const mainSidebarContainer = document.querySelector(
					"#FilterContainer.top-filter-sidebar"
				);
				let title;
				var inDeclared = true;

				if (
					target.matches("li.productFilter") &&
					!target.classList.contains("open-filter-options")
				) {
					mainSidebarContainer.classList.add("filter-item-open");
					target.classList.add("open-filter-options");
					title = target.querySelector(".productFilterTitle");
					mainSidebarContainer.scroll({ top: 0, behavior: "smooth" });
				} else if (
					target.closest("li.productFilter") &&
					!target
						.closest("li.productFilter")
						.classList.contains("open-filter-options")
				) {
					mainSidebarContainer.classList.add("filter-item-open");
					target
						.closest("li.productFilter")
						.classList.add("open-filter-options");
					title = target
						.closest("li.productFilter")
						.querySelector(".productFilterTitle");
					mainSidebarContainer.scroll({ top: 0, behavior: "smooth" });
				}
				if (title && inDeclared) {
					inDeclared = false;
					backButton = document.createElement("span");
					closeButton = document.createElement("span");
					backButton.classList.add("pf-back-button");
					closeButton.classList.add("pf-close-button");
					closeButton.insertAdjacentHTML("beforeend", `&times;`);
					title
						.closest(".productFilterTitleBox")
						.insertAdjacentElement("afterbegin", backButton);
					title
						.closest(".productFilterTitleBox")
						.insertAdjacentElement("afterbegin", closeButton);
					backButton.addEventListener("click", (e) => {
						mainSidebarContainer.classList.remove(
							"filter-item-open"
						);
						e.target
							.closest("li.productFilter")
							.classList.remove("open-filter-options");
						backButton.remove();
						closeButton.remove();
					});

					closeButton.addEventListener("click", (e) => {
						mainSidebarContainer.classList.remove(
							"filter-item-open"
						);
						e.target
							.closest("li.productFilter")
							.classList.remove("open-filter-options");
						crosButton.click();
						closeButton.remove();
						backButton.remove();
					});
				}
			}
		}
	});

	const selectedFilterWrapper = document.createElement("div");
	selectedFilterWrapper.classList.add(`${ID}-selected-filters-wrapper`);
	const selectedFilterLeft = document.createElement("div");
	selectedFilterLeft.classList.add("selected-filters-left-section");
	const selectedFilterRight = document.createElement("div");
	selectedFilterRight.classList.add("selected-filters-right-section");

	const newSelectedItemContainer = document.createElement("div");
	newSelectedItemContainer.classList.add(`${ID}-selected-items-container`);
	selectedFilterLeft.insertAdjacentHTML(
		"afterbegin",
		`<span class="selected-heading">SELECTED FILTERS:</span>`
	);

	const itemPerPageContainer = document.querySelector(
		"#divInlineViewPerPage"
	);
	const selectedFiltersControl = document.querySelector(
		"#SelectedFiltersWrapper"
	);

	const createSelectedFilterDom = (mutationsList, observer) => {
		const allSelectors = selectedFiltersControl.querySelectorAll(
			".selectedFilters li.selectedFilter"
		);
		newSelectedItemContainer.innerHTML = "";
		allSelectors.forEach((item) => {
			const newSelected = document.createElement("a");
			newSelected.classList.add("selected-item");
			newSelected.innerText = item.querySelector(".selectedFilterLabel")
				? item.querySelector(".selectedFilterLabel").innerText.trim()
				: "";
			newSelected.insertAdjacentHTML("beforeend", `<span>&times;</span>`);
			newSelected.addEventListener("click", () => {
				item.querySelector(".selectedFilterToggle").click();
			});
			newSelectedItemContainer.append(newSelected);
		});
		if (allSelectors.length < 1) {
			selectedFilterLeft.style.visibility = "hidden";
		} else {
			selectedFilterLeft.style.visibility = "visible";
		}
	};

	const selectedFiltersControlOvserver = new MutationObserver(
		createSelectedFilterDom
	);
	selectedFiltersControlOvserver.observe(selectedFiltersControl, config);

	createSelectedFilterDom();
	selectedFilterLeft.append(newSelectedItemContainer);
	selectedFilterLeft.insertAdjacentHTML(
		"beforeend",
		`<a onclick="SetVal(null, 'CLEAR','###')" class="selected-clear-btn">Clear All <span>&times;</span></a>`
	);

	const veppContainer = document.createElement("div");
	veppContainer.classList.add("view-per-page-container");
	veppContainer.insertAdjacentHTML("beforeend", `<span>VIEW: </span>`);

	const newViewPerPage = () => {
		const perPageNumbers = itemPerPageContainer.querySelectorAll("a");
		let status = true;
		perPageNumbers.forEach((elm) => {
			const options = document.createElement("span");
			options.classList.add("view-item-per-page");
			options.innerText = ` ${elm.innerText.trim()} `;
			if (elm.classList.contains("selected")) {
				options.classList.add("pp-selected");
			}
			options.addEventListener("click", (e) => {
				e.target.parentNode
					.querySelectorAll(".view-item-per-page")
					.forEach((item) => {
						item.classList.remove("pp-selected");
					});
				e.target.classList.add("pp-selected");
				elm.click();
			});
			veppContainer.append(options);
			if (status) {
				veppContainer.insertAdjacentHTML(
					"beforeend",
					`<span> / </span>`
				);
				status = false;
			}
		});
	};

	newViewPerPage();
	selectedFilterRight.append(veppContainer);
	selectedFilterWrapper.append(selectedFilterLeft);
	selectedFilterWrapper.append(selectedFilterRight);
	filtersAndProductsWrapper.parentNode.insertBefore(
		selectedFilterWrapper,
		filtersAndProductsWrapper
	);
};
