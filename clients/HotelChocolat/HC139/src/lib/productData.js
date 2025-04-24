import shared from "../../../../../core-files/shared";

let data;

const { VARIATION } = shared;

const starterKits = {
	title: "Choose a starter kit and use code VELVKIT15OFF to get save £15",
	products: {
		"The Everything Hot Chocolate Sachet Selection": {
			id: "503879",
			price: "£14.50",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit",
		},
		"Mellow Hot Chocolate Selection Box": {
			name: "Mellow Hot Chocolate Selection Box",
			id: "504158",
			price: "£14.50",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd8079ec5/images/504158.jpg?sw=500&sh=500&sm=fit",
		},
		"Vegan Hot Chocolate Selection Box": {
			name: "Vegan Hot Chocolate Selection Box",
			id: "504130",
			price: "£14.50",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7ca72019/images/504130.jpg?sw=500&sh=500&sm=fit",
		},
	},
};

const flakesObj = {
	title: "Choose a starter kit and use code VELVKIT15OFF to get save £15",
	products: {
		"The Everything Hot Chocolate Sachet Selection": {
			id: "503879",
			price: "£14.50",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw271f2c86/images/503879-2.jpg?sw=500&sh=500&sm=fit",
		},
		"Mellow Hot Chocolate Selection Box": {
			name: "Mellow Hot Chocolate Selection Box",
			id: "504158",
			price: "£14.50",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dwd8079ec5/images/504158.jpg?sw=500&sh=500&sm=fit",
		},
		"Vegan* Hot Chocolate Selection Box": {
			name: "Vegan* Hot Chocolate Selection Box",
			id: "504130",
			price: "£14.50",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7ca72019/images/504130.jpg?sw=500&sh=500&sm=fit",
		},
	},
};

if (VARIATION === "1") {
	data = starterKits;
} else if (VARIATION === "2") {
	data = flakesObj;
}

export default data;
