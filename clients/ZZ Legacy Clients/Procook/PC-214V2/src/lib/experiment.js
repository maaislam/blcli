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
import {
	getFilterBlock,
	createFilterBlock,
	reorderFilterBlocks,
	renameFilterBlock,
	renameFilterOption,
	reorderFilterBlockOptions,
	getFilterOptionsByPattern,
} from "./utils";
const { VARIATION } = shared;

function bindTrackingToFilterOptions() {
	const filters = document.getElementById("filterProducts");

	filters.addEventListener("click", ({ target }) => {
		if (target.nodeName === "INPUT") {
			const block = target
				.closest("dd")
				.parentElement.querySelector("dt")
				.textContent.trim();
			const option = target.value;

			fireEvent(
				`${block} | ${option} | ${target.checked ? "checked" : "unchecked"}`
			);
		}
	});
}

export default () => {
	events.analyticsReference = "ga_ua";

	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		bindTrackingToFilterOptions();

		return;
	}

	(function createPriceFilterBlock() {
		createFilterBlock("Price");

		const priceBlock = getFilterBlock("Price");
		const priceSlider = document.querySelector(
			"#filterProducts div.price-slider-wrapper"
		);

		priceBlock.querySelector("dd").append(priceSlider);
	})();

	if (location.pathname.includes("/shop/tableware-dining/dinner-sets")) {
		reorderFilterBlockOptions("colour", [
			"white",
			"grey",
			"blue",
			"cream",
			"green",
			"multi",
		]);

		reorderFilterBlockOptions("material", [
			"porcelain",
			"bone china",
			"stoneware",
		]);

		reorderFilterBlockOptions("size", "ascending");

		renameFilterBlock("Size", "Set size");
		renameFilterBlock("Range", "Collection");
		renameFilterBlock("Use", "Features");

		reorderFilterBlocks(
			"type",
			"colour",
			"features",
			"set size",
			"material",
			"price",
			"collection"
		);
	}

	if (location.pathname.includes("/shop/tableware-dining/mugs")) {
		renameFilterOption("type", "Latte, Coffee Glasses", "Coffee glasses");
		renameFilterOption("type", "Cups, Saucers", "Cups & Saucers");

		reorderFilterBlockOptions("type", [
			"mugs",
			"cups & saucers",
			"coffee glasses",
		]);

		reorderFilterBlockOptions("material", [
			"bone china",
			"new bone china",
			"stoneware",
			"ceramic",
			"glass",
			"bamboo",
			"plastic",
		]);

		reorderFilterBlockOptions("Colour", [
			"white",
			"blue",
			"grey",
			"green",
			"cream",
			"clear",
			"yellow",
			"brown",
		]);

		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Use", "Features");
		renameFilterBlock("Range", "Collection");

		reorderFilterBlocks(
			"type",
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

	if (location.pathname.includes("/shop/tableware-dining/all-cutlery")) {
		renameFilterOption("Material", "X30Cr13", "X30 Steel");

		reorderFilterBlockOptions("type", [
			"cutlery sets",
			"steak knives",
			"specialist knives",
			"teaspoons",
			"soup spoons",
			"latte spoons",
		]);

		reorderFilterBlockOptions("colour", [
			"silver",
			"black",
			"gold",
			"grey",
			"blue",
			"green",
			"brown",
		]);

		reorderFilterBlockOptions("material", [
			"stainless steel",
			"mixed material",
			"bamboo",
			"x30 steel",
			"plastic",
		]);

		reorderFilterBlockOptions("size", "ascending");

		renameFilterBlock("Range", "Collection");
		renameFilterBlock("Type", "Cutlery type");

		reorderFilterBlocks(
			"cutlery type",
			"colour",
			"material",
			"size",
			"collection",
			"guarantee",
			"price"
		);
	}

	if (
		location.pathname.includes(
			"/shop/tableware-dining/procook-stockholm-stoneware"
		)
	) {
		reorderFilterBlocks("type", "usage", "colour", "size", "price");
	}

	if (location.pathname.includes("/shop/tableware-dining/stoneware")) {
		reorderFilterBlockOptions("Type", [
			"dinner sets",
			"plates",
			"bowls",
			"mugs",
			"serving dishes",
			"oven dishes",
			"jugs, carafes",
			"accessories",
		]);

		reorderFilterBlockOptions("Colour", [
			"blue",
			"grey",
			"cream",
			"green",
			"black",
			"brown",
			"yellow",
		]);

		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Use", "Features");
		renameFilterBlock("Range", "Collection");

		reorderFilterBlocks(
			"type",
			"colour",
			"features",
			"collection",
			"material",
			"set size",
			"price"
		);
	}

	if (location.pathname.includes("/shop/tableware-dining/plates")) {
		renameFilterBlock("Use", "Features");
		renameFilterBlock("Range", "Collection");

		reorderFilterBlockOptions("Colour", [
			"white",
			"blue",
			"cream, ivory",
			"green",
			"grey",
			"multi",
		]);

		reorderFilterBlockOptions("Material", [
			"porcelain",
			"bone china",
			"stoneware",
			"bamboo",
		]);

		reorderFilterBlockOptions("Size", "ascending");

		reorderFilterBlocks(
			"colour",
			"features",
			"material",
			"collection",
			"size",
			"price"
		);
	}

	if (location.pathname.includes("/shop/cookware/induction")) {
		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Use", "Hob type");
		renameFilterBlock("Range", "Collection");
		renameFilterBlock("Type", "Product type");

		const setSizeOptions = getFilterOptionsByPattern("Size", /\d+ Piece/);
		createFilterBlock("Set size", setSizeOptions);

		reorderFilterBlocks(
			"set size",
			"size",
			"hob type",
			"features",
			"product type",
			"collection",
			"material",
			"colour",
			"price",
			"guarantee"
		);
	}

	if (location.pathname.includes("/shop/cookware/frying-pans")) {
		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Use", "Features");
		renameFilterBlock("Type", "Pan type");
		renameFilterBlock("Range", "Collection");

		reorderFilterBlocks(
			"size",
			"features",
			"material",
			"pan type",
			"collection",
			"colour",
			"price",
			"guarantee"
		);
	}

	if (location.pathname.includes("/shop/cookware/saucepans")) {
		renameFilterBlock("Type", "Product type");
		renameFilterBlock("Use", "Features");
		renameFilterBlock("Range", "Collection");
		renameFilterBlock("Colour", "Pan colour");

		const pieceSizeOptions = getFilterOptionsByPattern("Size", /\d+ Piece/);
		createFilterBlock("Set size", pieceSizeOptions);

		reorderFilterBlocks(
			"size",
			"set size",
			"hob type",
			"features",
			"material",
			"product type",
			"collection",
			"pan colour",
			"guarantee",
			"price"
		);
	}

	if (location.pathname.includes("/shop/cookware/stainless-steel")) {
		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Type", "Product type");
		renameFilterBlock("Use", "Features");
		renameFilterBlock("Range", "Collection");
		renameFilterBlock("Colour", "Colour");

		const pieceSizeOptions = getFilterOptionsByPattern("Size", /\d+ Piece/);
		createFilterBlock("Set size", pieceSizeOptions);

		reorderFilterBlocks(
			"size",
			"set size",
			"product type",
			"material",
			"features",
			"hob type",
			"collection",
			"guarantee",
			"price",
			"colour"
		);
	}

	if (location.pathname.includes("/shop/cookware/sets")) {
		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Type", "Product type");
		renameFilterBlock("Use", "Features");
		renameFilterBlock("Range", "Collection");
		renameFilterBlock("Colour", "Pan colour");
		renameFilterBlock("Size", "Set size");

		reorderFilterBlocks(
			"features",
			"material",
			"collection",
			"pan colour",
			"set size",
			"guarantee",
			"price"
		);
	}

	if (
		location.pathname.includes("/shop/knives-scissors/knife-sets-knife-blocks")
	) {
		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Range", "Collection");

		reorderFilterBlocks(
			"type",
			"material",
			"size",
			"price",
			"collection",
			"colour",
			"guarantee"
		);
	}

	if (location.pathname.includes("/shop/knives-scissors/chefs-knives")) {
		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Range", "Collection");

		const bladeLengthOptions = getFilterOptionsByPattern(
			"Size",
			/(\d+cm)(?! )/g
		);
		createFilterBlock("Blade length", bladeLengthOptions);

		reorderFilterBlocks(
			"type",
			"price",
			"material",
			"collection",
			"blade length",
			"size",
			"guarantee",
			"colour"
		);
	}

	if (
		location.pathname.includes("/shop/knives-scissors/knife-sets-with-blocks")
	) {
		reorderFilterBlockOptions("Size", "ascending");

		renameFilterBlock("Range", "Collection");

		reorderFilterBlocks(
			"type",
			"size",
			"price",
			"material",
			"collection",
			"colour",
			"guarantee"
		);
	}

	if (location.pathname.includes("/shop/knives-scissors/damascus-67")) {
		reorderFilterBlockOptions("Size", "ascending");

		const setsOptions = getFilterOptionsByPattern("Type", /Sets/gi);
		createFilterBlock("Set type", setsOptions);

		const bladeLengthOptions = getFilterOptionsByPattern(
			"Size",
			/(\d+cm)(?! )/g
		);
		createFilterBlock("Blade length", bladeLengthOptions);

		renameFilterBlock("Range", "Collection");
		renameFilterBlock("Type", "Product type");

		reorderFilterBlocks(
			"product type",
			"set type",
			"size",
			"blade length",
			"price",
			"material",
			"guarantee",
			"colour",
			"collection"
		);
	}

	if (
		location.pathname.includes("shop/knives-scissors/professional-x50-micarta")
	) {
		reorderFilterBlockOptions("Size", "ascending");

		const setsOptions = getFilterOptionsByPattern("Type", /Sets/gi);
		createFilterBlock("Set type", setsOptions);

		const bladeLengthOptions = getFilterOptionsByPattern(
			"Size",
			/(\d+cm)(?! )/g
		);
		createFilterBlock("Blade length", bladeLengthOptions);

		renameFilterBlock("Range", "Collection");
		renameFilterBlock("Type", "Product type");

		reorderFilterBlocks(
			"product type",
			"set type",
			"size",
			"blade length",
			"price",
			"material",
			"guarantee",
			"colour",
			"collection",
			"new block"
		);
	}

	bindTrackingToFilterOptions();
};
