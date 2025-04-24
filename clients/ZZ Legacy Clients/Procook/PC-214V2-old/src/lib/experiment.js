/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import old from "./old/old";
import {
	getFilterElement,
	reorderListItems,
	renameFilterHeading,
	renameFilterLabel,
	reorderFilters,
	removeFilterWithTextPattern,
	replacePartOfFilterLabelText,
	createNewFilterSection,
	getFilterListElement,
	combineFilters,
} from "./utils";

const { VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	(function appendPriceSliderToFilterList() {
		const priceSlider = document.querySelector(".price-slider-wrapper");
		priceSlider.classList.add("filter");

		const filters = document.querySelectorAll("#filterProducts .filterBoxOptions > .filter");

		for (let i = 0; i < filters.length; i += 1) {
			const filterHeading = filters[i].querySelector(".filterBoxTitle p").textContent.trim();

			if (filterHeading == "Price") {
				return filters[i].appendChild(priceSlider);
			}
		}
	})();

	if (
		location.pathname.includes("/shop/knives-scissors/knife-sets-knife-blocks") ||
		location.pathname.includes("/shop/knives-scissors/chefs-knives") ||
		location.pathname.includes("/shop/knives-scissors/knife-sets-with-blocks") ||
		location.pathname.includes("/shop/knives-scissors/damascus-67") ||
		location.pathname.includes("/shop/knives-scissors/procook-professional-x50") ||
		location.pathname.includes("/shop/cookware/induction") ||
		location.pathname.includes("/shop/cookware/frying-pans") ||
		location.pathname.includes("/shop/cookware/saucepans") ||
		location.pathname.includes("/shop/cookware/stainless-steel") ||
		location.pathname.includes("/shop/cookware/sets")
	) {
		old();
	} else {
		if (location.pathname.includes("/shop/tableware-dining/dinner-sets")) {
			const coloursList = getFilterElement("colour").querySelector("ul");
			reorderListItems(coloursList, "white", "grey", "blue", "cream", "green", "multi");

			const sizeList = getFilterElement("size").querySelector("ul");
			reorderListItems(sizeList, "20 piece", "16 piece", "12 piece");

			const materialList = getFilterElement("material").querySelector("ul");
			reorderListItems(materialList, "porcelain", "bone china", "stoneware");

			renameFilterHeading(getFilterElement("size"), "Set size");
			renameFilterHeading(getFilterElement("range"), "Collection");
			renameFilterHeading(getFilterElement("usage"), "Features");

			reorderFilters("type", "colour", "features", "set size", "material", "price", "collection");
		}

		if (location.pathname.includes("/shop/tableware-dining/all-cutlery")) {
			renameFilterLabel("X30Cr13", "X30 Steel");

			replacePartOfFilterLabelText("size", "Knife Sets", "");

			combineFilters("size");

			const typeList = getFilterElement("type").querySelector("ul");
			reorderListItems(
				typeList,
				"cutlery sets",
				"steak knives",
				"specialist knives",
				"teaspoons",
				"soup spoons",
				"latte spoons"
			);

			const colourList = getFilterElement("colour").querySelector("ul");
			reorderListItems(colourList, "silver", "black", "gold", "grey", "blue", "green", "brown");

			const materialList = getFilterElement("material").querySelector("ul");
			reorderListItems(
				materialList,
				"stainless steel",
				"mixed material",
				"bamboo",
				"x30 steel",
				"plastic"
			);

			const sizeList = getFilterElement("size").querySelector("ul");
			reorderListItems(
				sizeList,
				"28 piece",
				"16 piece",
				"8 piece",
				"6 piece",
				"4 piece",
				"3 piece",
				"2 piece"
			);

			removeFilterWithTextPattern("size", /\d+cm/);

			renameFilterHeading(getFilterElement("range"), "Collection");
			renameFilterHeading(getFilterElement("size"), "Set size");
			renameFilterHeading(getFilterElement("type"), "Cutlery type");

			reorderFilters(
				"cutlery type",
				"set size",
				"colour",
				"material",
				"collection",
				"guarantee",
				"price"
			);
		}

		if (location.pathname.includes("/shop/tableware-dining/mugs")) {
			renameFilterLabel("Latte, Coffee Glasses", "Coffee glasses");
			renameFilterLabel("Cups, Saucers", "Cups & Saucers");

			const typeList = getFilterElement("type").querySelector("ul");
			reorderListItems(typeList, "mugs", "Cups & Saucers", "Coffee glasses");

			const materialList = getFilterElement("material").querySelector("ul");
			reorderListItems(
				materialList,
				"bone china",
				"new bone china",
				"stoneware",
				"ceramic",
				"glass",
				"bamboo",
				"plastic"
			);

			const colourList = getFilterElement("colour").querySelector("ul");
			reorderListItems(
				colourList,
				"white",
				"blue",
				"grey",
				"green",
				"cream",
				"clear",
				"yellow",
				"brown"
			);

			const cupSizeList = getFilterElement("size").querySelector("ul");
			reorderListItems(cupSizeList, "110ml", "300ml", "360ml", "400ml");

			renameFilterHeading(getFilterElement("usage"), "Features");
			renameFilterHeading(getFilterElement("range"), "Collection");
			renameFilterHeading(getFilterElement("size"), "Cup size");

			createNewFilterSection("Set size");

			getFilterElement("set size")
				.querySelector("ul")
				.append(getFilterListElement(getFilterElement("cup size"), "4 piece"));

			reorderFilters(
				"type",
				"material",
				"colour",
				"cup size",
				"set size",
				"features",
				"collection",
				"price"
			);
		}

		if (location.pathname.includes("/shop/tableware-dining/procook-stockholm-stoneware")) {
			reorderFilters("type", "usage", "colour", "size", "price");
		}

		if (location.pathname.includes("/shop/tableware-dining/stoneware")) {
			removeFilterWithTextPattern("size", /\d+(cm|L|ml)/);
			removeFilterWithTextPattern("size", /\b(Small|Medium|Large)\b/gi);

			const sizeList = getFilterElement("size").querySelector("ul");
			reorderListItems(
				sizeList,
				"20 piece",
				"16 piece",
				"12 piece",
				"4 piece",
				"3 piece",
				"2 piece"
			);

			const typeList = getFilterElement("type").querySelector("ul");
			reorderListItems(
				typeList,
				"dinner sets",
				"plates",
				"bowls",
				"mugs",
				"serving dishes",
				"oven dishes",
				"jugs, carafes",
				"accessories"
			);

			const colourList = getFilterElement("colour").querySelector("ul");
			reorderListItems(colourList, "blue", "grey", "cream", "green", "black", "brown", "yellow");

			renameFilterHeading(getFilterElement("usage"), "Features");
			renameFilterHeading(getFilterElement("range"), "Collection");
			renameFilterHeading(getFilterElement("size"), "Set size");

			reorderFilters("type", "colour", "features", "collection", "material", "set size", "price");
		}

		if (location.pathname.includes("/shop/tableware-dining/plates")) {
			renameFilterHeading(getFilterElement("usage"), "Features");
			renameFilterHeading(getFilterElement("range"), "Collection");

			const colourList = getFilterElement("colour").querySelector("ul");
			reorderListItems(colourList, "white", "blue", "cream, ivory", "green", "grey", "multi");

			const materialList = getFilterElement("material").querySelector("ul");
			reorderListItems(materialList, "porcelain", "bone china", "stoneware", "bamboo");

			reorderFilters("colour", "features", "material", "collection", "size", "price");
		}
	}
};
