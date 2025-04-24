/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";
import { data } from "./data";

const { ID, VARIATION } = shared;

export default () => {
	setup();

	fireEvent("Conditions Met");

	if (VARIATION == "control") {
		return;
	}

	function makeItemChanges(el) {
		(function createCtaContainer() {
			const ctaContainer = document.createElement("div");
			ctaContainer.classList.add(`${ID}-cta-container`);
			el.querySelector(".prd-CardSimple_Body").append(ctaContainer);
		})();

		(function addViewDetailsButton() {
			if (VARIATION == 1) {
				const viewDetailsCta = document.createElement("a");
				viewDetailsCta.classList.add(
					`${ID}-view-details-cta`,
					"prd-CardSimple_Button",
					"prd-CardSimple_Button-stroke"
				);
				viewDetailsCta.textContent = "View Details";
				viewDetailsCta.href = el.querySelector(".prd-CardSimple_FauxLink").href;
				el.querySelector(`.${ID}-cta-container`).append(viewDetailsCta);

				viewDetailsCta.addEventListener("click", () => {
					fireEvent("View Details Click");
				});
			}
		})();

		el.querySelector(".prd-CardSimple_FauxLink").remove();

		(function restyleBasketCta() {
			const addToCartCta = el.querySelector("form.prd-CardSimple_Form, .prd-CardSimple_Actions");

			if (VARIATION == 1) {
				addToCartCta
					?.querySelector("button[data-add-to-cart]")
					?.classList.remove("prd-CardSimple_Button-stroke");
				addToCartCta?.querySelector("button[data-add-to-cart]")?.classList.add("btn-Secondary");
			}

			if (addToCartCta) {
				el.querySelector(`.${ID}-cta-container`).append(addToCartCta);
				addToCartCta.addEventListener("click", () => {
					fireEvent("Add to Cart Click");
				});
			}
		})();

		function addBenefits() {
			const url = el.querySelector(".prd-CardSimple_ImageContainer").href;
			const path = /products\/(.*)/.exec(url)[1];
			const benefits = data[path];
			const benefitsList = document.createElement("ul");
			benefitsList.classList.add(`${ID}-benefits-list`);

			if (benefits && benefits.length > 0) {
				benefits.forEach((b, idx) => {
					if (idx < 3) {
						const benefitItem = document.createElement("li");
						benefitItem.classList.add(`${ID}-benefit-item`);
						benefitItem.textContent = b;
						benefitsList.append(benefitItem);
						benefitItem.addEventListener("click", () => fireEvent("Benefit Click"));
					}
				});
				el.querySelector(".prd-CardSimple_Content").append(benefitsList);
			}
		}

		addBenefits();
	}

	const isPdp = (() => {
		if (document.querySelector(".prd-Product_Body")) return true;
		return false;
	})();

	if (isPdp) {
		fireEvent("Fired on PDP");

		const path = /products\/(.*)/.exec(location.pathname)[1];
		const benefits = data[path];

		if (benefits.length > 0) {
			const typeTab = document.querySelector("span.prd-ProductContent_Type");
			const typeColour = getComputedStyle(typeTab).backgroundColor;
			const benefitsEntry = document.querySelector("div.prd-ProductContent_Rating");
			const benefitGrid = document.createElement("ul");
			benefitGrid.classList.add(`${ID}-grid`);

			benefits.forEach((benefit) => {
				const benefitItem = document.createElement("li");
				benefitItem.classList.add(`${ID}-item`);
				benefitItem.innerHTML = `<p class="${ID}-title"><span style="background-color: ${
					typeColour == "rgba(0, 0, 0, 0)" ? "#000" : typeColour
				}"></span><span>${benefit}</span></p>`;
				benefitGrid.append(benefitItem);
				benefitItem.addEventListener("click", () => fireEvent("Benefit Click"));
			});

			benefitsEntry.insertAdjacentElement("afterend", benefitGrid);

			if (document.querySelector(".prd-ProductContent_Header-desktop")) {
				const entry = document.querySelector(
					".prd-ProductContent_Header-desktop .prd-ProductContent_Rating"
				);
				entry.insertAdjacentElement("afterend", benefitGrid.cloneNode(true));
			}

			const description = document.querySelector("div.prd-ProductContent_Description");
			const desktopProductImage = document.querySelector(
				"div.prd-Product_Image.prd-Product_Image-desktop"
			);

			desktopProductImage.insertAdjacentElement("afterend", description);
		}
	} else {
		fireEvent("Fired on PLP");

		const productsItems = document.querySelectorAll(
			"li.clc-List_Item:not(.clc-List_Item-promotion, .WN-144-root, .clc-List_Item-infoCard)"
		);

		productsItems.forEach((item) => makeItemChanges(item));

		const productList = document.querySelector(".clc-List_Items.clc-List_Items-full");

		if (productList) {
			new MutationObserver((m) => {
				if (m[0].addedNodes.length > 0) {
					m[0].addedNodes.forEach((node) => {
						if (
							node.classList.contains("clc-List_Item") &&
							(!node.classList.contains("clc-List_Item-promotion") ||
								!node.classList.contains("WN-144-root"))
						) {
							makeItemChanges(node);
						}
					});
				}
			}).observe(productList, { childList: true });
		}
	}
};
