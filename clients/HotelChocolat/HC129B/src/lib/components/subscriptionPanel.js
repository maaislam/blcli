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
				<a href="/choose-your-machine?step=Machines" class="${ID}-subscription__link">Buy with subscription for £49.95 <span>(Save £50)</span></a>
			</div>`
		);

	pollerLite([`.${ID}-subscription`], () => {
		const subscriptionLink = document.querySelector(
			`.${ID}-subscription__link`
		);
		subscriptionLink.addEventListener("click", (e) => {
			fireEvent(
				`Click - User clicks on subscription CTA to go to subscription page`
			);
		});
	});
};

export default subscriptionPanel;
