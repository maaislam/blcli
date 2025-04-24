export function getFilterElement(filterName) {
	const filterListItems = document.querySelectorAll("#filterProducts .filter");

	for (let i = 0; i < filterListItems.length; i += 1) {
		if (
			filterListItems[i].querySelector(".vsa-item__heading").textContent.toLowerCase().trim() ==
			filterName
		) {
			return filterListItems[i];
		}
	}
}

export function getFilterListElement(filter, filterName) {
	const filterListItems = filter.querySelectorAll("ul li");

	for (let i = 0; i < filterListItems.length; i += 1) {
		if (
			filterListItems[i].querySelector(".filterLabelText").textContent.toLowerCase().trim() ==
			filterName
		) {
			return filterListItems[i];
		}
	}
}

export function reorderFilters(...filterNames) {
	const filterList = document.querySelector("#filterProducts .filterBoxOptions");

	const newFilterList = filterNames.map((filterName) => getFilterElement(filterName)).reverse();

	newFilterList.forEach((filter) => {
		if (filter) filterList.prepend(filter);
	});
}

export function renameFilterHeading(filter, text) {
	filter.querySelector(":scope > .filterBox > .filterBoxTitle > p").textContent = text;
}

export function renameFilterLabel(name, newName) {
	const allFilterLabels = document.querySelectorAll(".filterBoxDropDown ul li .filterLabelText");

	allFilterLabels.forEach((label) => {
		if (label.textContent.toLowerCase().trim() == name.toLowerCase().trim()) {
			label.textContent = newName;
		}
	});
}

export function reorderListItems(list, ...filterNames) {
	const listItems = list.querySelectorAll(":scope > li");

	const newListItems = filterNames
		.map((filterName) => {
			for (let i = 0; i < listItems.length; i += 1) {
				if (
					listItems[i].querySelector(".filterLabelText").textContent.toLowerCase().trim() ==
					filterName
				) {
					return listItems[i];
				}
			}
		})
		.reverse();

	newListItems.forEach((listItem) => {
		if (listItem) list.prepend(listItem);
	});
}

export function removeFilterWithTextPattern(filter, pattern) {
	const sizeFilter = getFilterElement(filter);
	const filterItems = sizeFilter.querySelectorAll(".filterBoxDropDown > ul > li");

	filterItems.forEach((filterItem) => {
		const label = filterItem.querySelector(".filterLabelText");
		if (label.textContent.match(pattern) != null) {
			filterItem.remove();
		}
	});
}

export function replacePartOfFilterLabelText(filter, toReplace, replacement) {
	const sizeFilter = getFilterElement(filter);
	const filterItems = sizeFilter.querySelectorAll(".filterBoxDropDown > ul > li");

	filterItems.forEach((filterItem) => {
		const label = filterItem.querySelector(".filterLabelText");
		if (label.textContent.toLowerCase().includes(toReplace.toLowerCase())) {
			label.textContent = filterItem
				.querySelector(".filterLabelText")
				.textContent.replace(toReplace, replacement)
				.trim();
		}
	});
}

export function createNewFilterSection(name) {
	const filter = document.createElement("div");
	filter.classList.add("filter");

	filter.innerHTML = /* html */ `
		<div id="filterMaterial" class="filterBox">
			<div class="filterBoxTitle">
				<p>${name}</p>
				<span class="toggleFilterMinus"></span>
			</div>
		</div>
		<div class="filterBoxDropDown">
			<ul></ul>
		</div>
	`;

	document.querySelector("#filterProducts .filterBoxOptions").append(filter);
}

