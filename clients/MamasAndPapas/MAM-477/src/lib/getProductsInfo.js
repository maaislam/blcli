import shared from "../../../../../core-files/shared";
const { ID, VARIATION, CLIENT, LIVECODE } = shared;

let skuItems = [];
const getProductsBySKU = () => {
	if (sessionStorage.getItem(`${ID}-skuItems`)) {
		skuItems = JSON.parse(sessionStorage.getItem(`${ID}-skuItems`));
	} else {
		const skus = [
			"4855WW202",
			"4855WW201",
			"4855WW206",
			"4855Z1101",
			"48551TR02",
			"48551AW04",
			"485535010",
			"4855Z1105",
			"4855V0801",
			"4855CJ301",
			"4855HJ901",
			"4855HJ903",
			"4855LF501",
			"4855MD106",
			"4855MR301",
		];

		fetch(
			"https://www.mamasandpapas.com/collections/soft-baby-toys/products.json?limit=100"
		)
			.then((response) => response.json())
			.then((data) => {
				skus.forEach((item, index) => {
					for (let i = 0; i < data.products.length; i++) {
						const info = data.products[i].variants[0];
						if (item === info.sku) {
							const id = info.id;
							const title = data.products[i].title;
							const price = info.price;
							const imgUrl = data.products[i].images[0].src;
							const prodInfo = {
								prodID: id,
								prodName: title,
								prodPrice: price,
								prodImg: imgUrl,
								sku: item,
							};
							skuItems.push(prodInfo);
							data.products.splice(i, 1);
							break;
						}
					}
				});
				sessionStorage.setItem(
					`${ID}-skuItems`,
					JSON.stringify(skuItems)
				);
			});
	}
};

export default getProductsBySKU;
