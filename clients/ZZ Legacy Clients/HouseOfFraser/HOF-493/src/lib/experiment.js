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
	pollerLite(
		[
			"#productlistcontainer",
			"#productlistcontainer ul#navlist",
			"#divInlineViewPerPage",
		],
		() => {
			// ADDING REQUIRED CLASSES
			document.body.classList.add(`${ID}`);
			const mainContent = document.querySelector(
				".s-maincontent-container"
			);
			mainContent.classList.add(`${ID}-main-content`);

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
			const topFilterRight = document.createElement("button");
			topFilterRight.classList.add("topFilterRight");
			topFilterRight.setAttribute("type", "button");
			topFilterRight.setAttribute("aria-expanded", "false");
			topFilterRight.setAttribute("aria-valuetext", "Sort by");

			let divSortOption;
			pollerLite(["#divSortOptions"], () => {
				// FETCH THE RIGHT SIDE SORTING DOM
				divSortOption = document.querySelector("#divSortOptions");
				// divSortOption.parentNode.removeChild(divSortOption)
				topFilterRight.appendChild(divSortOption);

				// ONCLICK ON THE SORT FILTER TOGGLE REQUIRED CLASSES
				topFilterRight.addEventListener("click", (e) => {
					const elm = document.querySelector(
						"#divSortOptions .sortOptionsContainer"
					);

					if (elm.classList.contains("sortIsOpen")) {
						elm.classList.remove("sortIsOpen");
						divSortOption.classList.remove("no-border");
						topFilterRight.setAttribute("aria-expanded", "false");
					} else {
						setTimeout(() => {
							elm.classList.add("sortIsOpen");
							divSortOption.classList.add("no-border");
							topFilterRight.setAttribute(
								"aria-expanded",
								"true"
							);
						}, 50);
					}
				});

				const customSortOptions = divSortOption.querySelectorAll(
					".ddlSortOptionsContainer .ddlSortOption"
				);

				if (customSortOptions.length > 0) {
					customSortOptions.forEach((sortOption) => {
						sortOption.addEventListener("click", (e) => {
							setTimeout(() => {
								const sortOptionsContainer =
									document.querySelector(
										"#divSortOptions.sortbyfilter .sortOptionsContainer"
									);
								document
									.querySelector(
										"#divSortOptions.sortbyfilter"
									)
									?.classList.add("no-border");
								sortOptionsContainer?.classList.add(
									"ddlSortOptionsOpen"
								);
								sortOptionsContainer?.classList.add(
									"sortIsOpen"
								);
							}, 0);

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
			pollerLite(["#mobappfltrs"], () => {
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
			});

			let numOfItems = 4;
			// CREATE THE IN THIS SECTION FILTER TYPE DOM
			pollerLite(
				[
					"#FilterContainer #innerfiltercontainer .ChildCategoriesListWrapper",
				],
				() => {
					numOfItems = 3;
					const inThisSection = document.querySelector(
						"#FilterContainer #innerfiltercontainer .ChildCategoriesListWrapper"
					);

					//FILTER TITLE VALUE
					const newTitle = inThisSection.querySelector("h2")
						? inThisSection.querySelector("h2").innerText
						: "";

					// EACH FILTER DROPDOWN NAV CONTAINER
					const filterSelector = document.createElement("div");
					filterSelector.classList.add("product-filter");

					// NEW FILTER TYPE ELEMENTS
					const filterNewTitle = document.createElement("button");
					filterNewTitle.classList.add("filterTitle");
					filterNewTitle.setAttribute("type", "button");
					filterNewTitle.setAttribute("aria-expanded", "false");
					filterNewTitle.setAttribute(
						"aria-valuetext",
						newTitle.trim()
					);
					filterNewTitle.setAttribute(
						"tab-index",
						topFilterLeft.querySelectorAll(".product-filter").length
					);
					// filterNewTitle.classList.add("text-capitalize");
					filterNewTitle.insertAdjacentHTML(
						"afterbegin",
						`<span data="${newTitle
							.trim()
							.toLowerCase()}">${newTitle
							.trim()
							.toLowerCase()}</span>`
					);
					filterSelector.append(filterNewTitle);

					// FILTER LIST ANCHOR CONTAINER
					const productFilterAnchors = document.createElement("div");
					productFilterAnchors.classList.add(
						"filter-anchor-container"
					);

					// NEW FILTER TYPE CLICK EVENT
					filterNewTitle.addEventListener("click", (e) => {
						if (
							!filterNewTitle.classList.contains("filter-active")
						) {
							filterNewTitle.classList.add("filter-active");
							productFilterAnchors.classList.add(
								"filter-options-open"
							);
							filterNewTitle
								.closest(".product-filter")
								.classList.add("no-border");
							filterNewTitle.setAttribute(
								"aria-expanded",
								"true"
							);
						} else {
							filterNewTitle.classList.remove("filter-active");
							productFilterAnchors.classList.remove(
								"filter-options-open"
							);
							filterNewTitle
								.closest(".product-filter")
								.classList.remove("no-border");
							filterNewTitle.setAttribute(
								"aria-expanded",
								"false"
							);
						}
					});
					filterNewTitle.addEventListener("focus", (e) => {
						filterNewTitle
							.closest(".product-filter")
							.classList.add("remove-border");
					});
					filterNewTitle.addEventListener("focusout", (e) => {
						filterNewTitle
							.closest(".product-filter")
							.classList.remove("remove-border");
					});

					//FETCH THE CURRENT FILTER LIST FOR THE FILTER TYPE
					const filterSelectorList = inThisSection.querySelectorAll(
						"#ChildCategoriesList li a"
					);

					// CREATE NEW FILTER OPTIONS FROM THE CONTROL
					filterSelectorList.forEach((option, optionIndex) => {
						// EACH FILTER OPTION ACHOR TAG
						const filterAnchorTag = document.createElement("a");
						filterAnchorTag.classList.add("filter-anchor-tag");

						filterAnchorTag.setAttribute("href", option.href);
						// FILTER NAME CREATION AND INNERTEXT ASSIGNING
						const filterName = document.createElement("span");
						filterName.classList.add("filter-name");
						filterName.innerText = `${option.innerText.trim()}`;

						// APPEND THE NAME AND VALUE TO THE MAIN ANCHOR TAG THEN ASSIGN THIS TO THE FILTER OPTIONS CONTAINER
						filterAnchorTag.append(filterName);
						productFilterAnchors.append(filterAnchorTag);

						// ONCLICK NEW FILTER ANCHOR MAKE A CLICK ON THE ASSOCIATE CONTROL FILTER OPTION
						filterAnchorTag.addEventListener("click", (e) => {
							// e.preventDefault();
							fireEvent(
								`Click - Subcategory ${option.innerText.trim()} is clicked from In This Section filter`
							);
						});
					});

					// APPEND THE FILTER OPTIONS TO THE DROPDOWN CONTAINER
					filterSelector.append(productFilterAnchors);

					topFilterLeft.append(filterSelector);
				}
			);

			// LOOP TO CREATE THE NEW FILTER TYPES AND FILTER OPTIONS DOM
			filterList.forEach((item, index) => {
				let title = item.querySelector("h3.productFilterTitle")
					? item.querySelector("h3.productFilterTitle").innerText
					: "";
				title = title.trim().toLowerCase();
				if (index < numOfItems) {
					//FILTER TITLE VALUE
					const newTitle = item.querySelector("h3.productFilterTitle")
						? item.querySelector("h3.productFilterTitle").innerText
						: "";

					// EACH FILTER DROPDOWN NAV CONTAINER
					const filterSelector = document.createElement("div");
					filterSelector.classList.add("product-filter");

					// NEW FILTER TYPE ELEMENTS
					const filterNewTitle = document.createElement("button");
					filterNewTitle.classList.add("filterTitle");
					filterNewTitle.setAttribute("type", "button");
					filterNewTitle.setAttribute("aria-expanded", "false");
					filterNewTitle.setAttribute(
						"tab-index",
						topFilterLeft.querySelectorAll(".product-filter").length
					);
					filterNewTitle.setAttribute(
						"aria-valuetext",
						newTitle.trim()
					);
					filterNewTitle.insertAdjacentHTML(
						"afterbegin",
						`<span data="${newTitle
							.trim()
							.toUpperCase()}">${newTitle
							.trim()
							.toLowerCase()}</span>`
					);
					filterSelector.append(filterNewTitle);

					// FILTER LIST ANCHOR CONTAINER
					const productFilterAnchors = document.createElement("div");
					productFilterAnchors.classList.add(
						"filter-anchor-container"
					);

					// NEW FILTER TYPE CLICK EVENT
					filterNewTitle.addEventListener("click", (e) => {
						const target = e.target;
						const isParent = target.closest(
							".product-filter.no-border"
						);
						if (!isParent) {
							document
								.querySelectorAll(".product-filter")
								.forEach((elm) => {
									const title =
										elm.querySelector(".filterTitle");
									const container = elm.querySelector(
										".filter-anchor-container"
									);
									if (
										title.classList.contains(
											"filter-active"
										)
									) {
										title.classList.remove("filter-active");
										container.classList.remove(
											"filter-options-open"
										);
										elm.classList.remove("no-border");
									}
								});
						}

						if (
							!filterNewTitle.classList.contains("filter-active")
						) {
							filterNewTitle.classList.add("filter-active");
							productFilterAnchors.classList.add(
								"filter-options-open"
							);
							filterNewTitle
								.closest(".product-filter")
								.classList.add("no-border");
							filterNewTitle.setAttribute(
								"aria-expanded",
								"true"
							);
						} else {
							filterNewTitle.classList.remove("filter-active");
							productFilterAnchors.classList.remove(
								"filter-options-open"
							);
							filterNewTitle
								.closest(".product-filter")
								.classList.remove("no-border");
							filterNewTitle.setAttribute(
								"aria-expanded",
								"true"
							);
						}
					});
					filterNewTitle.addEventListener("focus", (e) => {
						filterNewTitle
							.closest(".product-filter")
							.classList.add("remove-border");
					});
					filterNewTitle.addEventListener("focusout", (e) => {
						filterNewTitle
							.closest(".product-filter")
							.classList.remove("remove-border");
					});
					// BRAND ANCHOR CONTAINER
					const brandAnchorContainer = document.createElement("div");
					brandAnchorContainer.classList.add("brand-filter-options");

					// FOR BRAND FILTER EXTRACT THE SEARCH INPUT AND SORTING DOM
					if (title === "brand") {
						const brandFilter =
							item.querySelector(".brandSearchSort");
						if (brandFilter) {
							const newBrandFilter =
								document.createElement("div");
							newBrandFilter.classList.add("brand-sort-filters");

							const brandSearch = document.createElement("div");
							brandSearch.classList.add("brandSearchFilter");
							const brandFilterInputBox =
								document.createElement("input");
							brandFilterInputBox.classList.add(
								"brand-filter-input-box"
							);
							brandFilterInputBox.setAttribute(
								"placeholder",
								"SEARCH BRANDS"
							);
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
									brandAnchorContainer.innerHTML = "";
									const brandFilterSelectorList =
										item.querySelectorAll(
											".productFilterList .FilterListItem"
										);
									brandFilterSelectorList.forEach(
										(option) => {
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
											filterName.classList.add(
												"filter-name"
											);
											filterName.innerText = `${option
												.querySelector(
													"span.FilterName"
												)
												.innerText.trim()}`;

											// FILTER VALUE(NUMBER OF AVAILABLE PRODUCTS) CREATION AND INNERTEXT ASSIGNING
											const filterValue =
												document.createElement("span");
											filterValue.classList.add(
												"filter-value"
											);
											const controlFilterValue = option
												.querySelector(
													"span.FilterValue"
												)
												.innerText.trim();

											if (
												controlFilterValue == "" ||
												!/\d/.test(controlFilterValue)
											) {
												option.classList.add(
													"looks-disable"
												);
												brandFilterAnchorTag.classList.add(
													"looks-disable"
												);
												filterValue.innerText = "";
											} else {
												option.classList.remove(
													"looks-disable"
												);
												brandFilterAnchorTag.classList.remove(
													"looks-disable"
												);
												filterValue.innerText =
													controlFilterValue;
											}
											// APPEND THE NAME AND VALUE TO THE MAIN ANCHOR TAG THEN ASSIGN THIS TO THE FILTER OPTIONS CONTAINER
											brandFilterAnchorTag.append(
												filterName
											);
											brandFilterAnchorTag.append(
												filterValue
											);
											brandFilterAnchorTag.addEventListener(
												"click",
												(e) => {
													option
														.querySelector(
															"a.FilterAnchor"
														)
														.click();
													fireEvent(
														`Filter successfully applied in session`
													);
												}
											);

											const filterValueObserver =
												new MutationObserver(
													(
														mutationsList,
														observer
													) => {
														observer.disconnect();
														const isSelectedElement2 =
															option.querySelector(
																'a.FilterAnchor span[role="checkbox"]'
															);
														if (
															option.getAttribute(
																"style"
															) !== null &&
															option
																.getAttribute(
																	"style"
																)
																.indexOf(
																	"none"
																) > -1
														) {
															brandFilterAnchorTag.style.display =
																"none";
														} else {
															brandFilterAnchorTag.style.display =
																"flex";
														}
														if (
															isSelectedElement2.classList.contains(
																"SelectedFilter"
															) &&
															isSelectedElement2.getAttribute(
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
														const controlFilterValue =
															option
																.querySelector(
																	"span.FilterValue"
																)
																.innerText.trim();
														if (
															controlFilterValue ==
																"" ||
															!/\d/.test(
																controlFilterValue
															)
														) {
															brandFilterAnchorTag.classList.add(
																"looks-disable"
															);
															filterValue.innerText =
																"";
														} else {
															brandFilterAnchorTag.classList.remove(
																"looks-disable"
															);
															filterValue.innerText =
																controlFilterValue;
														}

														observer.observe(
															option,
															config
														);
													}
												);

											filterValueObserver.observe(
												option,
												config
											);
											brandAnchorContainer.append(
												brandFilterAnchorTag
											);
										}
									);
								}
							});

							brandFilterInputBox.addEventListener(
								"keyup",
								(e) => {
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
									item.querySelector(
										"#txtBrandSearch"
									).value = value;
									triggerEvent(
										item.querySelector("#txtBrandSearch"),
										"keyup"
									);
								}
							);

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
								observer.disconnect();
								const aSortN =
									item.querySelector("#aSortNameOnBrands");
								const aSortQ = item.querySelector(
									"#aSortQuantityOnBrands"
								);
								const divBrandNotFound =
									item.querySelector("#divBrandNotFound");

								if (
									aSortN &&
									aSortN.classList.contains("active")
								) {
									document
										.querySelector("#brandSortName")
										.classList.add("active");
								} else {
									document
										.querySelector("#brandSortName")
										.classList.remove("active");
								}
								if (
									aSortQ &&
									aSortQ.classList.contains("active")
								) {
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
								brandObserver.observe(brandFilter, config);
							}
						);
						brandObserver.observe(brandFilter, config);
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
						filterAnchorTag.setAttribute(
							"href",
							option.querySelector("a.FilterAnchor").href
						);
						// role="button" tabindex="0"
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
								!filterAnchorTag.classList.contains(
									"selected-filter"
								)
							) {
								filterAnchorTag.classList.add(
									"selected-filter"
								);
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

						const controlFilterValue = option
							.querySelector("span.FilterValue")
							.innerText.trim();

						filterValue.innerText = controlFilterValue;
						if (
							controlFilterValue == "" ||
							!/\d/.test(controlFilterValue)
						) {
							option.classList.add("looks-disable");
							filterAnchorTag.classList.add("looks-disable");
							filterValue.innerText = "";
						} else {
							option.classList.remove("looks-disable");
							filterAnchorTag.classList.remove("looks-disable");
							filterValue.innerText = controlFilterValue;
						}
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
							e.preventDefault();
							option.querySelector("a.FilterAnchor").click();
							fireEvent(`Filter successfully applied in session`);
						});

						// OBSERVE ANY CHANGE ON THE CONTROL FILTER OPTION VALUES AND MAKE CHANGES TO THE NEW ONE

						const filterValueObserver = new MutationObserver(
							(mutationsList, observer) => {
								observer.disconnect();
								const isSelectedElement = option.querySelector(
									'a.FilterAnchor span[role="checkbox"]'
								);
								if (
									option.getAttribute("style") !== null &&
									option
										.getAttribute("style")
										.indexOf("none") > -1
								) {
									filterAnchorTag.style.display = "none";
								} else {
									filterAnchorTag.style.display = "flex";
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
										!filterAnchorTag.classList.contains(
											"selected-filter"
										)
									) {
										filterAnchorTag.classList.add(
											"selected-filter"
										);
									}
								} else {
									filterAnchorTag.classList.remove(
										"selected-filter"
									);
								}
								const controlFilterValue = option
									.querySelector("span.FilterValue")
									.innerText.trim();
								if (
									controlFilterValue == "" ||
									!/\d/.test(controlFilterValue)
								) {
									option.classList.add("looks-disable");
									filterAnchorTag.classList.add(
										"looks-disable"
									);
									filterValue.innerText = "";
								} else {
									option.classList.remove("looks-disable");
									filterAnchorTag.classList.remove(
										"looks-disable"
									);
									filterValue.innerText = controlFilterValue;
								}

								observer.observe(option, config);
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
					// if (title === "by occasion") {
					// 	newFilters["occation"] = filterSelector;
					// } else {
					// 	newFilters[title] = filterSelector;
					// }
					topFilterLeft.append(filterSelector);
				} else {
					const filterSelectorList = item.querySelectorAll(
						".productFilterList .FilterListItem"
					);

					// CREATE NEW FILTER OPTIONS FROM THE CONTROL
					filterSelectorList.forEach((option) => {
						if (
							option
								.querySelector("span.FilterValue")
								.innerText.trim() == ""
						) {
							option.classList.add("looks-disable");
						} else {
							option.classList.remove("looks-disable");
						}
						// OBSERVE ANY CHANGE ON THE CONTROL FILTER OPTION VALUES AND MAKE CHANGES TO THE NEW ONE
						const filterValueObserver = new MutationObserver(
							(mutationsList, observer) => {
								observer.disconnect();
								if (
									option
										.querySelector("span.FilterValue")
										.innerText.trim() == ""
								) {
									option.classList.add("looks-disable");
								} else {
									option.classList.remove("looks-disable");
								}
								observer.observe(option, config);
							}
						);
						filterValueObserver.observe(option, config);
					});
				}
			});

			// APPEND THE FILTER TYPES IN THE ORDER IT NEEDED
			// topFilterLeft.append(newFilters.occation);
			// topFilterLeft.append(newFilters.brand);
			// topFilterLeft.append(newFilters.style);
			// topFilterLeft.append(newFilters.size);

			topFilterRight.setAttribute(
				"tab-index",
				topFilterLeft.querySelectorAll(".product-filter").length + 1
			);

			// NEW ALL FILTERS BUTTON
			const allFilters = document.createElement("button");
			allFilters.classList.add("all-filter-button");
			allFilters.setAttribute("type", "button");
			allFilters.setAttribute("aria-expanded", "false");
			allFilters.setAttribute("aria-valuetext", "All Filters");
			allFilters.setAttribute(
				"tab-index",
				topFilterLeft.querySelectorAll(".product-filter").length
			);
			allFilters.innerHTML = `<span class="all-filter-title" data="ALL FILTERS ">ALL FILTERS </span><span class="plus-icon">+</span>`;

			const sideBarTitle = document.createElement("h3");
			sideBarTitle.innerText = "Filter";
			var backButton, closeButton;
			const crosButton = document.createElement("span");
			crosButton.insertAdjacentHTML("beforeend", "&times;");
			const filtersConatainerMain =
				document.querySelector("#FilterContainer");
			const overlayelm = document.createElement("div");
			document.body.append(overlayelm);
			overlayelm.classList.add(`${ID}-overlay`);
			overlayelm.classList.add(`hidden`);
			crosButton.addEventListener("click", (e) => {
				filtersConatainerMain.classList.remove("top-filter-sidebar");
				document.body.classList.remove(`${ID}-no-scroll`);
				overlayelm.classList.add("hidden");
				allFilters.setAttribute("aria-expanded", "false");
			});
			overlayelm.addEventListener("click", (e) => {
				crosButton?.click();
				backButton?.click();
			});
			pollerLite(["#mobappfltrs"], () => {
				const sidebarApply = document.querySelector("#mobappfltrs");
				sidebarApply.addEventListener("click", () => {
					crosButton?.click();
					backButton?.click();

					fireEvent(`Filter successfully applied in session`);
				});
			});

			// ALL FILTERS BUTTON CLICK OPENS THE SIDEBAR
			allFilters.addEventListener("click", (e) => {
				if (
					!filtersConatainerMain.classList.contains(
						"top-filter-sidebar"
					)
				) {
					filtersConatainerMain.classList.add("top-filter-sidebar");
					filtersConatainerMain
						.querySelector("#FiltersHeader")
						.append(sideBarTitle);
					filtersConatainerMain
						.querySelector("#FiltersHeader")
						.append(crosButton);
					document.body.classList.add(`${ID}-no-scroll`);
					overlayelm.classList.remove("hidden");
					allFilters.setAttribute("aria-expanded", "true");
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

			document.body.addEventListener("mouseover", (e) => {
				const target = e.target;
				e.stopPropagation();
				if (!target.closest("button.topFilterRight")) {
					divSortOption
						.querySelector(".sortOptionsContainer")
						.classList.remove("sortIsOpen");
					divSortOption.classList.remove("no-border");
					topFilterRight.setAttribute("aria-expanded", "false");
				}

				const isParent = target.closest(".product-filter.no-border");
				if (!isParent) {
					document
						.querySelectorAll(".product-filter")
						.forEach((elm) => {
							const title = elm.querySelector(".filterTitle");
							const container = elm.querySelector(
								".filter-anchor-container"
							);
							if (title.classList.contains("filter-active")) {
								title.classList.remove("filter-active");
								container.classList.remove(
									"filter-options-open"
								);
								elm.classList.remove("no-border");
							}
						});
				}
			});

			pollerLite(
				[
					"#FilterContainer #innerfiltercontainer .ChildCategoriesListWrapper",
				],
				() => {
					const inThisSection = document.querySelector(
						"#FilterContainer #innerfiltercontainer .ChildCategoriesListWrapper"
					);
					const li = document.createElement("li");
					li.classList.add("productFilter");

					li.insertAdjacentHTML(
						"afterbegin",
						`<div class="productFilterTitleBox">
							<div class="mobFiltInnerWrap">
								<h3 class="productFilterTitle">${inThisSection
									.querySelector("h2")
									?.innerText.trim()
									.toLowerCase()}</h3>
							</div>
						</div>
						
						`
					);
					inThisSection
						.querySelector("ul#ChildCategoriesList")
						.classList.add("productFilterList");
					li.append(
						inThisSection.querySelector("ul#ChildCategoriesList")
					);
					document
						.querySelector("#FilterContainer #filterlist")
						.prepend(li);
				}
			);

			// REMOVE OR TOGGLE CLASSES WHEN CLICKED ON THE DOCUMENT
			document.body.addEventListener("click", (e) => {
				const target = e.target;
				e.stopPropagation();

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
							mainSidebarContainer.classList.add(
								"filter-item-open"
							);
							target.classList.add("open-filter-options");
							title = target.querySelector(".productFilterTitle");
							mainSidebarContainer.scroll({
								top: 0,
								behavior: "smooth",
							});
						} else if (
							target.closest("li.productFilter") &&
							!target
								.closest("li.productFilter")
								.classList.contains("open-filter-options")
						) {
							mainSidebarContainer.classList.add(
								"filter-item-open"
							);
							target
								.closest("li.productFilter")
								.classList.add("open-filter-options");
							title = target
								.closest("li.productFilter")
								.querySelector(".productFilterTitle");
							mainSidebarContainer.scroll({
								top: 0,
								behavior: "smooth",
							});
						}
						if (title && inDeclared) {
							inDeclared = false;
							backButton = document.createElement("span");
							closeButton = document.createElement("span");
							backButton.classList.add("pf-back-button");
							closeButton.classList.add("pf-close-button");
							closeButton.insertAdjacentHTML(
								"beforeend",
								`&times;`
							);
							title
								.closest(".productFilterTitleBox")
								.insertAdjacentElement(
									"afterbegin",
									backButton
								);
							title
								.closest(".productFilterTitleBox")
								.insertAdjacentElement(
									"afterbegin",
									closeButton
								);
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
			selectedFilterWrapper.classList.add(
				`${ID}-selected-filters-wrapper`
			);
			const selectedFilterLeft = document.createElement("div");
			selectedFilterLeft.classList.add("selected-filters-left-section");
			const selectedFilterRight = document.createElement("div");
			selectedFilterRight.classList.add("selected-filters-right-section");

			const newSelectedItemContainer = document.createElement("div");
			newSelectedItemContainer.classList.add(
				`${ID}-selected-items-container`
			);
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
					newSelected.innerText = item.querySelector(
						".selectedFilterLabel"
					)
						? item
								.querySelector(".selectedFilterLabel")
								.innerText.trim()
						: "";
					newSelected.insertAdjacentHTML(
						"beforeend",
						`<span>&times;</span>`
					);
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
			selectedFiltersControlOvserver.observe(
				selectedFiltersControl,
				config
			);

			createSelectedFilterDom();
			selectedFilterLeft.append(newSelectedItemContainer);
			selectedFilterLeft.insertAdjacentHTML(
				"beforeend",
				`<a onclick="SetVal(null, 'CLEAR','###')" class="selected-clear-btn">Clear All <span>&times;</span></a>`
			);

			const veppContainer = document.createElement("div");
			veppContainer.classList.add("view-per-page-container");
			veppContainer.insertAdjacentHTML(
				"beforeend",
				`<span>VIEW: </span>`
			);

			const newViewPerPage = () => {
				const perPageNumbers =
					itemPerPageContainer.querySelectorAll("a");
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
			const bodyWrap = document.querySelector("#BodyWrap");
			document.addEventListener("scroll", function (e) {
				const filterWrapper = document.querySelector(
					".top-filters-wrapper"
				);
				const selectedFiltersWrapper = document.querySelector(
					`.${ID}-selected-filters-wrapper`
				);
				const productListingContainer = document.querySelector(
					"#FiltersAndProductsWrapper"
				);

				var topOffset = filterWrapper?.getBoundingClientRect().top;
				if (filterWrapper.classList.contains("fixed-top")) {
					if (
						selectedFiltersWrapper.classList.contains("fixed-top")
					) {
						if (
							productListingContainer?.getBoundingClientRect()
								.top >=
								selectedFiltersWrapper?.getBoundingClientRect()
									.bottom ||
							window.scrollY < 5
						) {
							filterWrapper.classList.remove("fixed-top");
							selectedFiltersWrapper.classList.remove(
								"fixed-top"
							);
							document.body.classList.remove(
								`${ID}-smooth-sticky`
							);
							document.body.classList.remove(
								`${ID}-smooth-sticky-one`
							);
						}
					} else {
						if (
							selectedFiltersWrapper?.getBoundingClientRect()
								.top >=
								filterWrapper?.getBoundingClientRect().bottom ||
							window.scrollY < 5
						) {
							filterWrapper.classList.remove("fixed-top");
							selectedFiltersWrapper.classList.remove(
								"fixed-top"
							);
							document.body.classList.remove(
								`${ID}-smooth-sticky`
							);
							document.body.classList.remove(
								`${ID}-smooth-sticky-one`
							);
						}
					}
				} else {
					if (topOffset <= 5) {
						if (
							selectedFiltersWrapper.querySelector(
								`.${ID}-selected-items-container a`
							)
						) {
							filterWrapper.classList.add("fixed-top");
							selectedFiltersWrapper.classList.add("fixed-top");
							document.body.classList.add(`${ID}-smooth-sticky`);
							document.body.classList.add(
								`${ID}-smooth-sticky-one`
							);
						} else {
							filterWrapper.classList.add("fixed-top");
							//selectedFiltersWrapper.classList.add("fixed-top");
							document.body.classList.add(`${ID}-smooth-sticky`);
						}
					} else {
						filterWrapper.classList.remove("fixed-top");
						selectedFiltersWrapper.classList.remove("fixed-top");
						document.body.classList.remove(`${ID}-smooth-sticky`);
						document.body.classList.remove(
							`${ID}-smooth-sticky-one`
						);
					}
				}
			});

			const filtersContainer = document.querySelector(
				"#productlistcontainer ul#navlist"
			);

			const filtersObserver = new MutationObserver(
				(mutationsList, observer) => {
					if (location.hash.includes("APRI%5E")) {
						const priceRange = document.querySelector(
							"#PriceFilter .PriceRTag span#amount"
						);
						if (priceRange) {
							let range = priceRange.innerText
								.trim()
								.toLowerCase()
								.split(" to ");
							// let lastIn = range.length - 1;
							const elm = `<li class="selectedFilter PriceFilterSelected">
					<a class="selectedFilterToggle" onclick="SetVal(null, 'CLEAR','APRI')">
						<span class="selectedFilterLabel">${range[0]} - ${range[1]}</span>
					</a>
				</li>`;

							const globalSelectedFilter = document.querySelector(
								".SelectedFiltersWrapper.globalSelectedFilters ul.selectedFilters"
							);

							if (globalSelectedFilter) {
								const clearFilter =
									globalSelectedFilter.querySelector(
										"li.inlineClearAllFilters"
									);
								if (
									clearFilter &&
									!globalSelectedFilter.querySelector(
										"li.PriceFilterSelected"
									)
								) {
									clearFilter.insertAdjacentHTML(
										"beforebegin",
										elm
									);
								} else if (
									!globalSelectedFilter.querySelector(
										"li.PriceFilterSelected"
									)
								) {
									globalSelectedFilter.insertAdjacentHTML(
										"afterbegin",
										elm
									);
									globalSelectedFilter.insertAdjacentHTML(
										"beforeend",
										`<a onclick="SetVal(null, 'CLEAR','###')" class="selected-clear-btn">Clear All <span>&times;</span></a>`
									);
								}
							}
							const mobileSelectedFilter = document.querySelector(
								".SelectedFiltersWrapper.mobileSelectedFilters ul.selectedFilters"
							);
							if (mobileSelectedFilter) {
								const clearFilter =
									mobileSelectedFilter.querySelector(
										"li.inlineClearAllFilters"
									);
								if (
									clearFilter &&
									!mobileSelectedFilter.querySelector(
										"li.PriceFilterSelected"
									)
								) {
									clearFilter.insertAdjacentHTML(
										"beforebegin",
										elm
									);
								} else if (
									!mobileSelectedFilter.querySelector(
										"li.PriceFilterSelected"
									)
								) {
									mobileSelectedFilter.insertAdjacentHTML(
										"afterbegin",
										elm
									);
									mobileSelectedFilter.insertAdjacentHTML(
										"beforeend",
										`<a onclick="SetVal(null, 'CLEAR','###')" class="selected-clear-btn">Clear All <span>&times;</span></a>`
									);
								}
							}
						}
					}
				}
			);

			filtersObserver.observe(filtersContainer, {
				childList: true,
				attributes: false,
				subtree: true,
			});

			pollerLite([`.${ID}-selected-filters-wrapper`], () => {
				const selectedFiltersWrapperNew = document.querySelector(
					`.${ID}-selected-filters-wrapper .selected-filters-left-section`
				);

				const selectedFiltersWrapperObserver = new MutationObserver(
					(mutationsList, observer) => {
						document.body.classList.remove(`${ID}-smooth-sticky`);
						setTimeout(() => {
							window.scroll({
								top: 0,
								behavior: "smooth",
							});
						}, 600);
					}
				);

				selectedFiltersWrapperObserver.observe(
					selectedFiltersWrapperNew,
					{
						childList: true,
						attributes: false,
						subtree: true,
					}
				);
			});
		}
	);
};
