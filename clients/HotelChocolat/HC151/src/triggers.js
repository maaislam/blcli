/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from "./lib/experiment";
import shared from "../../../../core-files/shared";
import { pollerLite } from "../../../../lib/uc-lib";

// window.quickLinks = [
// 	{
// 		title: "Best sellers",
// 		url: "/uk/shop/gift-ideas/shop-by-occasion/best-chocolate/",
// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwb9f8fc70/images/263421.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	{
// 		title: "Chocolate boxes",
// 		url: "/uk/shop/christmas/gift-boxes/",
// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw06e832b5/images/263427.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	{
// 		title: "Velvetiser",
// 		url: "/uk/shop/collections/products/the-velvetiser/",
// 		image: "/on/demandware.static/-/Sites-HotelChocolat-Library/default/v6c91385b5ec5b8dfd842d35c43cc7e59d9784c00/640px-Images/copper_velvetiser.png?version=1,670,939,453,000",
// 	},
// 	{
// 		title: "Hot chocolate",
// 		url: "/uk/shop/collections/products/hot-chocolate/",
// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	{
// 		title: "Collections",
// 		url: "/uk/shop/christmas/gift-hampers/",
// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwbb97780a/images/358392.jpg?sw=500&sh=500&sm=fit",
// 	},
// 	{
// 		title: "Alcohol",
// 		url: "/uk/shop/collections/products/wine-chocolate/",
// 		image: "/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7a77c3ae/images/504107.jpg?sw=500&sh=500&sm=fit",
// 	},
// ];

const ieChecks = /MSIE|Trident|Edge\/(12|13|14|15|16|17|18)/.test(
	window.navigator.userAgent
);

if (!ieChecks) {
	const { ID, VARIATION } = shared;

	if (!document.documentElement.classList.contains(`${ID}`)) {
		pollerLite(["body"], () => {
			activate();
		});
	}
}
