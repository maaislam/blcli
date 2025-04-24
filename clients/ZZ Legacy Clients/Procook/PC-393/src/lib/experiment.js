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
import Accordion from "./Accordion";
import smoothscroll from "smoothscroll-polyfill";

const { ID, VARIATION } = shared;

events.analyticsReference = "ga_ua";

export default (sets) => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	smoothscroll.polyfill();

	function getSetAccordion(dom) {
		const accordions = dom.querySelectorAll(".accordion");

		for (let i = 0; i < accordions.length; i++) {
			const header = accordions[i].querySelector(".accordion-header h2");

			if (header.textContent === "This set contains") {
				return accordions[i];
			}
		}
	}

	function normalisePrice(number) {
		return parseFloat(number).toFixed(2).toString().replace(/\.00$/, "");
	}

	function getSetData(sets) {
		return Promise.all(
			[...sets].map(async (set) => {
				const price = normalisePrice(
					[
						...set.querySelector(
							".featured-product-price span[itemprop='price']"
						).textContent,
					]
						.slice(1)
						.join("")
				);
				const name = set
					.querySelector(".featured-product-name")
					.textContent.trim();
				const url = set.querySelector("a.featured-product-content").href;
				const img = set.querySelector(".featured-product-image img").src;

				const setDOM = await fetch(url)
					.then((res) => res.text())
					.then((html) => new DOMParser().parseFromString(html, "text/html"));
				const setAccordion = getSetAccordion(setDOM);
				const setProducts = setAccordion.querySelectorAll(".featured-product");

				const individualPrice = +[...setProducts].reduce((prev, curr) => {
					const price = curr.querySelector(
						".featured-product-price span[itemprop='price']"
					).textContent;
					const priceNumber = parseFloat(price.replace(/[^0-9.]/g, ""));
					return prev + priceNumber;
				}, 0);

				const saving = normalisePrice(individualPrice - price);
				const savingPercentage = Math.floor(
					((saving / individualPrice) * 100).toFixed(2)
				);
				const pieces = name.toLowerCase().match(/(\d+) piece/)[1] || 0;

				return {
					name,
					price,
					url,
					img,
					saving,
					savingPercentage,
					pieces,
				};
			})
		);
	}

	function SetDropdown() {
		const el = document.createElement("details");
		el.classList.add(`${ID}-set-dropdown`);

		el.innerHTML = /* html */ `
			<summary class="${ID}-set-dropdown__summary">
				<div>Need a full set?</div>
				<span class="${ID}-set-dropdown__summary-arrow"></span>
			</summary>
			<div class="${ID}-set-dropdown__content">
				Loading...
			</div>
		`;

		return el;
	}

	function addDropdownContent(data) {
		const entry = document.querySelector(`.${ID}-set-dropdown__content`);
		entry.innerHTML = /* html */ `
		<ul class="${ID}-set-dropdown__content-list">
				${data
					.map(
						(d) => /* html */ `
				<li class="${ID}-set-dropdown__content-item">
					<a href="${d.url}" class="${ID}-set-dropdown__content-item-faux-link">
						<span  class="${ID}-visually-hidden">${d.name}</span>
					</a>
					<div class="${ID}-set-dropdown__content-item-wrapper">
						<div class="${ID}-set-dropdown__content-item-image">
							<img src="${d.img}" alt="${d.name}" />
						</div>
						<div class="${ID}-set-dropdown__content-item-content">
							<h3 class="${ID}-set-dropdown__content-item-name">${d.name}</h3>
							<div class="${ID}-set-dropdown__content-item-pricing">
								<span class="${ID}-set-dropdown__content-item-price">£${d.price}</span>
								<span class="${ID}-set-dropdown__content-item-saving">Set saving <strong>£${d.saving}</strong></span>
							</div>
						</div>
					</div>
				</li>
				`
					)
					.join("")}
					${
						data.length > 4
							? /* html */ `<button class="${ID}-set-dropdown__see-all">See all sets</button>`
							: ""
					}
				</ul>
		`;

		const largestSavingPercentage = Math.max(
			...data.map((s) => s.savingPercentage)
		);
		const summary = document.querySelector(`.${ID}-set-dropdown__summary div`);

		summary.insertAdjacentHTML(
			"beforeend",
			`<span>Save up to <strong>${largestSavingPercentage}%</strong></span>`
		);
	}

	const entry = document.querySelector(".product-featured");
	const dropdown = new SetDropdown();

	if (entry) {
		entry.insertAdjacentElement("beforebegin", dropdown);
	}

	// Check if animate method is supported in browser
	// eslint-disable-next-line
	if (!!document.createElement("canvas").animate) {
		new Accordion(dropdown);
	}

	getSetData(sets).then((setData) => {
		const GRID_GAP_SIZE = 12;
		const MAX_VISIBLE_ITEMS = 3;
		let itemHeight;

		function setContentHeight() {
			const list = document.querySelector(`.${ID}-set-dropdown__content-list`);
			const items = list.querySelectorAll(`.${ID}-set-dropdown__content-item`);
			const button = list.querySelector(`.${ID}-set-dropdown__see-all`);

			const height =
				items.length > MAX_VISIBLE_ITEMS
					? itemHeight * MAX_VISIBLE_ITEMS + GRID_GAP_SIZE * MAX_VISIBLE_ITEMS
					: itemHeight * items.length + GRID_GAP_SIZE * items.length;

			list.style.height = `${
				height + (button ? button.offsetHeight : itemHeight / 2)
			}px`;
		}

		function setMaxItemHeight() {
			const list = document.querySelector(`.${ID}-set-dropdown__content-list`);

			itemHeight = Math.max(
				...[...list.querySelectorAll(`.${ID}-set-dropdown__content-item`)].map(
					(i) => i.offsetHeight
				)
			);
		}

		const sortedByPieces = [...setData]
			.sort((a, b) => a.pieces - b.pieces)
			.filter((set) => set.saving > 0);

		if (sortedByPieces.length > 0) {
			addDropdownContent(sortedByPieces);

			(function handleSeeAllButton() {
				const button = document.querySelector(`.${ID}-set-dropdown__see-all`);
				const list = document.querySelector(
					`.${ID}-set-dropdown__content-list`
				);

				if (button) {
					fireEvent("See all sets button available");

					button.addEventListener("click", () => {
						setMaxItemHeight();
						setContentHeight();

						list.classList.add(`${ID}-expanded`);

						list.scrollBy({
							top:
								itemHeight * MAX_VISIBLE_ITEMS +
								GRID_GAP_SIZE * MAX_VISIBLE_ITEMS,
							behavior: "smooth",
						});

						button.remove();

						fireEvent("See all sets clicked");

						new ResizeObserver(() => {
							setMaxItemHeight();
							setContentHeight();
						}).observe(list);
					});
				}
			})();

			const links = document.querySelectorAll(
				`.${ID}-set-dropdown__content-item-faux-link`
			);

			// Tracking
			new IntersectionObserver((i) => {
				if (i[0].isIntersecting) {
					fireEvent("Element in view");
				}
			}).observe(dropdown);

			links.forEach((el) => {
				el.addEventListener("click", () => {
					fireEvent("Product click");
				});
			});
		} else {
			document.querySelector(`.${ID}-set-dropdown`).remove();
		}
	});
};
