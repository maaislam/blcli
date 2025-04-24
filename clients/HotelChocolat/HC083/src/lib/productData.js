import shared from "../../../../../core-files/shared";

let data;

const { VARIATION } = shared;

const starterKits = {
	title: "Enhance your Velvetiser experience with a Hot Chocolate starter kit",
	products: {
		"Everything Selection – Single-Serves": {
			id: "503879",
			price: "£10.00",
			wasPrice: "£14.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7295c8e6/images/503769.jpg?sw=500&sh=500&sm=fit",
		},
		"2 x The Everything Selection": {
			name: "The Starter Pack",
			id: "503950",
			wasPrice: "£28.00",
			price: "£20.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwe5b81028/images/503950.jpg?sw=500&sh=500&sm=fit",
		},
		"2 x Everything + Milky Pouch + Classic Pouch": {
			name: "Family Pack",
			id: "504167",
			wasPrice: "£44.00",
			price: "£30.00",
			image: "https://editor-assets.abtasty.com/48343/6143700731d781631809543.jpg",
		},
	},
};

const flakesObj = {
	title: "Why not enhance your Velvetiser experience with some extras?",
	products: {
		"Everything Selection – Single-Serves": {
			id: "503879",
			price: "£10.00",
			wasPrice: "£14.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7295c8e6/images/503769.jpg?sw=500&sh=500&sm=fit",
		},
		"Milky 50% Hot Chocolate – Resealable Pouch": {
			name: "Milky 50% Hot Chocolate – Resealable Pouch",
			id: "503929",
			price: "£8.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw3bccf11a/images/503929.jpg?sw=500&sh=500&sm=fit",
		},
		"Classic 70% Hot Chocolate – Resealable Pouch": {
			name: "Classic 70% Hot Chocolate – Resealable Pouch",
			id: "503928",
			price: "£8.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc350fda3/images/503928.jpg?sw=500&sh=500&sm=fit",
		},
		"Nutmilk 45% Hot Chocolate – Resealable Pouch": {
			name: "Nutmilk 45% Hot Chocolate – Resealable Pouch",
			id: "503930",
			price: "£8.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw1c37e1b7/images/503930.jpg?sw=500&sh=500&sm=fit",
		},
		"Vanilla-White Hot Chocolate – Resealable Pouch": {
			name: "Vanilla-White Hot Chocolate – Resealable Pouch",
			id: "503931",
			price: "£8.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw27af4b78/images/503931.jpg?sw=500&sh=500&sm=fit",
		},
		"Dark with Mint Hot Chocolate Sachets": {
			name: "Mint Hot Chocolate – Resealable Pouch",
			id: "503780",
			price: "£10.00",
			wasPrice: "£13.00",
			image: "https://www.hotelchocolat.com/on/demandware.static/-/Sites-hotelchocolat-storefront-uk/default/dw7bd36b9f/Nav-Ads-2017/peppermint-hot-chocolate-200px.jpg",
		},
		"Salted Caramel Hot Chocolate – Single-Serves": {
			name: "Salted Caramel Hot Chocolate – Single-Serves",
			id: "503772",
			price: "£10.00",
			wasPrice: "£13.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw487d6cdb/images/503772-1.jpg?sw=875&sh=875&sm=fit",
		},
		"Milky 50% Hot Chocolat - Single Serves": {
			name: "Milky 50% Hot Chocolat - Single Serves",
			id: "503770",
			price: "£10.00",
			wasPrice: "£13.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd7b7df81/images/503770.jpg?sw=875&sh=875&sm=fit",
		},
		"Classic 70% Dark Hot Chocolate – Single Serves": {
			name: "Classic 70% Dark Hot Chocolate – Single Serves",
			id: "503771",
			price: "£10.00",
			wasPrice: "£13.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw5c80c21e/images/503771.jpg?sw=875&sh=875&sm=fit",
		},
		"85% Dark Hot Chocolate – Single-Serves": {
			name: "85% Dark Hot Chocolate – Single-Serves",
			id: "503775",
			price: "£10.00",
			wasPrice: "£13.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwc5480a3d/images/503775.jpg?sw=500&sh=500&sm=fit",
		},
	},
};

if (VARIATION === "1") {
	data = starterKits;
} else if (VARIATION === "2") {
	data = flakesObj;
}

export default data;
