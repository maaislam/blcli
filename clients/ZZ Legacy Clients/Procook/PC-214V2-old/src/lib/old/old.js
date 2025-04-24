/**
 * PC-214 - Filters hierarchy & improvements
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import renameFilters from "./changes/renameFilters";
import reorderFilterSections from "./changes/reorderFilterSections";
import splitSetSize from "./changes/splitSetSize";
import generateFeatures from "./changes/generateFeatures";
import knifeCategoryChanges from "./changes/knifeCategoryChanges";
import reorderFilterOptions from "./changes/reorderFilterOptions";

export default function old() {
	const url = window.location.pathname;
	const allFilters = document.querySelectorAll(
		"#filterProducts .filterBoxOptions .filter:not(.price-slider-wrapper)"
	);
	renameFilters(url, allFilters);

	reorderFilterSections(url, allFilters);

	// --- Split Set Size / Size
	splitSetSize(url, allFilters);

	// --- Features Section
	generateFeatures(url, allFilters);

	/**
	 * @desc ONLY for Knives PLPs
	 */
	if (
		url == "/shop/knives-scissors/knife-sets-knife-blocks" ||
		url == "/shop/knives-scissors/chefs-knives" ||
		url == "/shop/knives-scissors/knife-sets-with-blocks" ||
		url == "/shop/knives-scissors/damascus-67" ||
		url == "/shop/knives-scissors/procook-professional-x50"
	) {
		knifeCategoryChanges(url, allFilters);
	}

	// --- For all pages - Reorder filter options
	reorderFilterOptions(url, allFilters);
}
