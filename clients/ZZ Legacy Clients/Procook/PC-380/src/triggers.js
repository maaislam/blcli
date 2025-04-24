/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

function normalisePrice(number) {
	return parseFloat(number).toFixed(2).toString().replace(/\.00$/, "");
}

if (!document.querySelector(".PC-380")) {
	if (
		(!ieChecks &&
			location.pathname.includes("/product/") &&
			(location.pathname.includes("knife-set") ||
				location.pathname.includes("cookware"))) ||
		location.pathname.includes("pan-set")
	) {
		pollerLite([".accordion"], () => {
			function getSetAccordion() {
				const accordions = document.querySelectorAll(".accordion");

				for (let i = 0; i < accordions.length; i++) {
					const header = accordions[i].querySelector(".accordion-header h2");

					if (header.textContent === "This set contains") {
						return accordions[i];
					}
				}
			}

			const setAccordion = getSetAccordion();

			pollerLite(
				[
					"body",
					".slick-slide:not(.slick-cloned)",
					".featured-product-price [itemprop='price']",
					() => !!setAccordion,
				],
				() => {
					const setAccordion = getSetAccordion();
					const setProducts = setAccordion.querySelectorAll(
						".slick-slide:not(.slick-cloned)"
					);
					const currentPrice = +document
						.querySelector(
							".product-details .product-pricing .price [itemprop='price'], .product-details .pdp-right .pdp-pricing [itemprop='price']"
						)
						.getAttribute("content");
					const individualPrice = normalisePrice(
						+[...setProducts].reduce((prev, curr) => {
							const price = +curr
								.querySelector(".featured-product-price [itemprop='price']")
								.getAttribute("content");
							return prev + price;
						}, 0)
					);

					const typicalPrice = +document.querySelector(
						".product-details .product-pricing .typical-price span, .product-details .pdp-right .pdp-pricing div:first-of-type span"
					).textContent;

					const saving = normalisePrice(
						(individualPrice - currentPrice).toFixed(2)
					);

					if (saving > 0) {
						activate(
							setAccordion,
							typicalPrice,
							individualPrice,
							currentPrice,
							saving
						);
					}
				}
			);
		});
	}
}
