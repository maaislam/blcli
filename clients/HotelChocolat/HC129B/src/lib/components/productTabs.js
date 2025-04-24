import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";

/**
 * Rebuild the product tabs on tablet/desktop
 */
const { ID } = shared;

export default class ProductTabs {
	constructor() {
		this.create();
		this.bindEvents();
		this.render();
	}

	create() {
		const element = document.createElement("div");
		element.classList.add(`${ID}-productTabs`);
		element.classList.add(`product-tabs`);
		element.innerHTML = `
        <div class="${ID}-tab-wrap">
            <div class="${ID}-tab ${ID}-activeTab ${ID}-reviews">Reviews</div>
            <div class="${ID}-tab">Description</div>

            <div class="${ID}-tab">Delivery</div>
            <div class="${ID}-tab">Gifting</div>
        </div>
        <div class="${ID}-tabContent tab-content ${ID}-reviews"></div>
        <div class="${ID}-tabContent tab-content ${ID}-desc"></div>
        <div class="${ID}-tabContent tab-content ${ID}-delivery prod-info prod-info-c"></div>
        <div class="${ID}-tabContent tab-content ${ID}-gifting prod-info prod-info-b"></div>
        `;

		this.component = element;
	}

	bindEvents() {
		const { component } = this;

		const tabContent = component.getElementsByClassName(`${ID}-tabContent`);
		const tab = component.getElementsByClassName(`${ID}-tab`);
		hideTabsContent(1);

		component.addEventListener("click", (event) => {
			const target = event.target;
			console.log(target, target.closest(`.${ID}-tab`));
			if (target.closest(`.${ID}-tab`)) {
				console.log("clicked tab", tab);
				for (let i = 0; i < tab.length; i++) {
					if (target == tab[i]) {
						const targetName = target.textContent;
						fireEvent(`Clicked tab ${targetName}`);
						showTabsContent(i);
						break;
					}
				}
			}
		});

		function hideTabsContent(a) {
			for (let i = a; i < tabContent.length; i++) {
				tabContent[i].classList.remove("show");
				tabContent[i].classList.add("hide");
				tab[i].classList.remove(`${ID}-activeTab`);
			}
		}

		function showTabsContent(b) {
			console.log("showing tab", tabContent);
			if (tabContent[b].classList.contains("hide")) {
				hideTabsContent(0);
				tab[b].classList.add(`${ID}-activeTab`);
				tabContent[b].classList.remove("hide");
				tabContent[b].classList.add("show");
			}
		}
	}

	render() {
		const { component } = this;
		document
			.querySelector(".tab-target-desktop")
			.insertAdjacentElement("beforebegin", component);

		// move current tab content to new ones
		let reviews = document.querySelector("#tabReviews");
		const reviewRef = document.querySelector(
			`.tab-mobile-content a.tab-mobile-title[href="#tabReviews"]`
		);
		let description = document.querySelector("#tabDesc");
		const descriptionRef = document.querySelector(
			`.tab-mobile-content a.tab-mobile-title[href="#tabDesc"]`
		);
		const deliveryContent = document.querySelector(
			".prod-info.prod-info-c ul"
		);
		const giftingContent = document.querySelector(
			".prod-info.prod-info-b ul"
		);

		let deliveryAfterUse, giftingAfterUse;

		if (window.innerWidth > 767) {
			if (reviews) {
				component
					.querySelector(`.${ID}-tabContent.${ID}-reviews`)
					.insertAdjacentElement("afterbegin", reviews);
				reviews = document.querySelector("#tabReviews");
			}

			if (description) {
				component
					.querySelector(`.${ID}-tabContent.${ID}-desc`)
					.insertAdjacentElement("afterbegin", description);
				description = document.querySelector("#tabDesc");
			}
		}
		window.addEventListener("resize", () => {
			if (window.innerWidth > 767) {
				if (reviews) {
					component
						.querySelector(`.${ID}-tabContent.${ID}-reviews`)
						.insertAdjacentElement("afterbegin", reviews);
					reviews = document.querySelector("#tabReviews");
				}

				if (description) {
					component
						.querySelector(`.${ID}-tabContent.${ID}-desc`)
						.insertAdjacentElement("afterbegin", description);
					description = document.querySelector("#tabDesc");
				}
			} else {
				if (reviews) {
					reviewRef.insertAdjacentElement("afterend", reviews);
					reviews = document.querySelector("#tabReviews");
				}

				if (description) {
					descriptionRef.insertAdjacentElement(
						"afterend",
						description
					);
					description = document.querySelector("#tabDesc");
				}
			}
		});

		if (deliveryContent) {
			component
				.querySelector(`.${ID}-tabContent.${ID}-delivery`)
				.insertAdjacentElement(
					"afterbegin",
					deliveryContent.cloneNode(true)
				);
			deliveryAfterUse = component
				.querySelector(`.${ID}-tabContent.${ID}-delivery`)
				.cloneNode(true);
		}

		if (giftingContent) {
			component
				.querySelector(`.${ID}-tabContent.${ID}-gifting`)
				.insertAdjacentElement(
					"afterbegin",
					giftingContent.cloneNode(true)
				);
			giftingAfterUse = component
				.querySelector(`.${ID}-tabContent.${ID}-gifting`)
				.cloneNode(true);
		}

		pollerLite([".HC014"], () => {
			if (!component.querySelector(`.${ID}-tabContent.${ID}-gifting`)) {
				component.insertAdjacentElement("beforeend", giftingAfterUse);
			}
			if (!component.querySelector(`.${ID}-tabContent.${ID}-delivery`)) {
				component.insertAdjacentElement("beforeend", deliveryAfterUse);
			}
		});
	}
}
