import { fireEvent } from "../../../../../../core-files/services";
import shared from "../../../../../../core-files/shared";
import { pollerLite } from "../../../../../../lib/utils";
import { flakePrices, kitPrices, updatePrice } from "../helpers";

const { ID } = shared;

const subscriptionPanel = () => {
	pollerLite(
		[() => window.dataLayer, () => document.readyState == "complete"],
		() => {
			const pageData = dataLayer.filter(
				(item) => item.event == "pageLoad"
			);
			const subscriberStatus = pageData[0].subscriber_status
				.trim()
				.toLowerCase();

			if (
				subscriberStatus === "" ||
				subscriberStatus.indexOf("inactive") > -1
			) {
				document
					.querySelector(
						`.product-add-to-cart form.pdpForm .inventory`
					)
					?.insertAdjacentHTML(
						"afterend",
						`<div class="${ID}-subscription">
							<a href="/choose-your-machine?step=Machines" class="${ID}-subscription__link">Buy with subscription for £49.95 <span>(Save £50)</span></a>
						</div>`
					);
			} else if (subscriberStatus.indexOf("active") > -1) {
				document.querySelector("#impulse-upsell-container")?.remove();
			}
		}
	);

	pollerLite([`.${ID}-subscription`], () => {
		const subscriptionLink = document.querySelector(
			`.${ID}-subscription__link`
		);
		subscriptionLink.addEventListener("click", (e) => {
			fireEvent(`Click - User clicks on subscription CTA`);
		});
	});
};

export default subscriptionPanel;