export function combineFilters(filter) {
	function findDuplicates(filterName) {
		const filterEl = getFilterElement(filterName);
		const filterItems = filterEl.querySelectorAll(".filterBoxDropDown > ul > li");
		const duplicateFilters = [];

		for (let i = 0; i < filterItems.length; i += 1) {
			for (let j = 0; j < filterItems.length; j += 1) {
				const currentFilterName = filterItems[i].querySelector(".filterLabelText").textContent;
				const nextFilterName = filterItems[j].querySelector(".filterLabelText").textContent;
				if (
					currentFilterName == nextFilterName &&
					i !== j &&
					duplicateFilters.flat().some((f) => f == filterItems[i]) == false
				) {
					duplicateFilters.push([filterItems[i], filterItems[j]]);
				}
			}
		}
		return duplicateFilters;
	}

	const duplicates = findDuplicates(filter);

	duplicates.forEach((d) => {
		d.forEach((i) => {
			i.style.display = "none";
		});
	});

	const filterText = [
		...new Set(
			duplicates.flat().map((i) => i.querySelector(".filterLabelText").textContent.trim())
		),
	][0];

	const params = duplicates
		.flat()
		.map((curr) => {
			const filterParameter = curr.querySelector("input").value.toLowerCase().replaceAll(" ", "");

			return filterParameter;
		})
		.join("+");

	const newFilterItem = document.createElement("li");
	newFilterItem.innerHTML = /* html */ `
			<div class="filterInput">
				<label for="filterSizeOption" class="checkbox-label">
					<input type="checkbox" class="filterSize selsts" name="ranges[]" value=" ">
					<span class="checkbox"></span>
				</label>
			</div>
			<label for="filterSizeOption8" class="filterText">
				<span class="filterLabelText">${filterText}</span> (<span class="count">2</span>)
			</label>
			<span class="clear"></span>
		`;

	const filterList = getFilterElement(filter).querySelector("ul");
	filterList.prepend(newFilterItem);

	const newInput = newFilterItem.querySelector("input");

	if (location.search.includes(params)) {
		newInput.checked = true;
	}

	function updateProductCount() {
		const productCount = duplicates.flat().reduce((p, c) => {
			const count = +c.querySelector("span.count").textContent;

			return p + count;
		}, 0);

		newFilterItem.querySelector("span.count").textContent = productCount;
	}

	updateProductCount();

	function toggleFilter() {
		if (newInput.checked == false) {
			newInput.checked = true;
			location.search = "filter_products=" + getUrlParameter("filter_products") + `+${params}`;
		} else {
			newInput.checked = false;
			location.search = "filter_products=" + getUrlParameter("filter_products").replace(params, "");
		}
	}

	function findCorrespondingSelectedFilters() {
		if (newInput.checked == true) {
			const checkedList = document.querySelector(".currently-selected-filters");
			const selectedFilters = checkedList.querySelectorAll(".currently-selected-filter");
			const textToMatch = duplicates
				.flat()
				.map((i) => i.querySelector(".filterLabelText").textContent.trim());

			for (let i = 0; i < selectedFilters.length; i += 1) {
				for (let j = 0; j < textToMatch.length; j += 1) {
					if (
						selectedFilters[i].textContent.includes(textToMatch[j]) &&
						!selectedFilters[i].classList.contains("added-filter")
					) {
						selectedFilters[i].style.display = "none";
					}
				}
			}

			const newSelectedFilter = document.createElement("div");
			newSelectedFilter.classList.add("currently-selected-filter", "added-filter");
			newSelectedFilter.textContent = filterText;

			if (!document.querySelector(".added-filter")) {
				checkedList.prepend(newSelectedFilter);
				newSelectedFilter.addEventListener("click", () => toggleFilter());
			}
		}
	}

	findCorrespondingSelectedFilters();

	newFilterItem.addEventListener("click", () => {
		updateProductCount();
		toggleFilter();
	});

	document.getElementById("filterProducts").addEventListener("click", () => {
		findCorrespondingSelectedFilters();
		updateProductCount();
	});
}

export const getUrlParameter = (name, url) => {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
	const regexS = `[\\?&]${name}=([^&#]*)`;
	const regex = new RegExp(regexS);
	const results = regex.exec(url);
	return results == null ? null : results[1];
};
