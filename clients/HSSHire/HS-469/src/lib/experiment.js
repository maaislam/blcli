/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default (data) => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	function ProductGrid() {
		const element = document.createElement("ul");
		element.classList.add(`${ID}-product-grid`);
		return element;
	}

	// prettier-ignore
	function ProductCard({title, image, url, reviews, extras = []}) {
		const element = document.createElement("li");
		element.classList.add(`${ID}-product-card`);
		element.innerHTML = /* html */ `
		<div class="${ID}-product-card__body">
			<div class="${ID}-product-card__image">
				<a href="${url}">
					<img src="${image}" alt="${title}" />
				</a>
			</div>
			<div class="${ID}-product-card__content">
				<a class="${ID}-product-card__content-title-link" href="${url}">
					<h2 class="${ID}-product-card__content-title">${title}</h2>
				</a>
				<div class="${ID}-product-card__content-reviews"></div>
				${extras.length > 0 ? /* html */ `
				<ul class="${ID}-product-card__content-info">
					${extras.map(
						(i) => /* html */ `<li class="${ID}-product-card__content-info-item">${i.charAt(0).toUpperCase() + i.slice(1)}</li>`
					).join("")}
				</ul>` : ""}
			</div>
		</div>
		<div class="${ID}-product-card__cta-container">
			<a class="${ID}-product-card__cta-link" href="${url}">Hire now</a>
		</div>
		`;

		element.querySelector(`.${ID}-product-card__content-reviews`).append(reviews);

		return element;
	}

	function getProductDataFromPage() {
		const products = document.querySelectorAll(
			"div.product_list_section > div.row > div.prod_list_outer"
		);
		return [...products]?.map((product) => {
			const title = product.querySelector("h2").innerText;
			const url = product.querySelector("a.productMainLink").href;
			const image = product.querySelector("img.primaryPDPImage").src;
			const reviews = product.querySelector("div.trustpilot-widget");

			const matchURL = url?.split(/\.com/)?.[1]?.trim();
			const productData = data[matchURL] || [];
			const extras = Object.keys(productData)?.map((i) => {
				const key = i;
				const value = productData[i] || "";

				return `${key}${value !== "" ? ":" : ""} ${value}`.replace(
					/extra( 1| 2):\s/g,
					""
				);
			});

			return {
				title,
				url,
				image,
				reviews,
				extras,
			};
		});
	}

	const productData = getProductDataFromPage();

	if (productData.length > 0) {
		const productGrid = ProductGrid();
		productGrid.append(...productData.map((product) => ProductCard(product)));

		document.querySelector("div.product_list_section").append(productGrid);

		// Tracking
		const EVENT_DELAY = 500;
		let currentTarget;

		const cards = document.querySelectorAll(`li.${ID}-product-card`);
		cards.forEach((card) => {
			card.addEventListener("mouseenter", (e) => {
				currentTarget = e.target;

				setTimeout(() => {
					if (currentTarget == e.target) {
						fireEvent(`Product card hover`);
					}
				}, EVENT_DELAY);
			});

			const cta = card.querySelector(`a.${ID}-product-card__cta-link`);
			cta.addEventListener("click", () => fireEvent("CTA click"));
		});
	}
};
