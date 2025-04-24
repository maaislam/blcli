import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
import { slickProducts } from "../helpers";
const starterKits = {
	products: {
		"7 Chocolat Shortbreads - Biscuits of the Gods": {
			name: "7 Chocolat Shortbreads - Biscuits of the Gods",
			id: "504119",
			dataLayerName: "7 Chocolat Shortbreads - Biscuits of the Gods",
			price: "£10.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw0778135b/images/504119.jpg?sw=875&sh=875&sm=fit",
		},
		"Dunking Biscuits": {
			name: "Dunking Biscuits",
			id: "503945",
			dataLayerName: "Dunking Biscuits",
			price: "£5.00",
			wasPrice: "£6.95",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw2f8454b7/images/503945.jpg?sw=875&sh=875&sm=fit",
		},
		"Petite Podcups": {
			name: "Petite Podcups",
			id: "472788",
			dataLayerName: "Petite Podcups",
			price: "£18.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw788a9680/images/472788.jpg?sw=875&sh=875&sm=fit",
		},
		"Chat Coffee Cup": {
			name: "Chat Coffee Cup",
			id: "472804",
			dataLayerName: "Chat Coffee Cup",
			price: "£12.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw99c4512e/images/472804-4.jpg?sw=500&amp;sh=500&amp;sm=fit",
		},
		"Hug Coffee Cup": {
			name: "Hug Coffee Cup",
			id: "472805",
			dataLayerName: "Hug Coffee Cup",
			price: "£12.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw7763225e/images/472805-4.jpg?sw=500&amp;sh=500&amp;sm=fit",
		},
		"Spark Coffee Cup": {
			name: "Spark Coffee Cup",
			id: "472806",
			dataLayerName: "Spark Coffee Cup",
			price: "£12.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw6e93d898/images/472806-4.jpg?sw=500&amp;sh=500&amp;sm=fit",
		},
	},
};

const { ID, VARIATION } = shared;

export default class VelvetiserUpsell {
	constructor() {
		this.create();
		this.bindEvents();
		this.render();
	}

	create() {
		const element = document.createElement("div");
		element.classList.add(`${ID}-addonsBox`);
		element.innerHTML = `
       <div class="${ID}-container">
        <h3>Add a little more?</h3>
        <div class="${ID}-carousel">
          <div class="${ID}-products"></div>
          <div class="${ID}-add">Add to bag</div>
        </div>
       </div>`;

		// add products
		const upsellProducts = window.HCflakes;

		Object.keys(upsellProducts).forEach((i) => {
			const product = upsellProducts[i];
			const item = document.createElement("div");
			item.classList.add(`${ID}-product`);
			item.setAttribute("prod-id", product.id);
			item.setAttribute("prod-name", `${[i][0]}`);
			item.innerHTML = `
        <div class="${ID}-productimage" style="background-image:url(${
				product.image
			})"></div>
        <p>${[i][0]}${
				product.wasPrice
					? `<div class="${ID}-priceBlock"><span class="${ID}-wasPrice">${product.wasPrice}</span> <span class="${ID}-price">${product.price}</span></div>`
					: `<span class="${ID}-price">${product.price}</span>`
			}`;

			element
				.querySelector(`.${ID}-carousel .${ID}-products`)
				.appendChild(item);
		});

		this.component = element;
	}

	bindEvents() {
		const { component } = this;

		const products = component.querySelectorAll(
			`.${ID}-carousel .${ID}-product`
		);
		const addButton = component.querySelector(`.${ID}-add`);

		/** -----------
		 * Click product logic
		 * ------------  */

		const chooseKit = () => {
			const makeActive = (e) => {
				e.preventDefault();

				// remove if deselected
				if (e.currentTarget.classList.contains(`${ID}-selected`)) {
					e.currentTarget.classList.remove(`${ID}-selected`);

					const isSelectedAny = component.querySelectorAll(
						`.${ID}-carousel .${ID}-product.${ID}-selected`
					);
					if (isSelectedAny.length <= 0) {
						addButton.classList.remove(`${ID}-show`);
					}
					fireEvent(
						`User clicks to unselect a little more item and unselected ${e.currentTarget.getAttribute(
							"prod-name"
						)}`
					);
					// add active, remove any other actives
				} else if (
					!e.currentTarget.classList.contains(`${ID}-selected`)
				) {
					// for (let index = 0; index < products.length; index += 1) {
					// 	const element = products[index];
					// 	element.classList.remove(`${ID}-selected`);
					// }
					e.currentTarget.classList.add(`${ID}-selected`);
					fireEvent(
						`User clicks to select a little more item and selected ${e.currentTarget.getAttribute(
							"prod-name"
						)}`
					);
					addButton.classList.add(`${ID}-show`);
				}
			};

			for (let x = 0; x < products.length; x += 1) {
				const el = products[x];
				el.addEventListener("click", makeActive);
			}
		};

		chooseKit();

		/** -----------
		 * Add to basket logic
		 * ------------  */

		const ajaxAdd = () => {
			// get all added
			const allSelected = document.querySelectorAll(
				`.${ID}-product.${ID}-selected`
			);

			if (allSelected) {
				let allSelectedProducts = [];
				for (let index = 0; index < allSelected.length; index += 1) {
					const element = allSelected[index];
					const productSku = element.getAttribute("prod-id");
					const productName = element.getAttribute("prod-name");
					const type = "Accessories";
					allSelectedProducts.push({
						sku: productSku,
						name: productName,
						type: type,
					});
					if (productSku) {
						window.jQuery.ajax({
							url: "https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax",
							type: "post",
							data: `Quantity=1&cartAction=add&pid=${productSku}`,
							success: function () {
								window.location.reload();
							},
						});
					}
				}
				fireEvent(
					`User adds little extra to cart with options: ${JSON.stringify(
						allSelectedProducts
					)}`
				);
			}
		};

		addButton.addEventListener("click", () => {
			addButton.textContent = "Adding...";
			ajaxAdd();
		});
	}

	render() {
		const { component } = this;
		document
			.querySelector("#cart-items-form")
			.insertAdjacentElement("afterend", component);
		slickProducts(`.${ID}-addonsBox .${ID}-carousel .${ID}-products`, 0);

		window
			.jQuery(`.${ID}-addonsBox .${ID}-carousel .${ID}-products`)
			.slick("resize");
	}
}
