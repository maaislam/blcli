import shared from "../../../../../../core-files/shared";
import { minus, plus } from "../helpers";

const { ID, VARIATION } = shared;

export default class VelvetiserSteps {
	constructor() {
		this.create();
		this.render();
	}

	create() {
		const element = document.createElement("div");
		element.classList.add(`${ID}-topContent`);
		element.innerHTML = `
        <div class="${ID}-left">
            <div class="${ID}-mainSlider"></div>
        </div>
        <div class="${ID}-right">
            <div class="${ID}-reviewSection"></div>
            <div class="${ID}-accordionSteps">
                <div class="${ID}-accordionStep ${ID}-colours"> 
                    <div class="${ID}-stepTitle">1. Choose your Velvetiser Colour${
			VARIATION == 1 ? `:<span id="${ID}-selected-color"></span>` : ""
		}</div>
                    <div class="${ID}-stepContent">
                     <div class="${ID}-carousel-colours"></div>
                    </div>
                </div>
                <div class="${ID}-accordionStep ${ID}-kits">
                    <div class="${ID}-stepTitle">2. Choose your starter kit</div>
					${
						VARIATION == 2
							? `<div class="${ID}-starter-kit-switch"><div class="switcher without-s-kit">Without starter kit</div><div class="switcher with-s-kit active">With starter kit&nbsp;<span id="price-with-Kit"></span></div></div>`
							: `<span class="${ID}-smallText">Discount price only when bought with the Velvetiser</span>`
					}
                    <div class="${ID}-stepContent">
                      <div class="${ID}-carousel"></div>
                    </div>
                </div>
            </div>
            </div> 
        </div>
      `;
		this.component = element;

		// Move existing content
		const content = document.querySelector("#product-content");
		element.querySelector(`.${ID}-right`).appendChild(content);
	}

	render() {
		const { component } = this;
		document
			.querySelector(".product-col-1")
			.insertAdjacentElement("beforebegin", component);

		// if (window.innerWidth <= 767) {
		// 	document
		// 		.querySelector(".wishlist-wrapper")
		// 		.insertAdjacentElement(
		// 			"beforebegin",
		// 			document.querySelector(`.${ID}-subBox`)
		// 		);
		// }

		document
			.querySelector(`.${ID}-accordionSteps`)
			?.insertAdjacentElement(
				"afterbegin",
				document.querySelector("#product-content .price-wrapper")
			);

		document
			.querySelector(`.${ID}-reviewSection`)
			?.insertAdjacentElement(
				"afterbegin",
				document.querySelector("#page_heading")
			);
	}
}
