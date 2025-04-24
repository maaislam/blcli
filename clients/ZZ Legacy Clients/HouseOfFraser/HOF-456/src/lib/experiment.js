/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { events } from "../../../../../lib/utils";
import { pollerLite } from "../../../../../lib/utils";

// Force set analytics reference
events.analyticsReference = "_gaUAT";
const { ID, VARIATION } = shared;
let cloneNodeOfFilterSort;

const positionOfFilterSort = () => {
	if (
		document.querySelector(".categorycopyd4 #lblCategoryCopy") &&
		document
			.querySelector(".categorycopyd4 #lblCategoryCopy")
			.hasChildNodes() == false
	) {
		document.querySelector(".categorycopyd4 #prdlistinformation") &&
			document
				.querySelector(".categorycopyd4 #prdlistinformation")
				.insertAdjacentElement("afterbegin", cloneNodeOfFilterSort);
	} else {
		document.querySelector(".categorycopyd4 #prdlistinformation") &&
			document
				.querySelector(".categorycopyd4 #prdlistinformation")
				.insertAdjacentElement("afterbegin", cloneNodeOfFilterSort);
	}
};

export default () => {
	setup();

	fireEvent("Conditions Met");
	fireEvent("User Visits PLP");
	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	// SET FILTER
	// const filterButton = document.body;
	// if (filterButton) {
	//   filterButton.addEventListener('click', (e) => {
	//     // console.log(e.target);
	//     if (
	//       e.target == document.querySelectorAll('div.mobCbRow.visible-xs ')[1] ||
	//       e.target == document.querySelectorAll('div.mobCbRow.visible-xs ')[0]
	//     ) {
	//       //fireEvent('Click - Filter button');
	//       console.log('Filter button clicked');
	//     } else if (e.target == document.querySelector('div.sort') || e.target == document.querySelector('div.sort> span')) {
	//       //fireEvent('Click - Sort By Button - ' + location.pathname);
	//       console.log('sort button clicked');
	//     }
	//   });
	// }

	// variation 1

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		var refFil = document.querySelector(
			'[class="mobCbRow visible-xs visible-sm"]'
		);

		if (refFil) {
			refFil.addEventListener("click", () => {
				fireEvent("User selects filter CTA");
			});
		}
		pollerLite(
			[
				".s-maincontent-container",
				".categorycopyd4",
				".mobCbRow.visible-xs.visible-sm",
				"#mobclsfltrs",
				"ul#mobFilterControls",
				"#mobFilterControls li#mobappfltrs.mobApplyFilter",
				".MobSortSelector .mobTitlArro",
			],
			() => {
				document
					.querySelector(".MobSortSelector .mobTitlArro")
					.addEventListener("click", (e) => {
						if (e.target.closest(".MobSortSelector .mobTitlArro")) {
							fireEvent(`User interacts with 'sort by'`);
						}
					});
			}
		);

		pollerLite(["#filterlist >li.productFilter"], () => {
			const filterOptions = document.querySelectorAll(
				"#filterlist >li.productFilter .productFilterTitleBox"
			);
			if (filterOptions) {
				filterOptions.forEach((item) => {
					item.addEventListener("click", (e) => {
						let t = item.querySelector(".productFilterTitle")
							? item.querySelector(".productFilterTitle")
									.innerText
							: "";
						fireEvent(
							`User interacts with ${t.toLowerCase()} filter`
						);
					});
				});
			}
		});
		document
			.querySelector("#mobappfltrs")
			.addEventListener("click", (e) => {
				fireEvent("Customer appiles filters");
			});
		return;
	}

	// Write experiment code here
	// ...
	var isSafari =
		navigator.vendor &&
		navigator.vendor.indexOf("Apple") > -1 &&
		navigator.userAgent &&
		navigator.userAgent.indexOf("CriOS") == -1 &&
		navigator.userAgent.indexOf("FxiOS") == -1;

	if (shared.VARIATION == "1") {
		// do something

		pollerLite(
			[
				".s-maincontent-container",
				".categorycopyd4",
				".mobCbRow.visible-xs.visible-sm",
				"#mobclsfltrs",
				"ul#mobFilterControls",
				"#mobFilterControls li#mobappfltrs.mobApplyFilter",
			],
			() => {
				cloneNodeOfFilterSort = document
					.querySelector(".mobCbRow.visible-xs.visible-sm")
					?.cloneNode(true);
				cloneNodeOfFilterSort?.classList.add("clone-filter-sort");

				const mainSection = document.querySelector(
					".s-maincontent-container.HoF-browse"
				);
				mainSection && mainSection.classList.add(`${ID}-HoF-browse-v1`);

				const applyButton = document.querySelector(
					"#mobFilterControls li#mobappfltrs.mobApplyFilter"
				);
				const crossButton = document.querySelector(
					`.${ID}-HoF-browse-v1 #mobclsfltrs`
				);

				// const filterSortbySticky = cloneNodeOfFilterSort.offsetTop;
				const targetNode = document.querySelector(
					".categorycopyd4 #lblCategoryCopy"
				);
				const config = { childList: true };
				const targetNodeForHeader = document.querySelector(
					"#BodyWrap.Responsive"
				);
				const configNodeForHeader = { attributes: true };

				cloneNodeOfFilterSort.addEventListener("click", (e) => {
					window.position = window.scrollY;
					fireEvent("User clicks refine and sort");
					setTimeout(() => {
						document
							.querySelector(
								".mobCbRow.visible-xs.visible-sm:not(.clone-filter-sort) .mobFilterContainer"
							)
							.click();
						document.body.classList.add(`${ID}-filter-shown`);
						if (isSafari) {
							document
								.querySelector("html")
								?.classList.add(`${ID}-safari`);
						}
					}, 0);
				});

				document
					.querySelector(".MobSortSelector .mobTitlArro")
					.addEventListener("click", (e) => {
						if (e.target.closest(".MobSortSelector .mobTitlArro")) {
							fireEvent(`User clicks 'sort by'`);
						}
					});
				pollerLite(["#filterlist >li.productFilter"], () => {
					const filterOptions = document.querySelectorAll(
						"#filterlist >li.productFilter .productFilterTitleBox"
					);
					if (filterOptions) {
						filterOptions.forEach((item) => {
							item.addEventListener("click", (e) => {
								let t = item.querySelector(
									".productFilterTitle"
								)
									? item.querySelector(".productFilterTitle")
											.innerText
									: "";
								fireEvent(
									`User interacts with ${t.toLowerCase()} filter`
								);
							});
						});
					}
				});
				document
					.querySelector("#mobappfltrs")
					.addEventListener("click", (e) => {
						fireEvent("User selects Apply");
					});
				const closeModal = () => {
					document
						.querySelector("#FilterContainer")
						.classList.add("MobClosed");
					document
						.querySelector(`.${ID}-btnDiv`)
						?.classList.remove("hidden");
					cloneNodeOfFilterSort.classList.remove("stickyFilterSort");
					document.body.classList.remove(`${ID}-filter-shown`);
					document
						.querySelector("html")
						?.classList.remove(`${ID}-safari`);

					setTimeout(() => {
						window.scrollTo({
							top: window.position,
							left: 0,
						});
					}, 0);
				};
				applyButton.addEventListener("click", closeModal);
				crossButton.addEventListener("click", () => {
					applyButton.click();
				});

				window.onscroll = () => {
					let topOff = document
						.querySelector("#prdlistinformation")
						?.getBoundingClientRect().top;
					if (
						cloneNodeOfFilterSort.classList.contains(
							"stickyFilterSort"
						)
					) {
						topOff = topOff - (56 + 116);
					} else {
						topOff = topOff - 56;
					}
					if (topOff <= 0) {
						cloneNodeOfFilterSort.classList.add("stickyFilterSort");
					} else {
						cloneNodeOfFilterSort.classList.remove(
							"stickyFilterSort"
						);
					}
				};

				const filterSortObserver = new MutationObserver(
					(mutationsList, observer) => {
						const filterSortbyButton =
							document.querySelector(`.clone-filter-sort`);
						const globalSelectedFilters = document.querySelector(
							"#FiltersAndProductsWrapper .globalSelectedFiltersWrapper"
						);
						if (
							filterSortbyButton.classList.contains(
								"stickyFilterSort"
							)
						) {
							globalSelectedFilters?.classList.add(
								"sticky-selected-items"
							);
							let top =
								filterSortbyButton?.getBoundingClientRect()
									.bottom;
							globalSelectedFilters.style.top = top + "px";
						} else {
							globalSelectedFilters?.classList.remove(
								"sticky-selected-items"
							);
							globalSelectedFilters.style.top = "unset";
						}
					}
				);

				filterSortObserver.observe(cloneNodeOfFilterSort, {
					childList: false,
					attributes: true,
					subtree: false,
				});

				const filtersContainer2 = document.querySelector(
					"#productlistcontainer ul#navlist"
				);
				const filtersObserver2 = new MutationObserver(
					(mutationsList, observer) => {
						window.position = 0;
					}
				);

				filtersObserver2.observe(filtersContainer2, {
					childList: true,
					attributes: true,
					subtree: true,
				});

				const callback = function (mutationsList, observer) {
					for (const mutation of mutationsList) {
						if (mutation.type === "childList") {
							positionOfFilterSort();
						}
					}
				};

				const observer = new MutationObserver(callback);
				targetNode && observer.observe(targetNode, config);
				positionOfFilterSort();
				const callback2 = function (mutationsList, observer) {
					for (const mutation of mutationsList) {
						if (
							targetNodeForHeader.classList.contains(
								"menu-search-shown"
							)
						) {
							cloneNodeOfFilterSort.classList.add("hasHeaderAb");
						} else {
							cloneNodeOfFilterSort.classList.remove(
								"hasHeaderAb"
							);
						}
					}
				};

				const observer2 = new MutationObserver(callback2);
				targetNodeForHeader &&
					observer2.observe(targetNodeForHeader, configNodeForHeader);
			}
		);
	} else if (shared.VARIATION == "2") {
		// do something else
		pollerLite(
			[
				".s-maincontent-container",
				".categorycopyd4",
				".mobCbRow.visible-xs.visible-sm",
				"#mobclsfltrs",
				"ul#mobFilterControls",
				"#mobFilterControls li#mobappfltrs.mobApplyFilter",
			],
			() => {
				var mainSection = document.querySelector(
					".s-maincontent-container.HoF-browse"
				);
				mainSection.classList.add(`${ID}-HoF-browse`);

				var clearApply = document.querySelector("ul#mobFilterControls");
				clearApply.classList.add(`${ID}-mobFilterControls`);

				const targetNode = document.querySelector(
					".categorycopyd4 #lblCategoryCopy"
				);
				const targetNodeForHeader = document.querySelector(
					"#BodyWrap.Responsive"
				);
				const configNodeForHeader = { attributes: true };
				const configNode = { childList: true };

				var btndiv = document.createElement("div");
				btndiv.classList.add(`${ID}-btnDiv`);
				btndiv.innerHTML =
					'<div class="filter"><span>FILTER</span></div>' +
					'<div class="border"></div>' +
					`<div class="sort"><span>SORT BY</span><span class="FilterCollapseImage glyphicon"></span></div>`;

				const checkFunction = () => {
					if (
						document.querySelector(
							".categorycopyd4 #lblCategoryCopy"
						) &&
						document
							.querySelector(".categorycopyd4 #lblCategoryCopy")
							.hasChildNodes() == false
					) {
						document.querySelector(
							".categorycopyd4 #prdlistinformation"
						) &&
							document
								.querySelector(
									".categorycopyd4 #prdlistinformation"
								)
								.insertAdjacentElement("afterbegin", btndiv);
					} else {
						document.querySelector(
							".categorycopyd4 #prdlistinformation"
						) &&
							document
								.querySelector(
									".categorycopyd4 #prdlistinformation"
								)
								.insertAdjacentElement("afterbegin", btndiv);
					}
				};

				checkFunction();

				// click the filter button
				document
					.querySelector(`.${ID}-btnDiv .filter`)
					.addEventListener("click", (e) => {
						window.position = window.scrollY;
						fireEvent("User clicks filter");
						document
							.querySelector("#FilterContainer")
							?.classList.remove("sticky");
						document
							.querySelector("#FilterContainer")
							?.setAttribute("style", "");
						document.querySelector(
							"#FilterContainer"
						).style.display = "block";
						document
							.querySelector(`.${ID}-btnDiv`)
							.classList.add("hidden");
						document
							.querySelector("#FiltersHeader")
							.querySelector("span.MobFiltersText").textContent =
							"Filter";

						document
							.querySelector(
								"#innerfiltercontainer > div.MobSortSelector"
							)
							.classList.add(`${ID}-MobSortSelector`);
						document
							.querySelector("ul#filterlist")
							.classList.remove(`${ID}-productFilters`);
						document
							.querySelector(
								`.${ID}-HoF-browse #mobFilterControls`
							)
							.classList.remove(`${ID}-mobFilter`);
						document.body.classList.add(`${ID}-filter-shown`);
						if (isSafari) {
							document
								.querySelector("html")
								?.classList.add(`${ID}-safari`);
						}

						document
							.querySelector("div.mobFilterContainer")
							.dispatchEvent(new Event("click"));
					});

				// click the sort button
				document
					.querySelector(`.${ID}-btnDiv .sort`)
					.addEventListener("click", (e) => {
						window.position = window.scrollY;
						fireEvent(`User clicks sort by`);
						document
							.querySelector("#FilterContainer")
							?.classList.remove("sticky");
						document
							.querySelector("#FilterContainer")
							?.setAttribute("style", "");
						document.querySelector(
							"#FilterContainer"
						).style.display = "block";
						document
							.querySelector(`.${ID}-btnDiv`)
							.classList.add("hidden");
						document
							.querySelector("#FiltersHeader")
							.querySelector("span.MobFiltersText").textContent =
							"Sort By";
						document
							.querySelector(
								"#innerfiltercontainer > div.MobSortSelector"
							)
							.classList.remove(`${ID}-MobSortSelector`);
						document
							.querySelector("div.mobFilterContainer")
							.dispatchEvent(new Event("click"));
						document
							.querySelector("ul#filterlist")
							.classList.add(`${ID}-productFilters`);
						document
							.querySelector(
								"div.MobSortSelector div#CollapseDiv > div.mobFiltInnerWrap"
							)
							.classList.add(`${ID}-mobFiltInnerWrap`);
						document
							.querySelector(
								`.${ID}-HoF-browse #mobFilterControls`
							)
							.classList.add(`${ID}-mobFilter`);
						document.body.classList.add(`${ID}-filter-shown`);
						if (isSafari) {
							document
								.querySelector("html")
								?.classList.add(`${ID}-safari`);
						}
						document
							.querySelector(
								"div.MobSortSelector div#CollapseDiv"
							)
							.dispatchEvent(new Event("click"));
					});

				document
					.querySelector("#mobclsfltrs")
					.addEventListener("click", function (e) {
						document
							.querySelector("#FilterContainer")
							?.setAttribute("style", "");
						document.querySelector(
							"#FilterContainer"
						).style.display = "none";
						document
							.querySelector(`.${ID}-btnDiv`)
							.classList.remove("hidden");
						document.body.classList.remove(`${ID}-filter-shown`);

						document
							.querySelector("html")
							?.classList.remove(`${ID}-safari`);
						setTimeout(() => {
							window.scrollTo({
								top: window.position,
								left: 0,
							});
						}, 0);
					});
				document
					.querySelector("#mobappfltrs")
					.addEventListener("click", function (e) {
						document
							.querySelector("#FilterContainer")
							?.setAttribute("style", "");
						document.querySelector(
							"#FilterContainer"
						).style.display = "none";
						document
							.querySelector(`.${ID}-btnDiv`)
							.classList.remove("hidden");
						document.body.classList.remove(`${ID}-filter-shown`);
						document
							.querySelector("html")
							?.classList.remove(`${ID}-safari`);
						setTimeout(() => {
							window.scrollTo({
								top: window.position,
								left: 0,
							});
						}, 0);
						fireEvent(`Customer applies filter`);
					});

				// if (filterOptions) {
				//   filterOptions.forEach((item) => {
				//     item.addEventListener('click', (e) => {
				//       fireEvent(`Click - ${e.target.innerText} - ${location.pathname} - Page${location.hash.match(/dcp=\d/) || 1}`);
				//     });
				//   });
				// }

				document
					.querySelectorAll(
						`.${ID}-HoF-browse .productFilterList .FilterListItem span.FilterAnchor`
					)
					.forEach((sortItem) => {
						sortItem.addEventListener("click", (e) => {
							document
								.querySelector(`#mobclsfltrs`)
								.dispatchEvent(new Event("click"));
							checkFunction();
						});
					});

				let filterSortbyButton = document.querySelector(
					`.${ID}-HoF-browse .${ID}-btnDiv`
				);
				// let filterSortbySticky = filterSortbyButton.offsetTop;
				// window.onscroll = () => {
				// 	console.log(window.pageYOffset, filterSortbySticky);
				// 	if (window.pageYOffset > filterSortbySticky) {
				// 		filterSortbyButton.classList.add("stickyFilterSort");
				// 	} else {
				// 		filterSortbyButton.classList.remove("stickyFilterSort");
				// 	}
				// };

				window.onscroll = () => {
					let topOff = document
						.querySelector("#prdlistinformation")
						?.getBoundingClientRect().top;
					if (
						filterSortbyButton.classList.contains(
							"stickyFilterSort"
						)
					) {
						topOff = topOff - (70 + 95);
					} else {
						topOff = topOff - 70;
					}
					if (topOff <= 0) {
						filterSortbyButton.classList.add("stickyFilterSort");
					} else {
						filterSortbyButton.classList.remove("stickyFilterSort");
					}
				};

				const callback = function (mutationsList, observer) {
					for (const mutation of mutationsList) {
						if (mutation.type === "childList") {
							checkFunction();
						}
					}
				};

				const observer = new MutationObserver(callback);
				targetNode && observer.observe(targetNode, configNode);

				const callback2 = function (mutationsList, observer) {
					for (const mutation of mutationsList) {
						if (
							targetNodeForHeader.classList.contains(
								"menu-search-shown"
							)
						) {
							filterSortbyButton.classList.add("hasHeaderAb");
						} else {
							filterSortbyButton.classList.remove("hasHeaderAb");
						}
					}
				};
				const btnObserver = new MutationObserver(
					(mutationsList, observer) => {
						const filterSortbyButton = document.querySelector(
							`.${ID}-HoF-browse .${ID}-btnDiv`
						);
						const globalSelectedFilters = document.querySelector(
							"#FiltersAndProductsWrapper .globalSelectedFiltersWrapper"
						);
						if (
							filterSortbyButton.classList.contains(
								"stickyFilterSort"
							)
						) {
							globalSelectedFilters?.classList.add(
								"sticky-selected-items"
							);
							let top =
								filterSortbyButton?.getBoundingClientRect()
									.bottom;
							globalSelectedFilters.style.top = top + "px";
						} else {
							globalSelectedFilters?.classList.remove(
								"sticky-selected-items"
							);
							globalSelectedFilters.style.top = "unset";
						}
					}
				);

				btnObserver.observe(filterSortbyButton, {
					childList: false,
					attributes: true,
					subtree: false,
				});

				const filtersContainer = document.querySelector(
					"#productlistcontainer ul#navlist"
				);
				const filtersObserver = new MutationObserver(
					(mutationsList, observer) => {
						window.position = 0;
					}
				);

				filtersObserver.observe(filtersContainer, {
					childList: true,
					attributes: true,
					subtree: true,
				});

				const observer2 = new MutationObserver(callback2);
				targetNodeForHeader &&
					observer2.observe(targetNodeForHeader, configNodeForHeader);

				let status = true;
				document.addEventListener("click", (e) => {
					if (
						(e.target.classList.contains("FilterListItem") ||
							e.target.closest(".FilterListItem")) &&
						e.target.closest(".MobSortSelector")
					) {
						if (status) {
							window.position = 0;
							fireEvent(`Customer applies sort by ranking`);
							status = false;
						} else {
							status = true;
						}
					}
				});
			}
		);
	}
};
