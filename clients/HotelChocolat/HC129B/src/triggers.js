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

// // /* --- Colours Data --- */
// window.HCcolours = {
// 	// SatinBlack: {
// 	// 		No: 0,
// 	// 		id: "472824",
// 	// 		dataLayerName: "The Velvetiser – NEW Satin Black Edition",
// 	// 		price: "£99.95",
// 	// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw020f234c/images/472824-black-satin-velvetiser.jpg?sw=500&sh=500&sm=fit",
// 	//     url: "https://www.hotelchocolat.com/uk/satin-black-velvetiser.html",
// 	// },
// 	Charcoal: {
// 		no: 1,
// 		id: "472727",
// 		dataLayerName: "The Velvetiser – Charcoal Edition",
// 		price: "£99.95",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw1d4202a9/images/472727-newb.jpg?sw=500&sh=500&sm=fit",
// 		url: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-maker.html",
// 	},
// 	Copper: {
// 		no: 2,
// 		id: "472726",
// 		dataLayerName: "The Velvetiser – Copper Edition",
// 		price: "£99.95",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw1d343224/images/472726-newb.jpg?sw=500&sh=500&sm=fit",
// 		url: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-machine.html",
// 	},
// 	//		White: {
// 	//			no: 3,
// 	//			id: "472725",
// 	//			dataLayerName: "The Velvetiser – White Edition",
// 	//			price: "£99.95",
// 	//			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw2daa7d11/images/472725-new.jpg?sw=500&sh=500&sm=fit",
// 	//			url: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-pack.html",
// 	//		},
// 	Stellarwhite: {
// 		no: 3,
// 		id: "472821",
// 		dataLayerName: "The Velvetiser – Stellar White Edition",
// 		price: "£99.95",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe361e50d/images/472821s.jpg?sw=500&sh=500&sm=fit",
// 		url: "https://www.hotelchocolat.com/uk/velvetiser-hot-chocolate-pack.html",
// 	},
// 	// Platinum: {
// 	// 	no: 4,
// 	// 	id: "472809",
// 	// 	dataLayerName: "The Velvetiser - Platinum Edition",
// 	// 	price: "£99.95",
// 	// 	image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw6b770db5/images/472809gold.jpg?sw=500&sh=500&sm=fit",
// 	//   url: "https://www.hotelchocolat.com/uk/platinum-velvetiser.html",
// 	// },
// };

// /* --- Starter Kits Data --- */
// window.HCkits = {
// 	"2 x The Everything Selection": {
// 		name: "2 x The Everything Selection",
// 		id: "503950",
// 		dataLayerName: "2 x The Everything Selection",
// 		price: "£20.00",
// 		wasPrice: "£29.00",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe5b81028/images/503950.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	"The Everything Hot Chocolate Sachet Selection": {
// 		name: "The Everything Hot Chocolate Sachet Selection",
// 		id: "503879",
// 		dataLayerName: "The Everything Hot Chocolate Sachet Selection",
// 		price: "£10.00",
// 		wasPrice: "£14.50",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	//  'The Podster + 60 Tasting Selection Coffee Pods + Milky 50% Hot Chocolate': {
// 	//  name: 'The Podster + 60 Tasting Selection Coffee Pods + Milky 50% Hot Chocolate',
// 	//  id: '504241',
// 	//  dataLayerName: 'The Podster + 60 Tasting Selection Coffee Pods + Milky 50% Hot Chocolate',
// 	//  price: '£150.00',
// 	//  wasPrice: '£183.90',
// 	//  image: 'https://production-web-hotelchocolat.demandware.net/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/vdb5324f8acf00ee45903bce0c91a54a71d319dab/images/504241-1.png?version=1,645,549,378,000',
// 	// },
// 	"2 x Everything + Milky Pouch + Classic Pouch": {
// 		name: "2 x Everything + Milky Pouch + Classic Pouch",
// 		id: "504167",
// 		dataLayerName: "2 x Everything + Milky Pouch + Classic Pouch",
// 		price: "£30.00",
// 		wasPrice: "£46.00",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw5f49cb30/images/504167.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	"2 x Everything + Milky Pouch + Classic Pouch + 500ml Chocolate Cream Liqueur":
// 		{
// 			name: "2 x Everything + Milky Pouch + Classic Pouch + 500ml Chocolate Cream Liqueur",
// 			id: "504168",
// 			dataLayerName:
// 				"2 x Everything + Milky Pouch + Classic Pouch + 500ml Chocolate Cream Liqueur",
// 			price: "£50.00",
// 			wasPrice: "£69.00",
// 			image: "https://editor-assets.abtasty.com/48343/61437021465fe1631809569.jpg",
// 		},
// 	"Milky 50% Hot Chocolate - Single Serves": {
// 		name: "Milky 50% Hot Chocolate - Single Serves",
// 		id: "504171",
// 		dataLayerName: "Milky 50% Hot Chocolate - Single Serves",
// 		price: "£10.00",
// 		wasPrice: "£13.50",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd7b7df81/images/503770-NEW.jpg?sw=875&sh=875&sm=fit",
// 	},
// 	"Salted Caramel Hot Chocolate – Single-Serves": {
// 		name: "Salted Caramel Hot Chocolate – Single-Serves",
// 		id: "504173",
// 		dataLayerName: "Salted Caramel Hot Chocolate – Single-Serves",
// 		price: "£10.00",
// 		wasPrice: "£13.50",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw487d6cdb/images/503772.jpg?sw=875&sh=875&sm=fit",
// 	},
// 	//		"Black Forest Gateau Hot Chocolate Sachets": {
// 	//		name: "Black Forest Gateau Hot Chocolate Sachets",
// 	//		id: "503839",
// 	//		dataLayerName: "Black Forest Gateau Hot Chocolate Sachets",
// 	//		price: "£10.00",
// 	//		wasPrice: "£13.50",
// 	//		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwf0905fce/images/503839.jpg?sw=875&sh=875&sm=fit",
// 	//	},
// 	"Vanilla White Hot Chocolate Sachets": {
// 		name: "Vanilla White Hot Chocolate Sachets",
// 		id: "504219",
// 		dataLayerName: "Vanilla White Hot Chocolate Sachets",
// 		price: "£10.00",
// 		wasPrice: "£13.50",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw5fe3e408/images/503802.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	"45% Nutmilk Hot Chocolate Sachets": {
// 		name: "45% Nutmilk Hot Chocolate Sachets",
// 		id: "504221",
// 		dataLayerName: "45% Nutmilk Hot Chocolate Sachets",
// 		price: "£10.00",
// 		wasPrice: "£13.50",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw17eca3c5/images/503805.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	"Ginger Hot Chocolate Sachets": {
// 		name: "Ginger Hot Chocolate Sachets",
// 		id: "504218",
// 		dataLayerName: "Ginger Hot Chocolate Sachets",
// 		price: "£10.00",
// 		wasPrice: "£13.50",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwf4196665/images/503779-4.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	"Classic 70% Dark Hot Chocolate – Single Serves": {
// 		name: "Classic 70% Dark Hot Chocolate – Single Serves",
// 		id: "504172",
// 		dataLayerName: "Classic 70% Dark Hot Chocolate – Single Serves",
// 		price: "£10.00",
// 		wasPrice: "£13.50",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw5c80c21e/images/503771-NEW.jpg?sw=875&sh=875&sm=fit",
// 	},
// 	//		"75% Colombia Sierra Nevada Hot Chocolate": {
// 	//		name: "75% Colombia Sierra Nevada Hot Chocolate",
// 	//		id: "504079",
// 	//		dataLayerName: "75% Colombia Sierra Nevada Hot Chocolate",
// 	//		price: "£4.25",
// 	//		wasPrice: "£8.50",
// 	//		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwac39e674/images/504079.jpg?sw=500&sh=500&sm=fit",
// 	//	},
// 	"Dark with Mint Hot Chocolate Sachets": {
// 		name: "Mint Hot Chocolate – Resealable Pouch",
// 		id: "504220",
// 		dataLayerName: "Mint Hot Chocolate – Resealable Pouch",
// 		price: "£10.00",
// 		wasPrice: "£13.50",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw55209774/images/503723-5-NEW.jpg?sw=500&sh=500&sm=fit",
// 	},
// };

