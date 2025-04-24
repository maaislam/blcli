import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
import { flakePrices, kitPrices, updatePrice } from "../helpers";

const { ID } = shared;

const subscriptionPanel = () => {
	document
		.querySelector(`.product-add-to-cart form.pdpForm .inventory`)
		?.insertAdjacentHTML(
			"afterend",
			`<div class="${ID}-subscription">
				<div class="${ID}-sub-checkbox">
				<input type="checkbox" id="${ID}-input" name="radio-group">
				<label for="${ID}-input">Buy with subscription</label>
				</div>
				<div class="${ID}-save">Save £50</div>
			</div>`
		);
	const subDom = document.querySelector(`.${ID}-subscription`);
	subDom?.addEventListener("click", () => {
		document
			.querySelector(`.${ID}-subscription .${ID}-sub-checkbox label`)
			?.click();
	});
	const input = document.querySelector(
		`.${ID}-subscription input#${ID}-input`
	);

	const el = document.createElement("div");
	el.classList.add(`${ID}-subscription-panel`, "hidden");
	el.innerHTML = /* HTML */ `
		<p class="${ID}-subscription-panel__intro">
			Buy your Velvetiser™ for <strong>£49.95</strong> (saving £50) with a
			6-or 12-month Drinking Chocolate Subscription (from £13 / month).
		</p>
		<div class="${ID}-subscription-panel__info">
			<h4 class="${ID}-subscription-panel__info-heading">
				Why subscribe?
			</h4>
			<ul>
				<li>Easily swap recipes</li>
				<li>Includes <strong>free Standard UK Delivery</strong></li>
				<li>Enjoy a £15 voucher for every tenth subscription item</li>
			</ul>
		</div>
		<a
			href="https://www.hotelchocolat.com/uk/choose-your-machine?step=Machines"
			class="${ID}-subscription-panel__cta"
			>Proceed</a
		>
	`;
	pollerLite([`.${ID}-subscription`], () => {
		document
			.querySelector(`.${ID}-subscription`)
			.insertAdjacentElement("afterend", el);
		const price = document.querySelector(
			`.${ID}-accordionSteps .price-wrapper .price-sales`
		);
		input.addEventListener("change", (e) => {
			if (input.checked) {
				el.classList.remove("hidden");
				document
					.querySelector(`.product-add-to-cart form .${ID}-add`)
					?.classList.add(`${ID}-hidden`);
				// $(
				// 	`.${ID}-kits .${ID}-carousel .${ID}-product.${ID}-selected`
				// ).click();
				const seletedItems = document.querySelectorAll(
					`.${ID}-kits .${ID}-carousel .${ID}-product.${ID}-selected`
				);
				if (seletedItems.length > 0) {
					seletedItems.forEach((item) => {
						item.classList.remove(`${ID}-selected`);
					});
				}
				document
					.querySelector(`.${ID}-kits .${ID}-stepContent`)
					?.classList.add(`${ID}-sub-only`);
				if (price) {
					price.innerText = `£49.95`;
				}
				kitPrices.length = 0;
				fireEvent(`Click - User selected buy with subscription option`);
			} else {
				el.classList.add("hidden");
				document
					.querySelector(`.product-add-to-cart form .${ID}-add`)
					?.classList.remove(`${ID}-hidden`);
				document
					.querySelector(`.${ID}-kits .${ID}-stepContent`)
					?.classList.remove(`${ID}-sub-only`);
				if (price) {
					price.innerText = `£99.95`;
				}
				fireEvent(`Click - User canceled buy with subscription option`);
			}
		});

		const proceedCta = el.querySelector(`a.${ID}-subscription-panel__cta`);
		proceedCta?.addEventListener("click", () => {
			fireEvent(`Click - User clicks the proceed CTA `);
		});
	});
};

export default subscriptionPanel;
