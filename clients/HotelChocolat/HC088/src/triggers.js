/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import shared from "../../../../core-files/shared";
import { pollerLite } from "../../../../lib/uc-lib";

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

if (!ieChecks) {
	const { ID, VARIATION } = shared;

	if (
		window.location.href.indexOf(
			"https://www.hotelchocolat.com/uk/platinum-velvetiser.html"
		) > -1 ||
		window.location.href.indexOf("www.hotelchocolat.com/uk/472803") > -1
	) {
		if (!document.documentElement.classList.contains(`${ID}`)) {
			pollerLite(["body"], () => {
				// trigger loader
				document.body.insertAdjacentHTML(
					"afterbegin",
					'<div class="HCpageLoader"><div class="innerLoader"><span style="background-image:url(https://editor-assets.abtasty.com/48343/603e11eb1eda61614680555.gif)"></span><p>Loading...</p></div></div>'
				);

				// if poller fails remove after 5 seconds
				setTimeout(() => {
					if (document.querySelector(".HCpageLoader")) {
						document.querySelector(".HCpageLoader").remove();
					}
				}, 5000);
			});

			pollerLite(
				[
					"body",
					"#main",
					"#main h1",
					"#tabDesc",
					".prod-info.prod-info-c ul",
					".price-wrapper",
					".product-col-2.product-detail",
					"#pid",

					() => {
						return !!window.jQuery;
					},
					() => {
						return !!window.KlarnaOnsiteService;
					},
					() => {
						return !!window.HCcolours && window.HCkits;
					},
					() => {
						if (typeof window.jQuery.fn.slick !== "undefined") {
							return true;
						}
					},
				],
				() => {
					document.querySelector(".HCpageLoader").remove();
					activate();
				}
			);
		}
	} else if (window.location.href.indexOf(".html") > -1) {
		if (!document.documentElement.classList.contains(`${ID}`)) {
			pollerLite(["body"], () => {
				// trigger loader
				document.body.insertAdjacentHTML(
					"afterbegin",
					'<div class="HCpageLoader"><div class="innerLoader"><span style="background-image:url(https://editor-assets.abtasty.com/48343/603e11eb1eda61614680555.gif)"></span><p>Loading...</p></div></div>'
				);

				// if poller fails remove after 5 seconds
				setTimeout(() => {
					if (document.querySelector(".HCpageLoader")) {
						document.querySelector(".HCpageLoader").remove();
					}
				}, 5000);
			});

			pollerLite(
				[
					"body",
					"#main",
					"#main h1",
					"#tabDesc",
					".prod-info.prod-info-c ul",
					".product-review-links.product-review-links-top .bv-rating span",
					".price-wrapper",
					".product-col-2.product-detail",
					"#pid",
					() => {
						return !!window.jQuery;
					},
					() => {
						return !!window.KlarnaOnsiteService;
					},
					() => {
						return !!window.HCcolours && window.HCkits;
					},
					() => {
						if (typeof window.jQuery.fn.slick !== "undefined") {
							return true;
						}
					},
				],
				() => {
					document.querySelector(".HCpageLoader").remove();
					activate();
				}
			);
		}
		// if basket
	} else if (window.location.href.indexOf("/basket") > -1) {
		pollerLite(
			[
				"body",
				"#cart-table .cart-row",
				".item-details .name",
				() => {
					return !!window.jQuery;
				},
			],
			() => {
				activate();
			}
		);
	}
}
