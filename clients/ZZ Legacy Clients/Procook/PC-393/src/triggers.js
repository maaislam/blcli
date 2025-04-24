/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(window.navigator.userAgent);

function getSetAccordion() {
	const accordions = document.querySelectorAll(".accordion");

	for (let i = 0; i < accordions.length; i++) {
		const header = accordions[i].querySelector(".accordion-header h2");

		if (header.textContent === "Sets & Bundles") {
			return accordions[i];
		}
	}
}

if (!ieChecks) {
	pollerLite([".accordion", ".breadcrumbs-container"], () => {
		const breadcrumbs = document
			.querySelector(".breadcrumbs-container")
			.textContent.toLocaleLowerCase();

		if (breadcrumbs.includes("cookware") || breadcrumbs.includes("kitchen knives")) {
			const setAccordion = getSetAccordion();

			pollerLite(
				[
					"body",
					".slick-slide:not(.slick-cloned)",
					".featured-product-price span[itemprop='price']",
					() => !!setAccordion,
					() => location.pathname.includes("/product/"),
					() => !location.pathname.includes("-set-"),
				],
				() => {
					const setAccordion = getSetAccordion();
					const setProducts = setAccordion.querySelectorAll(".slick-slide:not(.slick-cloned)");

					if (setProducts.length > 0) {
						activate(setProducts);
					}
				}
			);
		}
	});
}