// /* --- Accessories Data --- */
// window.HCflakes = {
// 	// '18 Chocolat Shortbreads - Biscuits of the Gods': {
// 	//   name: '18 Chocolat Shortbreads - Biscuits of the Gods',
// 	//   id: '504120',
// 	//   dataLayerName: '18 Chocolat Shortbreads - Biscuits of the Gods',
// 	//   price: '£15.00',
// 	//   wasPrice: '£25.00',
// 	//   image: 'https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw31e4e372/images/504120.jpg?sw=875&sh=875&sm=fit',
// 	// },
// 	"7 Chocolat Shortbreads - Biscuits of the Gods": {
// 		name: "7 Chocolat Shortbreads - Biscuits of the Gods",
// 		id: "504119",
// 		dataLayerName: "7 Chocolat Shortbreads - Biscuits of the Gods",
// 		price: "£10.00",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw0778135b/images/504119.jpg?sw=875&sh=875&sm=fit",
// 	},
// 	"Dunking Biscuits": {
// 		name: "Dunking Biscuits",
// 		id: "503945",
// 		dataLayerName: "Dunking Biscuits",
// 		price: "£8.00",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw2f8454b7/images/503945.jpg?sw=875&sh=875&sm=fit",
// 	},
// 	"Petite Podcups": {
// 		name: "Petite Podcups",
// 		id: "472788",
// 		dataLayerName: "Petite Podcups",
// 		price: "£18.00",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw788a9680/images/472788.jpg?sw=875&sh=875&sm=fit",
// 	},
// 	"Chat Coffee Cup": {
// 		name: "Chat Coffee Cup",
// 		id: "472804",
// 		dataLayerName: "Chat Coffee Cup",
// 		price: "£12.00",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw99c4512e/images/472804-4.jpg?sw=500&amp;sh=500&amp;sm=fit",
// 	},
// 	"Hug Coffee Cup": {
// 		name: "Hug Coffee Cup",
// 		id: "472805",
// 		dataLayerName: "Hug Coffee Cup",
// 		price: "£12.00",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7763225e/images/472805-4.jpg?sw=500&amp;sh=500&amp;sm=fit",
// 	},
// 	"Spark Coffee Cup": {
// 		name: "Spark Coffee Cup",
// 		id: "472806",
// 		dataLayerName: "Spark Coffee Cup",
// 		price: "£12.00",
// 		image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw6e93d898/images/472806-4.jpg?sw=500&amp;sh=500&amp;sm=fit",
// 	},
// };

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
					".product-review-links.product-review-links-top",
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
	} else if (window.location.href.indexOf("/choose-your-machine") > -1) {
		pollerLite(["body"], () => {
			activate();
		});
	}
}
