import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";

const starterKits = {
	products: {
		"Everything Selection – Single-Serves": {
			id: "503879",
			price: "£10.00",
			wasPrice: "£14.00",
			image: "https://www.hotelchocolat.com/dw/image/v2/AAZP_PRD/on/demandware.static/-/Sites-hotelchocolat-master-catalog/default/dw3bccf11a/images/503879-2.jpg?sw=500&sh=500&sm=fit",
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
        <h3><b>£15 off</b> a velvetiser kit with code: <b>EXTRA15</b>. Choose your starter kit below</h3>
        <div class="${ID}-carousel">
          <div class="${ID}-products"></div>
          <span class="${ID}-smallText">£15 off when bought with a Velvetiser on top of discounted price</span>
          <div class="${ID}-add">Add to bag</div>
        </div>
       </div>`;

		// add products
		const upsellProducts = starterKits.products;

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
					addButton.classList.remove(`${ID}-show`);

					// add active, remove any other actives
				} else if (
					!e.currentTarget.classList.contains(`${ID}-selected`)
				) {
					for (let index = 0; index < products.length; index += 1) {
						const element = products[index];
						element.classList.remove(`${ID}-selected`);
					}
					e.currentTarget.classList.add(`${ID}-selected`);
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
				for (let index = 0; index < allSelected.length; index += 1) {
					const element = allSelected[index];
					const productSku = element.getAttribute("prod-id");

					const type = "Kit";

					if (productSku) {
						window.jQuery.ajax({
							url: "https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Cart-AddProduct?format=ajax",
							type: "post",
							data: `Quantity=1&cartAction=add&pid=${productSku}`,
							success: function () {
								fireEvent(`Velvetiser ${type} added to bag`);
								window.location.reload();
							},
						});
					}
				}
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
	}
}
