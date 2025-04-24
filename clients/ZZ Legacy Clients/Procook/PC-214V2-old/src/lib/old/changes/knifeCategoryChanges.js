import shared from "../../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../../lib/utils";
import knifeRange from "../knife_range";

const { ID } = shared;

export default (url) => {
	if (
		url == "/shop/knives-scissors/knife-sets-knife-blocks" ||
		url == "/shop/knives-scissors/chefs-knives" ||
		url == "/shop/knives-scissors/knife-sets-with-blocks"
	) {
		pollerLite([`#range`], () => {
			const getRangeOptions = document.querySelectorAll(`#range ul li`);
			[].forEach.call(getRangeOptions, (opt) => {
				const optText = opt.querySelector("label").innerText.trim();
				opt.querySelector("label").classList.add(`${ID}-bold`);
				if (knifeRange[`${optText}`]) {
					opt
						.querySelector("label")
						.insertAdjacentHTML(
							"afterend",
							`<span class="${ID}-subtext">${knifeRange[`${optText}`]}</span>`
						);
				}
			});
		});
	}

	if (
		url == "/shop/knives-scissors/chefs-knives" ||
		url == "/shop/knives-scissors/damascus-67" ||
		url == "/shop/knives-scissors/procook-professional-x50"
	) {
		let allSizes = document.querySelectorAll(`.filter#size .filterBoxDropDown ul li`);
		document.querySelector(".filter#size .filterBoxTitle p").innerText = "Blade length";

		// --- MOVE Blade length section
		if (url == "/shop/knives-scissors/chefs-knives") {
			document
				.querySelector(`.filter#${ID}-guarantee`)
				.insertAdjacentElement("beforebegin", document.querySelector(".filter#size"));
		} else if (
			url == "/shop/knives-scissors/damascus-67" ||
			url == "/shop/knives-scissors/procook-professional-x50"
		) {
			pollerLite([`#set-size ul li`], () => {
				setTimeout(() => {
					document
						.querySelector(`.filter#${ID}-price`)
						.insertAdjacentElement("beforebegin", document.querySelector(".filter#size"));
				}, 1000);
			});
		}

		// --- Loop through remaining Sizes and remove any that do NOT have 'cm'
		allSizes = document.querySelectorAll(`.filter#size .filterBoxDropDown ul li`);
		[].forEach.call(allSizes, (size) => {
			const sizeText = size.querySelector(".filterText").innerText.trim();

			if (url == "/shop/knives-scissors/chefs-knives") {
				if (sizeText.toLowerCase().indexOf("piece") > -1) {
					size.setAttribute("style", "display: none;");
				}
			} else if (url == "/shop/knives-scissors/damascus-67") {
				if (sizeText.toLowerCase().indexOf("storage") > -1) {
					size.setAttribute("style", "display: none;");
				}
			}
		});
	}

	// --- Materials - Hide any 'Steel' material from Storage Materials
	if (
		url == "/shop/knives-scissors/knife-sets-knife-blocks" ||
		url == "/shop/knives-scissors/knife-sets-with-blocks"
	) {
		const allMaterials = document.querySelectorAll(`.filter#material .filterBoxDropDown ul li`);
		[].forEach.call(allMaterials, (mat) => {
			const matText = mat.querySelector(".filterText").innerText.trim();
			if (matText.toLowerCase().indexOf("steel") > -1) {
				mat.setAttribute("style", "display: none;");
			}
		});
	}
};
