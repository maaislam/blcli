import shared from "../../../../../core-files/shared";
import { populateCarousel } from "./populate-carousel.function";

const { ID } = shared;

export const getProductData = () => {
	window.DYO.recommendationWidgetData(146922, {}, function (error, data) {
		const inStockItems = data.slots.filter(
			(d) => d.item.in_stock !== false
		);
		populateCarousel(inStockItems);

		// GOOD ONE
		Promise.all(
			inStockItems.map((singleSlot) =>
				fetch(
					`/ProductDetail/GetColourVariantsForProduct?productId=${singleSlot.item.sku}&selectedCurrency=GBP`
				)
					.then((res) => res.json())
					.then((response) => ({
						...response,
						sku: singleSlot.item.sku,
						brand: singleSlot.item.brand,
						name: singleSlot.item.name,
					}))
			)
		).then((response) => {
			localStorage.setItem(
				ID,
				JSON.stringify({
					products: response.reduce(
						(acc, current) => ({ ...acc, [current.sku]: current }),
						{}
					),
				})
			);
		});
	});
};

export const getStorage = () => {
	const storage = localStorage.getItem(ID);

	if (storage) return JSON.parse(storage);

	localStorage.setItem(
		ID,
		JSON.stringify({
			products: {},
			modal: {
				active: null,
				variants: [],
			},
		})
	);

	return JSON.parse(localStorage.getItem(ID));
};

/**
 * @param {ReturnType<getStorage>} data
 */
export const setStorage = (data) => {
	localStorage.setItem(ID, JSON.stringify(data));
};
