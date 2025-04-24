function cleanString(string) {
	return string.toLowerCase().trim();
}

function getFilterBlockOption(filterBlock, option) {
	const filterOptions =
		getFilterBlock(filterBlock).querySelectorAll("dd > div");

	for (let i = 0; i < filterOptions.length; i += 1) {
		if (cleanString(filterOptions[i].textContent) === cleanString(option)) {
			return filterOptions[i];
		}
	}
}

export function getFilterOptionsByPattern(block, pattern) {
	const filterOptions = getFilterBlock(block).querySelectorAll("dd > div");

	const filtered = [...filterOptions].filter((o) =>
		o.textContent.match(pattern)
	);

	return filtered;
}

export function getFilterBlock(name) {
	const filterBlocks = document.querySelectorAll(
		"#filterProducts dl.vsa-list > div.filter"
	);

	for (let i = 0; i < filterBlocks.length; i += 1) {
		const heading = filterBlocks[i].querySelector(
			"dt.vsa-item__heading > button"
		).textContent;

		if (cleanString(heading) == cleanString(name)) {
			return filterBlocks[i];
		}
	}
}

export function createFilterBlock(name, options = []) {
	const markup = /* html */ `
	<div class="vsa-item filter vsa-item--is-active">
		<dt class="vsa-item__heading">
			<button type="button" class="vsa-item__trigger">
				<span class="vsa-item__trigger__content">
					${name}
				</span>
				<span class="vsa-item__trigger__icon vsa-item__trigger__icon--is-default vsa-item__trigger__icon--is-active"></span>
			</button>
		</dt>
		<dd class="vsa-item__content"></dd>
	</div>`;

	const filterList = document.querySelector("#filterProducts dl.vsa-list");
	filterList.insertAdjacentHTML("afterbegin", markup);

	const filterBlockRef = getFilterBlock(name);

	const stateElements = {
		block: filterBlockRef,
		icon: filterBlockRef.querySelector("span.vsa-item__trigger__icon"),
	};

	function setInactive() {
		stateElements.block.classList.remove("vsa-item--is-active");
		stateElements.icon.classList.remove("vsa-item__trigger__icon--is-active");
	}

	function setActive() {
		stateElements.block.classList.add("vsa-item--is-active");
		stateElements.icon.classList.add("vsa-item__trigger__icon--is-active");
	}

	const toggleButton = filterBlockRef.querySelector("dt button");

	toggleButton.addEventListener("click", () => {
		if (stateElements.block.classList.contains("vsa-item--is-active")) {
			setInactive();
		} else {
			setActive();
		}
	});

	if (options.length > 0) {
		options.forEach((option) => {
			filterBlockRef.querySelector("dd").append(option);
		});
	}
}

export function reorderFilterBlocks(...blockNames) {
	const filterBlocksContainer = document.querySelector(
		"#filterProducts dl.vsa-list"
	);

	const newFilterList = blockNames
		.map((name) => getFilterBlock(name))
		.reverse();

	newFilterList.forEach((filter) => {
		if (filter) filterBlocksContainer.prepend(filter);
	});
}

export function renameFilterBlock(block, newName) {
	getFilterBlock(block).querySelector("dt button").textContent = newName;
}

export function renameFilterOption(block, option, newName) {
	getFilterBlockOption(block, option).querySelector("label").textContent =
		newName;
}

export function reorderFilterBlockOptions(block, options) {
	const blockOptionsContainer = getFilterBlock(block).querySelector("dd");

	let ordered;

	if (typeof options === "string") {
		const filterOptions = getFilterBlock(block).querySelectorAll("dd > div");

		const sorted = [...filterOptions]
			.map((o) => [
				o.textContent.match(/\d+/g) ? o.textContent.match(/\d+/g)[0] : 0,
				o.textContent,
			])
			.sort((a, b) => {
				return a[0] - b[0];
			})
			.map((o) => getFilterBlockOption(block, o[1]));

		if (options === "ascending") {
			ordered = sorted.reverse();
		} else if (options === "descending") {
			ordered = sorted;
		}
	} else {
		ordered = options
			.map((filterName) => getFilterBlockOption(block, filterName))
			.reverse();
	}

	ordered.forEach((filter) => {
		if (filter) blockOptionsContainer.prepend(filter);
	});
}
