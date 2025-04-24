import shared from "../../../../../../core-files/shared";
//import { colours, flakes, starterKits } from "../data";
import { slickProducts } from "../helpers";

/**
 * Create options
 */

const { ID } = shared;

export default () => {
	/**
	 *
	 * @param {*} object - data object
	 * @param {*} type - product type
	 * @param {*} parentEl - element new items will be added to
	 */
	const createOptions = (object, type, parentEl) => {
		Object.keys(object).forEach((i) => {
			const el = object[i];
			const newEl = document.createElement("div");
			newEl.classList.add(`${ID}-product`);
			newEl.classList.add(`${ID}-${type}`);
			newEl.setAttribute("prod-id", el.id);
			if (el.no) {
				newEl.setAttribute("slideNo", el.no);
			}
			newEl.setAttribute("prod-name", el.dataLayerName);
			newEl.innerHTML = `
            <div class="${ID}-productimage" style="background-image:url(${
				el.image
			})"></div>
            <p>
                <span class="${ID}-name">${[i][0]}</span>
                ${
					el.wasPrice
						? `
                <div class="${ID}-priceBlock">
                    <span class="${ID}-wasPrice">${el.wasPrice}</span> 
                    <span class="${ID}-price">${el.price}</span>
                </div>`
						: `<span class="${ID}-price">${el.price}</span>`
				}
            </p>`;

			document.querySelector(parentEl).appendChild(newEl);
		});
	};

	createOptions(window.HCcolours, "colour", `.${ID}-colours .${ID}-carousel`);
	createOptions(window.HCkits, "kit", `.${ID}-kits .${ID}-carousel`);
	//    createOptions(window.HCflakes, 'flake', `.${ID}-flakesSlider .${ID}-carousel`);

	// createOptions(colours, 'colour', `.${ID}-colours .${ID}-carousel`);
	// createOptions(starterKits, 'kit', `.${ID}-kits .${ID}-carousel`);
	// createOptions(flakes, 'flake', `.${ID}-flakesSlider .${ID}-carousel`);

	const idOfCurrent = document.querySelector("#pid").value;
	const showSlide = document
		.querySelector(`.${ID}-colour[prod-id="${idOfCurrent}"]`)
		.getAttribute("slideNo");

	slickProducts(`.${ID}-kits .${ID}-carousel`, 0);
	slickProducts(`.${ID}-colours .${ID}-carousel`, parseFloat(showSlide));
	// slickProducts(`.${ID}-flakesSlider .${ID}-carousel`, 0);

	window.jQuery(`.${ID}-carousel`).slick("resize");
};
