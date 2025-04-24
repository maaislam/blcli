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
	console.log(`%c${ID}-${VARIATION}`, `color: green; font-size: 30px`);
	// -----------------------------
	// Add events that apply to both variant and control
	// -----------------------------
	// ...

	// -----------------------------
	// If control, bail out from here
	// -----------------------------
	if (shared.VARIATION == "control") {
		return;
	}

	// Write experiment code here
	// ...

	pollerLite([`#filterlist li.productFilter`], () => {
		const productFilterList = document.querySelectorAll(
			`#filterlist li.productFilter`
		);
		productFilterList.forEach((filter) => {
			// console.log(filter.querySelector(`.productFilterTitle`).innerText.trim());
			if (
				filter.querySelector(`.productFilterTitle`).innerText.trim() !=
				"Price"
			) {
				// let id = filter.querySelector(`.productFilterTitle`).innerText.trim();
				let productFilterList =
					filter.querySelector(`.productFilterList`);
				let totalCounts = 0;
				let filterName =
					productFilterList.querySelector(`.FilterListItem`)
						?.classList[1];
				let dataItem = `${filterName}^`;
				pollerLite(
					[
						() => {
							// console.log(`polling....`);
							return (
								productFilterList.querySelectorAll(
									".FilterListItem"
								).length > 0
							);
						},
					],
					() => {
						const filterList =
							productFilterList.querySelectorAll(
								".FilterListItem"
							);
						filterList.forEach((filterItem, i) => {
							// console.log(filterItem.getAttribute("data-productname"), parseInt(filterItem.getAttribute("data-productcount")));
							let data = filterItem
								.querySelector(
									"a.FilterAnchor span[role='checkbox']"
								)
								?.getAttribute("data-item")
								?.split("^")[1];
							// parseInt(filterItem.getAttribute("data-productcount")) > 0 && console.log(data);

							if (
								parseInt(
									filterItem.getAttribute("data-productcount")
								) > 0
							) {
								if (i === filterList.length - 1) {
									dataItem += `${data}`;
								} else {
									dataItem += `${data},`;
								}
							}

							totalCounts += parseInt(
								filterItem.getAttribute("data-productcount")
							);
						});
					}
				);
				totalCounts === 0 && (dataItem = "");
				console.log(totalCounts, dataItem);
				let selectAll = document.createElement("div");
				selectAll.classList.add(`${ID}--select-all`, `FilterListItem`);
				selectAll.innerHTML = `<a href="javascript:void(0)" class="FilterAnchor" onclick="SetVal(event, '${filterName}', '',this)">
        <span role="checkbox" data-item="${dataItem}" class="SelectableFilter" aria-checked="false" data-filter-type="deindexed" data-url-order="1" data-priority="0">
          <span class="FilterName" data-filtername="Select All" data-parsedfiltername="Select All"> Select All </span>
          <span class="FilterValue"> (${totalCounts}) </span>
        </span></a>`;
				totalCounts > 0 &&
					productFilterList.insertAdjacentElement(
						"afterbegin",
						selectAll
					);
				// selectAll.addEventListener("click", () => {
				//   productFilterList.querySelectorAll(".FilterListItem").forEach((filterItem) => {
				//     if (!filterItem.classList.contains(`${ID}--select-all`)) {
				//       console.log(filterItem);
				//       // console.log(filterItem.querySelector(`a.FilterAnchor`));
				//       filterItem.querySelector(`a.FilterAnchor`)?.click();
				//     }
				//   });
				// });
				// console.log(filter.querySelector(`.productFilterTitle`).innerText.trim(), totalCounts);
			}
		});
	});
};
