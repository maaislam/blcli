import shared from "../../../../../../../core-files/shared";
import { minus, plus } from "../../helpers";

const { ID } = shared;

export default class VelvetiserStyleSteps {
	constructor() {
		this.create();
		this.bindEvents();
		this.render();
	}
	/*
<div class="${ID}-subBox">
              <div class="${ID}-image"></div>
              <div class="${ID}-info">
                <h3>Podster + Coffee subscription</h3>
                <p>Buy for <b>£74.95</b> with a 6 or 12 month Rabot Estate Coffee Subscription.</p>
                <p>You’ll earn chocolate rewards and includes free Standard UK Delivery**</p>
                <a class="${ID}-subLink" href="https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Configurator-Show">Find out more</a>
              </div>
            </div>
            */
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
                <div class="${ID}-accordionStep ${ID}-included"> 
                    <div class="${ID}-stepTitle">What's included?</div>
                    <div class="${ID}-stepContent">
                    </div>
                </div>
                <div class="${ID}-accordionStep ${ID}-podBundles">
                    <div class="${ID}-stepTitle">Add coffee and save</div>
                    <span class="${ID}-smallText">Discount price only when bought with the Podster Coffee System</span>
                    <div class="${ID}-stepContent">
                     <div class="${ID}-carousel"></div>
                    </div>
                </div>
                <div class="${ID}-accordionStep ${ID}-extras">
                    <div class="${ID}-stepTitle">Add a little extra</div>
                    <span class="${ID}-smallText">Buy 2 Coffee Cups for £20 (Discount applied at basket)</span>
                    <div class="${ID}-stepContent">
                        <div class="${ID}-carousel"></div>
                    </div>
                </div>
            </div> 
        </div>
        <div class="${ID}-addToBagMobile">
          <div class="${ID}-container">
            <div class="${ID}-row">
              <div class="${ID}-price">Only <span>£149.95</span></div>
              <div class="${ID}-stock"><span></span>In Stock</div>
            </div>
            <div class="${ID}-row">
            <div class="${ID}-qty">
              <div class="${ID}-qtyButton ${ID}-minus">-</div>
                <input type="number" class="${ID}-quantity-input" value="1" step="1" min="1" max="" name="quantity">
              <div class="${ID}-qtyButton ${ID}-plus">+</div>
            </div>
            <div class="${ID}-fixedCTA ${ID}-add">Add to bag</div>
          </div>
            </div>
        </div>
      `;
		this.component = element;

		// Move existing content
		const content = document.querySelector("#product-content");
		element.querySelector(`.${ID}-right`).appendChild(content);
	}

	bindEvents() {
		const { component } = this;

		/** Increase qty in fixed mobile bar */

		if (component.querySelector(`.${ID}-addToBagMobile`)) {
			const increaseValueBtn = component.querySelector(
				`.${ID}-qtyButton.${ID}-plus`
			);
			const decreaseValueBtn = component.querySelector(
				`.${ID}-qtyButton.${ID}-minus`
			);

			increaseValueBtn.addEventListener("click", () => {
				plus();
				document
					.querySelector('.quantity .btn[data-type="plus"]')
					.click();
			});
			decreaseValueBtn.addEventListener("click", () => {
				minus();
				document
					.querySelector('.quantity .btn[data-type="minus"]')
					.click();
			});
		}

		// on add to bag click, click actual add to bag
		component
			.querySelector(`.${ID}-fixedCTA`)
			.addEventListener("click", () => {
				document.querySelector(`.pdpForm .${ID}-add`).click();
			});
	}

	render() {
		const { component } = this;
		document
			.querySelector(".product-col-1")
			.insertAdjacentElement("beforebegin", component);

		// if(window.innerWidth <= 767) {
		//   document.querySelector('.wishlist-wrapper').insertAdjacentElement('beforebegin', document.querySelector(`.${ID}-subBox`));
		// }
	}
}
